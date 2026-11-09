/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REGIONAL_COMPARISON_4_ZONES } from '../../data/lessonData';
import { MapPin, Trees, Fish, ShieldCheck, CheckCircle2, Globe2 } from 'lucide-react';

export const Slide6RegionalSustainable: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('dbs-cuu-long');

  const selectedZone =
    REGIONAL_COMPARISON_4_ZONES.find((z) => z.id === selectedZoneId) || REGIONAL_COMPARISON_4_ZONES[3];

  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto p-4 md:p-6 bg-slate-900 text-white rounded-lg">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Phân bố Vùng Kinh tế & Chiến lược Bền vững</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
            4 Vùng trọng điểm Lâm nghiệp - Thủy sản Việt Nam
          </h2>
        </div>

        {/* 4 Regions Tab Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-800 border border-slate-700 rounded-lg overflow-x-auto">
          {REGIONAL_COMPARISON_4_ZONES.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZoneId(zone.id)}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                selectedZoneId === zone.id
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {zone.regionName.split('&')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Main 4-Zone Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-3">
        {/* Left: 4 Regional Windows Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {REGIONAL_COMPARISON_4_ZONES.map((zone) => {
            const isSelected = zone.id === selectedZoneId;
            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`cursor-pointer p-3.5 rounded-lg border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/95 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-emerald-400">
                      {zone.badge}
                    </span>
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-2">{zone.regionName}</h4>
                  
                  <div className="space-y-1.5 text-[11px] text-slate-300">
                    <div className="flex items-start gap-1.5">
                      <Trees className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="line-clamp-2">{zone.forestAdvantage}</p>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Fish className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <p className="line-clamp-2">{zone.fisheryAdvantage}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{zone.id === 'dbs-cuu-long' ? '★ Vương quốc thủy sản' : 'Vùng sinh thái then chốt'}</span>
                  <span className="text-emerald-400 font-medium">Chi tiết →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Region Deep Dive & Sustainability Core Principles (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <div>
            <div className="pb-2 border-b border-slate-800 mb-3">
              <span className="text-[11px] text-emerald-400 uppercase tracking-wide font-semibold">
                Phân tích chuyên sâu
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">{selectedZone.regionName}</h3>
              <span className="text-xs text-emerald-300 font-medium block mt-0.5">{selectedZone.badge}</span>
            </div>

            <div className="space-y-2 mb-3 text-xs">
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1 text-[11px]">
                  <Trees className="w-3.5 h-3.5" />
                  <span>Thế mạnh Lâm nghiệp:</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{selectedZone.forestAdvantage}</p>
              </div>

              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <div className="flex items-center gap-1.5 text-sky-400 font-semibold mb-1 text-[11px]">
                  <Fish className="w-3.5 h-3.5" />
                  <span>Thế mạnh Thủy sản:</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{selectedZone.fisheryAdvantage}</p>
              </div>

              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Định hướng Phát triển Bền vững:</span>
                </div>
                <p className="text-slate-200 leading-relaxed text-[11px]">{selectedZone.sustainablePolicy}</p>
              </div>
            </div>
          </div>

          {/* Core Principle Callout */}
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded text-xs text-emerald-200">
            <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nguyên tắc cốt lõi chuẩn SGK:</span>
            </div>
            <p className="text-[11px] text-emerald-100 leading-relaxed">
              <strong>Phát triển kinh tế đi đôi với bảo vệ môi trường sinh thái</strong>, bảo tồn nguồn lợi tự nhiên, đảm bảo sinh kế xã hội cho đồng bào các dân tộc và quản lý theo <em>chuỗi giá trị kinh tế xanh tuần hoàn</em>.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span>Đồng bằng sông Cửu Long: Chiếm hơn 55% sản lượng thủy sản cả nước</span>
        <span>Mô hình kết hợp: Tôm - rừng ngập mặn sinh thái đạt chứng nhận quốc tế Naturland</span>
      </div>
    </div>
  );
};
