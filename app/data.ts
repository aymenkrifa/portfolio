type Project = {
  name: string
  description: string
  link: string
  site?: string
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
  teaser?: string
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
  achievements?: { text: string; link?: string; linkLabel?: string }[]
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
  link?: string
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
    name: 'GenAI & LLM Systems',
    skills: [
      { name: 'LangGraph' },
      { name: 'LangChain' },
      { name: 'Multi-Agent Systems' },
      { name: 'RAG (Retrieval-Augmented Generation)' },
      { name: 'LLM Evaluation (LLM-as-a-Judge)' },
      { name: 'LangSmith' },
      { name: 'Embeddings' },
      { name: 'OpenAI SDK' },
      { name: 'Voice AI (Ultravox, Twilio)' },
      { name: 'Prompt Engineering' },
    ],
  },
  {
    name: 'Machine Learning',
    skills: [
      { name: 'PyTorch' },
      { name: 'Hugging Face Transformers' },
      { name: 'NLP' },
      { name: 'BERT' },
      { name: 'spaCy' },
      { name: 'FastText' },
      { name: 'scikit-learn' },
      { name: 'CLIP' },
      { name: 'pandas' },
      { name: 'NumPy' },
    ],
  },
  {
    name: 'MLOps & Infrastructure',
    skills: [
      { name: 'Docker' },
      { name: 'Docker Compose' },
      { name: 'Kubernetes' },
      { name: 'GitHub Actions' },
      { name: 'MLflow' },
      { name: 'DVC' },
      { name: 'Datadog' },
      { name: 'Linux' },
    ],
  },
  {
    name: 'Backend & APIs',
    skills: [{ name: 'FastAPI' }, { name: 'Flask' }, { name: 'REST APIs' }],
  },
  {
    name: 'Databases & Storage',
    skills: [
      { name: 'Vector Databases' },
      { name: 'ChromaDB' },
      { name: 'PostgreSQL' },
      { name: 'Redis' },
      { name: 'Supabase' },
      { name: 'Elasticsearch' },
    ],
  },
  {
    name: 'Cloud Platforms',
    skills: [{ name: 'AWS' }, { name: 'Azure (Microsoft Foundry)' }],
  },
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
    name: 'AI Tools',
    skills: [
      { name: 'Claude Code' },
      { name: 'Devin Desktop (formerly Windsurf)' },
      { name: 'GitHub Copilot' },
      { name: 'kata', link: 'https://katatracker.com', exploring: true },
      { name: 'roborev', link: 'https://roborev.io', exploring: true },
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
    name: 'Associate Data Scientist',
    issuer: 'DataCamp',
    date: 'July 2022',
    credentialId: '56954fa5219fd1e348b6f93ccb25e55981fc8f69',
    link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/56954fa5219fd1e348b6f93ccb25e55981fc8f69',
    id: 'datacamp-data-scientist',
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
    name: 'Pharos',
    description:
      'A GNOME Shell extension that tracks Claude usage limits in the top panel, showing the 5-hour and 7-day windows together so you see a limit coming instead of hitting it mid-task. The indicator is a tiny lighthouse.',
    link: 'https://www.github.com/aymenkrifa/Pharos',
    site: 'https://pharos.aymenkrifa.com',
    id: 'pharos',
    tags: ['GNOME Shell', 'JavaScript'],
    visible: true,
  },
  {
    name: 'AutoActivator',
    description:
      'A shell tool that activates the right Python virtual environment when you `cd` into a project and deactivates it when you leave — near-instantly ([See benchmarks →](https://autoactivator.aymenkrifa.com/#how)).',
    link: 'https://www.github.com/aymenkrifa/autoactivator',
    site: 'https://autoactivator.aymenkrifa.com',
    id: 'autoactivator',
    tags: ['Shell'],
    visible: true,
  },
  {
    name: 'Reaper',
    description:
      'A Rust TUI for browsing and killing listening ports, built after one too many times forgetting the right `lsof` flags — and also an excuse to explore Rust.',
    link: 'https://www.github.com/aymenkrifa/reaper',
    site: 'https://reaper.aymenkrifa.com',
    id: 'reaper',
    tags: ['Rust', 'Ratatui'],
    visible: true,
  },
  {
    name: 'KExplorer',
    description: 'A highly opinionated, web-based Kubernetes dashboard that pulls everything Lens and k9s spread across multiple views onto one screen, with pod grouping by project on top.',
    link: 'https://www.github.com/aymenkrifa/KExplorer',
    id: 'kexplorer',
    tags: ['Python', 'FastAPI', 'Kubernetes', 'TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    visible: true,
  },
  {
    name: 'Chroma Explorer',
    description: 'A desktop GUI for browsing ChromaDB collections, forked to keep working against Chroma 0.x servers when 1.x migration was not an option. Rewinds the JavaScript client to the legacy `/api/v1` API.',
    link: 'https://www.github.com/aymenkrifa/chroma-explorer',
    id: 'chroma-explorer',
    tags: ['TypeScript', 'React', 'Electron', 'Tailwind CSS', 'ChromaDB'],
    visible: true,
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
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
    teaser:
      'Replaced a legacy stack with 50+ specialized agents; mentored 7 engineers and led technical interviewing.',
    description:
      'Quinta builds AI-powered guest communication for hotels — chat, email, and voice across the booking journey.',
    bulletPoints: [
      'Led a team of 4 engineers to ship a production LangGraph multi-agent system (50+ specialized agents) that replaced a legacy stack, resolving compound guest requests in a single turn instead of sequential follow-ups.',
      'Deployed a production RAG pipeline with LangChain and ChromaDB that grounds LLM responses in proprietary data, cutting hallucinations by 15% across 100K+ monthly queries.',
      'Re-architected a BERT intent classifier from single-label to multi-label with NTR-Focal Loss and Macro-F1 evaluation, cutting misclassification by 25% and enabling compound intent detection across 250K+ monthly inference calls.',
      'Engineered an LLM-as-a-Judge evaluation pipeline with custom Chain-of-Thought metrics (faithfulness, completeness, link accuracy), then used it to drive iterative tuning that improved answer faithfulness by 18% and relevance by 32%.',
      'Co-architected an AI voice concierge on Ultravox and Twilio, supporting 24+ languages. The hard problem: guests say a hotel name, speech-to-text garbles it, and the call still has to reach the right property — solved with HNSW embedding similarity over the fuzzy transcriptions.',
      'Centralized legacy language detection into a FastText and FastAPI microservice used across core systems, handling 600K+ monthly requests with a 20% accuracy gain.',
      'Mentored 7 ML engineers and led technical interviewing for the ML team.',
    ],
    visible: true,
  },
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
    description: 'Skinify is an AI platform that helps people find skincare products that actually fit their skin. I co-founded it and build on it nights and weekends, alongside my full-time work at Quinta.',
    cta: {
      label: 'Visit Skinify →',
      url: 'https://skinify.ai',
    },
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
      { text: 'EUR-ACE® accredited programme (CTI), recognized across 40+ European countries', link: 'https://eurace.enaee.eu/node/18452', linkLabel: 'View accreditation page →' },
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
  paragraphs: [
    "I've spent the last {yoe} years at Quinta, building the AI behind hotel guest communication. The early work was classic ML — intent classification, language detection; these days it's production GenAI.",
    "I led a team of 4 to ship our LangGraph multi-agent system, and I built the LLM-as-a-Judge evaluation pipeline that tells us whether a change actually made answers better.",
    "I mostly build things: AI systems at work, dev tools when a workflow annoys me enough, and the occasional side project that outgrows its weekend. I earned my master's in computer science in night classes while working full-time. Off the clock, I'm usually a few layers deep in some new rabbit hole.",
  ],
  highlights: [
    'RAG pipeline · 100K+ monthly queries',
    'Multi-label BERT intents · 250K+ monthly calls',
    'Voice concierge · 24+ languages',
    'FastText language detection · 600K+ monthly requests',
  ],
  availability: [
    'Got an open-source idea, a question about something I built, or just want to talk shop about LLM systems? My inbox is open.',
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
