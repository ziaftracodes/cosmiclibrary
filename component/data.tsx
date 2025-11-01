
import React from 'react';
import { Atom, Landmark, Palette, Cpu, BrainCircuit, Rocket } from 'lucide-react';

// --- ICONS ---
// To keep data JSON-like, we map icon names to components.
const icons: { [key: string]: React.ReactNode } = {
  Atom: <Atom size={40} />,
  Landmark: <Landmark size={40} />,
  Palette: <Palette size={40} />,
  Cpu: <Cpu size={40} />,
  BrainCircuit: <BrainCircuit size={40} />,
  Rocket: <Rocket size={40} />,
};

export const getIcon = (name: string) => {
  return icons[name] || null;
}

// --- DATA TYPES ---
export interface Category {
  id: string;
  name: string;
  icon: string; // Icon name
  description: string;
  gradient: string;
}

export interface ArticleContentBlock {
  type: 'paragraph' | 'quote' | 'image';
  text?: string;
  author?: string; // For quotes
  src?: string;
  caption?: string; // For images
}

export interface Article {
  id: string;
  title: string;
  categoryId: string;
  summary: string;
  thumbnail: string;
  colorTheme: string;
  content: ArticleContentBlock[];
  related: string[];
  views: number; // For "Most Read" sorting
  createdAt: string; // For "Newest" sorting
}

// --- SIMULATED DATABASE ---
// FIX: Renamed categoriesData to categories and exported it to fix import error.
export const categories: Category[] = [
    { id: 'science', name: 'Science', icon: 'Atom', description: 'Unravel the mysteries of the universe, from quantum particles to cosmic structures.', gradient: 'from-cyan-800 via-blue-900 to-indigo-900' },
    { id: 'history', name: 'History', icon: 'Landmark', description: 'Journey through time and witness the rise and fall of civilizations.', gradient: 'from-amber-800 via-orange-900 to-red-900' },
    { id: 'art', name: 'Art', icon: 'Palette', description: 'Explore the boundless realms of human creativity and expression.', gradient: 'from-purple-800 via-fuchsia-900 to-pink-900' },
    { id: 'technology', name: 'Technology', icon: 'Cpu', description: 'Discover the innovations that shape our world and our future.', gradient: 'from-slate-700 via-gray-800 to-neutral-900' },
    { id: 'philosophy', name: 'Philosophy', icon: 'BrainCircuit', description: 'Contemplate the fundamental questions of existence, knowledge, and reason.', gradient: 'from-emerald-800 via-teal-900 to-green-900' },
    { id: 'space', name: 'Space', icon: 'Rocket', description: 'Venture into the final frontier and explore the wonders of the cosmos.', gradient: 'from-indigo-900 via-black to-purple-900' },
];

