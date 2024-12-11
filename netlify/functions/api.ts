import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
import FormDataTransformer from '../../src/lib/form-data-transformer';
import { analyzePortfolio } from '../../src/utils/portfolioAnalyzer';

const prisma = new PrismaClient();

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? 'https://investoaiii.netlify.app' 
    : 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Credentials': 'true'
};

export const handler: Handler = async (event, context) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  console.log('=== Incoming Request ===');
  console.log('Method:', event.httpMethod);
  console.log('Path:', event.path);
  console.log('Body:', event.body);
  console.log('Headers:', event.headers);

  try {
    // Test endpoint
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/api/test') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'API is working' })
      };
    }

    // Investment data endpoint
    if (event.httpMethod === 'GET' && event.path.startsWith('/.netlify/functions/api/investment/')) {
      const clerkId = event.path.split('/').pop();
      
      if (!clerkId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Missing clerkId parameter' })
        };
      }

      const user = await prisma.users.findUnique({
        where: { clerkId }
      });

      if (!user) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'User not found' })
        };
      }

      const formDetails = await prisma.form_details.findUnique({
        where: { userId: user.id },
        select: {
          api_out_json: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!formDetails?.api_out_json) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'No investment data found for user' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(formDetails.api_out_json)
      };
    }

    // Check user endpoint
    if (event.httpMethod === 'GET' && event.path.startsWith('/.netlify/functions/api/check-user/')) {
      const clerkId = event.path.split('/').pop();
      
      const user = await prisma.users.findUnique({
        where: { clerkId }
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ exists: !!user, user })
      };
    }

    // Sync user endpoint
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/api/sync-user') {
      const { clerkId, email } = JSON.parse(event.body || '{}');

      if (!clerkId || !email) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            message: 'Missing required fields',
            details: `Required: clerkId and email. Received: ${JSON.stringify({ clerkId, email })}`
          })
        };
      }

      let user = await prisma.users.findUnique({
        where: { clerkId }
      });

      if (!user) {
        user = await prisma.users.create({
          data: {
            clerkId,
            email
          }
        });
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          exists: !!user,
          user 
        })
      };
    }

    // Check form status endpoint
    if (event.httpMethod === 'GET' && event.path.startsWith('/.netlify/functions/api/check-form-status/')) {
      const clerkId = event.path.split('/').pop();
      
      if (!clerkId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Missing clerkId parameter' })
        };
      }

      try {
        // First, find the user by clerkId
        const user = await prisma.users.findUnique({
          where: { clerkId },
          select: {
            id: true,
            form_details: {
              select: {
                id: true
              }
            }
          }
        });

        if (!user) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ message: 'User not found' })
          };
        }

        // Check if user has form details
        const hasFilledForm = user.form_details !== null;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ hasFilledForm })
        };
      } catch (error) {
        console.error('Error checking form status:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ message: 'Internal server error', error: error.message })
        };
      }
    }

    // Check user status endpoint (for sign in redirect)
    if (event.httpMethod === 'GET' && event.path.startsWith('/.netlify/functions/api/check-user-status/')) {
      const clerkId = event.path.split('/').pop();
      
      if (!clerkId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Missing clerkId parameter' })
        };
      }

      try {
        // Check user and form details in one query
        const user = await prisma.users.findUnique({
          where: { clerkId },
          select: {
            id: true,
            form_details: {
              select: {
                id: true
              }
            }
          }
        });

        if (!user) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
              exists: false,
              hasFilledForm: false,
              redirectTo: '/form'
            })
          };
        }

        const hasFilledForm = user.form_details !== null;
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            exists: true,
            hasFilledForm,
            redirectTo: hasFilledForm ? '/investment-dashboard' : '/form'
          })
        };

      } catch (error) {
        console.error('Error checking user status:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            message: 'Internal server error', 
            error: error.message,
            redirectTo: '/'
          })
        };
      }
    }

    // Submit form endpoint
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/api/submit-form') {
      const { clerkId, formData } = JSON.parse(event.body || '{}');

      if (!clerkId || !formData) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Missing required fields',
            details: 'Both clerkId and formData are required'
          })
        };
      }

      const user = await prisma.users.findUnique({
        where: { clerkId }
      });

      if (!user) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            error: 'User not found',
            details: `No user found with clerkId: ${clerkId}`
          })
        };
      }

      const transformedData = FormDataTransformer.transformToApiFormat(formData);
      
      let portfolioAnalysis = null;
      try {
        portfolioAnalysis = await analyzePortfolio(transformedData);
      } catch (error) {
        console.error('Error getting portfolio analysis:', error);
      }

      const formDetails = await prisma.form_details.upsert({
        where: {
          userId: user.id
        },
        update: {
          name: formData.name,
          phone: formData.phone,
          age: parseInt(formData.age),
          employmentStatus: formData.employmentStatus,
          annualIncome: parseFloat(formData.annualIncome),
          maritalStatus: formData.maritalStatus,
          selectedGoals: formData.selectedGoals,
          investmentHorizon: formData.investmentHorizon,
          riskTolerance: formData.riskTolerance,
          riskComfortLevel: parseInt(formData.riskComfortLevel),
          monthlyIncome: parseFloat(formData.monthlyIncome),
          monthlyExpenses: parseFloat(formData.monthlyExpenses),
          selectedInvestments: formData.selectedInvestments,
          managementStyle: formData.managementStyle,
          lifeChangesDetails: formData.lifeChangesDetails || null,
          comments: formData.comments || null,
          api_out_json: portfolioAnalysis
        },
        create: {
          userId: user.id,
          name: formData.name,
          phone: formData.phone,
          age: parseInt(formData.age),
          employmentStatus: formData.employmentStatus,
          annualIncome: parseFloat(formData.annualIncome),
          maritalStatus: formData.maritalStatus,
          selectedGoals: formData.selectedGoals,
          investmentHorizon: formData.investmentHorizon,
          riskTolerance: formData.riskTolerance,
          riskComfortLevel: parseInt(formData.riskComfortLevel),
          monthlyIncome: parseFloat(formData.monthlyIncome),
          monthlyExpenses: parseFloat(formData.monthlyExpenses),
          selectedInvestments: formData.selectedInvestments,
          managementStyle: formData.managementStyle,
          lifeChangesDetails: formData.lifeChangesDetails || null,
          comments: formData.comments || null,
          api_out_json: portfolioAnalysis
        }
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, formDetails })
      };
    }

    // Default response for unmatched routes
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ message: 'Not Found' })
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Internal Server Error',
        error: error.message
      })
    };
  }
};
