/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Headphones,
  Check,
  X,
  HelpCircle,
  ArrowRight,
  Send,
  Sparkles,
  Calculator,
} from 'lucide-react';
import { LESSON_SECTIONS, Question } from '../data/lessonData';
import { speechNarrator } from '../utils/speechUtils';

interface ControlQuizPanelProps {
  currentSectionId: number;
  onSelectSection: (id: number) => void;
  totalTimeRemaining: number;
  sectionTimeRemaining: number;
  isRunning: boolean;
  onTogglePlay: () => void;
  onResetTimer: () => void;
  userAnswers: Record<string, string | boolean>;
  onAnswerChange: (questionId: string, answer: string | boolean) => void;
  submittedSlides: Record<number, boolean>;
  onSubmitSlide: (slideId: number) => void;
  onResetSlideQuiz: (slideId: number) => void;
}

export const ControlQuizPanel: React.FC<ControlQuizPanelProps> = ({
  currentSectionId,
  onSelectSection,
  totalTimeRemaining,
  sectionTimeRemaining,
  isRunning,
  onTogglePlay,
  onResetTimer,
  userAnswers,
  onAnswerChange,
  submittedSlides,
  onSubmitSlide,
  onResetSlideQuiz,
}) => {
  const [isVoiceMuted, setIsVoiceMuted] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [isSpeakingNarration, setIsSpeakingNarration] = useState<boolean>(false);

  const currentSection =
    LESSON_SECTIONS.find((s) => s.id === currentSectionId) || LESSON_SECTIONS[1];
  const questions: Question[] = currentSection.questions || [];
  const isSlideSubmitted = submittedSlides[currentSectionId] || false;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.max(0, seconds) / 60);
    const secs = Math.max(0, seconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle voice narration
  const handleToggleVoice = () => {
    if (isSpeakingNarration) {
      speechNarrator.stop();
      setIsSpeakingNarration(false);
    } else {
      setIsSpeakingNarration(true);
      speechNarrator.speak(
        currentSection.narrationText,
        () => setIsSpeakingNarration(true),
        () => setIsSpeakingNarration(false),
        () => setIsSpeakingNarration(false)
      );
    }
  };

  // Read answer and explanation via audio
  const handleListenAnswers = () => {
    if (questions.length === 0) return;

    let explanationAudio = `Đáp án và lời giải chi tiết cho ${currentSection.shortTitle}: `;
    questions.forEach((q, idx) => {
      const correctAnsText =
        q.type === 'true_false'
          ? q.correctAnswer ? 'Đúng' : 'Sai'
          : `Đáp án ${q.correctAnswer}`;
      explanationAudio += `Câu ${idx + 1}: ${correctAnsText}. ${q.explanation} `;
    });

    speechNarrator.speak(explanationAudio);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* 1. Control Toolbar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Main Controls: Play, Reset, Voice, Listen Answer */}
          <div className="flex items-center gap-1">
            <button
              onClick={onTogglePlay}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                isRunning
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
              title={isRunning ? 'Tạm dừng bài học' : 'Chạy tiếp bài học'}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => onResetSlideQuiz(currentSectionId)}
              className="p-1.5 rounded-md text-slate-600 hover:bg-slate-200 transition-colors"
              title="Làm lại bài tập phần này"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleToggleVoice}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                isSpeakingNarration
                  ? 'bg-emerald-100 text-emerald-800 font-medium'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
              title="Bật/Tắt thuyết minh bài giảng bằng giọng đọc"
            >
              {isSpeakingNarration ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Thuyết minh</span>
            </button>

            <button
              onClick={handleListenAnswers}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-600 hover:bg-slate-200 transition-colors"
              title="Nghe đọc đáp án và giải thích chi tiết"
            >
              <Headphones className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Nghe đáp án</span>
            </button>
          </div>

          {/* Individual Section Timer */}
          <div className="flex items-center gap-1.5 text-xs bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
            <span className="text-slate-500">Hạn giờ:</span>
            <span className="font-mono font-bold tabular-nums text-emerald-700">
              {formatTime(sectionTimeRemaining)}
            </span>
          </div>
        </div>

        {/* Section Title Heading */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/80">
          <span className="font-bold text-slate-800 truncate">
            {currentSection.shortTitle}
          </span>
          <span className="text-slate-500 shrink-0">
            {questions.length > 0 ? `${questions.length} câu hỏi` : 'Thuyết trình'}
          </span>
        </div>
      </div>

      {/* 2. Interactive Quiz Zone (Scrollable Body) */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {questions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <Sparkles className="w-8 h-8 text-emerald-500 mb-2" />
            <h4 className="font-semibold text-slate-800 text-sm mb-1">
              Phần khởi động & định hướng
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mb-4">
              Hãy quan sát khung hiển thị và sẵn sàng bước vào bài tập ở Slide 1.
            </p>
            <button
              onClick={() => onSelectSection(1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-xs shadow-xs hover:bg-emerald-700 transition-colors"
            >
              <span>Vào Slide 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          questions.map((q, idx) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = isSlideSubmitted && userAnswer === q.correctAnswer;
            const isWrong = isSlideSubmitted && userAnswer !== undefined && userAnswer !== q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-3 rounded-lg border transition-all text-xs ${
                  isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : isWrong
                    ? 'bg-rose-50/70 border-rose-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                {/* Question Prompt */}
                <div className="flex items-start gap-2 mb-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 leading-snug">{q.prompt}</p>
                    {q.type === 'calculation' && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-indigo-700 font-semibold mt-1">
                        <Calculator className="w-3 h-3" /> Bài tập tính toán số liệu
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Interactive Options */}
                {q.type === 'true_false' && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => !isSlideSubmitted && onAnswerChange(q.id, true)}
                      disabled={isSlideSubmitted}
                      className={`py-2 px-3 rounded-md font-semibold text-xs border text-center transition-all ${
                        userAnswer === true
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      ĐÚNG
                    </button>
                    <button
                      onClick={() => !isSlideSubmitted && onAnswerChange(q.id, false)}
                      disabled={isSlideSubmitted}
                      className={`py-2 px-3 rounded-md font-semibold text-xs border text-center transition-all ${
                        userAnswer === false
                          ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      SAI
                    </button>
                  </div>
                )}

                {(q.type === 'mcq' || q.type === 'calculation') && q.options && (
                  <div className="space-y-1.5 mt-2">
                    {q.options.map((opt) => {
                      const isOptionSelected = userAnswer === opt.id;
                      const isOptionCorrect = isSlideSubmitted && opt.id === q.correctAnswer;
                      const isOptionSelectedWrong = isSlideSubmitted && isOptionSelected && opt.id !== q.correctAnswer;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => !isSlideSubmitted && onAnswerChange(q.id, opt.id)}
                          disabled={isSlideSubmitted}
                          className={`w-full text-left p-2 rounded-md border text-xs flex items-start gap-2 transition-all ${
                            isOptionCorrect
                              ? 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-medium'
                              : isOptionSelectedWrong
                              ? 'bg-rose-100/80 border-rose-400 text-rose-950'
                              : isOptionSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 ${
                            isOptionSelected ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {opt.id}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Pedagogical Hint (if requested) */}
                {showHints && !isSlideSubmitted && q.hint && (
                  <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-800">
                    <strong>Gợi ý SGK:</strong> {q.hint}
                  </div>
                )}

                {/* Post-submission brief feedback indicator */}
                {isSlideSubmitted && (
                  <div className={`mt-2 flex items-center gap-1.5 text-[11px] font-semibold ${
                    isCorrect ? 'text-emerald-700' : 'text-rose-700'
                  }`}>
                    {isCorrect ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Chính xác! Xem giải thích chi tiết phía dưới.</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3.5 h-3.5 text-rose-600" />
                        <span>Chưa chính xác! Đáp án đúng: {q.type === 'true_false' ? (q.correctAnswer ? 'ĐÚNG' : 'SAI') : q.correctAnswer}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 3. Bottom Action Bar: [LUYỆN TẬP] & [NỘP BÀI] */}
      {questions.length > 0 && (
        <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            {!isSlideSubmitted ? (
              <>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    showHints
                      ? 'bg-amber-100 border-amber-300 text-amber-800'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{showHints ? 'Ẩn Gợi ý' : 'Luyện tập (Gợi ý)'}</span>
                </button>

                <button
                  onClick={() => onSubmitSlide(currentSectionId)}
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>NỘP BÀI</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onResetSlideQuiz(currentSectionId)}
                  className="flex-1 py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại phần này</span>
                </button>

                <button
                  onClick={() => onSelectSection(Math.min(7, currentSectionId + 1))}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>{currentSectionId === 6 ? 'Xem Bảng điểm' : 'Phần tiếp theo'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
