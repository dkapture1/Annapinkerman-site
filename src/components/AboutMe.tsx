'use client';

import { FaCamera, FaFan } from 'react-icons/fa';

export default function AboutMe() {
  return (
    <section id="about-me" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12">
          <div className="md:grid md:grid-cols-3 md:gap-12">
            {/* Coluna da Esquerda (Imagem) */}
            <div className="md:col-span-1 flex items-center justify-center mb-8 md:mb-0">
              <div className="w-64 h-80 bg-white/30 rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                <FaFan className="text-white/50 text-6xl" />
              </div>
            </div>

            {/* Coluna da Direita (Conteúdo) */}
            <div className="md:col-span-2">
              <h2 className="font-script text-5xl text-gray-800 mb-6 text-center md:text-left">
                Anna Pinkerman
              </h2>
              <p className="font-sans text-xl text-gray-600 mb-8 text-center md:text-left">
                Hey there, I’m Anna, and in 2025, I’m living out one of my biggest dreams: turning 15!
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-sans font-semibold text-gray-800">Who She Is</h3>
                  <p className="font-sans text-gray-700">I’m a dreamer, full of energy, and totally obsessed with sports and nature.</p>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-gray-800">Hobbies and Passions</h3>
                  <p className="font-sans text-gray-700">I love sports like soccer and cars, and I also enjoy photography and playing the piano. My favorite flowers are a huge passion too—they even inspired the theme of my party!</p>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-gray-800">A Little of Her Story</h3>
                  <p className="font-sans text-gray-700">My journey so far has been a blast full of fun and excitement. As a kid, I’d chase a soccer ball in the backyard and snap pictures of the flowers in my grandma’s garden. A big win for me was learning to play my first songs on the piano, and now I can’t wait to celebrate this milestone with everyone I love.</p>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-gray-800">What Turning 15 Means to Her</h3>
                  <p className="font-sans text-gray-700">This date means an amazing transformation, a step toward growing up, and a dream coming true that I’ve held onto for so long. It’s the start of a new chapter!</p>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-gray-800">Message to the Guests</h3>
                  <p className="font-sans text-gray-700">This day wouldn’t be complete without you all—my friends and family—to share it with. Thank you for being part of this super special celebration!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}