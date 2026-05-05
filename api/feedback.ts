import { db } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const client = await db.connect();

  if (request.method === 'GET') {
    try {
      const { rows } = await client.sql`SELECT * FROM platform_feedback ORDER BY date DESC`;
      
      const feedbacks = rows.map(row => ({
        id: row.id,
        userName: row.user_name,
        department: row.department,
        rating: row.rating,
        comment: row.comment,
        date: row.date
      }));

      return response.status(200).json(feedbacks);
    } catch (error) {
      return response.status(500).json({ error: (error as Error).message });
    }
  }

  if (request.method === 'POST') {
    try {
      const feedback = request.body;
      
      await client.sql`
        INSERT INTO platform_feedback (id, user_name, department, rating, comment, date)
        VALUES (${feedback.id}, ${feedback.userName}, ${feedback.department}, ${feedback.rating}, ${feedback.comment}, ${feedback.date})
      `;

      return response.status(201).json({ message: 'Feedback added' });
    } catch (error) {
      return response.status(500).json({ error: (error as Error).message });
    }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}
