export type WordCategory = {
  name: string;
  words: string[];
};

export const WORD_CATEGORIES: WordCategory[] = [
  {
    name: "Animals",
    words: [
      "Elephant", "Penguin", "Crocodile", "Flamingo", "Octopus",
      "Cheetah", "Platypus", "Gorilla", "Seahorse", "Wolverine",
    ],
  },
  {
    name: "Food",
    words: [
      "Sushi", "Croissant", "Avocado", "Lasagna", "Pretzel",
      "Churro", "Dumpling", "Tiramisu", "Falafel", "Pancake",
    ],
  },
  {
    name: "Sports",
    words: [
      "Surfing", "Fencing", "Curling", "Archery", "Polo",
      "Bobsled", "Lacrosse", "Handball", "Squash", "Rowing",
    ],
  },
  {
    name: "Places",
    words: [
      "Lighthouse", "Volcano", "Glacier", "Canyon", "Bazaar",
      "Fjord", "Pyramid", "Rainforest", "Monastery", "Igloo",
    ],
  },
  {
    name: "Objects",
    words: [
      "Periscope", "Compass", "Kaleidoscope", "Sundial", "Bonsai",
      "Metronome", "Abacus", "Telescope", "Hourglass", "Sextant",
    ],
  },
];

export function getRandomWord(category?: string): string {
  const pool = category
    ? WORD_CATEGORIES.find((c) => c.name === category)?.words ?? []
    : WORD_CATEGORIES.flatMap((c) => c.words);
  return pool[Math.floor(Math.random() * pool.length)];
}
