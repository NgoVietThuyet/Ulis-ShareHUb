import { useState } from 'react';
import { Search, BookOpen, Shield, Zap, TrendingUp, Star, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { DocumentCard } from '../components/DocumentCard';
import { useDocuments } from '../contexts/DocumentContext';
import { useNavigate } from 'react-router-dom';
import { mockPlatformFeedbacks } from '../data/mockData';

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { documents, platformFeedbacks } = useDocuments();
  const navigate = useNavigate();

  const featuredDocs = documents.slice(0, 6);
  const featuredFeedbacks = platformFeedbacks.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Chia sẻ tri thức, Cùng nhau phát triển
          </h1>
          <p className="text-lg md:text-xl mb-10 text-blue-100">
            Nền tảng chia sẻ tài liệu học tập chất lượng cao dành riêng cho sinh viên ULIS
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm môn học, mã học phần, giảng viên..."
                  className="pl-10 h-12 text-gray-900 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Tìm kiếm
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Intro Video Section */}
      <section className="py-12 px-4 -mt-10 relative z-20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-2 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-inner">
              <iframe
                src="https://drive.google.com/file/d/1c_sKPFb03EfeUSDm5LXM5HXQfH3qz4Hb/preview"
                className="w-full h-full border-none"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Giới thiệu ShareHub"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tại sao chọn ShareHub?</h2>
            <p className="text-gray-600">Nền tảng chia sẻ tài liệu đáng tin cậy nhất cho sinh viên ULIS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Tài liệu đã kiểm định</h3>
              <p className="text-sm text-gray-600">
                Mọi tài liệu đều được Admin xác thực chất lượng, đảm bảo không có nội dung rác
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Tìm kiếm nhanh chóng</h3>
              <p className="text-sm text-gray-600">
                Hệ thống lọc thông minh giúp bạn tìm đúng tài liệu cần thiết chỉ trong vài giây
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Đánh giá từ sinh viên</h3>
              <p className="text-sm text-gray-600">
                Hệ thống rating và phản hồi giúp bạn chọn được tài liệu chất lượng nhất
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Documents */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Tài liệu nổi bật</h2>
              <p className="text-gray-600">Tài liệu được đánh giá cao và đã qua kiểm định</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/browse')}>
              Xem tất cả
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDocs.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Sinh viên nói gì về ShareHub?</h2>
              <p className="text-gray-600">Những chia sẻ thật lòng từ những người bạn đồng hành</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/feedback')}>
              Xem tất cả phản hồi
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredFeedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center text-blue-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{feedback.userName}</h4>
                    <p className="text-xs text-gray-500">{feedback.department}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic flex-1">
                  "{feedback.comment.length > 120 ? feedback.comment.substring(0, 120) + '...' : feedback.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Bạn có tài liệu hữu ích?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Chia sẻ tài liệu của bạn với hàng nghìn sinh viên ULIS khác
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50"
            onClick={() => navigate('/upload')}
          >
            Đăng tải tài liệu ngay
          </Button>
        </div>
      </section>
    </div>
  );
}
