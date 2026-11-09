/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FOREST_TABLE_13_1, TOTAL_FOREST_SUMMARY } from '../../data/lessonData';
import { BarChart3, PieChart, Trees, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export const Slide1ForestDistribution: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('btb');
  const [viewMetric, setViewMetric] = useState<'coverage' | 'area' | 'structure'>('coverage');

  const selectedRegion = FOREST_TABLE_13_1.find((r) => r.id === selectedRegionId) || FOREST_TABLE_13_1[1];
  const maxArea = Math.max(...FOREST_TABLE_13_1.map((r) => r.areaKHa));
  const maxCoverage = Math.max(...FOREST_TABLE_13_1.map((r) => r.coverageRate));

  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto p-4 md:p-6 bg-slate-900 text-white rounded-lg">
      {/* Top Banner & Control View */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Trees className="w-3.5 h-3.5" />
            <span>Bảng 13.1 · Số liệu SGK Địa lí 12 (Năm 2024)</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
            Phân hóa diện tích và tỉ lệ che phủ rừng theo các vùng
          </h2>
        </div>

        {/* Metric Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-800 border border-slate-700 rounded-lg shrink-0">
          <button
            onClick={() => setViewMetric('coverage')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              viewMetric === 'coverage'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Tỉ lệ che phủ (%)
          </button>
          <button
            onClick={() => setViewMetric('area')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              viewMetric === 'area'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Diện tích (nghìn ha)
          </button>
          <button
            onClick={() => setViewMetric('structure')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              viewMetric === 'structure'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Tự nhiên vs Trồng
          </button>
        </div>
      </div>

      {/* Main interactive visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-3">
        {/* Left: 7 Regions Animated Comparative Bars (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-around gap-2 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span>7 Vùng Kinh tế - Xã hội</span>
            <span className="font-mono">
              {viewMetric === 'coverage'
                ? 'Tỉ lệ che phủ (%) [Trung bình: 42,02%]'
                : viewMetric === 'area'
                ? 'Diện tích rừng (nghìn ha) [Tổng: 14.860,3]'
                : 'Cơ cấu rừng tự nhiên / trồng (nghìn ha)'}
            </span>
          </div>

          {FOREST_TABLE_13_1.map((region) => {
            const isSelected = region.id === selectedRegionId;
            const coverageWidth = (region.coverageRate / maxCoverage) * 100;
            const areaWidth = (region.areaKHa / maxArea) * 100;
            const naturalPercent = ((region.naturalForest / region.areaKHa) * 100).toFixed(0);

            return (
              <div
                key={region.id}
                onClick={() => setSelectedRegionId(region.id)}
                className={`group cursor-pointer p-2 rounded-md transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 ring-1 ring-emerald-500 shadow-sm'
                    : 'hover:bg-slate-850/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-slate-200">{region.name}</span>
                    {region.isMaxArea && (
                      <span className="text-[10px] text-amber-400 font-medium">★ Diện tích lớn nhất</span>
                    )}
                    {region.isMaxCoverage && (
                      <span className="text-[10px] text-emerald-400 font-medium">★ Che phủ cao nhất (57,6%)</span>
                    )}
                    {region.isMinCoverage && (
                      <span className="text-[10px] text-rose-400 font-medium">▼ Thấp nhất (6,0%)</span>
                    )}
                  </div>
                  <span className="font-mono tabular-nums font-bold text-slate-200">
                    {viewMetric === 'coverage'
                      ? `${region.coverageRate.toFixed(1)}%`
                      : viewMetric === 'area'
                      ? `${region.areaKHa.toLocaleString('vi-VN')} k-ha`
                      : `${region.naturalForest.toLocaleString('vi-VN')} / ${region.plantedForest.toLocaleString('vi-VN')}`}
                  </span>
                </div>

                {/* Bar representation */}
                {viewMetric === 'coverage' && (
                  <div className="relative w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    {/* National average marker */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-400/80 z-10"
                      style={{ left: `${(TOTAL_FOREST_SUMMARY.nationalCoverage / maxCoverage) * 100}%` }}
                      title="Mức che phủ trung bình toàn quốc: 42,02%"
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        region.isMaxCoverage
                          ? 'bg-emerald-400'
                          : region.coverageRate > 42.02
                          ? 'bg-emerald-600'
                          : 'bg-emerald-800'
                      }`}
                      style={{ width: `${coverageWidth}%` }}
                    />
                  </div>
                )}

                {viewMetric === 'area' && (
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        region.isMaxArea ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${areaWidth}%` }}
                    />
                  </div>
                )}

                {viewMetric === 'structure' && (
                  <div className="flex w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-500"
                      style={{ width: `${naturalPercent}%` }}
                      title={`Rừng tự nhiên: ${naturalPercent}%`}
                    />
                    <div
                      className="h-full bg-sky-500 transition-all duration-500"
                      style={{ width: `${100 - Number(naturalPercent)}%` }}
                      title={`Rừng trồng: ${100 - Number(naturalPercent)}%`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Selected Region Deep Dive Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wide">Chi tiết vùng</span>
                <h3 className="text-base font-bold text-emerald-400">{selectedRegion.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">Độ che phủ</span>
                <p className="font-mono text-lg font-bold text-white tabular-nums">
                  {selectedRegion.coverageRate.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Metric dials */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <span className="text-[11px] text-slate-400">Tổng diện tích rừng</span>
                <p className="font-mono text-sm font-bold text-white tabular-nums">
                  {selectedRegion.areaKHa.toLocaleString('vi-VN')} <span className="text-xs font-normal text-slate-400">nghìn ha</span>
                </p>
                <span className="text-[10px] text-slate-500">
                  {((selectedRegion.areaKHa / TOTAL_FOREST_SUMMARY.totalArea) * 100).toFixed(1)}% diện tích cả nước
                </span>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <span className="text-[11px] text-slate-400">Rừng tự nhiên / Trồng</span>
                <p className="font-mono text-sm font-bold text-sky-400 tabular-nums">
                  {selectedRegion.naturalForest.toLocaleString('vi-VN')}{' '}
                  <span className="text-xs text-slate-400">/</span> {selectedRegion.plantedForest.toLocaleString('vi-VN')}
                </p>
                <span className="text-[10px] text-slate-500">Đơn vị: nghìn ha</span>
              </div>
            </div>

            {/* Characteristic */}
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded text-xs text-slate-300 leading-relaxed mb-3">
              <span className="font-semibold text-slate-200 block mb-0.5">Đặc trưng sinh thái - lâm nghiệp:</span>
              {selectedRegion.keyCharacteristic}
            </div>
          </div>

          {/* Key Pedagogical Takeaway Box for Exam Prep */}
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded text-xs text-emerald-200">
            <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ghi nhớ trọng tâm chuẩn SGK:</span>
            </div>
            <ul className="space-y-1 text-[11px] text-emerald-100 list-disc list-inside leading-normal">
              <li>
                <strong>Bắc Trung Bộ</strong> có tỉ lệ che phủ rừng <strong>cao nhất (57,6%)</strong>, không phải TDMN Bắc Bộ.
              </li>
              <li>
                <strong>Trung du miền núi Bắc Bộ</strong> có <strong>diện tích rừng lớn nhất (5.405 k-ha)</strong>.
              </li>
              <li>
                <strong>ĐBS Cửu Long</strong> có diện tích và độ che phủ <strong>thấp nhất (6,0%)</strong> do ưu tiên nông nghiệp & thủy sản.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footnote Bar */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span>Toàn quốc 2024: 14.860,3 nghìn ha rừng · Tỉ lệ che phủ: 42,02%</span>
        <span>Mục tiêu chiến lược đến 2030: Duy trì ổn định 42% - 43%</span>
      </div>
    </div>
  );
};
