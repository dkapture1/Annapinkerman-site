'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-09-06T18:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 text-center bg-white/20 backdrop-blur-md rounded-2xl shadow-xl py-6">
        <h2 className="font-script text-2xl text-gray-800 mb-6">
          Le Grand Jour approche...
        </h2>
        <div className="flex justify-center items-center gap-3 md:gap-6 text-gray-700">
          {/* Dias */}
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl">{timeLeft.days.toString().padStart(2, '0')}</p>
            <p className="font-sans text-base">Dias</p>
          </div>

          {/* Separador */}
          <div className="font-serif text-2xl text-gray-400/50">:</div>

          {/* Horas */}
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl">{timeLeft.hours.toString().padStart(2, '0')}</p>
            <p className="font-sans text-base">Horas</p>
          </div>

          {/* Separador */}
          <div className="font-serif text-2xl text-gray-400/50">:</div>

          {/* Minutos */}
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl">{timeLeft.minutes.toString().padStart(2, '0')}</p>
            <p className="font-sans text-base">Minutos</p>
          </div>
        </div>
      </div>
    </section>
  );
} 