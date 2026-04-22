import { createContext, useContext, useState, ReactNode } from 'react';
import { Document, mockDocuments, mockReviews, Review } from '../data/mockData';

interface DocumentContextType {
  documents: Document[];
  reviews: Review[];
  uploadedFiles: Map<string, File>;
  addDocument: (doc: Document, file?: File) => void;
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
  const [uploadedFiles] = useState<Map<string, File>>(new Map());

  const addDocument = (doc: Document, file?: File) => {
    setDocuments(prev => [doc, ...prev]);
    if (file) {
      uploadedFiles.set(doc.id, file);
    }
  };

  const addReview = (review: Review) => {
    setReviews(prev => [...prev, review]);

    // Update document rating
    const docReviews = [...reviews, review].filter(r => r.documentId === review.documentId);
    const avgRating = docReviews.reduce((sum, r) => sum + r.rating, 0) / docReviews.length;

    setDocuments(prev => prev.map(doc =>
      doc.id === review.documentId
        ? { ...doc, rating: avgRating, reviewCount: docReviews.length }
        : doc
    ));
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
      uploadedFiles,
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
