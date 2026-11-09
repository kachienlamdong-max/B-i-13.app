/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Award, CheckCircle2, RotateCcw, Download, Sparkles, BookOpen, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Slide7SummaryReportProps {
  totalScore: number;
  maxScore: number;
  userAnswers: Record<string, string | boolean>;
  onResetQuiz: () => void;
  onGoToSlide: (slideId: number) => void;
}

export const Slide7SummaryReport: React.FC<Slide7SummaryReportProps> = ({
  totalScore,
  maxScore,
  userAnswers,
  onResetQuiz,
  onGoToSlide,
}) => {
  const percentage = Math.round((totalScore / maxScore) * 100);

  useEffect(() => {
    if (percentage >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [percentage]);

  const getRank = () => {
    if (percentage >= 90) return { title: 'Xuất Sắc', color: 'text-amber-400', desc: 'Nắm vững tuyệt đối toàn bộ kiến thức và kỹ năng Địa lí 12 Bài 13.' };
    if (percentage >= 75) return { title: 'Giỏi', color: 'text-emerald-400', desc: 'Hiểu sâu sắc các quy luật phân hóa, chuỗi giá trị và tính toán biểu đồ chính xác.' };
    if (percentage >= 50) return { title: 'Khá / Đạt', color: 'text-sky-400', desc: 'Đã hoàn thành các câu hỏi cơ bản, cần ôn thêm phần số liệu Bảng 13.1 và công thức.' };
    return { title: 'Cần Ôn Luyện Thêm', color: 'text-rose-400', desc: 'Hãy xem lại các slide bài giảng và luyện tập lại để củng cố kiến thức nhé!' };
  };

  const rank = getRank();

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto p-4 md:p-6 bg-slate-900 text-white rounded-lg">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Đánh giá Chuẩn năng lực Địa lí 12 · Kết nối tri thức</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
            Tổng kết kết quả học tập & Bảng điểm cá nhân
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintCertificate}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất phiếu đánh giá</span>
          </button>
          <button
            onClick={onResetQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại bài</span>
          </button>
        </div>
      </div>

      {/* Main Score & Mastery Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-3">
        {/* Left: Score Card & Rank (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/70 p-5 rounded-lg border border-slate-800 text-center">
          <div>
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Sparkles className="w-8 h-8 text-amber-300" />
            </div>

            <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Điểm tổng kết</span>
            <div className="font-mono text-4xl md:text-5xl font-black text-white tabular-nums tracking-tight">
              {totalScore} <span className="text-xl font-normal text-slate-500">/ {maxScore}</span>
            </div>
            <div className="font-mono text-sm text-emerald-400 font-bold mt-1">
              Đạt {percentage}% tổng điểm
            </div>

            <div className="mt-3 p-3 bg-slate-900 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-center gap-1.5 font-bold text-sm mb-1">
                <Star className={`w-4 h-4 fill-current ${rank.color}`} />
                <span className={rank.color}>Xếp loại: {rank.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-normal">{rank.desc}</p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
            Tổng cộng: 14 câu hỏi chuẩn SGK (Trắc nghiệm, Đúng/Sai, Tính toán)
          </div>
        </div>

        {/* Right: Competency Mastery Matrix & Quick Review (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950/70 p-4 rounded-lg border border-slate-800">
          <div>
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Bộ tiêu chí Năng lực Địa lí chuyên biệt
            </h3>

            <div className="space-y-2 mb-4">
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">1. Nhận thức Địa lí Lâm nghiệp & Thủy sản</span>
                  <span className="text-emerald-400 font-mono text-[11px]">Bảng 13.1 & 4 Ngư trường</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Nắm rõ độ che phủ (Bắc Trung Bộ 57,6% cao nhất, ĐBSCL 6,0% thấp nhất), phân biệt 3 loại rừng và 4 ngư trường trọng điểm.
                </p>
              </div>

              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">2. Kỹ năng Phân tích Biểu đồ & Tính toán</span>
                  <span className="text-sky-400 font-mono text-[11px]">Tốc độ tăng trưởng 85,5%</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Thành thạo công thức tính tăng trưởng, nhận xét sự vượt trội của sản lượng nuôi trồng (58,9%) so với khai thác (41,1%).
                </p>
              </div>

              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">3. Vận dụng Định hướng Phát triển Bền vững</span>
                  <span className="text-teal-400 font-mono text-[11px]">Kinh tế xanh & Chống IUU</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Hiểu sâu sắc vai trò lá chắn sinh thái của rừng đầu nguồn, chuỗi giá trị chế biến gỗ và khai thác hải sản chống vi phạm IUU.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Jump Review Links */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Xem lại từng phần:</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => onGoToSlide(num)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
                >
                  S{num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span>SGK Địa lí 12 - Bộ Kết nối tri thức với cuộc sống</span>
        <span>Phát triển phẩm chất: Trách nhiệm bảo vệ tài nguyên thiên nhiên & chủ quyền biển đảo</span>
      </div>
    </div>
  );
};
