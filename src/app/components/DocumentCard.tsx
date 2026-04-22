import { Star, Download, FileText, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Document } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const navigate = useNavigate();

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-700';
      case 'word': return 'bg-blue-100 text-blue-700';
      case 'link': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate(`/document/${document.id}`)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
              {document.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{document.subjectCode}</p>
          </div>
          {document.verified && (
            <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {getCategoryName(document.category)}
          </Badge>
          <Badge className={`text-xs ${getFileTypeColor(document.fileType)}`}>
            {document.fileType.toUpperCase()}
          </Badge>
        </div>

        <p className="text-sm text-gray-700 line-clamp-2">
          {document.description}
        </p>

        <div className="text-xs text-gray-600">
          <FileText className="h-3 w-3 inline mr-1" />
          {document.teacher}
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{document.rating.toFixed(1)}</span>
            <span>({document.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>{document.downloads}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/document/${document.id}`);
          }}
        >
          Xem chi tiết
        </Button>
      </CardFooter>
    </Card>
  );
}
