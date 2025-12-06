import React, { useState, useEffect } from 'react';
import { Quote } from '../types';
import { generateWisdom } from '../services/gemini';

interface InterventionModalProps {
  isOpen: boolean;
  quote: Quote;
  onCancel: () => void;
  onConfirmReset: () => void;
}

const InterventionModal: React.FC<InterventionModalProps> = ({ isOpen, quote, onCancel, onConfirmReset }) => {
  const [displayedQuote, setDisplayedQuote] = useState<Quote>(quote);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);

  // Update displayed quote when prop changes
  useEffect(() => {
    setDisplayedQuote(quote);
    setAiUsed(false);
  }, [quote, isOpen]);

  const handleGetAiWisdom = async () => {
    setLoadingAi(true);
    const wisdom = await generateWisdom();
    if (wisdom) {
      setDisplayedQuote({ text: wisdom, author: "Gemini Wisdom" });
      setAiUsed(true);
    }
    setLoadingAi(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onCancel}
      />

      {/* Modal Content */}
      <div className="relative bg-m3-surface dark:bg-[#1E1E1E] w-full max-w-sm rounded-[2rem] p-6 shadow-2xl transform transition-all scale-100 animate-[fadeIn_0.2s_ease-out]">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-m3-secondaryContainer dark:bg-m3-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ✋
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Pause & Reflect</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Are you sure you want to reset your streak?</p>
        </div>

        <div className="bg-m3-surfaceVariant dark:bg-[#2D2D2D] p-6 rounded-2xl mb-8 relative overflow-hidden transition-colors">
          <div className="absolute top-0 left-0 w-2 h-full bg-m3-primary/30 dark:bg-m3-dark-primary/30"></div>
          <p className="text-gray-700 dark:text-gray-200 italic font-medium text-lg leading-relaxed">
            "{displayedQuote.text}"
          </p>
          <p className="text-right text-xs font-bold text-gray-400 dark:text-gray-500 mt-4 uppercase tracking-wider">
            — {displayedQuote.author}
          </p>
          
          {process.env.API_KEY && !aiUsed && (
            <button 
              onClick={handleGetAiWisdom}
              disabled={loadingAi}
              className="mt-4 text-xs flex items-center gap-1 text-m3-primary dark:text-m3-dark-primary hover:underline w-full justify-end"
            >
              {loadingAi ? 'Thinking...' : '✨ Ask AI for strength'}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onCancel}
            className="w-full py-4 rounded-xl bg-m3-primary dark:bg-m3-dark-primary text-white dark:text-black font-semibold shadow-lg hover:shadow-xl hover:bg-m3-primary/90 dark:hover:bg-m3-dark-primary/90 transition-all active:scale-[0.98]"
          >
            I stayed strong
          </button>
          <button
            onClick={onConfirmReset}
            className="w-full py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors text-sm"
          >
            I slipped up (Reset Streak)
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterventionModal;