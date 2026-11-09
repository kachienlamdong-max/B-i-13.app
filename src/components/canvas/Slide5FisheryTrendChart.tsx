/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FISHERY_TREND_DATA } from '../../data/lessonData';
import { TrendingUp, BarChart, Calculator, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const Slide5FisheryTrendChart: React.FC = () => {
  const [chartMode, setChartMode] = useState<'absolute' | 'share'>('absolute');
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const selectedData = FISHERY_TREND_DATA.find((d) => d.year === selectedYear) || FISHERY_TREND_DATA[4];
  const maxTotal = 10000; // max scale for absolute thousands of tons

  // Growth calculation from 2010 to selected year
  const base2010 = FISHERY_TREND_DATA[0].total;
  const growthRateFrom2010 = (((selectedData.total - base2010) / base2010) * 100).toFixed(1);

  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto p-4 md:p-6 bg-slate-900 text-white rounded-lg">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Biểu đồ Tăng trưởng & Cơ cấu Sản lượng Thủy sản (2010 – 2024)</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
            Chuyển dịch cơ cấu sản lượng thủy sản Việt Nam
          </h2>
        </div>

        {/* Chart View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-800 border border-slate-700 rounded-lg">
          <button
            onClick={() => setChartMode('absolute')}
            className={`px-3 py-1 text-xs rounded transition-colors whitespace-nowrap ${
              chartMode === 'absolute'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Sản lượng (nghìn tấn)
          </button>
          <button
            onClick={() => setChartMode('share')}
            className={`px-3 py-1 text-xs rounded transition-colors whitespace-nowrap ${
              chartMode === 'share'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Cơ cấu (%)
          </button>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-3">
        {/* Left: Dynamic Stacked Bar Chart (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>
              {chartMode === 'absolute'
                ? 'Sản lượng thủy sản khai thác & nuôi trồng qua các năm'
                : 'Chuyển dịch tỉ trọng (%) giữa khai thác và nuôi trồng'}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px] text-teal-300">
                <span className="w-2.5 h-2.5 rounded-xs bg-teal-500 inline-block" /> Nuôi trồng
              </span>
              <span className="flex items-center gap-1 text-[11px] text-sky-300">
                <span className="w-2.5 h-2.5 rounded-xs bg-sky-500 inline-block" /> Khai thác
              </span>
            </div>
          </div>

          {/* Bar Chart Canvas */}
          <div className="flex items-end justify-between gap-3 h-52 md:h-60 pt-6 pb-2 px-2 border-b border-slate-800">
            {FISHERY_TREND_DATA.map((item) => {
              const isSelected = item.year === selectedYear;

              // Heights for absolute mode
              const totalHeightPercent = (item.total / maxTotal) * 100;
              const captureHeightPercent = (item.capture / item.total) * totalHeightPercent;
              const aquacultureHeightPercent = (item.aquaculture / item.total) * totalHeightPercent;

              // Heights for percentage mode
              const shareCapture = item.captureShare;
              const shareAqua = item.aquacultureShare;

              return (
                <div
                  key={item.year}
                  onClick={() => setSelectedYear(item.year)}
                  className="flex-1 flex flex-col items-center cursor-pointer group h-full justify-end"
                >
                  {/* Top total label */}
                  <span className="text-[10px] font-mono font-semibold text-slate-300 mb-1 opacity-90 group-hover:text-emerald-400">
                    {chartMode === 'absolute' ? `${Math.round(item.total)}` : '100%'}
                  </span>

                  {/* Stacked bar */}
                  <div
                    className={`w-full max-w-[48px] rounded-t-md overflow-hidden flex flex-col-reverse transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-emerald-400 shadow-md' : 'opacity-85 group-hover:opacity-100'
                    }`}
                    style={{
                      height: chartMode === 'absolute' ? `${totalHeightPercent}%` : '100%',
                    }}
                  >
                    {/* Capture bottom portion */}
                    <div
                      className="bg-sky-600 group-hover:bg-sky-500 transition-all duration-500 flex items-center justify-center text-[9px] font-mono text-white/90"
                      style={{
                        height: chartMode === 'absolute' ? `${(item.capture / item.total) * 100}%` : `${shareCapture}%`,
                      }}
                      title={`Khai thác: ${item.capture.toLocaleString()} nghìn tấn (${item.captureShare}%)`}
                    >
                      {item.captureShare}%
                    </div>

                    {/* Aquaculture top portion */}
                    <div
                      className="bg-teal-500 group-hover:bg-teal-400 transition-all duration-500 flex items-center justify-center text-[9px] font-mono text-white/90"
                      style={{
                        height: chartMode === 'absolute' ? `${(item.aquaculture / item.total) * 100}%` : `${shareAqua}%`,
                      }}
                      title={`Nuôi trồng: ${item.aquaculture.toLocaleString()} nghìn tấn (${item.aquacultureShare}%)`}
                    >
                      {item.aquacultureShare}%
                    </div>
                  </div>

                  {/* Year X-axis label */}
                  <span
                    className={`text-xs mt-2 font-mono font-semibold transition-colors ${
                      isSelected ? 'text-emerald-400 font-bold underline' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {item.year}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
            <span>Click vào từng cột mốc năm để xem chi tiết tính toán</span>
            <span className="text-emerald-400 font-semibold">Nuôi trồng vượt khai thác từ trước năm 2010</span>
          </div>
        </div>

        {/* Right: Math Calculator & Pedagogical Analysis (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <div>
            <div className="pb-2 border-b border-slate-800 mb-3">
              <span className="text-[11px] text-emerald-400 uppercase tracking-wide font-semibold">
                Kỹ năng Địa lí: Tính tốc độ tăng trưởng
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">Năm {selectedYear} so với Năm 2010</h3>
            </div>

            {/* Formula Breakdown Card */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg mb-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 mb-1.5">
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>Công thức chuẩn tính tốc độ tăng trưởng (%):</span>
              </div>
              <div className="font-mono text-xs text-slate-200 bg-slate-950 p-2 rounded border border-slate-800 mb-2 overflow-x-auto whitespace-nowrap">
                Tăng trưởng (%) = [(Sản lượng {selectedYear} - Sản lượng 2010) / Sản lượng 2010] × 100%
              </div>
              <div className="font-mono text-xs text-sky-300 bg-slate-950 p-2 rounded border border-slate-800">
                = [({selectedData.total.toLocaleString('vi-VN')} - 5.204,5) / 5.204,5] × 100% ={' '}
                <span className="text-emerald-400 font-bold text-sm">+{growthRateFrom2010}%</span>
              </div>
            </div>

            {/* Shift Breakdown for 2024 */}
            <div className="space-y-2 mb-3 text-xs">
              <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-300">Tổng sản lượng 2024:</span>
                <span className="font-mono font-bold text-emerald-400">9.656,3 nghìn tấn (+85,5%)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-300">Nuôi trồng 2024:</span>
                <span className="font-mono font-bold text-teal-400">5.687,5 nghìn tấn (58,9%)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-300">Khai thác 2024:</span>
                <span className="font-mono font-bold text-sky-400">3.968,8 nghìn tấn (41,1%)</span>
              </div>
            </div>
          </div>

          {/* SGK Explanation Box */}
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded text-xs text-emerald-200">
            <span className="font-bold text-emerald-300 block mb-1">Giải thích sự chuyển dịch theo SGK:</span>
            <p className="text-[11px] text-emerald-100 leading-relaxed">
              Tỉ trọng nuôi trồng tăng nhanh và luôn chiếm ưu thế (từ 53,6% lên 58,9%) do <em>nguồn lợi tự nhiên ven bờ bị suy thoái, nhu cầu tiêu dùng và xuất khẩu (tôm, cá tra) tăng mạnh</em>, đồng thời công nghệ nuôi trồng ngày càng hiện đại, chủ động con giống.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span>Kim ngạch xuất khẩu thủy sản Việt Nam: Đạt &gt; 10 tỷ USD</span>
        <span>Mặt hàng chủ lực: Tôm nước lợ (sú, chân trắng), cá tra, cá basa, mực và bạch tuộc</span>
      </div>
    </div>
  );
};
