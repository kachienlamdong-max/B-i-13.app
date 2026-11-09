/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { TimelineBar } from './components/TimelineBar';
import { MainCanvas } from './components/MainCanvas';
import { ControlQuizPanel } from './components/ControlQuizPanel';
import { BottomStatusBar } from './components/BottomStatusBar';
import { LESSON_SECTIONS, Question } from './data/lessonData';
import { speechNarrator } from './utils/speechUtils';

export default function App() {
  const [currentSectionId, setCurrentSectionId] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // 45 minutes = 2700s
  const [totalTimeRemaining, setTotalTimeRemaining] = useState<number>(45 * 60);

  // Current section allocated timer
  const currentSection = useMemo(
    () => LESSON_SECTIONS.find((s) => s.id === currentSectionId) || LESSON_SECTIONS[0],
    [currentSectionId]
  );

  const [sectionTimeRemaining, setSectionTimeRemaining] = useState<number>(
    currentSection.allocatedMinutes * 60
  );

  // User answers dictionary: { [questionId]: answer }
  const [userAnswers, setUserAnswers] = useState<Record<string, string | boolean>>({});

  // Submitted status per slide: { [slideId]: boolean }
  const [submittedSlides, setSubmittedSlides] = useState<Record<number, boolean>>({});

  // Reset section timer whenever slide changes
  useEffect(() => {
    setSectionTimeRemaining(currentSection.allocatedMinutes * 60);
    speechNarrator.stop();
  }, [currentSectionId, currentSection.allocatedMinutes]);

  // Master countdown timer interval
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTotalTimeRemaining((prev) => Math.max(0, prev - 1));
      setSectionTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Calculate total score
  const allQuestions = useMemo(() => {
    const list: Question[] = [];
    LESSON_SECTIONS.forEach((sec) => {
      if (sec.questions) {
        list.push(...sec.questions);
      }
    });
    return list;
  }, []);

  const totalScore = useMemo(() => {
    let score = 0;
    allQuestions.forEach((q) => {
      if (submittedSlides[q.slideId] && userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  }, [allQuestions, userAnswers, submittedSlides]);

  const maxScore = allQuestions.length; // 14 questions

  // Handlers
  const handleSelectSection = (id: number) => {
    setCurrentSectionId(id);
  };

  const handleTogglePlay = () => {
    setIsRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setTotalTimeRemaining(45 * 60);
    setSectionTimeRemaining(currentSection.allocatedMinutes * 60);
  };

  const handleAnswerChange = (questionId: string, answer: string | boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmitSlide = (slideId: number) => {
    setSubmittedSlides((prev) => ({
      ...prev,
      [slideId]: true,
    }));
  };

  const handleResetSlideQuiz = (slideId: number) => {
    const targetSection = LESSON_SECTIONS.find((s) => s.id === slideId);
    if (!targetSection) return;

    setUserAnswers((prev) => {
      const updated = { ...prev };
      targetSection.questions.forEach((q) => {
        delete updated[q.id];
      });
      return updated;
    });

    setSubmittedSlides((prev) => ({
      ...prev,
      [slideId]: false,
    }));
  };

  const handleResetEntireQuiz = () => {
    setUserAnswers({});
    setSubmittedSlides({});
    setCurrentSectionId(0);
    handleResetTimer();
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 select-none">
      {/* 1. Header Bar following Top Bar Contract */}
      <HeaderBar
        currentSectionId={currentSectionId}
        onSelectSection={handleSelectSection}
        totalScore={totalScore}
        maxScore={maxScore}
      />

      {/* 2. 45-Minute Lesson Timeline & Countdown Control Bar */}
      <TimelineBar
        currentSectionId={currentSectionId}
        onSelectSection={handleSelectSection}
        totalTimeRemaining={totalTimeRemaining}
        sectionTimeRemaining={sectionTimeRemaining}
        isRunning={isRunning}
        onTogglePlay={handleTogglePlay}
        onResetTimer={handleResetTimer}
      />

      {/* 3. Main Split View: 70% Canvas (Left) + 30% Control/Quiz Panel (Right) */}
      <main className="flex-1 min-h-0 p-3 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full">
          {/* Main Canvas (approx 70% width on desktop) */}
          <section className="lg:col-span-8 xl:col-span-8 h-full flex flex-col min-h-0">
            <MainCanvas
              currentSectionId={currentSectionId}
              onSelectSection={handleSelectSection}
              totalScore={totalScore}
              maxScore={maxScore}
              userAnswers={userAnswers}
              onResetQuiz={handleResetEntireQuiz}
            />
          </section>

          {/* Control & Quiz Panel (approx 30% width on desktop) */}
          <aside className="lg:col-span-4 xl:col-span-4 h-full flex flex-col min-h-0">
            <ControlQuizPanel
              currentSectionId={currentSectionId}
              onSelectSection={handleSelectSection}
              totalTimeRemaining={totalTimeRemaining}
              sectionTimeRemaining={sectionTimeRemaining}
              isRunning={isRunning}
              onTogglePlay={handleTogglePlay}
              onResetTimer={handleResetTimer}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              submittedSlides={submittedSlides}
              onSubmitSlide={handleSubmitSlide}
              onResetSlideQuiz={handleResetSlideQuiz}
            />
          </aside>
        </div>
      </main>

      {/* 4. Bottom Feedback Box & Dynamic Data Dashboard */}
      <BottomStatusBar
        currentSectionId={currentSectionId}
        isSlideSubmitted={submittedSlides[currentSectionId] || false}
        userAnswers={userAnswers}
      />
    </div>
  );
}