// FIX: Renamed articlesData to articles for consistency.
const articles: Article[] = [
  // Science
  {
    id: 'quantum-physics-101',
    categoryId: 'science',
    title: 'The Quantum Realm',
    summary: 'An introduction to the strange and wonderful world of quantum mechanics.',
    thumbnail: '',
    colorTheme: '#00e0ff',
    content: [
      { type: 'paragraph', text: 'Venture beyond the classical world into a realm where the rules of reality are rewritten. Quantum mechanics is the foundation of modern physics, yet it remains one of the most mysterious and counter-intuitive subjects in all of science.' },
      { type: 'image', src: '', caption: 'The double-slit experiment revealed the wave-particle duality of matter.' },
      { type: 'paragraph', text: 'At its core, quantum physics deals with the smallest scales of energy and matter. One of the most famous concepts is wave-particle duality, where entities like electrons and photons exhibit properties of both waves and particles.' },
      { type: 'quote', text: 'If you think you understand quantum mechanics, you don’t understand quantum mechanics.', author: 'Richard Feynman' },
    ],
    related: ['black-holes', 'theory-of-relativity', 'dna-structure'],
    views: 1205,
    createdAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'theory-of-relativity',
    categoryId: 'science',
    title: 'Relativity',
    summary: 'Albert Einstein\'s revolutionary theory of space, time, and gravity.',
    thumbnail: '',
    colorTheme: '#00e0ff',
    content: [
        { type: 'paragraph', text: 'Published in 1915, the theory of general relativity describes gravity not as a force, but as a consequence of the curvature of spacetime caused by the uneven distribution of mass and energy. It fundamentally changed our understanding of the cosmos.' },
    ],
    related: ['black-holes', 'quantum-physics-101', 'exoplanets'],
    views: 1890,
    createdAt: '2023-10-01T12:00:00Z',
  },
  {
    id: 'dna-structure',
    categoryId: 'science',
    title: 'The Double Helix',
    summary: 'Uncoiling the blueprint of life itself: the structure and function of DNA.',
    thumbnail: '',
    colorTheme: '#00e0ff',
    content: [
      { type: 'paragraph', text: 'Deoxyribonucleic acid, or DNA, is a molecule that carries the genetic instructions for the development, functioning, growth, and reproduction of all known organisms and many viruses. Its discovery in the 1950s revolutionized biology and medicine.' },
    ],
    related: ['quantum-physics-101'],
    views: 950,
    createdAt: '2023-11-15T11:00:00Z',
  },
  {
    id: 'plate-tectonics',
    categoryId: 'science',
    title: 'Earth\'s Restless Surface',
    summary: 'Understanding the massive, shifting plates that form our planet\'s surface.',
    thumbnail: '',
    colorTheme: '#00e0ff',
    content: [
      { type: 'paragraph', text: 'The theory of plate tectonics explains the large-scale motions of Earth\'s lithosphere. This process is responsible for earthquakes, volcanic eruptions, and the creation of mountain ranges, shaping the very ground beneath our feet over millions of years.' },
    ],
    related: ['black-holes'],
    views: 780,
    createdAt: '2023-09-22T16:00:00Z',
  },
  // History
  {
    id: 'ancient-rome',
    categoryId: 'history',
    title: 'The Roman Empire',
    summary: 'Explore the legacy of an empire that shaped Western civilization.',
    thumbnail: '',
    colorTheme: '#ffca80',
    content: [
      { type: 'paragraph', text: 'For over a thousand years, Rome grew from a small city into a vast empire that stretched from Britain to Mesopotamia. Its legacy in law, governance, and architecture endures.' },
      { type: 'image', src: '', caption: 'The Colosseum, an enduring symbol of Roman engineering.' },
      { type: 'quote', text: 'Veni, vidi, vici. (I came, I saw, I conquered.)', author: 'Julius Caesar' },
    ],
    related: ['ancient-greece', 'egyptian-pharaohs', 'stoicism'],
    views: 2341,
    createdAt: '2023-09-15T14:30:00Z',
  },
  {
    id: 'ancient-greece',
    categoryId: 'history',
    title: 'Cradle of Western Thought',
    summary: 'Discover the birthplace of democracy, philosophy, and epic storytelling.',
    thumbnail: '',
    colorTheme: '#ffca80',
    content: [
      { type: 'paragraph', text: 'Ancient Greece was a civilization that belonged to a period of Greek history from the Archaic period of the 8th to 6th centuries BC to the end of antiquity. It was the fountainhead of Western culture, influencing everything from politics to art.' },
    ],
    related: ['ancient-rome', 'philosophy', 'stoicism'],
    views: 1987,
    createdAt: '2023-09-01T10:00:00Z',
  },
  {
    id: 'industrial-revolution',
    categoryId: 'history',
    title: 'The Age of Steam and Steel',
    summary: 'The great transition from hand production methods to machines.',
    thumbnail: '',
    colorTheme: '#ffca80',
    content: [
      { type: 'paragraph', text: 'The Industrial Revolution marked a period of development in the latter half of the 18th century that transformed largely rural, agrarian societies in Europe and America into industrialized, urban ones. It was a time of immense technological and social change.' },
    ],
    related: ['artificial-intelligence', 'internet-history'],
    views: 1100,
    createdAt: '2023-10-10T11:00:00Z',
  },
  {
    id: 'egyptian-pharaohs',
    categoryId: 'history',
    title: 'Gods Among Men',
    summary: 'The divine rulers of Ancient Egypt and the pyramids they left behind.',
    thumbnail: '',
    colorTheme: '#ffca80',
    content: [
      { type: 'paragraph', text: 'The pharaohs of Ancient Egypt were the political and religious leaders of the people. Considered gods on Earth, they held immense power, commissioning vast temples and monumental tombs that have survived for millennia.' },
    ],
    related: ['ancient-rome', 'ancient-greece'],
    views: 1543,
    createdAt: '2023-08-25T15:00:00Z',
  },
  // Art
  {
    id: 'renaissance-art',
    categoryId: 'art',
    title: 'The Renaissance',
    summary: 'A fervent period of European cultural, artistic, political and economic “rebirth” following the Middle Ages.',
    thumbnail: '',
    colorTheme: '#f472b6',
    content: [
        { type: 'paragraph', text: 'The Renaissance was a period of profound cultural change, witnessing a flowering of literature, science, art, religion, and politics. Artists like Leonardo da Vinci and Michelangelo created works that are still revered centuries later.' },
    ],
    related: ['ancient-greece', 'impressionism', 'surrealism'],
    views: 980,
    createdAt: '2023-08-20T11:00:00Z',
  },
  {
    id: 'impressionism',
    categoryId: 'art',
    title: 'Capturing Light',
    summary: 'The 19th-century art movement characterized by visible brush strokes and an emphasis on light.',
    thumbnail: '',
    colorTheme: '#f472b6',
    content: [
      { type: 'paragraph', text: 'Impressionism is a 19th-century art movement characterized by relatively small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light in its changing qualities, ordinary subject matter, and inclusion of movement as a crucial element of human perception and experience.' },
    ],
    related: ['renaissance-art', 'surrealism'],
    views: 820,
    createdAt: '2023-09-28T13:00:00Z',
  },
  {
    id: 'surrealism',
    categoryId: 'art',
    title: 'The Art of Dreams',
    summary: 'Unlocking the creative potential of the unconscious mind.',
    thumbnail: '',
    colorTheme: '#f472b6',
    content: [
      { type: 'paragraph', text: 'Surrealism was a cultural movement which developed in Europe in the aftermath of World War I and was largely influenced by Dada. The movement is best known for its visual artworks and writings, which sought to channel the unconscious as a means to unlock the power of the imagination.' },
    ],
    related: ['impressionism', 'existentialism'],
    views: 1050,
    createdAt: '2023-10-18T17:00:00Z',
  },
  // Technology
  {
    id: 'artificial-intelligence',
    categoryId: 'technology',
    title: 'Artificial Intelligence',
    summary: 'The quest to create machines that can think, learn, and adapt like humans.',
    thumbnail: '',
    colorTheme: '#64748b',
    content: [
        { type: 'paragraph', text: 'Artificial intelligence (AI) is rapidly transforming our world, from automating complex tasks to enabling new discoveries in science and medicine. The field is broadly divided into narrow AI, which is designed for a particular task, and general AI, which possesses human-like cognitive abilities.' },
    ],
    related: ['internet-history', 'blockchain-basics', 'quantum-physics-101'],
    views: 4510,
    createdAt: '2023-11-10T09:00:00Z',
  },
  {
    id: 'internet-history',
    categoryId: 'technology',
    title: 'Weaving the World Wide Web',
    summary: 'From a military experiment to a global network connecting humanity.',
    thumbnail: '',
    colorTheme: '#64748b',
    content: [
      { type: 'paragraph', text: 'The internet began as ARPANET, a US military project in the 1960s to create a resilient communication network. It has since evolved into the global system of interconnected computer networks that we rely on for information, communication, and commerce today.' },
    ],
    related: ['artificial-intelligence', 'blockchain-basics'],
    views: 1300,
    createdAt: '2023-11-01T10:00:00Z',
  },
  {
    id: 'blockchain-basics',
    categoryId: 'technology',
    title: 'The Decentralized Ledger',
    summary: 'Understanding the revolutionary technology behind cryptocurrencies.',
    thumbnail: '',
    colorTheme: '#64748b',
    content: [
      { type: 'paragraph', text: 'A blockchain is a decentralized, distributed, and oftentimes public, digital ledger consisting of records called blocks that is used to record transactions across many computers so that any involved block cannot be altered retroactively, without the alteration of all subsequent blocks.' },
    ],
    related: ['internet-history', 'artificial-intelligence'],
    views: 1650,
    createdAt: '2023-11-08T14:00:00Z',
  },
  // Philosophy
  {
    id: 'stoicism',
    categoryId: 'philosophy',
    title: 'The Art of Resilience',
    summary: 'An ancient Greek school of philosophy founded at Athens by Zeno of Citium.',
    thumbnail: '',
    colorTheme: '#34d399',
    content: [
      { type: 'paragraph', text: 'Stoicism teaches the development of self-control and fortitude as a means of overcoming destructive emotions. The philosophy holds that becoming a clear and unbiased thinker allows one to understand the universal reason (logos).' },
    ],
    related: ['existentialism', 'ancient-greece', 'ancient-rome'],
    views: 1400,
    createdAt: '2023-10-22T09:00:00Z',
  },
  {
    id: 'existentialism',
    categoryId: 'philosophy',
    title: 'Freedom and Being',
    summary: 'A form of philosophical inquiry that explores the problem of human existence.',
    thumbnail: '',
    colorTheme: '#34d399',
    content: [
      { type: 'paragraph', text: 'Existentialism posits that individuals are free and responsible for giving their own lives meaning. It emphasizes concepts such as freedom, authenticity, and the search for purpose in a meaningless world.' },
    ],
    related: ['stoicism', 'surrealism'],
    views: 1120,
    createdAt: '2023-10-28T10:00:00Z',
  },
  // Space
  {
    id: 'black-holes',
    categoryId: 'space',
    title: 'Black Holes',
    summary: 'Journey to the edge of spacetime and discover the most enigmatic objects in the cosmos.',
    thumbnail: '',
    colorTheme: '#a78bfa',
    content: [
        { type: 'paragraph', text: 'A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even light—can escape. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.' },
        { type: 'image', src: '', caption: 'An artist\'s conception of a black hole\'s accretion disk.' },
        { type: 'quote', text: 'The black hole teaches us that space can be crumpled like a piece of paper, but that it can be stretched and distorted, too.', author: 'Kip Thorne' },
    ],
    related: ['quantum-physics-101', 'theory-of-relativity', 'exoplanets'],
    views: 3102,
    createdAt: '2023-11-05T18:00:00Z',
  },
  {
    id: 'mars-exploration',
    categoryId: 'space',
    title: 'The Red Planet',
    summary: 'Chronicling humanity\'s ongoing quest to explore our planetary neighbor, Mars.',
    thumbnail: '',
    colorTheme: '#a78bfa',
    content: [
      { type: 'paragraph', text: 'The exploration of Mars has been a goal of numerous space agencies for decades. Rovers like Curiosity and Perseverance are on the surface, analyzing the planet\'s geology and climate, searching for signs of ancient life, and paving the way for future human missions.' },
    ],
    related: ['exoplanets', 'black-holes'],
    views: 1750,
    createdAt: '2023-11-12T12:00:00Z',
  },
  {
    id: 'exoplanets',
    categoryId: 'space',
    title: 'Worlds Beyond Our Sun',
    summary: 'The search for planets orbiting other stars in our galaxy.',
    thumbnail: '',
    colorTheme: '#a78bfa',
    content: [
      { type: 'paragraph', text: 'An exoplanet is a planet outside the Solar System. The first confirmation of detection of an exoplanet occurred in 1992. Since then, thousands have been discovered, ranging from gas giants larger than Jupiter to rocky worlds that could potentially harbor life.' },
    ],
    related: ['mars-exploration', 'theory-of-relativity'],
    views: 2100,
    createdAt: '2023-11-18T15:00:00Z',
  }
];

