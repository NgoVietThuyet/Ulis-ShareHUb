import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const body = request.body as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Here you can check for user authentication
        // and decide if they are allowed to upload
        return {
          allowedContentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            userId: 'anonymous', 
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This is called once the upload is completed
        // You can update your database here if you want
        // though we are doing it in the frontend call to /api/documents for now
        console.log('blob upload completed', blob, tokenPayload);
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: (error as Error).message });
  }
}
