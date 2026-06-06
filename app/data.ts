type Project = {
  name: string
  description: string
  link: string
  id: string
  tags: string[]
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
  moreInfoPeriod: string
  bulletPoints?: string[]
  description?: string
  cta?: { label: string; url: string }
  jobType: 'Full-time' | 'Part-time' | 'Internship' | 'Contract'
}

type Education = {
  institution: string
  degree: string
  field: string
  start: string
  end: string
  moreInfoPeriod: string
  link: string
  id: string
  description?: string
  achievements?: string[]
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

type SkillCategory = {
  name: string
  skills: string[]
}

type Certification = {
  name: string
  issuer: string
  date: string
  credentialId?: string
  link?: string
  id: string
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming',
    skills: ['Python', 'SQL', 'Bash'],
  },
  {
    name: 'Machine Learning',
    skills: [
      'PyTorch',
      'Hugging Face Transformers',
      'BERT',
      'CLIP',
      'scikit-learn',
      'spaCy',
      'pandas',
      'NumPy',

    ],
  },
  {
    name: 'GenAI & LLM Systems',
    skills: [
      'LangChain',
      'LangGraph', 
      'OpenAI API',
      'Azure OpenAI',
      'Retrieval-Augmented Generation (RAG)',
      'LLM-as-a-Judge Evaluation',
      'Prompt Engineering',
    ],
  },
  {
    name: 'MLOps & Infrastructure',
    skills: [
      'Docker',
      'Docker Compose',
      'Kubernetes',
      'MLflow',
      'LangSmith',
      'DVC',
      'GitHub Actions',
      'Datadog',
    ],
  },
  {
    name: 'Backend & APIs',
    skills: ['FastAPI', 'Flask', 'REST APIs'],
  },
  {
    name: 'Databases & Storage',
    skills: ['PostgreSQL', 'ChromaDB', 'Redis', 'Supabase (pgvector)', 'Elasticsearch'],
  },
  {
    name: 'Cloud Platforms',
    skills: ['AWS', 'Azure (OpenAI Service)'],
  },
  {
    name: 'Development Environment',
    skills: ['Linux', 'Git', 'Jupyter'],
  },
  {
    name: 'Collaboration',
    skills: ['Jira', 'Confluence', 'GitHub', 'Bitbucket'],
  },
  {
    name: 'Languages',
    skills: ['English (fluent)', 'French (conversational)', 'Arabic (native)'],
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Machine Learning Engineer',
    issuer: 'DataCamp',
    date: 'November 2024',
    credentialId: 'afc9890d64a572bfb23614fa6eaae2a18afedfca',
    link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/afc9890d64a572bfb23614fa6eaae2a18afedfca',
    id: 'cert1',
  },
  {
    name: 'Google Data Analytics Specialization',
    issuer: 'Google',
    date: 'March 2022',
    credentialId: 'BVTWPKS2GGUW',
    link: 'https://www.coursera.org/account/accomplishments/professional-cert/BVTWPKS2GGUW',
    id: 'cert2',
  },
  {
    name: 'Associate Data Scientist',
    issuer: 'DataCamp',
    date: 'July 2022',
    credentialId: '56954fa5219fd1e348b6f93ccb25e55981fc8f69',
    link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/56954fa5219fd1e348b6f93ccb25e55981fc8f69',
    id: 'cert3',
  },
  {
    name: 'Machine Learning',
    issuer: 'Stanford University (Coursera)',
    date: 'December 2020',
    credentialId: '8QLPUR9CTQLE',
    link: 'https://www.coursera.org/account/accomplishments/verify/8QLPUR9CTQLE',
    id: 'cert4',
  },
]

