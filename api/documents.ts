import { db } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const client = await db.connect();

  if (request.method === 'GET') {
    try {
      const { rows } = await client.sql`SELECT * FROM documents ORDER BY upload_date DESC`;
      
      // Map database snake_case to frontend camelCase
      const documents = rows.map(row => ({
        id: row.id,
        title: row.title,
        subject: row.subject,
        subjectCode: row.subject_code,
        teacher: row.teacher,
        category: row.category,
        description: row.description,
        fileType: row.file_type,
        fileUrl: row.file_url,
        uploadDate: row.upload_date,
        rating: row.rating,
        reviewCount: row.review_count,
        verified: row.verified,
        thumbnail: row.thumbnail,
        downloads: row.downloads
      }));

      return response.status(200).json(documents);
    } catch (error) {
      return response.status(500).json({ error: (error as Error).message });
    }
  }

  if (request.method === 'POST') {
    try {
      const doc = request.body;
      
      await client.sql`
        INSERT INTO documents (
          id, title, subject, subject_code, teacher, category, 
          description, file_type, file_url, upload_date, 
          rating, review_count, verified, thumbnail, downloads
        ) VALUES (
          ${doc.id}, ${doc.title}, ${doc.subject}, ${doc.subjectCode}, ${doc.teacher}, ${doc.category}, 
          ${doc.description}, ${doc.fileType}, ${doc.fileUrl}, ${doc.uploadDate}, 
          ${doc.rating}, ${doc.reviewCount}, ${doc.verified}, ${doc.thumbnail}, ${doc.downloads}
        )
      `;

      return response.status(201).json({ message: 'Document added' });
    } catch (error) {
      return response.status(500).json({ error: (error as Error).message });
    }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}
