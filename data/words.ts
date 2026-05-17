import type { Locale } from "@/lib/i18n";

export type WordCategory = {
  key: string;
  name: string;
  words: string[];
};

const EN: WordCategory[] = [
  {
    key: "animals",
    name: "Animals",
    words: [
      "Elephant", "Penguin", "Crocodile", "Flamingo", "Octopus",
      "Cheetah", "Platypus", "Gorilla", "Seahorse", "Wolverine",
    ],
  },
  {
    key: "food",
    name: "Food",
    words: [
      "Sushi", "Croissant", "Avocado", "Lasagna", "Pretzel",
      "Churro", "Dumpling", "Tiramisu", "Falafel", "Pancake",
    ],
  },
  {
    key: "sports",
    name: "Sports",
    words: [
      "Surfing", "Fencing", "Curling", "Archery", "Polo",
      "Bobsled", "Lacrosse", "Handball", "Squash", "Rowing",
    ],
  },
  {
    key: "places",
    name: "Places",
    words: [
      "Lighthouse", "Volcano", "Glacier", "Canyon", "Bazaar",
      "Fjord", "Pyramid", "Rainforest", "Monastery", "Igloo",
    ],
  },
  {
    key: "objects",
    name: "Objects",
    words: [
      "Periscope", "Compass", "Kaleidoscope", "Sundial", "Bonsai",
      "Metronome", "Abacus", "Telescope", "Hourglass", "Sextant",
    ],
  },
];

const DE: WordCategory[] = [
  {
    key: "animals",
    name: "Tiere",
    words: [
      "Elefant", "Pinguin", "Krokodil", "Flamingo", "Oktopus",
      "Gepard", "Schnabeltier", "Gorilla", "Seepferdchen", "Vielfraß",
    ],
  },
  {
    key: "food",
    name: "Essen",
    words: [
      "Sushi", "Croissant", "Avocado", "Lasagne", "Brezel",
      "Churros", "Knödel", "Tiramisu", "Falafel", "Pfannkuchen",
    ],
  },
  {
    key: "sports",
    name: "Sport",
    words: [
      "Surfen", "Fechten", "Curling", "Bogenschießen", "Polo",
      "Bobfahren", "Lacrosse", "Handball", "Squash", "Rudern",
    ],
  },
  {
    key: "places",
    name: "Orte",
    words: [
      "Leuchtturm", "Vulkan", "Gletscher", "Schlucht", "Basar",
      "Fjord", "Pyramide", "Regenwald", "Kloster", "Iglu",
    ],
  },
  {
    key: "objects",
    name: "Gegenstände",
    words: [
      "Periskop", "Kompass", "Kaleidoskop", "Sonnenuhr", "Bonsai",
      "Metronom", "Abakus", "Teleskop", "Sanduhr", "Sextant",
    ],
  },
];

export const WORD_CATEGORIES_BY_LOCALE: Record<Locale, WordCategory[]> = { en: EN, de: DE };

/** Returns the word categories for the given locale. */
export function getWordCategories(locale: Locale = "en"): WordCategory[] {
  return WORD_CATEGORIES_BY_LOCALE[locale] ?? EN;
}

export function getRandomWord(category?: string, locale: Locale = "en"): string {
  const cats = getWordCategories(locale);
  const pool = category
    ? cats.find((c) => c.key === category)?.words ?? []
    : cats.flatMap((c) => c.words);
  return pool[Math.floor(Math.random() * pool.length)];
}

// Backward-compat alias
export const WORD_CATEGORIES = EN;

