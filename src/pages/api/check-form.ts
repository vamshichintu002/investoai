import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../utils/dbUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'Missing user ID' });
  }

  const client = await pool.connect();
  try {
    const query = `
      SELECT EXISTS (
        SELECT 1 FROM form_details 
        WHERE clerk_id = $1
      ) as has_submitted;
    `;

    const result = await client.query(query, [userId]);
    const hasSubmitted = result.rows[0]?.has_submitted || false;

    return res.status(200).json({ hasSubmitted });
  } catch (error) {
    console.error('Error checking form submission:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.release();
  }
}
