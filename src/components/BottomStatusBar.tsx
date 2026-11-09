/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, XCircle, HelpCircle, Trees, Fish, TrendingUp, BarChart2, ShieldCheck } from 'lucide-react';
import { LESSON_SECTIONS, TOTAL_FOREST_SUMMARY } from '../data/lessonData';

interface BottomStatusBarProps {
  currentSectionId: number;
  isSlideSubmitted: boolean;
  userAnswers: Record<string, string | boolean>;
}

export const BottomStatusBar: React.FC<BottomStatusBarProps> = ({
  currentSectionId,
  isSlideSubmitted,
  userAnswers,
}) => {
  const currentSection =
    LESSON_SECTIONS.find((s) => s.id === currentSectionId) || LESSON_SECTIONS[1];
  const questions = currentSection.questions || [];

  return (
    <div className="bg-slate-900 border-t border-slate-800 p-3.5 text-white shrink-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Feedback Box (7 cols - positioned directly below the Main Canvas) */}
        <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Hộp Phản hồi Sư phạm & Lời giải chuẩn SGK</span>
            </span>
            <span className="text-[10px] text-slate-400">
              {isSlideSubmitted ? 'Đã chấm điểm' : 'Đang chờ nộp bài'}
            </span>
          </div>

          {!isSlideSubmitted ? (
            <div className="flex items-start gap-2.5 text-xs text-slate-300 py-1">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-200">
                  {currentSection.instruction}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Chọn đáp án ở bảng bên phải và bấm <strong>[NỘP BÀI]</strong> để nhận ngay phân tích đúng/sai kèm giải thích chuẩn SGK Kết nối tri thức.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 max-h-24 overflow-y-auto pr-1 text-xs">
              {questions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCorrect = ans === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-2 rounded border text-[11px] leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-100'
                        : 'bg-rose-950/40 border-rose-800/60 text-rose-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-0.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="text-emerald-300">CÂU {idx + 1}: CHÍNH XÁC!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="text-rose-300">
                            CÂU {idx + 1}: CHƯA ĐÚNG! (Đáp án đúng:{' '}
                            {q.type === 'true_false' ? (q.correctAnswer ? 'ĐÚNG' : 'SAI') : q.correctAnswer})
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-300">{q.explanation}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Dynamic Data Dashboard (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Gauge 1: Tỉ lệ che phủ rừng */}
          <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>Độ che phủ rừng</span>
              <Trees className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="mt-1">
              <span className="font-mono text-base font-bold text-white tabular-nums">42,02%</span>
              <span className="text-[10px] text-emerald-400 block">+0,2% kế hoạch</span>
            </div>
          </div>

          {/* Gauge 2: Diện tích rừng */}
          <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>Diện tích rừng</span>
              <Trees className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="mt-1">
              <span className="font-mono text-base font-bold text-white tabular-nums">14.860</span>
              <span className="text-[10px] text-slate-400 block">nghìn ha</span>
            </div>
          </div>

          {/* Gauge 3: Tổng sản lượng thủy sản */}
          <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>Sản lượng thủy sản</span>
              <Fish className="w-3 h-3 text-sky-400" />
            </div>
            <div className="mt-1">
              <span className="font-mono text-base font-bold text-white tabular-nums">9.656,3</span>
              <span className="text-[10px] text-slate-400 block">nghìn tấn (2024)</span>
            </div>
          </div>

          {/* Gauge 4: Tốc độ tăng trưởng */}
          <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>Tăng trưởng 10-24</span>
              <TrendingUp className="w-3 h-3 text-amber-400" />
            </div>
            <div className="mt-1">
              <span className="font-mono text-base font-bold text-emerald-400 tabular-nums">+85,5%</span>
              <span className="text-[10px] text-teal-400 block">Nuôi trồng 58,9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
