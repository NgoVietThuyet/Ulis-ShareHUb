import { Link, useNavigate } from 'react-router-dom';
import { Search, Upload, BookOpen, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-blue-700">ULIS ShareHub</span>
            <span className="text-xs text-gray-600 hidden sm:block">Sharing for Learning</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/browse')}
            className="hidden sm:flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Tìm kiếm
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/feedback')}
            className="hidden sm:flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Phản hồi
          </Button>

          <Button
            onClick={() => navigate('/upload')}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Đăng tải</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
