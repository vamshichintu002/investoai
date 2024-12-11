import { NextApiRequest, NextApiResponse } from 'next';
import { storeFormData } from '../../utils/dbUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { clerkId, formData } = req.body;

    if (!clerkId || !formData) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await storeFormData(formData, clerkId);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
