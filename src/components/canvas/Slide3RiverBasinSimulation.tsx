/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, Droplets, Mountain, Waves, CheckCircle, AlertTriangle } from 'lucide-react';

export const Slide3RiverBasinSimulation: React.FC = () => {
  const [forestCoverage, setForestCoverage] = useState<number>(75);
  const [selectedForestType, setSelectedForestType] = useState<'phong-ho' | 'dac-dung' | 'san-xuat'>('phong-ho');

  // Simulation calculations based on forest coverage slider
  const runoffSpeed = Math.round((100 - forestCoverage) * 1.2);
  const soilErosionLevel = Math.round((100 - forestCoverage) * 1.5);
  const floodRisk = forestCoverage < 35 ? 'Rất cao (Nguy hiểm)' : forestCoverage < 60 ? 'Trung bình' : 'Thấp (An toàn)';
  const waterQuality = forestCoverage > 60 ? 'Trong sạch, điều hòa' : forestCoverage > 35 ? 'Đục nhẹ, phù sa tăng' : 'Đục ngầu bùn cát, lũ bùn đá';

  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto p-4 md:p-6 bg-slate-900 text-white rounded-lg">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Mountain className="w-3.5 h-3.5" />
            <span>Mô phỏng Thủy văn Lưu vực Sông Thượng nguồn → Hạ lưu</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
            Quản lí và bảo vệ tài nguyên rừng Việt Nam
          </h2>
        </div>

        {/* 3 Forest Categories Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-800 border border-slate-700 rounded-lg">
          <button
            onClick={() => setSelectedForestType('phong-ho')}
            className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
              selectedForestType === 'phong-ho'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Rừng phòng hộ
          </button>
          <button
            onClick={() => setSelectedForestType('dac-dung')}
            className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
              selectedForestType === 'dac-dung'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Rừng đặc dụng
          </button>
          <button
            onClick={() => setSelectedForestType('san-xuat')}
            className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
              selectedForestType === 'san-xuat'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Rừng sản xuất
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-3">
        {/* Left: Dynamic SVG Cross-Section Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          {/* Interactive Slider Control */}
          <div className="mb-3 p-3 bg-slate-900 border border-slate-800 rounded-lg">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-200">
                Điều chỉnh Tỉ lệ che phủ rừng đầu nguồn:
              </span>
              <span className={`font-mono text-sm font-bold tabular-nums ${
                forestCoverage > 60 ? 'text-emerald-400' : forestCoverage > 35 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {forestCoverage}% ({forestCoverage > 60 ? 'Tốt' : forestCoverage > 35 ? 'Suy giảm' : 'Phá rừng nghiêm trọng'})
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              step="5"
              value={forestCoverage}
              onChange={(e) => setForestCoverage(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10% (Trọc đồi núi, lũ quét)</span>
              <span>50% (Mức trung bình)</span>
              <span>95% (Rừng rậm nguyên sinh)</span>
            </div>
          </div>

          {/* Dynamic SVG Basin Cross Section */}
          <div className="relative w-full h-48 md:h-56 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
            <svg viewBox="0 0 500 240" className="w-full h-full">
              {/* Sky background */}
              <rect
                width="500"
                height="240"
                fill={forestCoverage < 35 ? '#1e1b18' : '#0f172a'}
                className="transition-colors duration-500"
              />

              {/* Rain storm particles when coverage is low */}
              {forestCoverage < 50 && (
                <g stroke={forestCoverage < 35 ? '#f43f5e' : '#94a3b8'} strokeWidth="1" opacity="0.6">
                  <line x1="80" y1="20" x2="60" y2="70" strokeDasharray="4 4" />
                  <line x1="140" y1="15" x2="120" y2="65" strokeDasharray="4 4" />
                  <line x1="220" y1="25" x2="200" y2="75" strokeDasharray="4 4" />
                  <line x1="300" y1="10" x2="280" y2="60" strokeDasharray="4 4" />
                </g>
              )}

              {/* Mountain Profile (Thượng nguồn -> Trung lưu -> Hạ lưu) */}
              <path
                d="M 0 240 L 0 60 Q 90 40 180 120 T 360 170 Q 430 190 500 210 L 500 240 Z"
                fill={forestCoverage < 35 ? '#573318' : forestCoverage < 60 ? '#274b33' : '#14532d'}
                className="transition-colors duration-700"
              />

              {/* River stream */}
              <path
                d="M 30 120 Q 120 110 200 160 T 370 195 Q 430 205 500 220"
                fill="none"
                stroke={forestCoverage < 35 ? '#b45309' : forestCoverage < 60 ? '#0284c7' : '#38bdf8'}
                strokeWidth={forestCoverage < 35 ? '16' : '10'}
                className={forestCoverage < 35 ? 'animate-flow-fast' : 'animate-flow'}
              />

              {/* Forest Tree Icons rendered conditionally on Mountain Slope */}
              {Array.from({ length: Math.round(forestCoverage / 6) }).map((_, i) => {
                const x = 30 + i * 22;
                const y = 50 + (i % 3) * 18 + (i * 4);
                return (
                  <g key={i} transform={`translate(${x}, ${y}) scale(0.7)`}>
                    <polygon
                      points="12,2 2,20 22,20"
                      fill={forestCoverage < 35 ? '#d97706' : '#22c55e'}
                    />
                    <polygon
                      points="12,8 4,24 20,24"
                      fill={forestCoverage < 35 ? '#b45309' : '#16a34a'}
                    />
                    <rect x="10" y="24" width="4" height="6" fill="#78350f" />
                  </g>
                );
              })}

              {/* Landslide hazard warning icon when coverage < 35 */}
              {forestCoverage < 35 && (
                <g transform="translate(180, 100)">
                  <circle cx="16" cy="16" r="16" fill="#ef4444" opacity="0.9" />
                  <path d="M 16 8 L 16 18 M 16 22 L 16.01 22" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                  <text x="38" y="21" fill="#fca5a5" fontSize="12" fontWeight="bold">
                    CẢNH BÁO LŨ QUÉT & SẠT LỞ!
                  </text>
                </g>
              )}

              {/* Labels on SVG */}
              <text x="30" y="35" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                1. RỪNG ĐẦU NGUỒN
              </text>
              <text x="210" y="140" fill="#cbd5e1" fontSize="10">
                2. Hồ chứa & Thủy điện
              </text>
              <text x="380" y="230" fill="#94a3b8" fontSize="10">
                3. Hạ lưu & Cửa biển
              </text>
            </svg>
          </div>

          {/* Real-time Indicator Gauges */}
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div className="p-2 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 block">Tốc độ dòng chảy</span>
              <span className="font-mono text-xs font-bold text-sky-400">{runoffSpeed} cm/s</span>
            </div>
            <div className="p-2 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 block">Mức xói mòn đất</span>
              <span className={`font-mono text-xs font-bold ${soilErosionLevel > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {soilErosionLevel > 60 ? 'Nghiêm trọng' : 'An toàn'}
              </span>
            </div>
            <div className="p-2 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 block">Nguy cơ lũ quét</span>
              <span className={`font-mono text-xs font-bold ${forestCoverage < 35 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {floodRisk}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Statutory Forest Categories & SGK Solutions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <div>
            <div className="pb-2 border-b border-slate-800 mb-3">
              <span className="text-[11px] text-emerald-400 uppercase tracking-wide font-semibold">
                Phân loại & Quản lí 3 loại rừng
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {selectedForestType === 'phong-ho'
                  ? 'Rừng phòng hộ (Đầu nguồn, chắn sóng, chắn cát)'
                  : selectedForestType === 'dac-dung'
                  ? 'Rừng đặc dụng (Vườn quốc gia, khu bảo tồn)'
                  : 'Rừng sản xuất (Cung cấp gỗ & lâm sản)'}
              </h3>
            </div>

            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded mb-3 text-xs text-slate-300 leading-relaxed">
              {selectedForestType === 'phong-ho' && (
                <div>
                  <strong className="text-emerald-300 block mb-1">Vai trò hàng đầu:</strong>
                  Bảo vệ nguồn nước, bảo vệ đất, chống xói mòn, sạt lở đất đá, chống sa mạc hóa, điều hòa dòng chảy sông ngòi và giảm nhẹ thiên tai bão lũ.
                </div>
              )}
              {selectedForestType === 'dac-dung' && (
                <div>
                  <strong className="text-emerald-300 block mb-1">Vai trò hàng đầu:</strong>
                  Bảo tồn thiên nhiên, mẫu chuẩn hệ sinh thái rừng quốc gia, bảo vệ nguồn gen sinh vật quý hiếm, phục vụ nghiên cứu khoa học và du lịch sinh thái.
                </div>
              )}
              {selectedForestType === 'san-xuat' && (
                <div>
                  <strong className="text-emerald-300 block mb-1">Vai trò hàng đầu:</strong>
                  Cung cấp gỗ thương phẩm, lâm sản ngoài gỗ cho công nghiệp chế biến, xuất khẩu và tiêu dùng nội địa, giải quyết việc làm cho người dân.
                </div>
              )}
            </div>

            {/* Strategic Solutions SGK */}
            <div className="space-y-1.5 mb-3 text-xs">
              <span className="text-[11px] text-slate-400 font-medium block">
                Giải pháp chiến lược phát triển lâm nghiệp bền vững:
              </span>
              <div className="p-2 bg-slate-900 border border-slate-800 rounded text-slate-200">
                1. <strong>Giao đất, giao rừng</strong> cho người dân và cộng đồng bản địa gắn với sinh kế.
              </div>
              <div className="p-2 bg-slate-900 border border-slate-800 rounded text-slate-200">
                2. <strong>Khoanh nuôi, trồng mới</strong>, đóng cửa rừng tự nhiên và giám sát bằng vệ tinh/GPS.
              </div>
              <div className="p-2 bg-slate-900 border border-slate-800 rounded text-slate-200">
                3. Gắn lâm nghiệp với <strong>thị trường tín chỉ các-bon</strong> và ứng phó biến đổi khí hậu.
              </div>
            </div>
          </div>

          {/* Exam Hint */}
          <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded text-[11px] text-emerald-200">
            <strong>Mẹo thi THPT:</strong> Vai trò lớn nhất của rừng phòng hộ đầu nguồn luôn là <em>điều hòa dòng chảy, hạn chế lũ lụt và sạt lở đất đá</em>.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span>Hiện trạng nước ta: Rừng phòng hộ chiếm ~31%, đặc dụng ~15%, sản xuất ~54%</span>
        <span>Mục tiêu: Đạt tỷ lệ che phủ rừng bền vững trên 42%</span>
      </div>
    </div>
  );
};
