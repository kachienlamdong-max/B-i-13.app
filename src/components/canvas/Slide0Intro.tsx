/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Trees, Fish, ShieldCheck, Compass, Sparkles } from 'lucide-react';

interface Slide0IntroProps {
  onStartLesson: () => void;
}

export const Slide0Intro: React.FC<Slide0IntroProps> = ({ onStartLesson }) => {
  return (
    <div className="relative h-full w-full flex flex-col justify-between overflow-y-auto p-5 md:p-7 bg-slate-900 text-white rounded-lg">
      {/* Background with measured contrast scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-lg">
        <img
          src="/src/assets/images/forest_canopy_vietnam_1794228678982.jpg"
          alt="Rừng nhiệt đới và biển Việt Nam"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
      </div>

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>SGK Địa lí 12 · Kết nối tri thức · Tiết học 45 phút</span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-3xl leading-snug">
          Bài 13: Vấn đề phát triển ngành lâm nghiệp và thủy sản
        </h1>
        <p className="mt-2 text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
          Tài nguyên rừng và biển là hai trụ cột sinh thái - kinh tế trọng yếu của Việt Nam. Tìm hiểu tiềm năng tự nhiên, chuỗi giá trị chế biến xuất khẩu và định hướng phát triển bền vững thích ứng biến đổi khí hậu.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
        <div className="bg-slate-800/80 backdrop-blur-xs border border-slate-700/70 p-3.5 rounded-lg">
          <div className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
            <Trees className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">01. Phân hóa Rừng</h3>
          <p className="text-xs text-slate-300 leading-normal">
            Bảng 13.1: So sánh 14,8 triệu ha rừng và tỉ lệ che phủ 42,02% giữa các vùng sinh thái.
          </p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xs border border-slate-700/70 p-3.5 rounded-lg">
          <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">02. Chuỗi Giá Trị & Bảo Vệ</h3>
          <p className="text-xs text-slate-300 leading-normal">
            Mô phỏng chuỗi chế biến gỗ xuất khẩu và vai trò sống còn của rừng phòng hộ đầu nguồn.
          </p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xs border border-slate-700/70 p-3.5 rounded-lg">
          <div className="w-8 h-8 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center mb-2">
            <Fish className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">03. Thủy Sản & 4 Ngư Trường</h3>
          <p className="text-xs text-slate-300 leading-normal">
            Biển rộng &gt;1 triệu km², 4 ngư trường chiến lược và nhiệm vụ trọng tâm gỡ cảnh báo IUU.
          </p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xs border border-slate-700/70 p-3.5 rounded-lg">
          <div className="w-8 h-8 rounded bg-teal-500/20 text-teal-400 flex items-center justify-center mb-2">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">04. Chuyển Dịch & Vùng</h3>
          <p className="text-xs text-slate-300 leading-normal">
            Tăng trưởng 85,5% (2010–2024), nuôi trồng bứt phá và thế mạnh ĐBS Cửu Long.
          </p>
        </div>
      </div>

      {/* Bottom CTA & Key stats */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div>
            <span className="text-slate-500">Phân bổ:</span>{' '}
            <span className="text-slate-200 font-medium">Lâm nghiệp 17' · Thủy sản 18' · Đánh giá 7'</span>
          </div>
          <span aria-hidden="true">·</span>
          <div>
            <span className="text-slate-500">Bộ câu hỏi:</span>{' '}
            <span className="text-slate-200 font-medium">14 câu chuẩn SGK</span>
          </div>
        </div>

        <button
          onClick={onStartLesson}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md hover:shadow-emerald-900/30"
        >
          <span>Bắt đầu bài học</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
