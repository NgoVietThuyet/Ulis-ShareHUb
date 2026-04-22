import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { DocumentCard } from '../components/DocumentCard';
import { useDocuments } from '../contexts/DocumentContext';
import { categories, subjects, teachers } from '../data/mockData';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';

export function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { documents, searchDocuments, filterDocuments } = useDocuments();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const [filteredDocs, setFilteredDocs] = useState(documents);

  useEffect(() => {
    let results = documents;

    // Search query
    if (searchQuery.trim()) {
      results = searchDocuments(searchQuery);
    }

    // Apply filters
    if (selectedCategory || selectedSubjects.length > 0 || selectedTeachers.length > 0 || showVerifiedOnly) {
      results = results.filter(doc => {
        if (selectedCategory && doc.category !== selectedCategory) return false;
        if (selectedSubjects.length > 0 && !selectedSubjects.includes(doc.subject)) return false;
        if (selectedTeachers.length > 0 && !selectedTeachers.includes(doc.teacher)) return false;
        if (showVerifiedOnly && !doc.verified) return false;
        return true;
      });
    }

    setFilteredDocs(results);
  }, [searchQuery, selectedCategory, selectedSubjects, selectedTeachers, showVerifiedOnly, documents]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSubjects([]);
    setSelectedTeachers([]);
    setShowVerifiedOnly(false);
    setSearchQuery('');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory || selectedSubjects.length > 0 || selectedTeachers.length > 0 || showVerifiedOnly;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên tài liệu, môn học, mã học phần..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Lọc
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="w-72 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Bộ lọc</h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Xóa
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <Label className="mb-3 block font-medium">Khối</Label>
                    <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="" id="all" />
                        <Label htmlFor="all" className="cursor-pointer font-normal">Tất cả</Label>
                      </div>
                      {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value={cat.id} id={cat.id} />
                          <Label htmlFor={cat.id} className="cursor-pointer font-normal">{cat.name}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Subject Filter */}
                  <div>
                    <Label className="mb-3 block font-medium">Môn học</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {subjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={subject}
                            checked={selectedSubjects.includes(subject)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSubjects([...selectedSubjects, subject]);
                              } else {
                                setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
                              }
                            }}
                          />
                          <Label htmlFor={subject} className="cursor-pointer text-sm font-normal">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Teacher Filter */}
                  <div>
                    <Label className="mb-3 block font-medium">Giảng viên</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {teachers.map((teacher) => (
                        <div key={teacher} className="flex items-center space-x-2">
                          <Checkbox
                            id={teacher}
                            checked={selectedTeachers.includes(teacher)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTeachers([...selectedTeachers, teacher]);
                              } else {
                                setSelectedTeachers(selectedTeachers.filter(t => t !== teacher));
                              }
                            }}
                          />
                          <Label htmlFor={teacher} className="cursor-pointer text-sm font-normal">
                            {teacher}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified Only */}
                  <div className="flex items-center space-x-2 pt-4 border-t">
                    <Checkbox
                      id="verified"
                      checked={showVerifiedOnly}
                      onCheckedChange={(checked) => setShowVerifiedOnly(checked as boolean)}
                    />
                    <Label htmlFor="verified" className="cursor-pointer font-normal">
                      Chỉ hiển thị tài liệu đã kiểm định
                    </Label>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Documents Grid */}
          <main className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">
                Tìm thấy <span className="font-semibold">{filteredDocs.length}</span> tài liệu
              </p>
            </div>

            {filteredDocs.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Không tìm thấy tài liệu</h3>
                <p className="text-gray-600 mb-4">Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters}>Xóa bộ lọc</Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocs.map((doc) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
