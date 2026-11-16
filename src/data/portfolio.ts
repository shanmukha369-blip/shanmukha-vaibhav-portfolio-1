import isharaImg from '@/src/assets/images/project_ishara_ai_1794547746110.jpg';
import marsMapImg from '@/src/assets/images/project_mars_map_1794547746291.jpg';
import joyUniImg from '@/src/assets/images/project_joy_university_1794547746289.jpg';
import gulfzoneImg from '@/src/assets/images/project_gulfzone_gaming_1794547747725.jpg';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  highlights: string[];
  stack: string[];
  image: string;
  imageAlt: string;
  role: string;
}

export interface SkillItem {
  number: string;
  name: string;
  category: 'Languages' | 'AI & Web' | 'Tools';
  focus: string;
  detail: string;
}

export const PROFILE = {
  greeting: "HELLO, I'M",
  displayFirst: 'SHANMUKHA',
  displaySecond: 'VAIBHAV',
  fullName: 'SHANMUKHA VAIBHAV TATIPAKA',
  shortMark: 'S. VAIBHAV',
  title: 'ASPIRING AI ENGINEER & SOFTWARE DEVELOPER',
  education: 'B.Tech – CSE (AI & ML)',
  institution: 'JOY UNIVERSITY X NIAT',
  intro:
    'First-year Computer Science & Engineering (AI & ML) undergraduate crafting intelligent software, computer vision applications, and bold digital experiences.',
  linkedin: 'https://www.linkedin.com/in/shanmukha-vaibhav-tatipaka-863b3a438/',
  email: 'shanmukhtatipaka6@gmail.com',
  location: 'India',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ishara',
    number: '01',
    title: 'ISHARA',
    category: 'Computer Vision · Accessibility AI',
    year: '2026',
    role: 'AI & Frontend Architecture',
    summary: 'AI-powered sign language communication assistant translating hand gestures into real-time text and speech.',
    description:
      'Ishara bridges communication barriers for deaf and hard-of-hearing individuals using real-time hand landmark detection and sequence classification. Built with a focus on low-latency visual feedback and clean, distraction-free accessibility.',
    highlights: [
      'Real-time hand tracking and gesture classification pipeline in Python',
      'Instant visual-to-text transcription with responsive speech synthesis',
      'High-contrast interface engineered for effortless readability',
    ],
    stack: ['Python', 'AI & ML', 'Computer Vision', 'JavaScript', 'HTML/CSS'],
    image: isharaImg,
    imageAlt: 'Studio photograph of hands forming a sign language gesture with subtle crimson tracking highlights',
  },
  {
    id: 'nasa-mars-map',
    number: '02',
    title: 'NASA MARS MAP',
    category: 'Interactive Data · Planetary Exploration',
    year: '2026',
    role: 'Web Engineering & Data Visualization',
    summary: 'Interactive Mars surface explorer built around authentic NASA rover photography and crater telemetry.',
    description:
      'An atmospheric planetary mapping interface that lets users traverse Martian regions, inspect rover photography across sols, and explore Gale Crater elevation contours with precision spatial navigation.',
    highlights: [
      'Structured integration of NASA rover imagery and mission coordinates',
      'Interactive region filtering by rover camera and Martian sol',
      'Cinematic dark cartographic UI tuned for high-resolution planetary detail',
    ],
    stack: ['JavaScript', 'HTML', 'CSS', 'REST APIs', 'Web Development'],
    image: marsMapImg,
    imageAlt: 'Topographic satellite visualization of Gale Crater on Mars with fine elevation contours',
  },
  {
    id: 'joy-university',
    number: '03',
    title: 'JOY UNIVERSITY WEBSITE',
    category: 'Web Platform · Student Portal',
    year: '2026',
    role: 'UI Design & Full-Stack Structure',
    summary: 'Modern university digital flagship and unified student portal designed for academic clarity and speed.',
    description:
      'A ground-up architectural reimagining of the campus web experience—pairing bold editorial institutional storytelling with a practical student portal for course schedules, announcements, and academic resources.',
    highlights: [
      'Unified academic navigation connecting admissions, programs, and student workflows',
      'Responsive grid system built for mobile campus access and desktop clarity',
      'Clean information hierarchy highlighting B.Tech CSE (AI & ML) pathways',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Git & GitHub'],
    image: joyUniImg,
    imageAlt: 'Contemporary architectural concrete and glass university campus building illuminated at twilight',
  },
  {
    id: 'gulfzone',
    number: '04',
    title: 'GULFZONE',
    category: 'Brand Redesign · Gaming Platform',
    year: '2025',
    role: 'Creative Direction & Frontend Build',
    summary: 'High-impact gaming and esports platform redesign driven by bold dark contrast and kinetic motion.',
    description:
      'Gulfzone transforms a traditional gaming hub into a sleek editorial arena. Featuring sharp modular tournament showcases, curated gear spotlights, and fluid interactive transitions tailored for competitive players.',
    highlights: [
      'Dramatic black-and-crimson visual language inspired by flagship esports arenas',
      'Modular game roster and event discovery cards with smooth hover micro-interactions',
      'Optimized asset loading and responsive layout across desktop and mobile viewports',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'UI Motion'],
    image: gulfzoneImg,
    imageAlt: 'Dark studio composition of matte black precision esports peripherals with crimson rim lighting',
  },
];

