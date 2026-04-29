import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Document, mockDocuments, mockReviews, Review } from '../data/mockData';

interface DocumentContextType {
  documents: Document[];
  reviews: Review[];
  addDocument: (doc: Document) => void;
  addReview: (review: Review) => void;
  searchDocuments: (query: string) => Document[];
  filterDocuments: (filters: FilterOptions) => Document[];
  getDocumentById: (id: string) => Document | undefined;
  getReviewsByDocumentId: (docId: string) => Review[];
}

interface FilterOptions {
  category?: string;
  subject?: string;
  teacher?: string;
  verified?: boolean;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  // Load from Vercel Blob on startup
  useEffect(() => {
    async function loadData() {
      try {
        const { list } = await import('@vercel/blob');
        const { blobs } = await list({ token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN });
        const dbBlob = blobs.find((b: any) => b.pathname === 'db.json');
        
        if (dbBlob) {
          const res = await fetch(dbBlob.url + '?t=' + Date.now(), { cache: 'no-store' });
          const data = await res.json();
          if (data.documents && data.documents.length > 0) setDocuments(data.documents);
          if (data.reviews) setReviews(data.reviews);
        }
      } catch (e) {
        console.error("Failed to load db.json from Vercel", e);
      }
    }
    loadData();
  }, []);

  const saveDb = async (newDocs: Document[], newReviews: Review[]) => {
    try {
      const { put } = await import('@vercel/blob');
      const dbContent = JSON.stringify({ documents: newDocs, reviews: newReviews });
      const blob = new Blob([dbContent], { type: 'application/json' });
      await put('db.json', blob, { 
        access: 'public', 
        addRandomSuffix: false,
        token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN 
      });
    } catch (e) {
      console.error("Failed to save db.json to Vercel", e);
    }
  };

  const addDocument = (doc: Document) => {
    const newDocs = [doc, ...documents];
    setDocuments(newDocs);
    saveDb(newDocs, reviews);
  };

  const addReview = (review: Review) => {
    const newReviews = [...reviews, review];
    setReviews(newReviews);

    // Update document rating
    const docReviews = newReviews.filter(r => r.documentId === review.documentId);
    const avgRating = docReviews.reduce((sum, r) => sum + r.rating, 0) / docReviews.length;

    const newDocs = documents.map(doc =>
      doc.id === review.documentId
        ? { ...doc, rating: avgRating, reviewCount: docReviews.length }
        : doc
    );
    setDocuments(newDocs);
    saveDb(newDocs, newReviews);
  };

  const searchDocuments = (query: string): Document[] => {
    const lowerQuery = query.toLowerCase();
    return documents.filter(doc =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.subject.toLowerCase().includes(lowerQuery) ||
      doc.subjectCode.toLowerCase().includes(lowerQuery) ||
      doc.teacher.toLowerCase().includes(lowerQuery) ||
      doc.description.toLowerCase().includes(lowerQuery)
    );
  };

  const filterDocuments = (filters: FilterOptions): Document[] => {
    return documents.filter(doc => {
      if (filters.category && doc.category !== filters.category) return false;
      if (filters.subject && doc.subject !== filters.subject) return false;
      if (filters.teacher && doc.teacher !== filters.teacher) return false;
      if (filters.verified !== undefined && doc.verified !== filters.verified) return false;
      return true;
    });
  };

  const getDocumentById = (id: string): Document | undefined => {
    return documents.find(doc => doc.id === id);
  };

  const getReviewsByDocumentId = (docId: string): Review[] => {
    return reviews.filter(review => review.documentId === docId);
  };

  return (
    <DocumentContext.Provider value={{
      documents,
      reviews,
      addDocument,
      addReview,
      searchDocuments,
      filterDocuments,
      getDocumentById,
      getReviewsByDocumentId
    }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within DocumentProvider');
  }
  return context;
}
