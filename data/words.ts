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

const IT: WordCategory[] = [
  {
    key: "animals",
    name: "Animali",
    words: [
      "Elefante", "Pinguino", "Coccodrillo", "Fenicottero", "Polpo",
      "Ghepardo", "Ornitorinco", "Gorilla", "Cavalluccio marino", "Ghiottone",
    ],
  },
  {
    key: "food",
    name: "Cibo",
    words: [
      "Sushi", "Croissant", "Avocado", "Lasagna", "Bretzel",
      "Churros", "Ravioli", "Tiramisù", "Falafel", "Pancake",
    ],
  },
  {
    key: "sports",
    name: "Sport",
    words: [
      "Surf", "Scherma", "Curling", "Tiro con l'arco", "Polo",
      "Bob", "Lacrosse", "Pallamano", "Squash", "Canottaggio",
    ],
  },
  {
    key: "places",
    name: "Luoghi",
    words: [
      "Faro", "Vulcano", "Ghiacciaio", "Canyon", "Bazar",
      "Fiordo", "Piramide", "Foresta pluviale", "Monastero", "Igloo",
    ],
  },
  {
    key: "objects",
    name: "Oggetti",
    words: [
      "Periscopio", "Bussola", "Caleidoscopio", "Meridiana", "Bonsai",
      "Metronomo", "Abaco", "Telescopio", "Clessidra", "Sestante",
    ],
  },
];

const FR: WordCategory[] = [
  {
    key: "animals",
    name: "Animaux",
    words: [
      "Éléphant", "Pingouin", "Crocodile", "Flamant rose", "Pieuvre",
      "Guépard", "Ornithorynque", "Gorille", "Hippocampe", "Glouton",
    ],
  },
  {
    key: "food",
    name: "Nourriture",
    words: [
      "Sushi", "Croissant", "Avocat", "Lasagne", "Bretzel",
      "Churros", "Dumpling", "Tiramisu", "Falafel", "Crêpe",
    ],
  },
  {
    key: "sports",
    name: "Sports",
    words: [
      "Surf", "Escrime", "Curling", "Tir à l'arc", "Polo",
      "Bobsleigh", "Lacrosse", "Handball", "Squash", "Aviron",
    ],
  },
  {
    key: "places",
    name: "Lieux",
    words: [
      "Phare", "Volcan", "Glacier", "Canyon", "Bazar",
      "Fjord", "Pyramide", "Forêt tropicale", "Monastère", "Igloo",
    ],
  },
  {
    key: "objects",
    name: "Objets",
    words: [
      "Périscope", "Boussole", "Kaléidoscope", "Cadran solaire", "Bonsaï",
      "Métronome", "Boulier", "Télescope", "Sablier", "Sextant",
    ],
  },
];

const ES: WordCategory[] = [
  {
    key: "animals",
    name: "Animales",
    words: [
      "Elefante", "Pingüino", "Cocodrilo", "Flamenco", "Pulpo",
      "Guepardo", "Ornitorrinco", "Gorila", "Caballito de mar", "Glotón",
    ],
  },
  {
    key: "food",
    name: "Comida",
    words: [
      "Sushi", "Croissant", "Aguacate", "Lasaña", "Pretzel",
      "Churros", "Dumpling", "Tiramisú", "Falafel", "Tortita",
    ],
  },
  {
    key: "sports",
    name: "Deportes",
    words: [
      "Surf", "Esgrima", "Curling", "Tiro con arco", "Polo",
      "Bobsled", "Lacrosse", "Balonmano", "Squash", "Remo",
    ],
  },
  {
    key: "places",
    name: "Lugares",
    words: [
      "Faro", "Volcán", "Glaciar", "Cañón", "Bazar",
      "Fiordo", "Pirámide", "Selva tropical", "Monasterio", "Iglú",
    ],
  },
  {
    key: "objects",
    name: "Objetos",
    words: [
      "Periscopio", "Brújula", "Caleidoscopio", "Reloj de sol", "Bonsái",
      "Metrónomo", "Ábaco", "Telescopio", "Reloj de arena", "Sextante",
    ],
  },
];

const SV: WordCategory[] = [
  {
    key: "animals",
    name: "Djur",
    words: [
      "Elefant", "Pingvin", "Krokodil", "Flamingo", "Bläckfisk",
      "Gepard", "Näbbdjur", "Gorilla", "Seahäst", "Järv",
    ],
  },
  {
    key: "food",
    name: "Mat",
    words: [
      "Sushi", "Croissant", "Avokado", "Lasagne", "Kringla",
      "Churros", "Dumpling", "Tiramisu", "Falafel", "Pannkaka",
    ],
  },
  {
    key: "sports",
    name: "Sport",
    words: [
      "Surfing", "Fäktning", "Curling", "Bågskytte", "Polo",
      "Bob", "Lacrosse", "Handboll", "Squash", "Rodd",
    ],
  },
  {
    key: "places",
    name: "Platser",
    words: [
      "Fyr", "Vulkan", "Glaciär", "Kanjon", "Basar",
      "Fjord", "Pyramid", "Regnskog", "Kloster", "Igloo",
    ],
  },
  {
    key: "objects",
    name: "Föremål",
    words: [
      "Periskop", "Kompass", "Kalejdoskop", "Solur", "Bonsai",
      "Metronom", "Abakus", "Teleskop", "Timglas", "Sextant",
    ],
  },
];

export const WORD_CATEGORIES_BY_LOCALE: Record<Locale, WordCategory[]> = { en: EN, de: DE, it: IT, fr: FR, es: ES, sv: SV };

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

