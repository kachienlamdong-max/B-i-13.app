/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MAJOR_FISHING_GROUNDS } from '../../data/lessonData';
import { Anchor, Compass, Fish, Navigation, AlertOctagon, ShieldCheck } from 'lucide-react';

export const Slide4FisheryMarineMap: React.FC = () => {
  const [selectedGroundId, setSelectedGroundId] = useState<string>('hs-ts');
  const [showIuuMode, setShowIuuMode] = useState<boolean>(true);

  const selectedGround = MAJOR_FISHING_GROUNDS.find((g) => g.id === selectedGroundId) || MAJOR_FISHING_GROUNDS[1];

  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto p-4 md:p-6 bg-slate-900 text-white rounded-lg">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Anchor className="w-3.5 h-3.5" />
            <span>Hải đồ Vùng biển Việt Nam & 4 Ngư trường trọng điểm</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
            Thế mạnh, hạn chế & Ngư trường ngành thủy sản
          </h2>
        </div>

        {/* IUU Mode & Monitoring Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowIuuMode(!showIuuMode)}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg border transition-all ${
              showIuuMode
                ? 'bg-amber-950/80 border-amber-500 text-amber-300 font-medium'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Chống khai thác IUU & Giám sát VMS</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-3">
        {/* Left: Interactive Nautical Sea Map with Vietnam Coastline (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Bản đồ không gian biển (EEZ &gt; 1 triệu km²)</span>
            <span className="text-sky-400 text-[11px]">Click các điểm hải đăng để xem chi tiết</span>
          </div>

          {/* Interactive SVG Nautical Chart */}
          <div className="relative w-full h-56 md:h-64 bg-[#0a192f] rounded-lg border border-slate-800 overflow-hidden">
            <svg viewBox="0 0 500 320" className="w-full h-full">
              {/* Bathymetry Grid Lines */}
              <defs>
                <pattern id="nautical-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                </pattern>
              </defs>
              <rect width="500" height="320" fill="url(#nautical-grid)" />

              {/* Stylized Vietnam S-shaped Mainland Outline */}
              <path
                d="M 170 30 Q 185 45 190 65 Q 165 95 195 130 Q 215 155 220 180 Q 225 210 210 240 Q 185 270 160 285 Q 145 295 135 285 Q 140 265 165 255 Q 175 220 170 185 Q 150 145 140 100 Q 145 55 170 30 Z"
                fill="#15803d"
                stroke="#22c55e"
                strokeWidth="1.5"
                opacity="0.85"
              />

              {/* Sea Area Annotation */}
              <text x="320" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" opacity="0.6">
                BIỂN ĐÔNG
              </text>
              <text x="320" y="86" fill="#0284c7" fontSize="9" opacity="0.8">
                VÙNG ĐẶC QUYỀN KINH TẾ (EEZ &gt; 1.000.000 km²)
              </text>
              <text x="320" y="100" fill="#0284c7" fontSize="8" opacity="0.7">
                Bờ biển dài 3.260 km · &gt; 4.000 hòn đảo lớn nhỏ
              </text>

              {/* 4 Major Fishing Grounds Clickable Nodes */}
              {/* 1. Hai Phong - Quang Ninh (Vinh Bac Bo) */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedGroundId('hp-qn')}
                transform="translate(240, 55)"
              >
                <circle cx="0" cy="0" r="14" fill="#0284c7" className="radar-ping" opacity="0.4" />
                <circle cx="0" cy="0" r="7" fill={selectedGroundId === 'hp-qn' ? '#38bdf8' : '#0369a1'} stroke="#ffffff" strokeWidth="1.5" />
                <text x="12" y="4" fill="#e2e8f0" fontSize="10" fontWeight="bold">
                  1. HP - Quảng Ninh
                </text>
              </g>

              {/* 2. Hoang Sa - Truong Sa (Khơi xa) */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedGroundId('hs-ts')}
                transform="translate(360, 150)"
              >
                <circle cx="0" cy="0" r="18" fill="#e11d48" className="radar-ping" opacity="0.3" />
                <circle cx="0" cy="0" r="8" fill={selectedGroundId === 'hs-ts' ? '#f43f5e' : '#be123c'} stroke="#ffffff" strokeWidth="2" />
                <text x="-40" y="-12" fill="#fda4af" fontSize="10" fontWeight="bold">
                  2. QĐ Hoàng Sa, QĐ Trường Sa
                </text>
                <text x="-35" y="22" fill="#94a3b8" fontSize="8">
                  (Chủ quyền biển đảo &amp; Cá ngừ khơi)
                </text>
              </g>

              {/* 3. Ninh Thuan - Binh Thuan - Ba Ria Vung Tau */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedGroundId('nt-bt-brvt')}
                transform="translate(260, 230)"
              >
                <circle cx="0" cy="0" r="15" fill="#f59e0b" className="radar-ping" opacity="0.3" />
                <circle cx="0" cy="0" r="7" fill={selectedGroundId === 'nt-bt-brvt' ? '#fbbf24' : '#d97706'} stroke="#ffffff" strokeWidth="1.5" />
                <text x="12" y="4" fill="#fde68a" fontSize="10" fontWeight="bold">
                  3. Ninh Thuận - Bình Thuận - BRVT
                </text>
              </g>

              {/* 4. Ca Mau - Kien Giang */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedGroundId('cm-kg')}
                transform="translate(130, 290)"
              >
                <circle cx="0" cy="0" r="15" fill="#10b981" className="radar-ping" opacity="0.3" />
                <circle cx="0" cy="0" r="7" fill={selectedGroundId === 'cm-kg' ? '#34d399' : '#059669'} stroke="#ffffff" strokeWidth="1.5" />
                <text x="12" y="4" fill="#a7f3d0" fontSize="10" fontWeight="bold">
                  4. Cà Mau - Kiên Giang
                </text>
              </g>

              {/* Fishing Fleet / VMS Tracking Blips */}
              {showIuuMode && (
                <g fill="#38bdf8" opacity="0.8">
                  <polygon points="280,110 286,113 280,116" />
                  <polygon points="310,180 316,183 310,186" />
                  <polygon points="210,265 216,268 210,271" />
                  <text x="290" y="115" fill="#7dd3fc" fontSize="8">
                    Tàu xa bờ #VMS-98
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Quick Selection Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 mt-2">
            {MAJOR_FISHING_GROUNDS.map((ground) => (
              <button
                key={ground.id}
                onClick={() => setSelectedGroundId(ground.id)}
                className={`p-1.5 rounded text-[11px] text-left transition-colors truncate ${
                  selectedGroundId === ground.id
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {ground.name.replace('Ngư trường ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Selected Fishing Ground Intel & Natural Advantages/Obstacles (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <div>
            <div className="pb-2 border-b border-slate-800 mb-3">
              <span className="text-[11px] text-sky-400 uppercase tracking-wide font-semibold">
                Ngư trường chiến lược
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">{selectedGround.name}</h3>
              <span className="text-xs text-slate-400 block mt-0.5">Khu vực: {selectedGround.seaArea}</span>
            </div>

            {/* Species and coastal asset */}
            <div className="space-y-2 mb-3 text-xs">
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <span className="text-slate-400 block text-[10px]">Hải sản đặc trưng:</span>
                <span className="text-sky-300 font-medium">{selectedGround.species}</span>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <span className="text-slate-400 block text-[10px]">Lợi thế địa hình & hải văn:</span>
                <span className="text-slate-200">{selectedGround.coastalAdvantage}</span>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <span className="text-slate-400 block text-[10px]">Ý nghĩa kinh tế - quốc phòng:</span>
                <span className="text-emerald-300">{selectedGround.strategicRole}</span>
              </div>
            </div>

            {/* Summary of Strengths vs Limitations according to Textbook */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 bg-emerald-950/40 border border-emerald-800/50 rounded text-emerald-200">
                <strong className="text-emerald-300 block mb-0.5">Thế mạnh tự nhiên:</strong>
                Biển rộng &gt; 1 triệu km², 3260 km bờ biển, sinh vật biển phong phú, đầm phá thuận lợi nuôi trồng.
              </div>
              <div className="p-2 bg-rose-950/40 border border-rose-800/50 rounded text-rose-200">
                <strong className="text-rose-300 block mb-0.5">Hạn chế chính:</strong>
                Chịu 9 - 10 cơn bão/năm, công nghệ bảo quản sau thu hoạch còn yếu, nguồn lợi ven bờ suy giảm.
              </div>
            </div>
          </div>

          {/* S4 Exam Note */}
          <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 rounded text-[11px] text-amber-200 mt-2">
            <strong>Ghi nhớ làm bài:</strong> Nước ta có <strong>4 ngư trường trọng điểm</strong>. Định hướng hiện nay là <em>đẩy mạnh khai thác xa bờ có chọn lọc, hiện đại hóa tàu và chống khai thác bất hợp pháp (IUU)</em>.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span>Toàn quốc có hơn 2.000 loài cá biển, trong đó khoảng 110 loài có giá trị kinh tế cao</span>
        <span>Hệ thống giám sát hành trình VMS lắp đặt trên 100% tàu cá xa bờ chiều dài từ 15m trở lên</span>
      </div>
    </div>
  );
};
