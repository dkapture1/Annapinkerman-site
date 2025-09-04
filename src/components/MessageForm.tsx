'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaPaperPlane } from 'react-icons/fa';

export default function MessageForm() {
  const [authorName, setAuthorName] = useState('');
  const [howWeMet, setHowWeMet] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage('');

    if (!supabase) {
      setFeedbackMessage('Error: Database connection is not configured. Message cannot be sent.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('messages').insert([
      {
        author_name: authorName,
        how_we_met: howWeMet,
        message_content: messageContent,
      },
    ]);

    if (error) {
      setFeedbackMessage(`Error: ${error.message}`);
    } else {
      setFeedbackMessage('&#10024; Thank you! Your message has been sent successfully.');
      setAuthorName('');
      setHowWeMet('');
      setMessageContent('');
    }

    setLoading(false);

    // Hide feedback message after 5 seconds
    setTimeout(() => {
      setFeedbackMessage('');
    }, 5000);
  };

  return (
    <section id="message-form" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="font-script text-5xl text-gray-800 mb-4 drop-shadow-sm">
            Leave a Message for Anna
          </h2>
          <p className="font-sans text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Share a memory or a special wish for the birthday girl!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label htmlFor="author_name" className="block font-sans text-sm font-medium text-gray-800 mb-1">Your Name</label>
              <input
                type="text"
                id="author_name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white/30 rounded-lg border border-white/40 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                placeholder="e.g., Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="how_we_met" className="block font-sans text-sm font-medium text-gray-800 mb-1">Where did we meet?</label>
              <input
                type="text"
                id="how_we_met"
                value={howWeMet}
                onChange={(e) => setHowWeMet(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white/30 rounded-lg border border-white/40 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                placeholder="e.g., from school, family friend"
              />
            </div>

            <div>
              <label htmlFor="message_content" className="block font-sans text-sm font-medium text-gray-800 mb-1">Your Message</label>
              <textarea
                id="message_content"
                rows={5}
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white/30 rounded-lg border border-white/40 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                placeholder="Share a memory, a wish, or a fun story..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 font-sans font-semibold bg-pink-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:scale-100"
              >
                <FaPaperPlane />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          {feedbackMessage && (
            <div 
              className={`mt-6 font-sans text-center p-4 rounded-lg ${feedbackMessage.startsWith('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
              dangerouslySetInnerHTML={{ __html: feedbackMessage }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
