'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images = [
  '083be20d-8904-4bac-82aa-cfc7292795b8.JPG',
  '09cdea1a-ab5f-4202-b9de-a3bdedf6ca69.JPG',
  '0f697c26-cb8e-49fa-816f-4b300b76557e.JPG',
  '0f7292e3-8938-4578-b4b2-61697abca290.JPG',
  '1080cd88-7e4d-4e5a-bbbb-6eff6a02f32f.JPG',
  '112d818a-45f3-4c93-8c94-55848e1cb1f9.JPG',
  '21500f92-a5c2-4c46-9a64-5b4f11783273.JPG',
  '25e836be-94c6-454a-84a2-cbf80b33cc92.JPG',
  '2ae687e2-86f5-4152-8dca-1153bf6b68ab.JPG',
  '2d9ae780-53b5-4dc4-9dcd-73bec0b6a3f3.JPG',
  '30b25148-60b3-45c8-b013-4152a62cdf08.JPG',
  '37788e9a-f842-46c9-95f7-035b1d0eb1d0.JPG',
  '390c9ba5-0301-4ca6-b8c3-ad23f7fab605.JPG',
  '448c9534-d6f6-40da-bb27-abb1be6423db.JPG',
  '45a6257e-9609-4f36-b093-c7a888f3d28b.JPG',
  '4a38b728-9cda-44e8-9472-ead883022b83.JPG',
  '4bf99921-0435-473e-a338-0d48f00806e7.JPG',
  '4de7f4a5-31f4-46d4-b2b0-63e85ff5a29b.JPG',
  '550b8733-d76c-445f-8bdb-e6ba617ccd7c.JPG',
  '59852b35-7bfe-4a34-8b40-9c78287eb301.JPG',
  '6f178d10-80eb-45c3-97c9-f3ae82d07709.JPG',
  '77f5079a-955e-477a-af86-0280b9549995.JPG',
  '7cf088fb-f7be-47f3-8cf8-c9a61d4977c8.JPG',
  '8cc9a941-375b-43b5-bfca-4f9b394bd97b.JPG',
  '8d00cd49-880d-4d86-810d-6321ef213d7e.JPG',
  '9837c7a7-0b68-4e61-bbb9-25d4fbaa6270.JPG',
  '99d24a72-fd4b-4798-81e5-d81ca07a89b4.JPG',
  'a657d7aa-7ff7-4c2b-88f4-ef5d38f56096 2.JPG',
  'a657d7aa-7ff7-4c2b-88f4-ef5d38f56096.JPG',
  'ac3e40e2-b4ae-491b-92ca-03cd4cf6d365.JPG',
  'Anna_aboutme.JPG',
  'b2d9896b-3cd2-4173-bb38-09f156e7eff9.JPG',
  'ba926d41-7ddf-4462-9ea6-37b403783d81.JPG',
  'bee940f9-afea-4b3d-b579-af87bbe51e59.JPG',
  'c7c7ef78-9b9e-4da6-b651-c77d8703ee65.JPG',
  'd195a2ce-40b0-4c46-bdfe-ecf33e5b8a6d.JPG',
  'd42af11e-b4ef-4ce7-bd6f-f22effcb1128.JPG',
  'da0f95f9-b31d-4e54-95e3-022e4ff2b0d2.JPG',
  'dae8b48a-ca4d-4e35-b59c-5d655c1f2474.JPG',
  'e5748076-6cdd-4c75-a14e-b74f117b89a7.JPG',
  'eb2d69a5-1758-4561-ac27-2326e5ab90c3 2.JPG',
  'eb2d69a5-1758-4561-ac27-2326e5ab90c3.JPG',
  'eed843d3-85bb-477a-9bc6-c1eed7894588.JPG',
  'fb37821f-2b58-41fc-a5f1-984828e1e2fb.JPG',
  'fd0f1154-de80-49aa-9531-1b19d6249e2a.JPG',
  'IMG_5447.HEIC'
].filter(name => !name.endsWith('.HEIC')); // Filter out HEIC files for better browser compatibility

export default function MemoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(current => {
      const isFirstSlide = current === 0;
      return isFirstSlide ? images.length - 1 : current - 1;
    });
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(current => {
      const isLastSlide = current === images.length - 1;
      return isLastSlide ? 0 : current + 1;
    });
  }, []);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 3000);
    return () => clearInterval(timer);
  }, [goToNext]);
