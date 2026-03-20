import {
  listAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementsController.js'
import {
  listEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController.js'
import {
  listInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from '../controllers/internshipController.js'
import Project from '../models/Project.js'
import Skill from '../models/Skill.js'
import Achievement from '../models/Achievement.js'
import Education from '../models/Education.js'
import Internship from '../models/Internship.js'

export async function seedInitialData(req, res) {
  try {
    // 1. Projects
    const desiredProjects = [
      {
        title: 'GST Calculator (Django REST + Streamlit)',
        description: 'Dynamic GST calculator with Django REST API and Streamlit UI.',
        tags: ['Python', 'Django 5', 'Django REST Framework', 'Streamlit', 'SQLite', 'CORS'],
        problem: 'Provide accurate GST computation for multiple categories with both inclusive and exclusive price flows, surfaced via a simple web UI and a clean REST API.',
        features: [
          'Dynamic GST categories stored in database',
          'Inclusive and exclusive price calculations',
          'Examples per GST slab in UI',
          'Clean Streamlit interface with category dropdown and toggle',
          'REST endpoints for listing rates and calculation'
        ],
        architecture: [
          'Django + DRF backend (rates listing, calculation endpoint)',
          'Streamlit frontend consuming API',
          'GstRate model + seed command for slabs',
          'SQLite for dev (pluggable to other DBs)'
        ],
        liveUrl: 'https://gst-calculator-rkp.streamlit.app/',
        githubUrl: 'https://github.com/rajeevkp312/GST-Calculator',
        order: 1,
      },
      {
        title: 'HealthNexus – Full-Stack Healthcare Management System',
        description: 'Healthcare portals with secure authentication and role-based access.',
        tags: ['MERN', 'JWT', 'Email OTP', 'Vercel', 'Render'],
        problem: 'Provide role-specific healthcare portals with secure authentication and operations across admin, doctor, and patient workflows.',
        features: [
          'Admin, Doctor, Patient portals',
          'JWT-based role authentication',
          'Email OTP verification',
          'Secure CRUD operations'
        ],
        architecture: [
          'MERN',
          'JWT roles',
          'Email OTP',
          'Secure CRUD',
          'Vercel + Render'
        ],
        deployment: {
          frontend: 'Vercel',
          backend: 'Render'
        },
        liveUrl: 'https://healthnexusapp.vercel.app',
        githubUrl: 'https://github.com/rajeevkp312/Health-Nexus',
        order: 2,
      },
      {
        title: 'Real-Time Chat Application',
        description: 'Cross-platform chat with real-time messaging and presence.',
        tags: ['React Native (Expo)', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT'],
        problem: 'Enable reliable, authenticated 1:1 messaging with presence, typing, and delivery state in real-time.',
        features: [
          '1:1 real-time messaging',
          'JWT authentication',
          'Online/offline status',
          'Typing indicators',
          'Read receipts',
          'Persistent message storage'
        ],
        architecture: [
          'React Native + Node/Express',
          'MongoDB',
          'Socket.IO realtime',
          'JWT auth'
        ],
        githubUrl: 'https://github.com/rajeevkp312/Chat_application',
        order: 3,
      },
      {
        title: 'News Portal (MERN Stack)',
        description: 'Content platform with role-based access and admin management.',
        tags: ['MERN', 'Role-based Access', 'Responsive UI', 'Authentication'],
        problem: 'Publish and manage news/blog content with role-based access and an admin-controlled workflow.',
        features: [
          'Authentication',
          'Role-based access',
          'Admin-controlled content management',
          'Blogs, news ticker, user reviews',
          'Responsive UI'
        ],
        architecture: [
          'MERN',
          'Auth + RBAC',
          'Admin CMS',
          'Responsive UI'
        ],
        githubUrl: '',
        order: 4,
      },
    ]

    await Promise.all(
      desiredProjects.map((p) =>
        Project.updateOne(
          {
            $or: [
              { title: p.title },
              ...(p.githubUrl
                ? [{ githubUrl: p.githubUrl }]
                : []),
              ...(p.title.startsWith('HealthNexus')
                ? [{ title: 'HealthNexus – Healthcare Management' }]
                : []),
            ],
          },
          {
            $set: {
              title: p.title,
              description: p.description,
              problem: p.problem,
              tags: p.tags,
              features: p.features,
              architecture: p.architecture,
              deployment: p.deployment,
              liveUrl: p.liveUrl,
              githubUrl: p.githubUrl,
              order: p.order,
            },
          },
          { upsert: true }
        )
      )
    )

    // 2. Education
    const existingEdu = await Education.countDocuments()
    if (existingEdu === 0) {
      await Education.create([
        { yearRange: '2022–2026', institution: 'Institute of Technology & Management, Gorakhpur', degree: 'B.Tech AIML', order: 1 },
        { yearRange: '2022–2026 (Concurrent)', institution: 'Institute of Technology & Management, Gorakhpur', degree: 'Honors in Cyber Security', order: 2 },
        { yearRange: '2019–2021', institution: 'Mahatma Gandhi Intermediate College', degree: 'Intermediate (Maths)', order: 3 },
        { yearRange: '2018–2019', institution: 'Oxford Public School', degree: 'High School', order: 4 }
      ])
    }

    // 3. Internship
    const existingIntern = await Internship.countDocuments()
    if (existingIntern === 0) {
      await Internship.create([
        {
          title: 'MERN Stack Intern',
          company: 'Softpro India Computer Technologies Pvt. Ltd.',
          duration: '60 Days',
          grade: 'A+ Grade',
          description: 'Focused on REST APIs, Authentication, Database design, and Backend logic.',
          order: 1
        }
      ])
    }

    // 4. Achievements (upsert full list, fixed order)
    const desiredAchievements = [
      {
        title: 'Gorakhpur Mahotsav Hackathon',
        description: 'Core team member of “Invictus Coders”. Built “TraVis” – AI traffic safety & congestion monitoring using OpenCV, YOLO, and DeepSORT.',
        icon: '',
        links: [
          {
            label: 'LinkedIn Post',
            url: 'https://www.linkedin.com/posts/rajeev-kumar-pandit-a72977280_teamwork-invictuscoders-gorakhpurmahotsav-activity-7416854056377208832-sje1',
          },
        ],
        order: 1,
      },
      {
        title: 'MERN Stack Internship',
        description: 'Awarded A+ Grade during Summer Internship at Softpro India Computer Technologies Pvt. Ltd. for backend and API development.',
        icon: '',
        links: [],
        order: 2,
      },
      {
        title: 'Chess.com Blitz Rating 1500',
        description: 'Strategic thinking and consistency demonstrated through competitive online chess.',
        icon: '',
        links: [{ label: 'Chess Profile', url: 'https://www.chess.com/member/RKP0030' }],
        order: 3,
      },
      {
        title: 'AI + Computer Vision Projects',
        description: 'Real-world problem solving with AI/CV exposure, building end-to-end intelligent systems.',
        icon: '',
        links: [],
        order: 4,
      },
    ]

    await Promise.all(
      desiredAchievements.map((a) =>
        Achievement.updateOne(
          { title: a.title },
          {
            $set: {
              title: a.title,
              description: a.description,
              icon: a.icon,
              links: a.links,
              order: a.order,
            },
          },
          { upsert: true }
        )
      )
    )

    // 5. Skills (upsert full list, no duplicates)
    const desiredSkills = [
      // Web & Frontend
      { name: 'HTML', category: 'Web & Frontend', level: 85, icon: '' },
      { name: 'CSS', category: 'Web & Frontend', level: 85, icon: '' },
      { name: 'JavaScript', category: 'Web & Frontend', level: 85, icon: '' },
      { name: 'React.js', category: 'Web & Frontend', level: 90, icon: '' },
      { name: 'Tailwind CSS', category: 'Web & Frontend', level: 85, icon: '' },
      { name: 'Bootstrap', category: 'Web & Frontend', level: 80, icon: '' },

      // Backend & Database
      { name: 'Node.js', category: 'Backend & Database', level: 85, icon: '' },
      { name: 'Express.js', category: 'Backend & Database', level: 85, icon: '' },
      { name: 'MongoDB', category: 'Backend & Database', level: 80, icon: '' },
      { name: 'REST APIs', category: 'Backend & Database', level: 80, icon: '' },
      { name: 'JWT Authentication', category: 'Backend & Database', level: 80, icon: '' },
      { name: 'Socket.IO', category: 'Backend & Database', level: 75, icon: '' },

      // Programming Languages
      { name: 'C', category: 'Programming Languages', level: 75, icon: '' },
      { name: 'Java', category: 'Programming Languages', level: 75, icon: '' },
      { name: 'Python', category: 'Programming Languages', level: 80, icon: '' },

      // Data / Computer Vision
      { name: 'OpenCV', category: 'Data / Computer Vision', level: 70, icon: '' },
      { name: 'NumPy', category: 'Data / Computer Vision', level: 70, icon: '' },
      { name: 'Matplotlib', category: 'Data / Computer Vision', level: 65, icon: '' },

      // Tools & Systems
      { name: 'Git', category: 'Tools & Systems', level: 80, icon: '' },
      { name: 'GitHub', category: 'Tools & Systems', level: 80, icon: '' },
      { name: 'VS Code', category: 'Tools & Systems', level: 80, icon: '' },
      { name: 'IntelliJ', category: 'Tools & Systems', level: 70, icon: '' },
      { name: 'MySQL', category: 'Tools & Systems', level: 70, icon: '' },
      { name: 'Operating Systems', category: 'Tools & Systems', level: 70, icon: '' },
    ]

    await Promise.all(
      desiredSkills.map((s) =>
        Skill.updateOne(
          { name: s.name },
          {
            $set: {
              name: s.name,
              category: s.category,
              level: s.level,
              icon: s.icon,
            },
          },
          { upsert: true }
        )
      )
    )

    res.json({ ok: true, message: 'Initial data seeded successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Seeding failed', error: err.message })
  }
}
