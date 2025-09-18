export interface Album {
  title: string;
  slug: string;
  tag: string;
  photos: any[]; // This will be dynamically populated
}

export const albums: Album[] = [
  {
    title: "Behind the Scenes & Details",
    slug: "behind-the-scenes-details",
    tag: "behind-the-scenes-details",
    photos: [],
  },
  {
    title: "Guests Arriving",
    slug: "guests-arriving",
    tag: "guests-arriving",
    photos: [],
  },
  {
    title: "Ceremony & Tributes",
    slug: "ceremony-tributes",
    tag: "ceremony-tributes",
    photos: [],
  },
  {
    title: "Waltz",
    slug: "waltz",
    tag: "waltz",
    photos: [],
  },
  {
    title: "The Party Vibes",
    slug: "the-party-vibes",
    tag: "party-vibes",
    photos: [],
  },
];