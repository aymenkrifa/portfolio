type Project = {
  name: string
  description: string
  link: string
  id: string
  tags: string[]
  visible: boolean
}

type MediaLink = {
  label: string
  url: string
  embed?: string
  visible: boolean
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
  tags?: string[]
  media?: MediaLink[]
  visible: boolean
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
  achievements?: { text: string; link?: string }[]
  tags?: string[]
  media?: MediaLink[]
  visible: boolean
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

type Skill = {
  name: string
  exploring?: boolean
  level?: string
}

type SkillCategory = {
  name: string
  skills: Skill[]
}

type Certification = {
  name: string
  issuer: string
  date: string
  credentialId?: string
  link?: string
  id: string
  visible: boolean
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming',
    skills: [
      { name: 'Python' },
      { name: 'SQL' },
      { name: 'Bash' },
      { name: 'Rust', exploring: true },
    ],
  },
  {
    name: 'Machine Learning',
    skills: [
      { name: 'PyTorch' },
      { name: 'Hugging Face Transformers' },
      { name: 'BERT' },
      { name: 'CLIP' },
      { name: 'scikit-learn' },
      { name: 'spaCy' },
      { name: 'pandas' },
      { name: 'NumPy' },
    ],
  },
  {
    name: 'GenAI & LLM Systems',
    skills: [
      { name: 'LangChain' },
      { name: 'LangGraph' },
      { name: 'OpenAI API' },
      { name: 'Azure OpenAI' },
      { name: 'Retrieval-Augmented Generation' },
      { name: 'LLM-as-a-Judge Evaluation' },
      { name: 'Prompt Engineering' },
    ],
  },
  {
    name: 'MLOps & Infrastructure',
    skills: [
      { name: 'Docker' },
      { name: 'Docker Compose' },
      { name: 'Kubernetes' },
      { name: 'MLflow' },
      { name: 'LangSmith' },
      { name: 'DVC' },
      { name: 'GitHub Actions' },
      { name: 'Datadog' },
    ],
  },
  {
    name: 'Backend & APIs',
    skills: [{ name: 'FastAPI' }, { name: 'Flask' }, { name: 'REST APIs' }],
  },
  {
    name: 'Databases & Storage',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'ChromaDB' },
      { name: 'Redis' },
      { name: 'Supabase' },
      { name: 'Elasticsearch' },
    ],
  },
  {
    name: 'Cloud Platforms',
    skills: [{ name: 'AWS' }, { name: 'Azure (OpenAI Service)' }],
  },
  {
    name: 'Development Environment',
    skills: [{ name: 'Linux' }, { name: 'Git' }, { name: 'Jupyter' }],
  },
  {
    name: 'AI Tools',
    skills: [
      { name: 'Claude Code' },
      { name: 'Devin (formerly Windsurf)' },
      { name: 'GitHub Copilot' },
      { name: 'kenn-io/kata', exploring: true },
      { name: 'kenn-io/roborev', exploring: true },
    ],
  },
  {
    name: 'Collaboration',
    skills: [
      { name: 'Jira' },
      { name: 'Confluence' },
      { name: 'GitHub' },
      { name: 'Bitbucket' },
    ],
  },
  {
    name: 'Languages',
    skills: [
      { name: 'English', level: 'fluent' },
      { name: 'French', level: 'conversational' },
      { name: 'Arabic', level: 'native' },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Machine Learning Engineer',
    issuer: 'DataCamp',
    date: 'November 2024',
    credentialId: 'afc9890d64a572bfb23614fa6eaae2a18afedfca',
    link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/afc9890d64a572bfb23614fa6eaae2a18afedfca',
    id: 'datacamp-mle',
    visible: true,
  },
  {
    name: 'Google Data Analytics Specialization',
    issuer: 'Google',
    date: 'March 2022',
    credentialId: 'BVTWPKS2GGUW',
    link: 'https://www.coursera.org/account/accomplishments/professional-cert/BVTWPKS2GGUW',
    id: 'google-data-analytics',
    visible: true,
  },
  {
    name: 'Associate Data Scientist',
    issuer: 'DataCamp',
    date: 'July 2022',
    credentialId: '56954fa5219fd1e348b6f93ccb25e55981fc8f69',
    link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/56954fa5219fd1e348b6f93ccb25e55981fc8f69',
    id: 'datacamp-data-scientist',
    visible: true,
  },
  {
    name: 'Machine Learning',
    issuer: 'Stanford University (Coursera)',
    date: 'December 2020',
    credentialId: '8QLPUR9CTQLE',
    link: 'https://www.coursera.org/account/accomplishments/verify/8QLPUR9CTQLE',
    id: 'stanford-ml',
    visible: true,
  },
]

