import Header from '../components/Header';
import CountdownTimer from '../components/CountdownTimer';
import VideoPlayer from '../components/VideoPlayer';
import AboutMe from '../components/AboutMe';
import PartyDetails from '../components/PartyDetails';
import FallingPetals from '../components/FallingPetals';

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
        <FallingPetals />
      </div>
    </div>
  );
}