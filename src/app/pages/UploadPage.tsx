import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, FileText, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Progress } from '../components/ui/progress';
import { useDocuments } from '../contexts/DocumentContext';
import { categories, subjects, teachers } from '../data/mockData';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { upload } from '@vercel/blob/client';

const uploadSchema = z.object({
  title: z.string().min(5, 'Tên tài liệu phải có ít nhất 5 ký tự'),
  subject: z.string().min(1, 'Vui lòng chọn môn học'),
  subjectCode: z.string().min(3, 'Mã học phần phải có ít nhất 3 ký tự'),
  teacher: z.string().min(1, 'Vui lòng chọn giảng viên'),
  category: z.enum(['dai-cuong', 'ngon-ngu', 'chuyen-nganh'], {
    required_error: 'Vui lòng chọn khối'
  }),
  description: z.string().min(20, 'Mô tả phải có ít nhất 20 ký tự'),
  uploadType: z.enum(['file', 'link']),
  link: z.string().url('Link không hợp lệ').optional().or(z.literal('')),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export function UploadPage() {
  const navigate = useNavigate();
  const { addDocument } = useDocuments();
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      uploadType: 'file'
    }
  });

  const selectedCategory = watch('category');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === 'application/pdf' ||
        fileType === 'application/msword' ||
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        setSelectedFile(file);
      } else {
        toast.error('Chỉ chấp nhận file PDF hoặc Word');
        e.target.value = '';
      }
    }
  };

  const onSubmit = async (data: UploadFormData) => {
    if (uploadType === 'file' && !selectedFile) {
      toast.error('Vui lòng chọn file để tải lên');
      return;
    }

    if (uploadType === 'link' && !data.link) {
      toast.error('Vui lòng nhập link tài liệu');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      let fileUrl = uploadType === 'link' ? data.link : undefined;
      
      if (uploadType === 'file' && selectedFile) {
        // Upload to Vercel Blob via secure client-side upload
        const blob = await upload(selectedFile.name, selectedFile, {
          access: 'public',
          handleUploadUrl: '/api/upload',
          onUploadProgress: (progressEvent) => {
            setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }
        });
        
        fileUrl = blob.url;
      }

      const newDoc = {
        id: `doc${Date.now()}`,
        title: data.title,
        subject: data.subject,
        subjectCode: data.subjectCode,
        teacher: data.teacher,
        category: data.category,
        description: data.description,
        fileType: uploadType === 'file' ? (selectedFile?.type.includes('pdf') ? 'pdf' : 'word') : 'link',
        fileUrl,
        uploadDate: new Date().toISOString().split('T')[0],
        rating: 0,
        reviewCount: 0,
        verified: false,
        downloads: 0
      };

      addDocument(newDoc as any);

      toast.success('Tài liệu đã được tải lên thành công! Đang chờ Admin kiểm định.');
      setTimeout(() => {
        navigate('/browse');
      }, 1500);
      
    } catch (error) {
      console.error("Upload error:", error);
      toast.error('Có lỗi xảy ra khi tải lên tài liệu. Vui lòng thử lại.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Đăng tải tài liệu</h1>
            <p className="text-gray-600 mt-2">
              Chia sẻ tài liệu của bạn với cộng đồng sinh viên ULIS
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Upload Type */}
              <div>
                <Label className="mb-3 block">Loại tài liệu</Label>
                <RadioGroup
                  value={uploadType}
                  onValueChange={(value) => {
                    setUploadType(value as 'file' | 'link');
                    setValue('uploadType', value as 'file' | 'link');
                  }}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="file" id="file" />
                    <Label htmlFor="file" className="cursor-pointer font-normal">
                      <FileText className="h-4 w-4 inline mr-1" />
                      Tải file lên
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="link" id="link" />
                    <Label htmlFor="link" className="cursor-pointer font-normal">
                      <LinkIcon className="h-4 w-4 inline mr-1" />
                      Link bên ngoài
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* File Upload or Link Input */}
              {uploadType === 'file' ? (
                <div>
                  <Label htmlFor="file-upload">Chọn file (PDF hoặc Word)</Label>
                  <Label 
                    htmlFor="file-upload" 
                    className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mb-3" />
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {selectedFile ? (
                      <div className="text-center">
                        <p className="font-medium text-blue-600">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="font-medium">Nhấn để chọn file</p>
                        <p className="text-sm text-gray-500 mt-1">PDF hoặc Word, tối đa 50MB</p>
                      </div>
                    )}
                  </Label>
                </div>
              ) : (
                <div>
                  <Label htmlFor="link">Link tài liệu</Label>
                  <Input
                    id="link"
                    type="url"
                    placeholder="https://drive.google.com/..."
                    {...register('link')}
                    className="mt-2"
                  />
                  {errors.link && (
                    <p className="text-sm text-red-600 mt-1">{errors.link.message}</p>
                  )}
                </div>
              )}

              {/* Title */}
              <div>
                <Label htmlFor="title">Tên tài liệu *</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Ví dụ: Bài giảng Ngữ pháp Tiếng Anh - Unit 1-5"
                  className="mt-2"
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label className="mb-3 block">Khối *</Label>
                <RadioGroup
                  onValueChange={(value) => setValue('category', value as any)}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  value={selectedCategory}
                >
                  {categories.map((cat) => (
                    <Label
                      key={cat.id}
                      htmlFor={`cat-${cat.id}`}
                      className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedCategory === cat.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <RadioGroupItem value={cat.id} id={`cat-${cat.id}`} />
                      <span className="font-normal text-sm">{cat.name}</span>
                    </Label>
                  ))}
                </RadioGroup>
                {errors.category && (
                  <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
                )}
              </div>

              {/* Subject and Subject Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Môn học *</Label>
                  <select
                    id="subject"
                    {...register('subject')}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors mt-2"
                  >
                    <option value="">Chọn môn học</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subjectCode">Mã học phần *</Label>
                  <Input
                    id="subjectCode"
                    {...register('subjectCode')}
                    placeholder="Ví dụ: ENG101"
                    className="mt-2"
                  />
                  {errors.subjectCode && (
                    <p className="text-sm text-red-600 mt-1">{errors.subjectCode.message}</p>
                  )}
                </div>
              </div>

              {/* Teacher */}
              <div>
                <Label htmlFor="teacher">Giảng viên *</Label>
                <select
                  id="teacher"
                  {...register('teacher')}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors mt-2"
                >
                  <option value="">Chọn giảng viên</option>
                  {teachers.map((teacher) => (
                    <option key={teacher} value={teacher}>{teacher}</option>
                  ))}
                </select>
                {errors.teacher && (
                  <p className="text-sm text-red-600 mt-1">{errors.teacher.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Mô tả tài liệu (tối thiểu 20 ký tự) *</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Mô tả nội dung, phạm vi và công dụng của tài liệu..."
                  rows={5}
                  className="mt-2"
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div>
                  <Label>Đang tải lên...</Label>
                  <Progress value={uploadProgress} className="mt-2" />
                  <p className="text-sm text-gray-600 mt-1">{uploadProgress}%</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={uploading}
              >
                {uploading ? 'Đang tải lên...' : 'Đăng tải tài liệu'}
              </Button>

              <p className="text-sm text-gray-600 text-center">
                Tài liệu sẽ được Admin kiểm duyệt trước khi hiển thị công khai
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
