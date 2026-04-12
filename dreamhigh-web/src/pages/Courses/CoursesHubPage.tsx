import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../design-system/components/layout/AppLayout';
import { PageHeader } from '../../design-system/components/layout/PageHeader';
import { Button } from '../../design-system/components/ui/Button';
import type { CurriculumUnit } from '../../types/curriculum';
import AddUnitModal from './AddUnitModal';

/** Hub khóa học / chương trình — chờ tích hợp syllabus và lộ trình đào tạo. */
const CoursesHubPage: React.FC = () => {
  const navigate = useNavigate();
  const [unitModalOpen, setUnitModalOpen] = useState(false);
  const [units, setUnits] = useState<CurriculumUnit[]>([]);

  const handleSaveUnit = (unit: CurriculumUnit) => {
    setUnits((prev) => [...prev, unit]);
    setUnitModalOpen(false);
  };

  return (
    <AppLayout>
      <PageHeader
        breadcrumb={[
          { label: 'Hệ thống', href: '#' },
          { label: 'Khóa học' },
        ]}
        title="Chương trình & khóa học"
      />
      <div className="max-w-lg rounded-xl border border-midnight/10 bg-surface p-8 shadow-sm">
        <p className="font-body text-midnight/60">
          Thiết kế syllabus và quản lý khóa học đang được nối API. Bạn có thể quản lý danh mục chương trình trong mục Danh mục.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={() => setUnitModalOpen(true)} className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">add</span>
            Thêm Unit
          </Button>
          <Button variant="secondary" type="button" onClick={() => navigate('/courses/curriculum')}>
            Quản lý Syllabus
          </Button>
          <Button variant="secondary" type="button" onClick={() => navigate('/admin/categories')}>
            Mở Danh mục
          </Button>
          <Button variant="ghost" type="button" onClick={() => navigate('/dashboard')}>
            Về Dashboard
          </Button>
        </div>
        {units.length > 0 && (
          <ul className="mt-8 space-y-2 border-t border-midnight/10 pt-6 font-body text-sm text-midnight/80">
            {units.map((u) => (
              <li key={u.id} className="rounded-lg border border-midnight/5 bg-bg px-4 py-3">
                <span className="font-semibold text-midnight">{u.name}</span>
                <span className="mt-1 block text-xs text-midnight/50">{u.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AddUnitModal
        isOpen={unitModalOpen}
        onClose={() => setUnitModalOpen(false)}
        onSave={handleSaveUnit}
      />
    </AppLayout>
  );
};

export default CoursesHubPage;
