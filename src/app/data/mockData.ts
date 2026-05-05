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
    userName: 'Nguyễn Hoài Phương',
    department: 'Khoa Ngôn ngữ Anh',
    rating: 5,
    comment: 'Tuần trước mình ôn midterm môn Linguistics, search đúng mã học phần trên web là ra luôn bộ đề mấy năm trước + note của anh chị. Bình thường mình phải hỏi từng người hoặc lục group rất mất thời gian. Lần này ôn nhanh hơn hẳn.',
    date: '2024-05-02'
  },
  {
    id: '2',
    userName: 'Đỗ Minh Quân',
    department: 'Khoa Ngôn ngữ Nhật',
    rating: 4,
    comment: 'Mình đã thử upload tài liệu của mình lên, thao tác khá đơn giản. Chỉ cần điền môn + giảng viên là xong. Tuy nhiên lúc tìm lại tài liệu thì mình phải scroll hơi nhiều, nếu có thêm filter theo loại tài liệu thì sẽ tiện hơn.',
    date: '2024-05-01'
  },
  {
    id: '3',
    userName: 'Trần Thu Hà',
    department: 'Khoa Sư phạm Tiếng Anh',
    rating: 5,
    comment: 'Mình hay học theo giảng viên nên phần tìm theo tên thầy cô rất hữu ích. Ví dụ cùng là Writing nhưng mỗi cô dạy một kiểu, nên có tài liệu đúng người dạy giúp mình học đúng hướng hơn.',
    date: '2024-04-30'
  },
  {
    id: '4',
    userName: 'Phạm Đức Anh',
    department: 'Khoa Ngôn ngữ Hàn Quốc',
    rating: 4,
    comment: 'Có hôm mình cần gấp đề cương môn Văn hoá Hàn để chuẩn bị thuyết trình, lên web tìm được ngay bản tóm tắt khá ổn. Chỉ tiếc là chưa có nhiều tài liệu cho môn này, chắc cần thêm người đóng góp.',
    date: '2024-04-29'
  },
  {
    id: '5',
    userName: 'Lê Ngọc Linh',
    department: 'Khoa Ngôn ngữ Trung Quốc',
    rating: 5,
    comment: 'Điểm mình thích là tài liệu có ghi rõ mô tả nên mình biết trước nội dung bên trong, không phải tải về rồi mới biết có phù hợp không. Nhìn chung dùng nhanh, không bị rối.',
    date: '2024-04-28'
  },
  {
    id: '6',
    userName: 'Vũ Thành Nam',
    department: 'Khoa Quốc tế học',
    rating: 4,
    comment: 'Mình dùng trên điện thoại vẫn ổn, load nhanh, không bị lag. Nhưng nếu có thêm mục ‘tài liệu nổi bật’ hoặc ‘được tải nhiều’ thì sẽ dễ chọn hơn khi không biết bắt đầu từ đâu.',
    date: '2024-04-27'
  },
  {
    id: '7',
    userName: 'Nguyễn Khánh Vy',
    department: 'Khoa Ngôn ngữ Pháp',
    rating: 5,
    comment: 'Mình đang làm bài essay môn Civilisation, lên web tìm thử theo tên môn thì thấy có luôn 2 bài mẫu của khóa trên. Đọc để tham khảo cách triển khai ý khá hữu ích, nhất là phần vocab chuyên ngành.',
    date: '2024-04-26'
  },
  {
    id: '8',
    userName: 'Bùi Anh Tuấn',
    department: 'Khoa Ngôn ngữ Trung Quốc',
    rating: 4,
    comment: 'Mình thấy phần upload khá nhanh, không bị lỗi. Nhưng khi tải file về thì chưa thấy preview trước, nên đôi khi phải tải vài file mới chọn được cái phù hợp.',
    date: '2024-04-25'
  },
  {
    id: '9',
    userName: 'Đặng Thuỳ Dương',
    department: 'Khoa Sư phạm Tiếng Anh',
    rating: 5,
    comment: 'Trước khi thi Speaking mình khá hoang mang vì không biết format đề như nào. Tìm trên web thấy có list câu hỏi mẫu theo từng chủ đề, luyện trước nên lúc thi đỡ bị bất ngờ hơn.',
    date: '2024-04-24'
  },
  {
    id: '10',
    userName: 'Lê Quang Huy',
    department: 'Khoa Ngôn ngữ Nhật Bản',
    rating: 4,
    comment: 'Mình dùng thử trên laptop thì ok, nhưng khi mở nhiều tài liệu cùng lúc thì hơi khó quay lại danh sách ban đầu. Nếu có nút quay lại nhanh hoặc breadcrumb thì sẽ tiện hơn.',
    date: '2024-04-23'
  },
  {
    id: '11',
    userName: 'Trần Mai Anh',
    department: 'Khoa Ngôn ngữ Hàn Quốc',
    rating: 5,
    comment: 'Mình thích nhất là không cần phải xin tài liệu từ người quen nữa. Chỉ cần vào web là có sẵn khá nhiều thứ cơ bản để ôn, nhất là mấy môn đại cương.',
    date: '2024-04-22'
  },
  {
    id: '12',
    userName: 'Phùng Đức Long',
    department: 'Khoa Quốc tế học',
    rating: 4,
    comment: 'Search theo mã học phần hoạt động tốt, ra đúng môn mình cần. Nhưng nếu gõ thiếu dấu hoặc sai nhẹ thì chưa ra kết quả, nên có thể cải thiện phần search thông minh hơn.',
    date: '2024-04-21'
  },
  {
    id: '13',
    userName: 'Nguyễn Thảo Linh',
    department: 'Khoa Ngôn ngữ Anh',
    rating: 5,
    comment: 'Mình hay dùng web vào buổi tối trước hôm thi, load vẫn ổn định. Có lần tìm được đúng bộ đề giống format đề thật nên làm quen trước khá hiệu quả.',
    date: '2024-04-20'
  },
  {
    id: '14',
    userName: 'Hoàng Gia Bảo',
    department: 'Khoa Ngôn ngữ Trung Quốc',
    rating: 4,
    comment: 'Tài liệu nhìn chung ổn nhưng có vài file hơi cũ (từ mấy năm trước). Nếu có hiển thị năm cập nhật rõ hơn thì sẽ dễ chọn tài liệu mới hơn.',
    date: '2024-04-19'
  },
  {
    id: '15',
    userName: 'Lý Minh Châu',
    department: 'Khoa Ngôn ngữ Nhật Bản',
    rating: 5,
    comment: 'Mình thấy phần mô tả tài liệu khá hữu ích, nhất là khi có ghi rõ ‘đề thi cuối kỳ’ hay ‘note tóm tắt’. Đỡ mất thời gian tải nhầm file không cần thiết.',
    date: '2024-04-18'
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
