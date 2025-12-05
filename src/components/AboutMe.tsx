'use client';

import Image from 'next/image';

export default function AboutMe() {
  return (
    <section id="about-me" className="py-24 w-full overflow-x-hidden px-4 md:px-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12">
          <div className="md:grid md:grid-cols-3 md:gap-12">
            {/* Coluna da Esquerda (Imagem) */}
            <div className="md:col-span-1 flex items-center justify-center mb-8 md:mb-0">
              <div className="relative w-64 h-80 rounded-2xl shadow-lg overflow-hidden border-4 border-white/50">
                <Image
                  src="/images/Anna_aboutme.JPG"
                  alt="Anna Pinkerman"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>

            {/* Coluna da Direita (Conteúdo) */}
            <div className="md:col-span-2">
              <h2 className="font-script text-5xl text-gray-800 mb-6 text-center md:text-left">
                Anna Pinkerman
              </h2>
              <p className="font-sans text-xl text-gray-600 mb-8 text-center md:text-left">
                Hey there, I’m Anna. This is 2025 and I’m living out one of my biggest dreams…I am turning 15!
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-sans font-semibold text-gray-800">Who She Is</h3>
                  <p className="font-sans text-gray-700">I’m a dreamer, full of energy, and totally obsessed with following Christ, family, Samoyeds ( Oskar, my best friend), supercars, soccer, Formula 1, and nature. I am also a writer. I finished my first book at age 13.</p>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-gray-800">Hobbies and Passions</h3>
                  <p className="font-sans text-gray-700">I love sports such as soccer and car racing; I also enjoy photography and playing the piano. I love traveling and my dream of spending spring in Paris inspired the theme of my 15th birthday “Floral Paris”.</p>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-gray-800">A Little of Her Story</h3>
                  <p className="font-sans text-gray-700">Named after my maternal grandmother Vovo Anita I can say that My Life Journey so far has been a blast! full of fun and excitement. As I was born in an incredible family, my Mom is Brazilian and my Dad is American; I have been blessed with the best of both worlds. I have two amazing brothers (Zack and Jacob) and it feels wonderful to be the only daughter. When I was only 8 years-old I was blessed to move to my new neighborhood where I met James, The Stradman, who inspired me in so many good ways and to him I attribute my passion for supercars. James’s Pink Lamborghini Aventador is my favorite car in the world. The opportunity to do pictures with my favorite car was truly a dream come true!</p>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-gray-800">What Turning 15 Means to Her</h3>
                  <p className="font-sans text-gray-700">Saying goodbye to a beautiful childhood and stepping towards growing up… It’s the start of a new promising chapter!</p>
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