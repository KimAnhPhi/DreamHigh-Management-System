import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../design-system/components/layout/AppLayout';
import { PageHeader } from '../../design-system/components/layout/PageHeader';
import { Button } from '../../design-system/components/ui/Button';

/** Hub lớp học — chờ API danh sách lớp; liên kết Sidebar /dashboard module. */
const ClassesHubPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <PageHeader
        breadcrumb={[
          { label: 'Hệ thống', href: '#' },
          { label: 'Lớp học' },
        ]}
        title="Lớp học"
      />
      <div className="max-w-lg rounded-xl border border-midnight/10 bg-surface p-8 shadow-sm">
        <p className="font-body text-midnight/60">
          Danh sách lớp và lịch học đang được tích hợp. Bạn có thể mở chi tiết một lớp qua đường dẫn có mã lớp.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={() => navigate('/classes/schedule')}>
            Lịch &amp; lớp (điều phối)
          </Button>
          <Button variant="secondary" type="button" onClick={() => navigate('/dashboard')}>
            Về Dashboard
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ClassesHubPage;
