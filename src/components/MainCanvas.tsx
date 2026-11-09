/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { Maximize2, Minimize2, Info, ChevronRight } from 'lucide-react';
import { LESSON_SECTIONS } from '../data/lessonData';
import { Slide0Intro } from './canvas/Slide0Intro';
import { Slide1ForestDistribution } from './canvas/Slide1ForestDistribution';
import { Slide2ForestryValueChain } from './canvas/Slide2ForestryValueChain';
import { Slide3RiverBasinSimulation } from './canvas/Slide3RiverBasinSimulation';
import { Slide4FisheryMarineMap } from './canvas/Slide4FisheryMarineMap';
import { Slide5FisheryTrendChart } from './canvas/Slide5FisheryTrendChart';
import { Slide6RegionalSustainable } from './canvas/Slide6RegionalSustainable';
import { Slide7SummaryReport } from './canvas/Slide7SummaryReport';

interface MainCanvasProps {
  currentSectionId: number;
  onSelectSection: (id: number) => void;
  totalScore: number;
  maxScore: number;
  userAnswers: Record<string, string | boolean>;
  onResetQuiz: () => void;
}

export const MainCanvas: React.FC<MainCanvasProps> = ({
  currentSectionId,
  onSelectSection,
  totalScore,
  maxScore,
  userAnswers,
  onResetQuiz,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentSection =
    LESSON_SECTIONS.find((sec) => sec.id === currentSectionId) || LESSON_SECTIONS[0];

  const handleToggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.warn('Fullscreen request failed:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.warn('Exit fullscreen failed:', err);
      }
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-sm"
    >
      {/* Top Quick Instruction Bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-300 shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Info className="w-3 h-3" />
          </div>
          <span className="font-semibold text-emerald-400 shrink-0">Hướng dẫn:</span>
          <p className="truncate text-slate-300 text-xs">{currentSection.instruction}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-slate-400">
            Phần {currentSection.id} / 7
          </span>
        </div>
      </div>

      {/* Main 16:9 Interactive Screen Area */}
      <div className="relative flex-1 w-full overflow-hidden p-2 md:p-3">
        <div className="w-full h-full rounded-lg overflow-hidden">
          {currentSectionId === 0 && (
            <Slide0Intro onStartLesson={() => onSelectSection(1)} />
          )}
          {currentSectionId === 1 && <Slide1ForestDistribution />}
          {currentSectionId === 2 && <Slide2ForestryValueChain />}
          {currentSectionId === 3 && <Slide3RiverBasinSimulation />}
          {currentSectionId === 4 && <Slide4FisheryMarineMap />}
          {currentSectionId === 5 && <Slide5FisheryTrendChart />}
          {currentSectionId === 6 && <Slide6RegionalSustainable />}
          {currentSectionId === 7 && (
            <Slide7SummaryReport
              totalScore={totalScore}
              maxScore={maxScore}
              userAnswers={userAnswers}
              onResetQuiz={onResetQuiz}
              onGoToSlide={onSelectSection}
            />
          )}
        </div>

        {/* FullScreen Button at bottom right corner */}
        <button
          onClick={handleToggleFullscreen}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-medium border border-slate-700/80 shadow-md backdrop-blur-xs transition-all hover:scale-105"
          title={isFullscreen ? 'Thu nhỏ màn hình' : 'Bật toàn màn hình'}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
        </button>
      </div>
    </div>
  );
};
