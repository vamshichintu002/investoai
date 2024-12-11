import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../utils/dbUtils';

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
      SELECT api_out_json
      FROM form_details
      WHERE clerk_id = $1
      ORDER BY created_at DESC
      LIMIT 1;
    `;

    const result = await client.query(query, [userId]);
    
    if (!result.rows.length) {
      return res.status(404).json({ message: 'No dashboard data found for this user' });
    }

    const dashboardData = result.rows[0].api_out_json;
    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.release();
  }
}
