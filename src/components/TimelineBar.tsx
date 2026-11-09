/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { LESSON_SECTIONS } from '../data/lessonData';

interface TimelineBarProps {
  currentSectionId: number;
  onSelectSection: (id: number) => void;
  totalTimeRemaining: number; // in seconds
  sectionTimeRemaining: number; // in seconds
  isRunning: boolean;
  onTogglePlay: () => void;
  onResetTimer: () => void;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  currentSectionId,
  onSelectSection,
  totalTimeRemaining,
  sectionTimeRemaining,
  isRunning,
  onTogglePlay,
  onResetTimer,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.max(0, seconds) / 60);
    const secs = Math.max(0, seconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 45 minutes = 2700s
  const totalDuration = 45 * 60;
  const elapsedPercent = Math.min(100, Math.max(0, ((totalDuration - totalTimeRemaining) / totalDuration) * 100));

  return (
    <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: 45-min Master Lesson Clock & Section Clock */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tiết học:</span>
            <span className="font-mono tabular-nums font-bold text-slate-900 text-sm">
              {formatTime(totalTimeRemaining)}
            </span>
            <span className="text-slate-400">/ 45:00</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-200 px-2.5 py-1.5 rounded-md shadow-2xs">
            <span>Phần hiện tại:</span>
            <span className="font-mono tabular-nums font-semibold text-emerald-700">
              {formatTime(sectionTimeRemaining)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onTogglePlay}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                isRunning
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
              title={isRunning ? 'Tạm dừng đếm thời gian' : 'Tiếp tục đếm'}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onResetTimer}
              className="p-1.5 rounded-md text-slate-600 hover:bg-slate-200 transition-colors"
              title="Đặt lại đồng hồ tiết học"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center/Right: 8-Phase Step Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 text-xs">
          {LESSON_SECTIONS.map((sec) => {
            const isActive = currentSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{sec.id === 0 ? 'Khởi động' : sec.id === 7 ? 'Tổng kết' : `S${sec.id}`}</span>
                <span className={`text-[10px] ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                  ({sec.allocatedMinutes}')
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
        <div
          className="bg-emerald-600 h-full transition-all duration-300 ease-out"
          style={{ width: `${elapsedPercent}%` }}
        />
      </div>
    </div>
  );
};
