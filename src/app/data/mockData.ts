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

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Bài giảng Ngữ pháp Tiếng Anh - Unit 1-5',
    subject: 'Ngữ pháp Tiếng Anh',
    subjectCode: 'ENG101',
    teacher: 'TS. Nguyễn Thị Mai',
    category: 'ngon-ngu',
    description: 'Tài liệu tổng hợp ngữ pháp cơ bản Unit 1-5, bao gồm thì hiện tại đơn, hiện tại tiếp diễn, quá khứ đơn. Có bài tập kèm theo.',
    fileType: 'pdf',
    uploadDate: '2026-04-15',
    rating: 4.8,
    reviewCount: 45,
    verified: true,
    downloads: 234
  },
  {
    id: '2',
    title: 'Giáo trình Kinh tế vi mô - Chương 1-3',
    subject: 'Kinh tế vi mô',
    subjectCode: 'ECO201',
    teacher: 'PGS.TS. Trần Văn Hùng',
    category: 'dai-cuong',
    description: 'Tài liệu bao gồm lý thuyết cung cầu, đàn hồi, và hành vi người tiêu dùng. Kèm bài tập thực hành có lời giải chi tiết.',
    fileType: 'pdf',
    uploadDate: '2026-04-18',
    rating: 4.9,
    reviewCount: 67,
    verified: true,
    downloads: 456
  },
  {
    id: '3',
    title: 'Slide Phiên dịch Tiếng Trung - Phần cơ bản',
    subject: 'Phiên dịch Tiếng Trung',
    subjectCode: 'CHI301',
    teacher: 'ThS. Lê Thị Hương',
    category: 'chuyen-nganh',
    description: 'Slide tổng hợp kỹ thuật phiên dịch cơ bản, từ vựng chuyên ngành thương mại và ngoại giao.',
    fileType: 'pdf',
    uploadDate: '2026-04-10',
    rating: 4.6,
    reviewCount: 28,
    verified: true,
    downloads: 189
  },
  {
    id: '4',
    title: 'Đề cương ôn tập Văn học Anh Mỹ',
    subject: 'Văn học Anh Mỹ',
    subjectCode: 'LIT202',
    teacher: 'TS. Phạm Minh Tuấn',
    category: 'chuyen-nganh',
    description: 'Tổng hợp các tác phẩm văn học Anh Mỹ thế kỷ 19-20, phân tích nhân vật, chủ đề, và văn phong.',
    fileType: 'word',
    uploadDate: '2026-04-20',
    rating: 4.7,
    reviewCount: 52,
    verified: true,
    downloads: 312
  },
  {
    id: '5',
    title: 'Bài tập Nghe Hiểu Tiếng Nhật N3',
    subject: 'Nghe Hiểu Tiếng Nhật',
    subjectCode: 'JPN203',
    teacher: 'ThS. Hoàng Thu Thảo',
    category: 'ngon-ngu',
    description: 'Bộ bài tập nghe hiểu level N3, có transcript và file audio đi kèm. Phù hợp cho kỳ thi năng lực Nhật ngữ.',
    fileType: 'link',
    fileUrl: 'https://drive.google.com/example',
    uploadDate: '2026-04-12',
    rating: 4.5,
    reviewCount: 34,
    verified: false,
    downloads: 198
  },
  {
    id: '6',
    title: 'Giáo trình Tin học văn phòng',
    subject: 'Tin học văn phòng',
    subjectCode: 'IT101',
    teacher: 'ThS. Đặng Quốc Khánh',
    category: 'dai-cuong',
    description: 'Hướng dẫn sử dụng Word, Excel, PowerPoint trong công việc văn phòng. Có video demo kèm theo.',
    fileType: 'pdf',
    uploadDate: '2026-04-08',
    rating: 4.4,
    reviewCount: 89,
    verified: true,
    downloads: 567
  },
  {
    id: '7',
    title: 'Từ vựng Tiếng Hàn Sơ cấp 1',
    subject: 'Tiếng Hàn Sơ cấp',
    subjectCode: 'KOR101',
    teacher: 'ThS. Kim Min Joo',
    category: 'ngon-ngu',
    description: 'Bộ từ vựng sơ cấp 1 theo giáo trình Sejong, có phiên âm và ví dụ minh họa.',
    fileType: 'pdf',
    uploadDate: '2026-04-16',
    rating: 4.9,
    reviewCount: 78,
    verified: true,
    downloads: 423
  },
  {
    id: '8',
    title: 'Chuyên đề Giao tiếp Đàm phán',
    subject: 'Giao tiếp Đàm phán',
    subjectCode: 'COM301',
    teacher: 'PGS. Vũ Thị Lan',
    category: 'chuyen-nganh',
    description: 'Kỹ năng giao tiếp trong đàm phán thương mại, case study thực tế từ các công ty đa quốc gia.',
    fileType: 'pdf',
    uploadDate: '2026-04-19',
    rating: 4.8,
    reviewCount: 41,
    verified: true,
    downloads: 276
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    documentId: '1',
    userName: 'Nguyễn Văn A',
    rating: 5,
    comment: 'Tài liệu rất chi tiết và dễ hiểu, giúp mình ôn thi hiệu quả!',
    date: '2026-04-17'
  },
  {
    id: 'r2',
    documentId: '1',
    userName: 'Trần Thị B',
    rating: 4,
    comment: 'Nội dung tốt nhưng thiếu một số bài tập nâng cao.',
    date: '2026-04-18'
  },
  {
    id: 'r3',
    documentId: '2',
    userName: 'Lê Văn C',
    rating: 5,
    comment: 'Bài giảng của thầy Hùng rất hay, tài liệu này tóm tắt đầy đủ!',
    date: '2026-04-19'
  }
];

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
