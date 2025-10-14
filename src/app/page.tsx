import Header from '@/components/Header';
import VideoPlayer from '@/components/VideoPlayer';
import AboutMe from '@/components/AboutMe';
import PartyDetails from '@/components/PartyDetails';
import MessageForm from '@/components/MessageForm';
import MemoriesCarousel from '@/components/MemoriesCarousel';
import FallingPetals from '@/components/FallingPetals';
import PhotoGallery from '@/components/PhotoGallery';
import VideoGallery from '@/components/VideoGallery';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden max-w-full">
      <div className="absolute inset-0 w-full h-full z-0">
        {/* <PhotoSlideshow /> */}
      </div>
      <div className="relative z-10">
        <Header />
        <VideoPlayer />
        <div id="home" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
          <h2 className="font-script text-4xl sm:text-5xl md:text-7xl text-center text-gray-800">
            Celebrating Anna&apos;s Sweet Fifteen
          </h2>
          <PhotoGallery />
        </div>
        <section>
          <h2 className="font-script text-4xl sm:text-5xl md:text-7xl text-center text-gray-800">
            Movies
          </h2>
          <VideoGallery />
        </section>
        <AboutMe />
        <PartyDetails />
        <MessageForm />
        <section id="memories" className="py-24 text-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-script text-5xl text-gray-800 mb-12 drop-shadow-sm">
              Our Sweetest Memories
            </h2>
            <MemoriesCarousel />
          </div>
        </section>
        <FallingPetals />
      </div>
    </div>
  );
}