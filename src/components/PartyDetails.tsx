'use client';

import { FaCalendarAlt, FaMapMarkerAlt, FaUserTie, FaFemale } from 'react-icons/fa';

export default function PartyDetails() {
  return (
    <section id="party" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="font-script text-5xl text-gray-800 mb-4 drop-shadow-sm">
            &#127881; Save the Date – 15th Birthday Celebration
          </h2>
          <p className="font-sans text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            &#10024; It’s time to celebrate a magical milestone! You are warmly invited to join us for an unforgettable evening honoring Anna Pinkerman’s 15th Birthday.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Date & Time */}
            <div className="bg-white/10 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <FaCalendarAlt className="text-4xl text-gray-800 mx-auto mb-4" />
              <h3 className="font-sans font-semibold text-xl text-gray-800 mb-2">Date & Time</h3>
              <p className="font-sans text-gray-700">Saturday, September 6th, 2025</p>
              <p className="font-sans text-gray-700">From 6:00 PM to 11:00 PM</p>
            </div>

            {/* Venue */}
            <div className="bg-white/10 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <FaMapMarkerAlt className="text-4xl text-gray-800 mx-auto mb-4" />
              <h3 className="font-sans font-semibold text-xl text-gray-800 mb-2">Venue</h3>
              <p className="font-sans text-gray-700">The View Event Venue</p>
              <p className="font-sans text-gray-700">11649 S 4000 W, Unit 310</p>
              <p className="font-sans text-gray-700 mb-6">South Jordan, Utah</p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                
                <a href="https://www.google.com/maps/search/?api=1&query=The+View+Event+Venue+South+Jordan+Utah" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/40 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                  Ver no Google Maps
                </a>
              </div>

              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.073456315268!2d-112.00033602324724!3d40.5401949714364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8752848f98888879%3A0x89b66f2b2c89659b!2sThe%20View%20Event%20Venue!5e0!3m2!1sen!2sus!4v1693710000000!5m2!1sen!2sus" width="100%" height="300" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg mt-4"></iframe>
            </div>

            {/* Dress Code */}
            <div className="bg-white/10 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center items-center gap-4 mb-4">
                <FaFemale className="text-4xl text-gray-800" />
                <FaUserTie className="text-4xl text-gray-800" />
              </div>
              <h3 className="font-sans font-semibold text-xl text-gray-800 mb-2">Dress Code</h3>
              <p className="font-sans text-gray-700">Ladies: Elegant gowns</p>
              <p className="font-sans text-gray-700">Gentlemen: Black tie – tuxedos or formal suits</p>
              <p className="font-sans text-sm text-gray-600 mt-2">Let’s make the night even more special with timeless elegance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
