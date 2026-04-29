export interface Document {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  teacher: string;
  category: 'dai-cuong' | 'ngon-ngu' | 'chuyen-nganh';
  description: string;
  fileType: 'pdf' | 'word' | 'link';
  fileUrl?: string;
  uploadDate: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  thumbnail?: string;
  downloads: number;
}

export interface Review {
  id: string;
  documentId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const mockDocuments: Document[] = [];

export const mockReviews: Review[] = [];

export const categories = [
  { id: 'dai-cuong', name: 'Đại cương', description: 'Các môn học chung' },
  { id: 'ngon-ngu', name: 'Ngôn ngữ', description: 'Tiếng Anh, Trung, Nhật, Hàn, Pháp...' },
  { id: 'chuyen-nganh', name: 'Chuyên ngành', description: 'Văn học, Ngôn ngữ học, Phiên dịch...' }
];

export const subjects = [
  'Ngữ pháp Tiếng Anh',
  'Kinh tế vi mô',
  'Phiên dịch Tiếng Trung',
  'Văn học Anh Mỹ',
  'Nghe Hiểu Tiếng Nhật',
  'Tin học văn phòng',
  'Tiếng Hàn Sơ cấp',
  'Giao tiếp Đàm phán'
];

export const teachers = [
  'TS. Nguyễn Thị Mai',
  'PGS.TS. Trần Văn Hùng',
  'ThS. Lê Thị Hương',
  'TS. Phạm Minh Tuấn',
  'ThS. Hoàng Thu Thảo',
  'ThS. Đặng Quốc Khánh',
  'ThS. Kim Min Joo',
  'PGS. Vũ Thị Lan'
];
