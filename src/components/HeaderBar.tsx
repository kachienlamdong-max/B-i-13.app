/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, BookOpen } from 'lucide-react';

interface HeaderBarProps {
  currentSectionId: number;
  onSelectSection: (id: number) => void;
  totalScore: number;
  maxScore: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentSectionId,
  onSelectSection,
  totalScore,
  maxScore,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200 shrink-0">
      {/* Zone 1: Brand wordmark */}
      <div 
        onClick={() => onSelectSection(0)}
        className="flex items-center gap-2.5 text-slate-900 font-bold tracking-tight text-base md:text-lg cursor-pointer whitespace-nowrap shrink-0 select-none"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
          <BookOpen className="w-4 h-4" />
        </div>
        <span>Địa lí 12 · Bài 13: Lâm nghiệp & Thủy sản</span>
      </div>

      {/* Zone 2: 4-5 concise single-line nav links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs md:text-sm font-medium text-slate-600">
        <button
          onClick={() => onSelectSection(1)}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
            currentSectionId === 1 ? 'text-emerald-700 font-semibold' : ''
          }`}
        >
          01. Phân hóa rừng
        </button>
        <button
          onClick={() => onSelectSection(2)}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
            currentSectionId === 2 ? 'text-emerald-700 font-semibold' : ''
          }`}
        >
          02. Chuỗi lâm nghiệp
        </button>
        <button
          onClick={() => onSelectSection(3)}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
            currentSectionId === 3 ? 'text-emerald-700 font-semibold' : ''
          }`}
        >
          03. Lưu vực & Bảo vệ
        </button>
        <button
          onClick={() => onSelectSection(4)}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
            currentSectionId === 4 ? 'text-emerald-700 font-semibold' : ''
          }`}
        >
          04. Ngư trường biển
        </button>
        <button
          onClick={() => onSelectSection(5)}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
            currentSectionId === 5 ? 'text-emerald-700 font-semibold' : ''
          }`}
        >
          05. Biểu đồ cơ cấu
        </button>
        <button
          onClick={() => onSelectSection(6)}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
            currentSectionId === 6 ? 'text-emerald-700 font-semibold' : ''
          }`}
        >
          06. Vùng bền vững
        </button>
      </nav>

      {/* Zone 3: 1 primary action button */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onSelectSection(7)}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Award className="w-3.5 h-3.5 text-amber-300" />
          <span>Bảng điểm ({totalScore}/{maxScore})</span>
        </button>
      </div>
    </header>
  );
};
