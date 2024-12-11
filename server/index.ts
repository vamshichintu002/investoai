import express from 'express';
import cors from 'cors';
import { pool } from '../src/utils/dbUtils';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/dashboard/:userId', async (req, res) => {
  const { userId } = req.params;

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
});

app.get('/api/investment', async (req, res) => {
  const client = await pool.connect();
  try {
    const query = `
      SELECT api_out_json
      FROM form_details
      ORDER BY created_at DESC
      LIMIT 1;
    `;

    const result = await client.query(query);
    
    if (!result.rows.length || !result.rows[0].api_out_json) {
      return res.status(404).json({ message: 'No investment data found' });
    }

    return res.status(200).json(result.rows[0].api_out_json);
  } catch (error) {
    console.error('Error fetching investment data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