// --- SIMULATED API ---
const apiLatency = 500; // ms

// FIX: Corrected generic type to be TSX-compatible and ensured function is syntactically correct. This resolves multiple cascading errors.
const simulateFetch = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), apiLatency);
    });
};

export const getCategories = (): Promise<Category[]> => {
    // FIX: Use the 'categories' data variable, not the 'Category' type.
    return simulateFetch(categories);
};

export const getCategoryById = (id: string): Promise<Category | undefined> => {
    // FIX: Use the 'categories' data variable, not the 'Category' type.
    return simulateFetch(categories.find(c => c.id === id));
};

export const getArticles = (): Promise<Article[]> => {
    // FIX: Use the 'articles' data variable, not the 'Article' type.
    return simulateFetch(articles);
};

export const getArticleById = (id: string): Promise<Article | undefined> => {
    // FIX: Use the 'articles' data variable, not the 'Article' type.
    return simulateFetch(articles.find(a => a.id === id));
};

export const getArticlesByIds = (ids: string[]): Promise<Article[]> => {
    // FIX: Use the 'articles' data variable, not the 'Article' type.
    const related = articles.filter(a => ids.includes(a.id));
    return simulateFetch(related);
};

export const getArticlesByCategory = (categoryId: string): Promise<Article[]> => {
    // FIX: Use the 'articles' data variable, not the 'Article' type.
    const filtered = articles.filter(a => a.categoryId === categoryId);
    return simulateFetch(filtered);
};

export const searchArticles = (query: string): Promise<Article[]> => {
    if (!query) {
        return simulateFetch([]);
    }
    const lowerCaseQuery = query.toLowerCase();
    // FIX: Use the 'articles' data variable, not the 'Article' type.
    const results = articles.filter(article => 
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.summary.toLowerCase().includes(lowerCaseQuery)
    );
    return simulateFetch(results);
};
