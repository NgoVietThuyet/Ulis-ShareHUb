import { useState } from 'react';
import { Star, Send, User, MessageSquare, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { PlatformFeedback } from '../data/mockData';
import { toast } from 'sonner';
import { useDocuments } from '../contexts/DocumentContext';

export function FeedbackPage() {
  const { platformFeedbacks, addPlatformFeedback } = useDocuments();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      toast.error('Vui lòng điền đầy đủ họ tên và nhận xét');
      return;
    }

    const newFeedback: PlatformFeedback = {
      id: Date.now().toString(),
      userName: name,
      department: department || 'Sinh viên ULIS',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    addPlatformFeedback(newFeedback);
    setName('');
    setDepartment('');
    setComment('');
    setRating(5);
    toast.success('Cảm ơn bạn đã gửi phản hồi!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Phản hồi từ người dùng</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng mình luôn lắng nghe ý kiến đóng góp của các bạn để hoàn thiện ShareHub mỗi ngày.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Feedback Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Gửi phản hồi của bạn</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                  <Input 
                    placeholder="Nhập tên của bạn..." 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Khoa / Đơn vị</label>
                  <Input 
                    placeholder="VD: Khoa Ngôn ngữ Anh..." 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-transform active:scale-90"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= (hoverRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nhận xét của bạn</label>
                  <Textarea 
                    placeholder="Chia sẻ trải nghiệm của bạn về ShareHub..." 
                    className="min-h-[120px]"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                  <Send className="mr-2 h-5 w-5" /> Gửi phản hồi
                </Button>
              </form>
            </div>
          </div>

          {/* Feedback List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {platformFeedbacks.map((feedback) => (
                <div 
                  key={feedback.id} 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-12 w-12 rounded-full flex items-center justify-center text-white shadow-md">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {feedback.userName}
                        </h3>
                        <p className="text-sm text-gray-500">{feedback.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-0.5 mb-1 justify-end">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{feedback.date}</span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute -left-2 -top-2 h-8 w-8 text-blue-50/50 -z-0" />
                    <p className="text-gray-700 leading-relaxed relative z-10 italic">
                      "{feedback.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
