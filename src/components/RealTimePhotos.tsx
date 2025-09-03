'use client';

export default function RealTimePhotos() {
  return (
    <section id="real-time-photos" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="font-script text-5xl text-gray-800 mb-4 drop-shadow-sm">
            📸 Share Your Party Photos!
          </h2>
          <p className="font-sans text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Be part of our memories! Click the button below to add the photos you take during the party. All images will appear in a gallery for everyone to enjoy together in real time.
          </p>
          <a
            href="https://shared.picturesqr.com/sokdbe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xl py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Leave your event photo here
          </a>
        </div>
      </div>
    </section>
  );
}
