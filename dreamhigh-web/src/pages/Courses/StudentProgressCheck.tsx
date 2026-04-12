import React, { useMemo, useState } from 'react';
import { PlayCircle, Plus } from 'lucide-react';
import { Card } from '../../design-system/components/ui/Card';
import type { CurriculumUnit } from '../../types/curriculum';
import type { CourseRosterStudent, SyllabusCurriculum } from '../../types/course';
import type { StudentUnitProgress } from '../../types/unitProgress';
import { getIcon } from '../Admin/system/adminSystemIcons';
import AddUnitModal from './AddUnitModal';
import ProgressDetailModal from './ProgressDetailModal';

interface StudentProgressCheckProps {
  students: CourseRosterStudent[];
  syllabus: SyllabusCurriculum;
}

const defaultUnits = (syllabus: SyllabusCurriculum): CurriculumUnit[] =>
  syllabus.units?.length
    ? syllabus.units
    : [
        {
          id: 'u-placeholder',
          name: 'Unit 1',
          description: 'Thêm unit vào syllabus hoặc bấm Thêm unit.',
        },
      ];

const StudentProgressCheck: React.FC<StudentProgressCheckProps> = ({ students, syllabus }) => {
  const seedUnits = useMemo(() => defaultUnits(syllabus), [syllabus]);
  const [localUnits, setLocalUnits] = useState<CurriculumUnit[]>(seedUnits);
  const [selectedUnit, setSelectedUnit] = useState<CurriculumUnit>(() => seedUnits[0]);
  const [progressData, setProgressData] = useState<StudentUnitProgress[]>([]);
  const [evaluatingStudent, setEvaluatingStudent] = useState<CourseRosterStudent | null>(null);
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);

  const getProgressForStudent = (studentId: string) =>
    progressData.find((p) => p.studentId === studentId && p.unitId === selectedUnit.id);

  const handleSaveProgress = (update: StudentUnitProgress) => {
    setProgressData((prev) => {
      const filtered = prev.filter((p) => !(p.studentId === update.studentId && p.unitId === update.unitId));
      return [...filtered, update];
    });
    setEvaluatingStudent(null);
  };

  const handleAddUnit = (newUnit: CurriculumUnit) => {
    setLocalUnits((prev) => [...prev, newUnit]);
    setSelectedUnit(newUnit);
    setIsAddUnitModalOpen(false);
  };

  const completionRate =
    students.length > 0 ? Math.round((progressData.filter((p) => p.unitId === selectedUnit.id).length / students.length) * 100) : 0;

  return (
    <div className="animate-fade-in space-y-8">
      <Card className="flex flex-wrap items-center gap-2 border border-midnight/10 p-2 shadow-sm">
        <div className="custom-scrollbar flex flex-1 flex-wrap items-center gap-2 overflow-x-auto">
          {localUnits.map((unit) => (
            <button
              key={unit.id}
              type="button"
              onClick={() => setSelectedUnit(unit)}
              className={`whitespace-nowrap rounded-xl px-5 py-3 font-label text-xs font-semibold uppercase tracking-widest transition-all ${
                selectedUnit.id === unit.id
                  ? 'bg-gold text-midnight shadow-md shadow-gold/25'
                  : 'text-midnight/45 hover:bg-midnight/5'
              }`}
            >
              {unit.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsAddUnitModalOpen(true)}
          className="flex shrink-0 items-center gap-2 rounded-xl border-2 border-dashed border-gold/35 px-4 py-3 text-gold transition-colors hover:border-gold hover:bg-gold/5"
          title="Thêm unit"
        >
          <Plus size={16} strokeWidth={2} aria-hidden />
          <span className="font-label text-[10px] font-semibold uppercase tracking-widest">Thêm unit</span>
        </button>
      </Card>

      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-4">
        <div className="xl:col-span-1">
          <Card className="relative overflow-hidden bg-midnight p-8 text-white shadow-xl">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />
            <div className="relative z-10">
              <span className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{syllabus.code}</span>
              <h3 className="mt-2 font-headline text-xl italic leading-tight">{selectedUnit.name}</h3>
              <p className="mt-4 border-l-2 border-gold pl-4 font-body text-xs italic leading-relaxed text-white/55">
                {selectedUnit.description}
              </p>
              <div className="mt-8 border-t border-white/10 pt-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-label text-[10px] font-semibold uppercase text-white/45">Hoàn thành unit</span>
                  <span className="font-label text-xs font-semibold text-gold">{completionRate}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-gold transition-all duration-500" style={{ width: `${completionRate}%` }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="overflow-hidden p-0 shadow-md xl:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-midnight/10 bg-midnight/[0.02] p-6">
            <h3 className="font-label font-semibold uppercase tracking-tight text-midnight">Bảng đánh giá kết quả unit</h3>
            <div className="flex flex-wrap items-center gap-3">
              <ScoreLegend label="R" color="bg-info" />
              <ScoreLegend label="L" color="bg-midnight" />
              <ScoreLegend label="W" color="bg-gold" />
              <ScoreLegend label="S" color="bg-success" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-midnight/5">
                  <th className="w-12 px-6 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
                    No.
                  </th>
                  <th className="w-48 px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
                    Học viên
                  </th>
                  <th className="w-64 px-6 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
                    R-L-W-S
                  </th>
                  <th className="w-20 px-6 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
                    TB
                  </th>
                  <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
                    Ghi chú / Video
                  </th>
                  <th className="w-40 px-6 py-4 pr-8 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-midnight/5">
                {students.map((student, idx) => {
                  const progress = getProgressForStudent(student.id);
                  return (
                    <tr key={student.id} className="group transition-colors hover:bg-midnight/[0.02]">
                      <td className="px-6 py-6 text-center font-body text-xs font-semibold text-midnight/35">{idx + 1}</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="whitespace-nowrap font-body text-sm font-semibold text-midnight">{student.studentName}</p>
                            <p className="font-mono text-[10px] text-midnight/45">{student.studentCode}</p>
                          </div>
                          {progress?.isSentToParent ? (
                            <span className="rounded-full bg-success-bg p-1 text-success" title="Đã gửi phụ huynh">
                              {getIcon('Check', 10)}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        {progress ? (
                          <div className="flex items-center justify-center gap-2">
                            <SkillBadge score={progress.readingScore ?? 0} tone="info" />
                            <SkillBadge score={progress.listeningScore ?? 0} tone="midnight" />
                            <SkillBadge score={progress.writingScore ?? 0} tone="gold" />
                            <SkillBadge score={progress.speakingScore ?? 0} tone="success" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 opacity-25">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="h-10 w-10 rounded-xl border border-midnight/15 bg-midnight/5" />
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-6 text-center">
                        {progress?.score ? (
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold font-label text-xs font-semibold text-midnight shadow-md shadow-gold/30">
                            {progress.score}
                          </span>
                        ) : (
                          <span className="text-midnight/20">—</span>
                        )}
                      </td>
                      <td className="px-6 py-6">
                        {progress?.remark ? (
                          <p className="line-clamp-1 font-body text-[10px] font-medium italic text-midnight/55">&ldquo;{progress.remark}&rdquo;</p>
                        ) : (
                          <span className="font-body text-[9px] italic text-midnight/30">Chưa có ghi chú</span>
                        )}
                        {progress?.videoUrl ? (
                          <span className="mt-1 flex items-center gap-1 font-label text-[9px] font-semibold uppercase text-info">
                            <PlayCircle size={12} strokeWidth={2} aria-hidden /> Video
                          </span>
                        ) : null}
                      </td>
                      <td className="px-6 py-6 pr-8 text-right">
                        <button
                          type="button"
                          onClick={() => setEvaluatingStudent(student)}
                          className="rounded-xl border border-gold/30 bg-surface px-4 py-2 font-label text-[10px] font-semibold uppercase text-gold shadow-sm transition-all hover:bg-gold hover:text-midnight"
                        >
                          {progress ? 'Cập nhật' : 'Đánh giá'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <ProgressDetailModal
        student={evaluatingStudent}
        unit={selectedUnit}
        existingProgress={evaluatingStudent ? getProgressForStudent(evaluatingStudent.id) : undefined}
        isOpen={!!evaluatingStudent}
        onClose={() => setEvaluatingStudent(null)}
        onSave={handleSaveProgress}
      />

      <AddUnitModal isOpen={isAddUnitModalOpen} onClose={() => setIsAddUnitModalOpen(false)} onSave={handleAddUnit} />
    </div>
  );
};

const SkillBadge: React.FC<{ score: number; tone: 'info' | 'midnight' | 'gold' | 'success' }> = ({ score, tone }) => {
  const styles = {
    info: 'border-info/25 bg-info-bg text-info',
    midnight: 'border-midnight/20 bg-midnight/5 text-midnight',
    gold: 'border-gold/25 bg-gold/10 text-midnight',
    success: 'border-success/25 bg-success-bg text-success',
  }[tone];
  return (
    <div className={`flex h-10 w-10 flex-col items-center justify-center rounded-xl border font-label text-[10px] font-semibold ${styles}`}>
      {score}
    </div>
  );
};

const ScoreLegend: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div className="flex items-center gap-1">
    <div className={`h-2 w-2 rounded-full ${color}`} aria-hidden />
    <span className="font-label text-[9px] font-semibold uppercase text-midnight/45">{label}</span>
  </div>
);

export default StudentProgressCheck;
