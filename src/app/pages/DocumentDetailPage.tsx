import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Download, FileText, Calendar, CheckCircle2, Flag, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useDocuments } from '../contexts/DocumentContext';
import { toast } from 'sonner';

export function DocumentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDocumentById, getReviewsByDocumentId, addReview } = useDocuments();

  const document = getDocumentById(id || '');
  const reviews = getReviewsByDocumentId(id || '');

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy tài liệu</h2>
          <Button onClick={() => navigate('/browse')}>Quay lại trang tìm kiếm</Button>
        </div>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Vui lòng chọn số sao đánh giá');
      return;
    }
    if (comment.trim().length < 10) {
      toast.error('Nhận xét phải có ít nhất 10 ký tự');
      return;
    }

    addReview({
      id: `r${Date.now()}`,
      documentId: document.id,
      userName: 'Sinh viên ULIS',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    });

    toast.success('Đánh giá của bạn đã được gửi!');
    setRating(0);
    setComment('');
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'dai-cuong': return 'Đại cương';
      case 'ngon-ngu': return 'Ngôn ngữ';
      case 'chuyen-nganh': return 'Chuyên ngành';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{document.title}</h1>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">{getCategoryName(document.category)}</Badge>
                      <Badge className={document.fileType === 'pdf' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}>
                        {document.fileType.toUpperCase()}
                      </Badge>
                      {document.verified && (
                        <Badge className="bg-blue-600 text-white flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Đã kiểm định
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Preview */}
                <div className="bg-gray-100 rounded-lg p-12 text-center">
                  <FileText className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Xem trước tài liệu</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {document.fileType === 'link' ? 'Tài liệu liên kết ngoài' : 'PDF/Word Preview'}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Mô tả</h3>
                  <p className="text-gray-700 leading-relaxed">{document.description}</p>
                </div>

                {/* Reviews */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Đánh giá từ sinh viên</h3>

                  {reviews.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">Chưa có đánh giá nào</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-medium">{review.userName}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Review Form */}
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-lg">Viết đánh giá của bạn</h3>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <Label>Đánh giá</Label>
                        <div className="flex items-center gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-8 w-8 cursor-pointer transition-colors ${
                                star <= (hoveredStar || rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredStar(star)}
                              onMouseLeave={() => setHoveredStar(0)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="comment">Nhận xét (tối thiểu 10 ký tự)</Label>
                        <Textarea
                          id="comment"
                          placeholder="Chia sẻ ý kiến của bạn về tài liệu này..."
                          rows={4}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Gửi đánh giá
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-lg">Thông tin tài liệu</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-600">Môn học</Label>
                  <p className="font-medium mt-1">{document.subject}</p>
                </div>

                <div>
                  <Label className="text-gray-600">Mã học phần</Label>
                  <p className="font-medium mt-1">{document.subjectCode}</p>
                </div>

                <div>
                  <Label className="text-gray-600">Giảng viên</Label>
                  <p className="font-medium mt-1">{document.teacher}</p>
                </div>

                <div>
                  <Label className="text-gray-600">Ngày đăng tải</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(document.uploadDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-600">Đánh giá</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{document.rating.toFixed(1)}</span>
                    <span className="text-gray-600">({document.reviewCount} đánh giá)</span>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-600">Lượt tải</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Download className="h-4 w-4 text-gray-500" />
                    <span>{document.downloads}</span>
                  </div>
                </div>

                {document.fileUrl ? (
                  <a href={document.fileUrl} target="_blank" rel="noopener noreferrer" className="block w-full mt-6" download>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      {document.fileType === 'link' ? 'Mở liên kết' : 'Tải xuống'}
                    </Button>
                  </a>
                ) : (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-6" disabled>
                    <Download className="h-4 w-4 mr-2" />
                    Không có file đính kèm
                  </Button>
                )}

                <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Flag className="h-4 w-4 mr-2" />
                  Báo cáo tài liệu
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
