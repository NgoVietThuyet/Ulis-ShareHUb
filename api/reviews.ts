import { db } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const client = await db.connect();

  if (request.method === 'GET') {
    try {
      const { docId } = request.query;
      let query;
      
      if (docId) {
        query = client.sql`SELECT * FROM reviews WHERE document_id = ${docId as string} ORDER BY date DESC`;
      } else {
        query = client.sql`SELECT * FROM reviews ORDER BY date DESC`;
      }
      
      const { rows } = await query;
      
      const reviews = rows.map(row => ({
        id: row.id,
        documentId: row.document_id,
        userName: row.user_name,
        rating: row.rating,
        comment: row.comment,
        date: row.date
      }));

      return response.status(200).json(reviews);
    } catch (error) {
      return response.status(500).json({ error: (error as Error).message });
    }
  }

  if (request.method === 'POST') {
    try {
      const review = request.body;
      
      // Start transaction
      await client.sql`BEGIN`;

      // Insert review
      await client.sql`
        INSERT INTO reviews (id, document_id, user_name, rating, comment, date)
        VALUES (${review.id}, ${review.documentId}, ${review.userName}, ${review.rating}, ${review.comment}, ${review.date})
      `;

      // Update document rating and count
      await client.sql`
        UPDATE documents 
        SET 
          rating = (SELECT AVG(rating) FROM reviews WHERE document_id = ${review.documentId}),
          review_count = (SELECT COUNT(*) FROM reviews WHERE document_id = ${review.documentId})
        WHERE id = ${review.documentId}
      `;

      await client.sql`COMMIT`;

      return response.status(201).json({ message: 'Review added' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return response.status(500).json({ error: (error as Error).message });
    }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}