export const SKILLS: SkillItem[] = [
  {
    number: '01',
    name: 'Python',
    category: 'Languages',
    focus: 'AI Pipelines & Automation',
    detail: 'Core language for machine learning experiments, computer vision prototypes, and algorithmic problem solving.',
  },
  {
    number: '02',
    name: 'C',
    category: 'Languages',
    focus: 'Systems & Memory Foundations',
    detail: 'Structured programming, pointer mechanics, data structures, and foundational computational efficiency.',
  },
  {
    number: '03',
    name: 'HTML',
    category: 'AI & Web',
    focus: 'Semantic Architecture',
    detail: 'Accessible, standards-compliant document structure engineered for SEO and assistive technologies.',
  },
  {
    number: '04',
    name: 'CSS',
    category: 'AI & Web',
    focus: 'Editorial Layout & Motion',
    detail: 'Modern Grid, Flexbox, responsive typography scales, and GPU-composited visual transitions.',
  },
  {
    number: '05',
    name: 'JavaScript',
    category: 'Languages',
    focus: 'Interactive Web Engineering',
    detail: 'Dynamic client-side applications, asynchronous API integration, state logic, and event-driven UI.',
  },
  {
    number: '06',
    name: 'AI & ML',
    category: 'AI & Web',
    focus: 'Applied Intelligence',
    detail: 'Exploring computer vision, gesture recognition, model workflows, and human-centered AI systems.',
  },
  {
    number: '07',
    name: 'Web Development',
    category: 'AI & Web',
    focus: 'Full-Stack Craft',
    detail: 'End-to-end design and engineering of responsive, fast, production-ready web interfaces.',
  },
  {
    number: '08',
    name: 'Git & GitHub',
    category: 'Tools',
    focus: 'Version Control & Shipping',
    detail: 'Clean commit discipline, branching workflows, collaborative pull requests, and repository management.',
  },
];

export const EDUCATION_MILESTONES = [
  {
    period: '2025 — PRESENT',
    institution: 'JOY UNIVERSITY X NIAT',
    degree: 'B.Tech – Computer Science and Engineering (AI & ML)',
    location: 'First-Year Undergraduate',
    summary:
      'Immersed in an industry-aligned engineering curriculum combining core computer science rigor with hands-on Artificial Intelligence, Machine Learning, and modern software development labs.',
    pillars: [
      'Foundational Computer Science & Algorithmic Thinking in C and Python',
      'Applied Machine Learning & Computer Vision Project Prototyping',
      'Full-Stack Web Engineering & Collaborative Git Workflows via NIAT',
    ],
  },
];
