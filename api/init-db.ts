import { db } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const client = await db.connect();

    // Create Documents table
    await client.sql`
      CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        subject TEXT NOT NULL,
        subject_code TEXT NOT NULL,
        teacher TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        file_type TEXT NOT NULL,
        file_url TEXT,
        upload_date TEXT NOT NULL,
        rating FLOAT DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        verified BOOLEAN DEFAULT FALSE,
        thumbnail TEXT,
        downloads INTEGER DEFAULT 0
      );
    `;

    // Create Reviews table
    await client.sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        document_id TEXT REFERENCES documents(id) ON DELETE CASCADE,
        user_name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        date TEXT NOT NULL
      );
    `;

    return response.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Error initializing database:', error);
    return response.status(500).json({ error: (error as Error).message });
  }
}
