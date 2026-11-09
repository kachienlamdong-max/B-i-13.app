/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Web Speech API utility for Vietnamese educational narration
 */

export class SpeechNarrator {
  private static instance: SpeechNarrator;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isMuted: boolean = false;
  private isSpeaking: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public static getInstance(): SpeechNarrator {
    if (!SpeechNarrator.instance) {
      SpeechNarrator.instance = new SpeechNarrator();
    }
    return SpeechNarrator.instance;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (e: SpeechSynthesisErrorEvent) => void
  ): void {
    if (!this.synth || this.isMuted || !text.trim()) {
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick best Vietnamese voice if available
    const voices = this.synth.getVoices();
    const viVoice = voices.find((v) => v.lang.startsWith('vi') || v.lang === 'vi_VN' || v.lang === 'vi-VN');
    if (viVoice) {
      utterance.voice = viVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onError) onError(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechNarrator = SpeechNarrator.getInstance();
