type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
  moreInfoPeriod: string
  bulletPoints: string[]
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
    name: 'Programming Languages',
    skills: ['Python 3', 'SQL', 'Bash'],
  },
  {
    name: 'AI/ML',
    skills: ['PyTorch', 'scikit-learn', 'LangChain', 'LangGraph', 'Hugging Face Transformers', 'spaCy', 'OpenAI', 'Google Gemini', 'Ultravox', 'DeepEval', 'Mem0'],
  },
  {
    name: 'Libraries & Frameworks',
    skills: ['NumPy', 'Pandas', 'Plotly', 'BeautifulSoup4', 'Selenium', 'pytest'],
  },
  {
    name: 'Web Frameworks & UI',
    skills: ['FastAPI', 'Flask', 'Streamlit'],
  },
  {
    name: 'MLOps & Deployment',
    skills: ['Docker', 'Docker Compose', 'Kubernetes', 'MLflow', 'GitHub Actions', 'Datadog'],
  },
  {
    name: 'Cloud & Infrastructure',
    skills: ['Azure (OpenAI)', 'aiXplain', 'RunPod'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'ChromaDB', 'Redis', 'Elasticsearch'],
  },
  {
    name: 'Development Tools',
    skills: ['Git', 'IPython', 'Jupyter', 'Twilio'],
  },
  {
    name: 'AI Tools',
    skills: ['Windsurf', 'GitHub Copilot', 'Copilot CLI'],
  },
]

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
    link: 'https://github.com/aymenkrifa/autoactivator',
    video: '',
    id: 'project1',
  },
  {
    name: 'Reaper',
    description:
      'A simple TUI for listing, monitoring, and killing listening ports using Rust.',
    link: 'https://github.com/aymenkrifa/reaper',
    video: '',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Quicktext',
    title: 'Machine Learning Engineer',
    start: '2022',
    end: 'Present',
    moreInfoPeriod: 'July 2022 - Present',
    link: 'https://quicktext.im',
    id: 'work1',
    jobType: 'Full-time',
    bulletPoints: [
      'Architected multi-agent orchestration system with 35+ specialized LangGraph agents for hotel operations, implementing custom tools, prompt engineering, Mem0 memory persistence, and MCP data integration across distributed workflows',
      'Engineered production RAG pipeline with LangChain, ChromaDB, and Azure OpenAI, reducing hallucinations by 15% across 10K+ monthly queries; deployed via FastAPI with Datadog monitoring',
      'Re-architected BERT intent classifier from single-label to multi-label using PyTorch and Transformers, serving 100K+ monthly requests via FastAPI and reducing misclassification bugs by 25%',
      'Designed LLM-as-a-Judge evaluation framework with DeepEval and Gemini-based prompt chaining to automate quality assessment, improving response scores by 18% and enabling systematic evaluation across production LLM outputs',
      'Developed voice-enabled booking assistant handling phone reservations with 40+ FastAPI function calling endpoints, integrating Ultravox, LLM APIs, Redis state management, and Twilio telephony',
      'Implemented FastText language detection microservice improving accuracy by 20%, enabling multi-language support across hotel chatbot operations serving 600K+ monthly requests',
    ],
  },
  {
    company: 'Quicktext',
    title: 'Machine Learning Engineer Intern',
    start: 'Feb.',
    end: 'Jul. 2022',
    moreInfoPeriod: 'February 2022 - July 2022',
    link: 'https://quicktext.im',
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
    link: 'https://whitecapetech.com',
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
    link: 'https://enovarobotics.eu',
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
    institution: 'Ecole Polytechnique de Sousse',
    degree: 'Engineering Degree',
    field: 'Computer Science',
    start: '2021',
    end: '2025',
    moreInfoPeriod: 'September 2021 - June 2025',
    link: 'https://polytecsousse.tn',
    id: 'edu1',
    description: 'Specialized in Machine Learning and Artificial Intelligence',
    achievements: [
      'Graduated with High Honors (GPA: 3.8/4.0)',
      'Thesis: "An AI-Powered Voice-Interactive Assistant for Intelligent Hotel Room Booking"',
      'Relevant Coursework: Deep Learning, Natural Language Processing, Cloud Computing',
    ],
  },
  {
    institution: 'Ecole Polytechnique de Sousse',
    degree: 'Bachelor of Engineering',
    field: 'Software Engineering',
    start: '2019',
    end: '2021',
    moreInfoPeriod: 'September 2019 - July 2021',
    link: 'https://polytecsousse.tn',
    id: 'edu2',
    achievements: [
      'Graduated with High Honors (GPA: 3.9/4.0)',
      'Thesis: "Dynamic Website Users Profiling & Suggesting Predictor"',
      'Relevant Coursework: Algorithms, Probability and Statistics, Machine Learning, Mathematics'
    ],
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description:
      'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    link: 'https://github.com/aymenkrifa',
  },
  {
    label: 'X (Twitter)',
    link: 'https://x.com/krifaymen',
  },
  {
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/aymenkrifa',
  },
]

export const EMAIL = 'aymenkrifa@gmail.com'