export const PROJECTS: Project[] = [
  {
    name: 'AutoActivator',
    description:
      'Smart shell tool that seamlessly switches Python virtual environments as you navigate between project directories.',
    link: 'https://www.github.com/aymenkrifa/autoactivator',
    id: 'project1',
    tags: ['Shell'],
  },
  {
    name: 'Reaper',
    description:
      'A Linux TUI for listing, monitoring, and killing listening ports using Rust.',
    link: 'https://www.github.com/aymenkrifa/reaper',
    id: 'project2',
    tags: ['Rust', 'Ratatui'],
  },
  {
    name: 'KExplorer',
    description: 'Real-time, highly-opinionated, web-based Kubernetes dashboard for managing deployments, pods, and cluster resources.',
    link: 'https://www.github.com/aymenkrifa/KExplorer',
    id: 'project3',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Kubernetes', 'Python', 'FastAPI'],
  },
  {
    name: 'Chroma Explorer',
    description: 'Desktop GUI for exploring and managing ChromaDB vector databases. A Linux-focused fork with support for legacy Chroma 0.x servers.',
    link: 'https://www.github.com/aymenkrifa/chroma-explorer',
    id: 'project4',
    tags: ['TypeScript', 'React', 'Electron', 'Tailwind CSS', 'ChromaDB'],
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Quinta (formerly Quicktext)',
    title: 'Machine Learning Engineer',
    start: '2022',
    end: 'Present',
    moreInfoPeriod: 'July 2022 - Present',
    link: 'https://www.quinta.im',
    id: 'work1',
    jobType: 'Full-time',
    bulletPoints: [
      'Led a team of 4 engineers to ship a production LangGraph multi-agent system (50+ specialized agents) that replaced a legacy stack, resolving compound guest requests in a single turn instead of sequential follow-ups.',
      'Reduced hallucinations by 15% across 100K+ monthly queries by deploying a production RAG pipeline with LangChain and ChromaDB to ground LLM responses in proprietary data.',
      'Re-architected a BERT intent classifier from single-label to multi-label with NTR-Focal Loss and Macro-F1 evaluation, cutting misclassification by 25% and enabling compound intent detection across 250K+ monthly inference calls.',
      'Engineered an LLM-as-a-Judge evaluation pipeline with custom Chain-of-Thought metrics (faithfulness, completeness, link accuracy), improving answer faithfulness by 18% and relevance by 32% via iterative tuning.',
      'Co-architected an AI voice concierge (Ultravox + Twilio) supporting 24+ languages, solving voice-native property routing via HNSW embedding similarity over fuzzy STT-transcribed hotel names.',
      'Centralized legacy language detection into a FastText and FastAPI microservice used across core systems, handling 600K+ monthly requests with a 20% accuracy gain.',
      'Mentored 7 ML engineers to full productivity and led technical interviewing for the ML team.',
    ],
  },
  {
    company: 'Skinify.ai',
    title: 'Co-Founder',
    start: '2024',
    end: 'Present',
    moreInfoPeriod: 'May 2024 - Present',
    link: 'https://skinify.ai',
    id: 'work_skinify',
    jobType: 'Part-time',
    description: 'Co-founding Skinify — an AI-powered platform reshaping how people discover skincare products that truly fit their skin.',
    cta: {
      label: 'Transform your skin today →',
      url: 'https://skinify.ai',
    },
  },
  {
    company: 'Quinta (formerly Quicktext)',
    title: 'Machine Learning Engineer Intern',
    start: 'Feb.',
    end: 'Jul. 2022',
    moreInfoPeriod: 'February 2022 - July 2022',
    link: 'https://www.quinta.im',
    id: 'work2',
    jobType: 'Internship',
    bulletPoints: [
      'Built data cleaning pipeline processing 15M+ data points and trained trip category prediction model using random forests and scikit-learn, achieving 70% accuracy in classifying user travel preferences',
      'Deployed Flask REST API serving real-time predictions, integrating ML recommendations into production web application for automated trip categorization'
    ],
  },
  {
    company: 'Whitecape Technologies',
    title: 'Software Engineer Intern',
    start: 'Sep.',
    end: 'Oct. 2021',
    moreInfoPeriod: 'September 2021 - October 2021',
    link: 'https://www.whitecapetech.com',
    id: 'work3',
    jobType: 'Internship',
    bulletPoints: [
      'Utilized modern web technologies, including React and Node.js, to develop dynamic and responsive web applications.',
      'Implemented RESTful APIs and integrated third-party services to enhance application functionality.',
      'Participated in agile development processes, collaborating with cross-functional teams to deliver high-quality software solutions.',
      'Created user-friendly interfaces with a focus on accessibility and performance optimization.',
    ],
  },
  {
    company: 'Enova Robotics',
    title: 'Software Engineer Intern',
    start: 'Aug.',
    end: 'Sep. 2020',
    moreInfoPeriod: 'August 2020 - September 2020',
    link: 'https://www.enovarobotics.eu',
    id: 'work4',
    jobType: 'Internship',
    bulletPoints: [
      "Contributed to an object detection project for the autonomous and self-driving security robots' self-charging feature using C++ and OpenCV, successfully enhancing the robot's capabilities by ensuring accurate detection of the charging station port.",
      'Collaborated with engineering team, ensuring effective communication and timely task completion.',
    ],
  },
]

export const EDUCATION: Education[] = [
  {
    institution: 'École Polytechnique de Sousse',
    degree: "Engineering Degree (Master's Equivalent)",
    field: 'Computer Science',
    start: '2022',
    end: '2025',
    moreInfoPeriod: 'September 2022 - June 2025',
    link: 'https://www.polytecsousse.tn',
    id: 'edu1',
    description: 'Specialized in Machine Learning and Artificial Intelligence',
    achievements: [
      'Graduated with High Honors (GPA: 3.8/4.0)',
      'Thesis: "An AI-Powered Voice-Interactive Assistant for Intelligent Hotel Room Booking"',
      'Relevant Coursework: Deep Learning, Natural Language Processing, Cloud Computing',
    ],
  },
  {
    institution: 'École Polytechnique de Sousse',
    degree: 'Bachelor of Engineering',
    field: 'Software Engineering',
    start: '2019',
    end: '2022',
    moreInfoPeriod: 'September 2019 - July 2022',
    link: 'https://www.polytecsousse.tn',
    id: 'edu2',
    achievements: [
      'Graduated with High Honors (GPA: 3.9/4.0)',
      'Thesis: "Dynamic Website Users Profiling & Suggesting Predictor"',
      'Relevant Coursework: Algorithms, Probability and Statistics, Machine Learning, Mathematics'
    ],
  },
]

export const BLOG_POSTS: BlogPost[] = []

export const PROFESSIONAL_SUMMARY = {
  headline: 'Machine Learning Engineer',
  paragraphs: [
    'Machine Learning Engineer with {yoe} years shipping production GenAI and ML systems at scale. Mostly builds things — AI systems at work, dev tools on the side, and the occasional side project that outgrows its weekend. Off the clock, usually reading, tinkering, or chasing a new rabbit hole.'
  ],
  highlights: [],
  availability: [
    'Currently exploring AI/ML engineering roles, freelance projects, and open-source opportunities.',
    'Open to remote or relocation.',
  ],
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    link: 'https://www.github.com/aymenkrifa',
  },
  {
    label: 'X (Twitter)',
    link: 'https://www.x.com/krifaymen',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/aymenkrifa',
  },
]

export const EMAIL = 'aymenkrifa@gmail.com'
