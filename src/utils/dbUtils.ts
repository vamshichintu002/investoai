import { Pool } from 'pg';
import { FormDataTransformer } from './formDataTransformer';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});


export async function storeFormData(formData: any, clerkId: string) {
  const client = await pool.connect();
  try {
    // Transform the form data to API format
    const transformedData = FormDataTransformer.transformToApiFormat(formData);
    
    const query = `
      INSERT INTO form_details (
        clerk_id,
        form_data,
        json_data,
        created_at
      ) VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;

    const values = [
      clerkId,
      formData,
      transformedData
    ];

    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Create the necessary table if it doesn't exist
export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS form_details (
        id SERIAL PRIMARY KEY,
        clerk_id TEXT NOT NULL,
        form_data JSONB NOT NULL,
        json_data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
  } finally {
    client.release();
  }
}
