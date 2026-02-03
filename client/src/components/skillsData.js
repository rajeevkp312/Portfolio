// Skills data extracted strictly from the provided resume
// Each item has a name and an Icon component from react-icons
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiNumpy,
  SiOpencv,
  SiGit,
  SiGithub,
  SiVisualstudiocode,
  SiIntellijidea,
  SiMysql,
  SiPython,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { TbLetterC } from 'react-icons/tb'
import { MdApi, MdComputer, MdShowChart } from 'react-icons/md'
import { RiKey2Fill } from 'react-icons/ri'

export const skillCategories = [
  {
    title: 'Web & Frontend',
    items: [
      { name: 'HTML', Icon: SiHtml5, color: 'text-[#E34F26]' },
      { name: 'CSS', Icon: SiCss3, color: 'text-[#1572B6]' },
      { name: 'JavaScript', Icon: SiJavascript, color: 'text-[#F7DF1E]' },
      { name: 'React.js', Icon: SiReact, color: 'text-[#61DAFB]' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: 'text-[#38BDF8]' },
      { name: 'Bootstrap', Icon: SiBootstrap, color: 'text-[#7952B3]' },
    ],
  },
  {
    title: 'Backend & Database',
    items: [
      { name: 'Node.js', Icon: SiNodedotjs, color: 'text-[#339933]' },
      { name: 'Express.js', Icon: SiExpress, color: 'text-white/90' },
      { name: 'MongoDB', Icon: SiMongodb, color: 'text-[#47A248]' },
      { name: 'REST APIs', Icon: MdApi, color: 'text-teal-400' },
      { name: 'JWT Authentication', Icon: RiKey2Fill, color: 'text-amber-400' },
      { name: 'Socket.IO', Icon: SiSocketdotio, color: 'text-white/90' },
    ],
  },
  {
    title: 'Programming Languages',
    items: [
      { name: 'C', Icon: TbLetterC, color: 'text-[#A8B9CC]' },
      { name: 'Java', Icon: FaJava, color: 'text-[#E11F21]' },
      { name: 'Python', Icon: SiPython, color: 'text-[#3776AB]' },
    ],
  },
  {
    title: 'Data / Computer Vision',
    items: [
      { name: 'OpenCV', Icon: SiOpencv, color: 'text-[#5C3EE8]' },
      { name: 'NumPy', Icon: SiNumpy, color: 'text-[#4DABCF]' },
      { name: 'Matplotlib', Icon: MdShowChart, color: 'text-sky-400' },
    ],
  },
  {
    title: 'Tools & Systems',
    items: [
      { name: 'Git', Icon: SiGit, color: 'text-[#F05032]' },
      { name: 'GitHub', Icon: SiGithub, color: 'text-white/90' },
      { name: 'VS Code', Icon: SiVisualstudiocode, color: 'text-[#007ACC]' },
      { name: 'IntelliJ', Icon: SiIntellijidea, color: 'text-pink-500' },
      { name: 'MySQL', Icon: SiMysql, color: 'text-[#4479A1]' },
      { name: 'Operating Systems', Icon: MdComputer, color: 'text-white/90' },
    ],
  },
]
