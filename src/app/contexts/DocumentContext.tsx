import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Document, mockDocuments, mockReviews, Review, PlatformFeedback, mockPlatformFeedbacks } from '../data/mockData';

interface DocumentContextType {
  documents: Document[];
  reviews: Review[];
  platformFeedbacks: PlatformFeedback[];
  addDocument: (doc: Document) => void;
  addReview: (review: Review) => void;
  addPlatformFeedback: (feedback: PlatformFeedback) => void;
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
  const [platformFeedbacks, setPlatformFeedbacks] = useState<PlatformFeedback[]>(mockPlatformFeedbacks);

  // Load from Vercel Postgres on startup
  useEffect(() => {
    async function loadData() {
      try {
        const [docsRes, reviewsRes, feedbackRes] = await Promise.all([
          fetch('/api/documents'),
          fetch('/api/reviews'),
          fetch('/api/feedback')
        ]);
        
        if (docsRes.ok) {
          const docs = await docsRes.json();
          setDocuments(docs);
        }
        
        if (reviewsRes.ok) {
          const revs = await reviewsRes.json();
          setReviews(revs);
        }

        if (feedbackRes.ok) {
          const feedback = await feedbackRes.json();
          setPlatformFeedbacks(feedback);
        }
      } catch (e) {
        console.error("Failed to load data from Postgres", e);
      }
    }
    loadData();
  }, []);

  const addDocument = async (doc: Document) => {
    // Optimistic update
    setDocuments([doc, ...documents]);

    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc),
      });
      
      if (!res.ok) throw new Error('Failed to save document');
    } catch (e) {
      console.error("Failed to save document to Postgres", e);
    }
  };

  const addReview = async (review: Review) => {
    // Optimistic update for reviews
    const newReviews = [...reviews, review];
    setReviews(newReviews);

    // Optimistic update for document rating
    const docReviews = newReviews.filter(r => r.documentId === review.documentId);
    const avgRating = docReviews.reduce((sum, r) => sum + r.rating, 0) / docReviews.length;

    setDocuments(prevDocs => prevDocs.map(doc =>
      doc.id === review.documentId
        ? { ...doc, rating: avgRating, reviewCount: docReviews.length }
        : doc
    ));

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      
      if (!res.ok) throw new Error('Failed to save review');
    } catch (e) {
      console.error("Failed to save review to Postgres", e);
    }
  };

  const addPlatformFeedback = async (feedback: PlatformFeedback) => {
    // Optimistic update
    setPlatformFeedbacks([feedback, ...platformFeedbacks]);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      
      if (!res.ok) throw new Error('Failed to save feedback');
    } catch (e) {
      console.error("Failed to save feedback to Postgres", e);
    }
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
      platformFeedbacks,
      addDocument,
      addReview,
      addPlatformFeedback,
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