export const PROJECTS: Project[] = [
  {
    name: 'AutoActivator',
    description:
      'Smart shell tool that seamlessly switches Python virtual environments as you navigate between project directories.',
    link: 'https://www.github.com/aymenkrifa/autoactivator',
    id: 'autoactivator',
    tags: ['Shell'],
    visible: true,
  },
  {
    name: 'Reaper',
    description:
      'A Linux TUI for listing, monitoring, and killing listening ports using Rust.',
    link: 'https://www.github.com/aymenkrifa/reaper',
    id: 'reaper',
    tags: ['Rust', 'Ratatui'],
    visible: true,
  },
  {
    name: 'KExplorer',
    description: 'Real-time, highly-opinionated, web-based Kubernetes dashboard for managing deployments, pods, and cluster resources.',
    link: 'https://www.github.com/aymenkrifa/KExplorer',
    id: 'kexplorer',
    tags: ['Python', 'FastAPI', 'Kubernetes', 'TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    visible: true,
  },
  {
    name: 'Chroma Explorer',
    description: 'Desktop GUI for exploring and managing ChromaDB vector databases. A Linux-focused fork with support for legacy Chroma 0.x servers.',
    link: 'https://www.github.com/aymenkrifa/chroma-explorer',
    id: 'chroma-explorer',
    tags: ['TypeScript', 'React', 'Electron', 'Tailwind CSS', 'ChromaDB'],
    visible: true,
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Skinify.ai',
    title: 'Co-Founder',
    start: 'May 2024',
    end: 'Present',
    moreInfoPeriod: 'May 2024 - Present',
    link: 'https://skinify.ai',
    id: 'work_skinify',
    jobType: 'Part-time',
    tags: ['Side Venture'],
    description: 'Co-founding Skinify, an AI-powered platform reshaping how people discover skincare products that truly fit their skin.',
    cta: {
      label: 'Visit Skinify →',
      url: 'https://skinify.ai',
    },
    visible: true,
  },
  {
    company: 'Quinta (formerly Quicktext)',
    title: 'Machine Learning Engineer',
    start: 'July 2022',
    end: 'Present',
    moreInfoPeriod: 'July 2022 - Present',
    link: 'https://www.quinta.im',
    id: 'quinta-ml',
    jobType: 'Full-time',
    tags: ['Main Job'],
    bulletPoints: [
      'Led a team of 4 engineers to ship a production LangGraph multi-agent system (50+ specialized agents) that replaced a legacy stack, resolving compound guest requests in a single turn instead of sequential follow-ups.',
      'Reduced hallucinations by 15% across 100K+ monthly queries by deploying a production RAG pipeline with LangChain and ChromaDB to ground LLM responses in proprietary data.',
      'Re-architected a BERT intent classifier from single-label to multi-label with NTR-Focal Loss and Macro-F1 evaluation, cutting misclassification by 25% and enabling compound intent detection across 250K+ monthly inference calls.',
      'Engineered an LLM-as-a-Judge evaluation pipeline with custom Chain-of-Thought metrics (faithfulness, completeness, link accuracy), improving answer faithfulness by 18% and relevance by 32% via iterative tuning.',
      'Co-architected an AI voice concierge (Ultravox + Twilio) supporting 24+ languages, solving voice-native property routing via HNSW embedding similarity over fuzzy STT-transcribed hotel names.',
      'Centralized legacy language detection into a FastText and FastAPI microservice used across core systems, handling 600K+ monthly requests with a 20% accuracy gain.',
      'Mentored 7 ML engineers to full productivity and led technical interviewing for the ML team.',
    ],
    media: [
      { label: 'Q-I', url: 'https://www.quinta.im/q-i/', visible: false },
      { label: 'Q-Data', url: 'https://www.quinta.im/q-data/', visible: false },
      { label: 'Q-Mail', url: 'https://www.quinta.im/q-mail/', visible: false },
    ],
    visible: true,
  },
  {
    company: 'Quinta (formerly Quicktext)',
    title: 'Machine Learning Engineer Intern',
    start: 'February',
    end: 'July 2022',
    moreInfoPeriod: 'February 2022 - July 2022',
    link: 'https://www.quinta.im',
    id: 'quinta-intern',
    jobType: 'Internship',
    bulletPoints: [
      'Built data cleaning pipeline processing 15M+ data points and trained trip category prediction model using random forests and scikit-learn, achieving 70% accuracy in classifying user travel preferences.',
      'Deployed Flask REST API serving real-time predictions, integrating ML recommendations into production web application for automated trip categorization.'
    ],
    visible: true,
  },
  {
    company: 'Whitecape Technologies',
    title: 'Software Engineer Intern',
    start: 'September',
    end: 'October 2021',
    moreInfoPeriod: 'September 2021 - October 2021',
    link: 'https://www.whitecapetech.com',
    id: 'whitecape-intern',
    jobType: 'Internship',
    bulletPoints: [
      'Built an HR management web application to streamline internal operations.',
      'Worked directly with the HR team to define requirements and shape the UI.',
    ],
    visible: true,
  },
  {
    company: 'Enova Robotics',
    title: 'Software Engineer Intern',
    start: 'August',
    end: 'September 2020',
    moreInfoPeriod: 'August 2020 - September 2020',
    link: 'https://www.enovarobotics.eu',
    id: 'enova-intern',
    jobType: 'Internship',
    bulletPoints: [
      "Contributed to the early development of an object detection module in C++ and OpenCV for autonomous security robots' self-charging feature.",
      'Collaborated with the engineering team on requirements and initial implementation.',
    ],
    media: [
      {
        label: 'Enova Robotics new self-charging feature announcement', visible: true,
        url: 'https://www.linkedin.com/posts/news-securityservices-robotics-share-6729018118783479808-2Ao8',
        embed: 'https://www.linkedin.com/embed/feed/update/urn:li:share:6729018118783479808',
      },
    ],
    visible: true,
  },
]

export const EDUCATION: Education[] = [
  {
    institution: 'École Polytechnique de Sousse',
    degree: 'Master of Engineering',
    field: 'Computer Science',
    tags: ['EUR-ACE® Accredited'],
    start: '2022',
    end: '2025',
    moreInfoPeriod: 'September 2022 - June 2025',
    link: 'https://www.polytecsousse.tn',
    id: 'master-computer-science',
    description: 'Specialized in Artificial Intelligence',
    achievements: [
      { text: 'Graduated with High Honors (GPA: 3.8/4.0)' },
      { text: 'EUR-ACE® accredited programme (CTI), recognized across 40+ European countries', link: 'https://eurace.enaee.eu/node/18452' },
      { text: 'Pursued in parallel with full-time work through night classes on campus' },
      { text: 'Thesis: "An AI-Powered Voice-Interactive Assistant for Intelligent Hotel Room Booking"' },
      { text: 'Relevant Coursework: Deep Learning, Natural Language Processing, Cloud Computing' },
    ],
    visible: true,
  },
  {
    institution: 'École Polytechnique de Sousse',
    degree: 'Licence',
    field: 'Software Engineering',
    tags: ["Bachelor's Equivalent"],
    start: '2019',
    end: '2022',
    moreInfoPeriod: 'September 2019 - July 2022',
    link: 'https://www.polytecsousse.tn',
    id: 'licence-software-engineering',
    achievements: [
      { text: 'Graduated with High Honors (GPA: 3.9/4.0)' },
      { text: 'Thesis: "Dynamic Website Users Profiling & Suggesting Predictor"' },
      { text: 'Relevant Coursework: Algorithms, Probability and Statistics, Machine Learning, Linear Algebra' },
    ],
    visible: true,
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
    'Always open to interesting problems — freelance, open-source, or otherwise.',
  ],
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/aymenkrifa',
  },
  {
    label: 'GitHub',
    link: 'https://www.github.com/aymenkrifa',
  },
  {
    label: 'X',
    link: 'https://www.x.com/krifaymen',
  },
]

export const EMAIL = 'aymenkrifa@gmail.com'
