import express from 'express';
import cors from 'cors';
import { prisma } from '../lib/prisma';
import FormDataTransformer from '../lib/form-data-transformer'; 
import { analyzePortfolio } from '../utils/portfolioAnalyzer';

const app = express();

// Enable CORS with specific options
app.use(cors({
  origin: 'http://:5173', // Allow only our frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log('=== Incoming Request ===');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);
  console.log('=====================');
  next();
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Investment data endpoint
app.get('/api/investment/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    if (!clerkId) {
      console.log('Missing clerkId parameter in request');
      return res.status(400).json({ message: 'Missing clerkId parameter' });
    }

    console.log('=== Investment Data Request ===');
    console.log('ClerkId:', clerkId);

    // First get the user
    const user = await prisma.users.findUnique({
      where: { clerkId }
    });

    if (!user) {
      console.log('User not found for clerkId:', clerkId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Found user:', { id: user.id, clerkId: user.clerkId });

    // Then get their form details
    const formDetails = await prisma.form_details.findUnique({
      where: { userId: user.id },
      select: {
        api_out_json: true,
        createdAt: true,
        updatedAt: true
      }
    });

    console.log('Form details query result:', {
      found: !!formDetails,
      hasApiJson: !!formDetails?.api_out_json,
      createdAt: formDetails?.createdAt,
      updatedAt: formDetails?.updatedAt
    });

    if (!formDetails?.api_out_json) {
      console.log('No investment data found for user:', clerkId);
      return res.status(404).json({ message: 'No investment data found for user' });
    }

    console.log('Successfully found investment data for user:', clerkId);
    return res.json(formDetails.api_out_json);
  } catch (error) {
    console.error('Error in /api/investment endpoint:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      details: error.message
    });
  }
});

// Check if user exists
app.get('/api/check-user/:clerkId', async (req, res) => {
  try {
    console.log('=== Check User Request ===');
    console.log('Checking user existence for clerkId:', req.params.clerkId);
    
    const user = await prisma.users.findUnique({
      where: { clerkId: req.params.clerkId }
    });
    
    console.log('User check result:', user);
    res.json({ exists: !!user, user });
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ 
      error: 'Failed to check user', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Create or update user
app.post('/api/sync-user', async (req, res) => {
  try {
    console.log('=== Sync User Request ===');
    const { clerkId, email } = req.body;
    
    if (!clerkId || !email) {
      console.error('Missing required fields:', { clerkId, email });
      return res.status(400).json({ 
        error: 'Missing required fields', 
        details: 'Both clerkId and email are required' 
      });
    }

    console.log('Attempting to sync user:', { clerkId, email });

    // First check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { clerkId }
    });

    console.log('Existing user check result:', existingUser);

    let user;
    if (!existingUser) {
      console.log('Creating new user...');
      try {
        user = await prisma.users.create({
          data: {
            clerkId,
            email,
          },
        });
        console.log('Successfully created user:', user);
      } catch (createError) {
        console.error('Error creating user:', createError);
        throw createError;
      }
    } else {
      console.log('Updating existing user...');
      try {
        user = await prisma.users.update({
          where: { clerkId },
          data: { email },
        });
        console.log('Successfully updated user:', user);
      } catch (updateError) {
        console.error('Error updating user:', updateError);
        throw updateError;
      }
    }

    res.json({ 
      success: true,
      user,
      exists: !!existingUser,
      message: existingUser ? 'User updated' : 'User created'
    });
  } catch (error) {
    console.error('Error in sync-user endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to sync user', 
      details: error.message,
      code: error.code,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Submit form endpoint
app.post('/api/submit-form', async (req, res) => {
  try {
    const { clerkId, formData } = req.body;

    if (!clerkId || !formData) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: 'Both clerkId and formData are required'
      });
    }

    console.log('Submitting form for user:', clerkId);

    // First, get the user by clerkId
    const user = await prisma.users.findUnique({
      where: { clerkId: clerkId }
    });

    if (!user) {
      console.error('User not found for clerkId:', clerkId);
      return res.status(404).json({ 
        error: 'User not found',
        details: `No user found with clerkId: ${clerkId}`
      });
    }

    // Create or update form details
    const transformedData = FormDataTransformer.transformToApiFormat(formData);
    
    // Analyze the portfolio using the external API
    let portfolioAnalysis = null;
    try {
      portfolioAnalysis = await analyzePortfolio(transformedData);
    } catch (error) {
      console.error('Error getting portfolio analysis:', error);
      // Continue with form submission even if analysis fails
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

    console.log('Form details saved:', formDetails);
    res.json({ success: true, formDetails });
  } catch (error) {
    console.error('Error in /api/submit-form:', error);
    res.status(500).json({
      error: 'Failed to submit form',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('=== Server Error ===');
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error', 
    details: err.message,
    code: err.code,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
