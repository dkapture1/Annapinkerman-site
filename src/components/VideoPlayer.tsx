interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <section className="relative w-full h-[50vh] overflow-hidden my-10 text-center">
      <h2 className="font-script text-4xl text-gray-800 mb-6">Um Momento Especial</h2>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl" />
      <video
        src={src}
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-contain rounded-2xl"
      >
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </section>
  );
}