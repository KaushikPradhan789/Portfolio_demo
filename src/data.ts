import { Project, Skill } from './types';

export const PERSONAL_INFO = {
  name: 'Kaushik Pradhan',
  title: 'CSE (AI/ML) Student & Developer',
  tagline: 'Building Scalable Web Architectures & Intelligent Automation workflows',
  location: 'Bhubaneswar, Odisha, India',
  email: 'kaushikpradhan19@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  bio: 'A passionate Computer Science & Engineering student at KIIT University specializing in Artificial Intelligence and Machine Learning. Deeply interested in the intersection of scalable web technologies, quantitative systems, and intelligent automation.',
  detailedBio: 'Currently pursuing a B.Tech in Computer Science and Engineering with a focus on AI & ML, I combine academic rigor with practical development. I love architecting responsive frontend applications, building automated pipelines, and developing quantitative trading models. My goal is to create impactful products that make data intuitive and workflows highly automated.',
  education: {
    degree: 'B.Tech in Computer Science & Engineering (Specialization in AI & ML)',
    institution: 'Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar',
    period: '2025 - 2029',
    achievements: [
      'Focusing on Neural Networks, Machine Learning, and Design Analysis of Algorithms',
      'Active technical member in organizing web events and platform development',
      'Hands-on experience in cloud architectures and automated workflows'
    ]
  }
};

export const SKILLS: Skill[] = [
  // Frontend
  {
    name: 'React.js',
    category: 'frontend',
    level: 75,
    iconName: 'React',
    description: 'Dynamic and scalable single-page applications'
  },
  {
    name: 'Next.js',
    category: 'frontend',
    level: 75,
    iconName: 'Nextjs',
    description: 'Server-side rendering, static site generation, and performance'
  },
  {
    name: 'Vite',
    category: 'frontend',
    level: 80,
    iconName: 'Vite',
    description: 'Ultra-fast bundling and modern frontend developer tooling'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 90,
    iconName: 'Tailwind',
    description: 'Utility-first styling, fluid layouts, and theme architectures'
  },
  {
    name: 'JavaScript / TypeScript',
    category: 'frontend',
    level: 90,
    iconName: 'TypeScript',
    description: 'Strong, type-safe development with modern ES6+ paradigms'
  },

  // Tools & OS
  {
    name: 'Linux',
    category: 'tools',
    level: 80,
    iconName: 'Linux',
    description: 'Bash scripting, system administration, and development environment'
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 90,
    iconName: 'Git',
    description: 'Version control, collaborative workflows, and actions for CI/CD'
  },
  // Specializations
  {
    name: 'AI/ML Concepts',
    category: 'specialization',
    level: 45,
    iconName: 'Brain',
    description: 'Supervised/unsupervised learning, computer vision, and neural nets'
  },
  {
    name: 'Pine Script v5',
    category: 'specialization',
    level: 85,
    iconName: 'TrendingUp',
    description: 'TradingView backtesting, custom strategy builders, and indicators'
  },
  {
    name: 'Blue Prism',
    category: 'specialization',
    level: 75,
    iconName: 'Cpu',
    description: 'Robotic Process Automation (RPA) and workflow optimization'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'nutrimark',
    title: 'NutriMark',
    description: 'An Indian food label nutritional grading system that reads and scores packaged food content according to FSSAI guidelines.',
    detailedDescription: 'NutriMark is an automated nutritional assessment platform engineered to address the lack of clear front-of-package labeling on Indian foods. It parses ingredients and nutritional facts from images or user inputs, applies FSSAI-compliant grading criteria, and presents a clear, colored health grade (A to E) alongside breakdown analysis to help consumers make healthier food choices.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Python', 'Machine Learning', 'FSSAI Rules Engine'],
    category: 'ai-ml',
    highlights: [
      'Successfully parses complex Indian nutritional labels and calculates comprehensive nutritional indexes',
      'Generates detailed health reports highlighting high sodium, sugar, or saturated fat contents',
      'Provides alternative, healthier local recommendations based on food category'
    ],
    links: {
      github: 'https://github.com/KaushikPradhan789/nutrimark-app-demo',
      live: 'https://nutrimark-app-demo.vercel.app/'
    }
  },
  {
    id: 'ecell-kiit',
    title: 'E-Cell KIIT Digital Platform',
    description: 'Comprehensive web maintenance and optimization for the KIIT Entrepreneurship Cell digital platforms serving thousands of students.',
    detailedDescription: 'During my involvement with E-Cell KIIT, I helped maintain, optimize, and expand their primary web platform. This platform is used to publish news, manage interactive event registration for major summits, handle leaderboards, and coordinate outreach. Focus areas included reducing page load speeds, implementing responsive design patterns, and scaling backend form submissions.',
    techStack: ['Next.js', 'React.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Vercel Deployment'],
    category: 'web',
    highlights: [
      'Refactored image assets and API paths, resulting in a 40% improvement in PageSpeed metrics',
      'Designed and deployed an intuitive multi-step registration flow for high-traffic student summits',
      'Ensured seamless cross-device compatibility across phones, tablets, and legacy browsers'
    ],
    links: {
      github:'https://github.com/',
      live: 'https://www.kiitecell.org/'
    }
  },
  {
    id: 'quant-trading',
    title: 'Quantitative Trading Scripts',
    description: 'Advanced custom-coded trading strategies and technical indicators in Pine Script v5 for Nifty 50 assets.',
    detailedDescription: 'An analytical exploration of quantitative finance featuring multiple robust TradingView strategies. Developed using Pine Script v5, these models target Nifty 50 equities. They incorporate adaptive risk-reward ratios, dynamic stop losses (ATR-based), and momentum indicators to execute trend-following and mean-reverting setups with statistical validation.',
    techStack: ['Pine Script v5', 'TradingView API', 'Quantitative Finance', 'Backtesting Systems'],
    category: 'trading',
    highlights: [
      'Engineered an ATR-based breakout strategy resulting in optimized Sharpe and profit ratios during backtests',
      'Created custom dashboards right inside TradingView to track multi-timeframe trends simultaneously',
      'Optimized script execution to operate efficiently on lower-frequency intra-day charts'
    ],
     links: {
      github:'https://github.com/',
      live: 'https:example.com'
  }
];
