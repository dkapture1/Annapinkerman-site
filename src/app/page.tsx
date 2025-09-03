import Header from '@/components/Header';
import CountdownTimer from '@/components/CountdownTimer';
import VideoPlayer from '@/components/VideoPlayer';
import AboutMe from '@/components/AboutMe';
import PartyDetails from '@/components/PartyDetails';
import MessageForm from '@/components/MessageForm';
import MemoriesCarousel from '@/components/MemoriesCarousel';
import RealTimePhotos from '@/components/RealTimePhotos';
import FallingPetals from '@/components/FallingPetals';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 w-full h-full z-0">
        {/* <PhotoSlideshow /> */}
      </div>
      <div className="relative z-10">
        <Header />
        <div id="home">
          <CountdownTimer />
        </div>
        <VideoPlayer src="/videos/hero.mp4" />
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
        <RealTimePhotos />
        <FallingPetals />
      </div>
    </div>
  );
}