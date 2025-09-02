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
    name: 'Languages',
    skills: ['Python', 'SQL', 'Shell Scripting'],
  },
  {
    name: 'AI/ML',
    skills: ['PyTorch', 'Scikit-Learn', 'LangChain', 'OpenAI', 'Transformers'],
  },
  {
    name: 'Web Frameworks & UI',
    skills: ['FastAPI', 'Flask', 'Streamlit'],
  },

  {
    name: 'Tools & Cloud',
    skills: ['Docker', 'Git', 'AWS', 'GitHub Actions'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'ChromaDB', 'MongoDB'],
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
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
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
      'Engineered and refined pipelines that empowered LLMs with domain-specific knowledge for hotel-related prompts, improving response accuracy.',
      'Implemented a Retrieval-Augmented Generation (RAG) system using LangChain with Mistral, Meta’s Llama, and OpenAI’s GPT models, leveraging ChromaDB as the vector store to significantly reduce model hallucination by 15% and enable more context-aware responses.',
      'Designed and implemented an LLM-as-a-Judge evaluation framework, utilizing prompt chaining to objectively assess and iteratively improve the quality and accuracy of LLM-generated responses.',
      'Developed and deployed a voice-enabled room booking assistant with Ultravox, integrating function calls for efficient hotel reservation workflow automation agents.',
      'Revamped and fine-tuned internal ML pipelines, leading to a boost in workflow efficiency and substantially improving system scalability for fine-tuning core models.',
      'Led the transition of the BERT-based chatbot intent detection system to multi-label classification and integrated generative AI, resulting in a 25% reduction in reported bugs.',
      'Translated complex data into actionable insights and compelling visualizations for stakeholders, enabling data-driven strategic decisions.',
      'Drove stakeholder engagement for critical ML initiatives, aligning technical roadmaps with business objectives and ensuring project success.',
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
      "Leveraged supervised Machine Learning techniques (decision trees, random forests), achieving a 70% accuracy rate in predicting website users' trip categories.",
      'Extracted insights from millions of data points, maintaining data integrity and compliance.',
      "Engineered and deployed a robust predictor API using Flask, seamlessly integrating the machine learning model with the company's web application to deliver automated recommendations.",
      'Delivered weekly, data-driven insights through comprehensive reports, influencing key decisions.',
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
