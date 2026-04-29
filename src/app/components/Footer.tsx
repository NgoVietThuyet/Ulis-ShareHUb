import { Mail, Phone, MapPin, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">ULIS ShareHub</span>
            </div>
            <p className="text-sm text-gray-400">
              Nền tảng chia sẻ tài liệu học tập chất lượng cao dành cho sinh viên Đại học Ngoại Ngữ - ĐHQGHN
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Thông tin liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-400">Địa điểm thực hiện dự án:</p>
                  <p>Trường ĐHNN - ĐHQG Hà Nội</p>
                  <p className="mt-1">Số 2, Phạm Văn Đồng, Cầu Giấy, Hà Nội</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-blue-400/10 p-1 rounded h-4 w-4 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[10px] font-bold text-blue-400">G107</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-blue-400">Đơn vị thực hiện:</p>
                  <p>Nhóm 107</p>
                  <p className="text-xs text-gray-400">Người liên lạc: Đinh Phương Thu (Trưởng nhóm)</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <a href="mailto:pngthu5775@gmail.com" className="text-sm hover:text-blue-400 transition-colors">pngthu5775@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <a href="tel:0842181368" className="text-sm hover:text-blue-400 transition-colors">0842181368</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm hover:text-blue-400 transition-colors">Trang chủ</a>
              </li>
              <li>
                <a href="/browse" className="text-sm hover:text-blue-400 transition-colors">Tìm kiếm tài liệu</a>
              </li>
              <li>
                <a href="/upload" className="text-sm hover:text-blue-400 transition-colors">Đăng tải tài liệu</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 ULIS ShareHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
