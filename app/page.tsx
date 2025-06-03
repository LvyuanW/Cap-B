'use client';
import { useState, useEffect } from 'react';
import { listTeamDescriptions } from './api/teamDescriptions';
import { listNews } from './api/news';
import { listResearchAreas } from './api/researchAreas';
import { listResearchProjects } from './api/researchProjects';
import { listTeamMembers } from './api/teamMembers';
import { createMessage } from './api/messages';
import { javaDateTimeToString } from '@/utils/helpers';

export default function Page() {
  interface TeamDescription {
    uid: string
    content: string
    createdAt: string
    deletedAt?: string
    isDeleted: number
  }
  interface ResearchAreas {
    uid: string
    content: string
    createdAt: string
    deletedAt?: string
    isDeleted: number
  }
  interface News {
    uid: string
    title: string
    imageUrl: string
    content: string
    createdAt: string
    deletedAt?: string
    isDeleted: number
  }
  interface ResearchProjects {
    uid: string;
    title: string;
    imageUrl: string;
    description: string;
  }
  interface TeamMembers {
    responsibilities: string;
    uid: string;
    avatarUrl: string;
    title: string;
    role: string;
    degree: string;
    university: string;
    description: string;
  }
  interface Message {
    name: string,
    email: string,
    subject: string,
    message: string
  }
  const [activeTab, setActiveTab] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [publications, setPublications] = useState([]);
  const [teamDescriptions, setTeamDescriptions] = useState<TeamDescription[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [researchAreasList, setResearchAreas] = useState<ResearchAreas[]>([]);
  const [researchProjectsList, setResearchProjects] = useState<ResearchProjects[]>([]);
  const [teamMembersList, setTeamMembers] = useState<TeamMembers[]>([]);

  const [formData, setFormData] = useState<Message>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // 简单验证
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.')
      return
    }

    try {
      setLoading(true)
      await createMessage(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('Failed', err)
      setError('Failed to send message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'publications') {
      fetch('/api/publications')
        .then((res) => res.json())
        .then((data) => setPublications(data.publications || []))
        .catch((err) => console.error(err));
    }

    if (activeTab === 'about') {
      listTeamDescriptions()
        .then((res) => {
          console.log('TeamDescriptions 接口返回：', res)
          setTeamDescriptions(res.data)
        })
        .catch((err: any) => console.error('TeamDescriptions Error:', err));

      listNews()
        .then((res) => {
          console.log('News 接口返回：', res)
          setNewsList(res.data)
        })
        .catch((err: any) => console.error('News Error:', err));

      listResearchAreas()
        .then((res) => {
          console.log('ResearchAreas 接口返回：', res)
          setResearchAreas(res.data)
        })
        .catch((err: any) => console.error('ResearchAreas Error:', err));
    }

    if (activeTab === 'research') {
      listResearchProjects()
        .then((res) => {
          console.log('ResearchProjects 接口返回：', res)
          setResearchProjects(res.data)
        })
        .catch((err: any) => console.error('ResearchProjects Error:', err));
    }

    if (activeTab === 'team') {
      listTeamMembers()
        .then((res) => {
          console.log('TeamMembers 接口返回：', res)
          setTeamMembers(res.data)
        })
        .catch((err: any) => console.error('TeamMembers Error:', err));
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">

      {/* Header with University branding */}
      <header className="bg-[#d7153a] text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center py-4">

            <div className="flex items-center">

              <h1 className="text-2xl font-bold"> University of Sydney </h1>
              <span className="mx-2 text-white/70"> | </span>
              <h2 className="text-xl"> Nanometrology Research Team </h2>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >

                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >

                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8 ml-auto">

              <button
                onClick={() => setActiveTab('about')}
                className={`whitespace-nowrap text-white hover:text-white/80 px-3 py-2 ${activeTab === 'about' ? 'border-b-2 border-white' : ''}`}
              >

                About Us
              </button>
              <button
                onClick={() => setActiveTab('research')}
                className={`whitespace-nowrap text-white hover:text-white/80 px-3 py-2 ${activeTab === 'research' ? 'border-b-2 border-white' : ''}`}
              >

                Research
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`whitespace-nowrap text-white hover:text-white/80 px-3 py-2 ${activeTab === 'team' ? 'border-b-2 border-white' : ''}`}
              >

                Our Team
              </button>
              <button
                onClick={() => setActiveTab('publications')}
                className={`whitespace-nowrap text-white hover:text-white/80 px-3 py-2 ${activeTab === 'publications' ? 'border-b-2 border-white' : ''}`}
              >

                Publications
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`whitespace-nowrap text-white hover:text-white/80 px-3 py-2 ${activeTab === 'contact' ? 'border-b-2 border-white' : ''}`}
              >

                Contact
              </button>

            </nav>
          </div>
        </div>
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#b01232] py-2">

            <div className="px-4 space-y-1">

              <button
                onClick={() => {
                  setActiveTab('about');
                  setIsMenuOpen(false);
                }}
                className="block text-white hover:bg-[#a01030] px-3 py-2 rounded-md w-full text-left"
              >

                About Us
              </button>
              <button
                onClick={() => {
                  setActiveTab('research');
                  setIsMenuOpen(false);
                }}
                className="block text-white hover:bg-[#a01030] px-3 py-2 rounded-md w-full text-left"
              >

                Research
              </button>
              <button
                onClick={() => {
                  setActiveTab('team');
                  setIsMenuOpen(false);
                }}
                className="block text-white hover:bg-[#a01030] px-3 py-2 rounded-md w-full text-left"
              >

                Our Team
              </button>
              <button
                onClick={() => {
                  setActiveTab('publications');
                  setIsMenuOpen(false);
                }}
                className="block text-white hover:bg-[#a01030] px-3 py-2 rounded-md w-full text-left"
              >

                Publications
              </button>
              <button
                onClick={() => {
                  setActiveTab('contact');
                  setIsMenuOpen(false);
                }}
                className="block text-white hover:bg-[#a01030] px-3 py-2 rounded-md w-full text-left"
              >

                Contact
              </button>
              <button
                onClick={() => {
                  window.location.href = '/login';
                  setIsMenuOpen(false);
                }}
                className="block text-white hover:bg-[#a01030] px-3 py-2 rounded-md w-full text-left"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </header>
      {/* Hero section */}
      {activeTab === 'about' && (
        <div className="relative">

          <div className="bg-gray-900 h-[500px] flex items-center">

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1628595351029-c2bf17511435?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80')",
              }}
            ></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

              <div className="max-w-3xl">

                <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">

                  Precision at the Nanoscale
                </h1>
                <p className="mt-6 text-xl text-white/90">

                  The University of Sydney&apos;s Nanometrology Team is pioneering
                  advanced measurement techniques at the nanoscale, enabling
                  breakthroughs in science and technology through unprecedented
                  precision.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">

                  <button
                    onClick={() => setActiveTab('research')}
                    className="px-8 py-3 bg-[#d7153a] text-white rounded-md hover:bg-[#b01232] transition-colors"
                  >

                    Our Research
                  </button>
                  <button
                    onClick={() => setActiveTab('team')}
                    className="px-8 py-3 border border-white text-white rounded-md hover:bg-white/10 transition-colors"
                  >

                    Meet the Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* About section */}
        {activeTab === 'about' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About Our Nanometrology Team
                </h2>
                {teamDescriptions?.map((desc) => (
                  <p key={desc.uid} className="text-lg text-gray-700 mb-4">
                    {desc.content}
                  </p>
                ))}
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">

                <h3 className="text-2xl font-bold text-gray-900 mb-4">

                  Research Focus Areas
                </h3>
                <ul className="space-y-3">
                  {researchAreasList?.map((desc) => (
                    <li key={desc.uid} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-[#d7153a] mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-700">
                        {desc.content}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-16">

              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">

                Latest News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {newsList?.map((news) => (
                  <div key={news.uid} className="bg-white shadow-md rounded-lg overflow-hidden">

                    <div className="h-48 bg-gray-200">
                      {/* 图片展示：使用完整 URL 拼接 */}
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${news.imageUrl}`}
                        alt={news.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-[#d7153a] font-semibold mb-2">
                        {new Date(news.createdAt).toLocaleDateString()} {/* 日期格式化 */}
                      </p>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {news.title}
                      </h3>

                      <p className="text-gray-700">
                        {news.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Research section */}
        {activeTab === 'research' && (
          <div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">

              Our Research
            </h2>
            <div className="space-y-16">

              {researchProjectsList?.map((project, index) => (
                <div
                  key={project.uid}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12"
                >
                  {/* 奇数序号（index 从 0 开始）使用正常顺序 Project 1 模板 */}
                  {index % 2 === 0 ? (
                    <>
                      <div className="bg-gray-100 h-80 rounded-lg overflow-hidden">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${project.imageUrl}`}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {project.title}
                        </h3>
                        <p className="text-gray-700 mb-4">
                          {project.description}
                        </p>
                        <button className="px-6 py-2 bg-[#d7153a] text-white rounded-md hover:bg-[#b01232] transition-colors">
                          Learn More
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 偶数序号使用反转顺序 Project 2 模板 */}
                      <div className="order-1 md:order-2 bg-gray-100 h-80 rounded-lg overflow-hidden">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${project.imageUrl}`}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="order-2 md:order-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {project.title}
                        </h3>
                        <p className="text-gray-700 mb-4">
                          {project.description}
                        </p>
                        <button className="px-6 py-2 bg-[#d7153a] text-white rounded-md hover:bg-[#b01232] transition-colors">
                          Learn More
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}

            </div>
          </div>
        )}
        {/* Team section */}
        {activeTab === 'team' && (
          <div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8"> Our Team </h2>
            <div className="mb-16">

              <h3 className="text-2xl font-bold text-gray-900 mb-6">

                Leadership
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembersList
                  ?.filter((member) => member.role === 'Leadership')
                  .map((member) => (
                    <div key={member.uid} className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                      <div className="h-64 bg-gray-200 overflow-hidden">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${member.avatarUrl}`}
                          alt={member.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {member.title}
                        </h4>
                        <p className="text-[#d7153a] font-medium mb-3">
                          {member.responsibilities}
                        </p>
                        <p className="text-gray-700 mb-4">
                          {member.degree}, {member.university}
                        </p>
                        <p className="text-gray-700">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mb-16">

              <h3 className="text-2xl font-bold text-gray-900 mb-6">

                Senior Researchers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {teamMembersList
                  ?.filter((member) => member.role === 'Senior Researchers')
                  .map((member) => (
                    <div key={member.uid} className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${member.avatarUrl}`}
                          alt={member.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {member.title}
                        </h4>
                        <p className="text-[#d7153a] font-medium mb-2">
                          {member.responsibilities}
                        </p>
                        <p className="text-sm text-gray-700">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  ))}

              </div>
            </div>
            <div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">

                PhD Students & Postdoctoral Researchers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembersList
                  ?.filter((member) => member.role === 'PhD Students & Postdoctoral Researchers')
                  .map((member) => (
                    <div key={member.uid} className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${member.avatarUrl}`}
                          alt={member.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {member.title}
                        </h4>
                        <p className="text-[#d7153a] font-medium mb-2">
                          {member.responsibilities}
                        </p>
                        <p className="text-sm text-gray-700">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  ))}

              </div>
            </div>
          </div>
        )}
        {/* Publications section */}
        {activeTab === 'publications' && (
          <div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">

              Publications
            </h2>
            <div className="mb-12">

              <h3 className="text-2xl font-bold text-gray-900 mb-6">

                Featured Publications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {publications.slice(0, 2).map((pub: any) => (
                  <div
                    key={pub.id}
                    className="bg-white shadow-md rounded-lg overflow-hidden"
                  >

                    <div className="p-6">

                      <h4 className="text-xl font-bold text-gray-900 mb-3">

                        {pub.title}
                      </h4>
                      <p className="text-gray-700 mb-4"> {pub.authors} </p>
                      <p className="text-[#d7153a] font-medium mb-4">

                        {pub.subTitle}
                      </p>
                      <p className="text-gray-700 mb-4">

                        {pub.description}
                      </p>
                      <button
                        onClick={() =>
                          window.open(pub.pdf, '_blank')
                        }
                        className="px-4 py-2 border border-[#d7153a] text-[#d7153a] rounded-md hover:bg-[#d7153a] hover:text-white transition-colors"
                      >

                        Read Paper
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">

                Recent Publications
              </h3>
              <div className="space-y-6">

                {publications.map((pub: any) => (
                  <div
                    key={pub.id}
                    className="bg-white shadow-sm rounded-lg p-6"
                  >

                    <h4 className="text-lg font-bold text-gray-900 mb-2">

                      {pub.title}
                    </h4>
                    <p className="text-gray-700 mb-2">

                      Authors: {pub.authors}
                    </p>
                    <p className="text-[#d7153a] mb-2">

                      {pub.subTitle}
                    </p>
                    <p className="text-gray-700 mb-4">

                      {pub.description}
                    </p>
                    <div className="flex space-x-4">

                      <button
                        onClick={() =>
                          window.open(pub.pdf, '_blank')
                        }
                        className="text-[#d7153a] hover:underline"
                      >

                        Read Paper
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">

                <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">

                  View All Publications
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Contact section */}
        {activeTab === 'contact' && (
          <div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8"> Contact Us </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

              <div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">

                  Get in Touch
                </h3>
                <p className="text-gray-700 mb-8">

                  We welcome inquiries from potential collaborators, students
                  interested in joining our team, and industry partners looking to
                  leverage our expertise in nanoengineering.
                </p>
                <div className="space-y-6">

                  <div className="flex items-start">

                    <svg
                      className="h-6 w-6 text-[#d7153a] mr-3 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>

                      <h4 className="text-lg font-bold text-gray-900 mb-1">

                        Address
                      </h4>
                      <p className="text-gray-700">

                        Nanometrology Research Team <br /> School of Physics
                        and Metrology <br /> The University of Sydney <br />
                        Sydney, NSW 2006, Australia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">

                    <svg
                      className="h-6 w-6 text-[#d7153a] mr-3 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>

                      <h4 className="text-lg font-bold text-gray-900 mb-1">

                        Email
                      </h4>
                      <p className="text-gray-700">

                        nanometrology@sydney.edu.au
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">

                    <svg
                      className="h-6 w-6 text-[#d7153a] mr-3 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>

                      <h4 className="text-lg font-bold text-gray-900 mb-1">

                        Phone
                      </h4>
                      <p className="text-gray-700"> +61 2 9351 XXXX </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#d7153a] focus:border-[#d7153a]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#d7153a] focus:border-[#d7153a]"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#d7153a] focus:border-[#d7153a]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#d7153a] focus:border-[#d7153a]"
                    ></textarea>
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}
                  {success && <p className="text-sm text-green-600">Message sent successfully!</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-[#d7153a] text-white rounded-md hover:bg-[#b01232] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className="col-span-1 md:col-span-2">

              <h2 className="text-xl font-bold mb-4"> University of Sydney </h2>
              <h3 className="text-lg mb-4"> Nanometrology Research Team </h3>
              <p className="text-gray-400 mb-6">

                Advancing precision measurement at the nanoscale.
              </p>
              <div className="flex space-x-4">

                <a href="#" className="text-gray-400 hover:text-white">

                  <span className="sr-only"> Twitter </span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >

                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">

                  <span className="sr-only"> LinkedIn </span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >

                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">

                  <span className="sr-only"> YouTube </span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >

                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>

              <h3 className="text-lg font-bold mb-4"> Quick Links </h3>
              <ul className="space-y-2">

                <li>

                  <button
                    onClick={() => setActiveTab('about')}
                    className="text-gray-400 hover:text-white"
                  >

                    About Us
                  </button>
                </li>
                <li>

                  <button
                    onClick={() => setActiveTab('research')}
                    className="text-gray-400 hover:text-white"
                  >

                    Research
                  </button>
                </li>
                <li>

                  <button
                    onClick={() => setActiveTab('team')}
                    className="text-gray-400 hover:text-white"
                  >

                    Our Team
                  </button>
                </li>
                <li>

                  <button
                    onClick={() => setActiveTab('publications')}
                    className="text-gray-400 hover:text-white"
                  >

                    Publications
                  </button>
                </li>
                <li>

                  <button
                    onClick={() => setActiveTab('contact')}
                    className="text-gray-400 hover:text-white"
                  >

                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>

              <h3 className="text-lg font-bold mb-4"> Resources </h3>
              <ul className="space-y-2">

                <li>

                  <a href="#" className="text-gray-400 hover:text-white">

                    University of Sydney
                  </a>
                </li>
                <li>

                  <a href="#" className="text-gray-400 hover:text-white">

                    Faculty of Engineering
                  </a>
                </li>
                <li>

                  <a href="#" className="text-gray-400 hover:text-white">

                    Research Opportunities
                  </a>
                </li>
                <li>

                  <a href="#" className="text-gray-400 hover:text-white">

                    Student Resources
                  </a>
                </li>
                <li>

                  <a href="#" className="text-gray-400 hover:text-white">

                    News & Events
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">

            <p>

              © {new Date().getFullYear()} University of Sydney Nanoengineering
              Research Team. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
