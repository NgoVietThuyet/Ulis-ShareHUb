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

export interface PlatformFeedback {
  id: string;
  userName: string;
  department: string;
  rating: number;
  comment: string;
  date: string;
}

export const mockDocuments: Document[] = [];

export const mockReviews: Review[] = [];

export const mockPlatformFeedbacks: PlatformFeedback[] = [
  {
    id: '1',
    userName: 'Bùi Anh Tuấn',
    department: 'Khoa Ngôn ngữ Trung Quốc',
    rating: 4,
    comment: 'Mình thấy phần upload khá nhanh, không bị lỗi. Nhưng khi tải file về thì chưa thấy preview trước, nên đôi khi phải tải vài file mới chọn được cái phù hợp.',
    date: '2024-05-01'
  },
  {
    id: '2',
    userName: 'Đặng Thuỳ Dương',
    department: 'Khoa Sư phạm Tiếng Anh',
    rating: 5,
    comment: 'Trước khi thi Speaking mình khá hoang mang vì không biết format đề như nào. Tìm trên web thấy có list câu hỏi mẫu theo từng chủ đề, luyện trước nên lúc thi đỡ bị bất ngờ hơn.',
    date: '2024-04-28'
  },
  {
    id: '3',
    userName: 'Lê Quang Huy',
    department: 'Khoa Ngôn ngữ Nhật Bản',
    rating: 4,
    comment: 'Mình dùng thử trên laptop thì ok, nhưng khi mở nhiều tài liệu cùng lúc thì hơi khó quay lại danh sách ban đầu. Nếu có nút quay lại nhanh hoặc breadcrumb thì sẽ tiện hơn.',
    date: '2024-04-25'
  },
  {
    id: '4',
    userName: 'Trần Mai Anh',
    department: 'Khoa Ngôn ngữ Hàn Quốc',
    rating: 5,
    comment: 'Mình thích nhất là không cần phải xin tài liệu từ người quen nữa. Chỉ cần vào web là có sẵn khá nhiều thứ cơ bản để ôn, nhất là mấy môn đại cương.',
    date: '2024-04-20'
  },
  {
    id: '5',
    userName: 'Phùng Đức Long',
    department: 'Khoa Quốc tế học',
    rating: 4,
    comment: 'Search theo mã học phần hoạt động tốt, ra đúng môn mình cần. Nhưng nếu gõ thiếu dấu hoặc sai nhẹ thì chưa ra kết quả, nên có thể cải thiện phần search thông minh hơn.',
    date: '2024-04-15'
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
