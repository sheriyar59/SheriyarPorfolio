/* PREMIUM UNIQUE PORTFOLIO - ENHANCED SCROLL ANIMATIONS V2
   Fixed overlapping issues, added advanced scroll animations
   Smooth parallax effects, stagger animations, and scroll-triggered transitions */

import { Mail, Github, Linkedin, ExternalLink, Briefcase, Code2, Award, ArrowRight, Zap, Network, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation, useInViewAnimation, useScrollProgress, useParallax, useScrollDirection } from "@/hooks/useScrollAnimation";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('about');
  const trackingRef = useRef<HTMLDivElement>(null);
  const scrollY = useScrollAnimation();
  const scrollProgress = useScrollProgress();
  const scrollDirection = useScrollDirection();

  // Refs for scroll animations
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);

  // In-view animations
  const aboutInView = useInViewAnimation(aboutRef, 0.15);
  const experienceInView = useInViewAnimation(experienceRef, 0.15);
  const projectsInView = useInViewAnimation(projectsRef, 0.15);
  const certificationsInView = useInViewAnimation(certificationsRef, 0.15);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (trackingRef.current) {
      trackingRef.current.style.left = `${mousePos.x}px`;
      trackingRef.current.style.top = `${mousePos.y}px`;
    }
  }, [mousePos]);

  // Enhanced parallax effects
  const nameTranslateY = Math.min(scrollY * 0.5, 150);
  const sidebarTranslateY = scrollY * 0.2;
  const backgroundParallax = scrollY * 0.1;

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Scroll progress indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent to-blue-400 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mouse tracking background */}
      <div className="mouse-track-bg">
        <div
          ref={trackingRef}
          className="mouse-track-light"
          style={{
            transition: 'left 0.15s ease-out, top 0.15s ease-out'
          }}
        />
      </div>

      {/* Animated background elements */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          transform: `translateY(${backgroundParallax}px)`,
          opacity: 0.3
        }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-parallax-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-parallax-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-parallax-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Left Sidebar - Sticky with parallax */}
            <div className="lg:col-span-1 min-w-0">
              <div 
                className={`sticky transition-all duration-300 ${scrollDirection === 'down' ? 'top-10' : 'top-20'}`}
                style={{
                  transform: `translateY(${sidebarTranslateY}px)`,
                  transition: 'transform 0.1s ease-out, top 0.3s ease-out'
                }}
              >
                {/* Name and Title - Scrolls downwards with fade */}
                <div 
                  className="mb-12 animate-bounce-in relative z-10"
                  style={{
                    transform: `translateY(${nameTranslateY}px)`,
                    opacity: Math.max(0.3, 1 - scrollY / 500),
                    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
                  }}
                >
                  <h1 className="text-6xl lg:text-7xl font-black mb-4 text-foreground tracking-tight leading-tight">
                    Sheriyar<br />
                    <span className="gradient-text">Alam</span>
                  </h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Network className="w-5 h-5 text-accent animate-float-up" />
                    <p className="text-lg text-accent font-bold tracking-wide">
                      Infrastructure Architect
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    Designing mission-critical networks at scale
                  </p>
                  
                  {/* Scroll indicator */}
                  <div className="mt-8 flex items-center gap-2 text-accent text-xs animate-bounce">
                    <ChevronDown className="w-4 h-4" />
                    <span>Scroll to explore</span>
                  </div>
                </div>

                {/* Stats Grid - Enhanced with better styling */}
                <div className="grid grid-cols-2 gap-4 mb-12 relative z-10">
                  {[
                    { label: 'Active Venues', value: '160+', icon: '🌍' },
                    { label: 'Uptime SLA', value: '99.9%', icon: '⚡' },
                    { label: 'Certifications', value: '6', icon: '🏆' },
                    { label: 'Years XP', value: '2+', icon: '📈' }
                  ].map((stat, i) => (
                    <div 
                      key={i}
                      className="grid-card cursor-pointer"
                      style={{
                        animation: `elasticIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${i * 0.1}s both`
                      }}
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-2xl font-bold text-accent">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <nav className="space-y-4 mb-12 relative z-30">
                  {[
                    { id: 'about', label: 'ABOUT', icon: '→' },
                    { id: 'experience', label: 'EXPERIENCE', icon: '→' },
                    { id: 'projects', label: 'PROJECTS', icon: '→' },
                    { id: 'certifications', label: 'CERTIFICATIONS', icon: '→' }
                  ].map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`nav-link block group w-full text-left ${activeSection === item.id ? 'active' : ''}`}
                      style={{
                        animation: `slideInRotate 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.2 + i * 0.08}s both`
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.icon}</span>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </nav>

                {/* Social Links */}
                <div className="flex gap-3 relative z-30">
                  {[
                    { href: 'https://github.com', icon: Github, title: 'GitHub' },
                    { href: 'https://linkedin.com', icon: Linkedin, title: 'LinkedIn' },
                    { href: 'mailto:alamsheriyar5@gmail.com', icon: Mail, title: 'Email' }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target={social.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="social-link"
                      title={social.title}
                      style={{
                        animation: `flipIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + i * 0.1}s both`
                      }}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-3 space-y-20 min-w-0">
              {/* About Section */}
              <section 
                id="about" 
                ref={aboutRef}
                className={`transition-all duration-700 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              >
                <h2 className="section-title pt-4">About</h2>
                <div className="mt-8 space-y-6">
                  {[
                    "I'm a network infrastructure engineer passionate about designing resilient, enterprise-grade systems that power global operations. With deep expertise in multi-vendor ecosystems and infrastructure automation, I bridge the gap between strategic planning and reliable execution.",
                    "Currently at Splash Networks, I architect and manage infrastructure for 160+ venues across the GCC region, maintaining 99.9% uptime SLA. I lead multi-site deployments, implement sophisticated VLAN segmentation, optimize QoS policies, and develop automation scripts that reduce configuration time by 60%. My work spans FortiGate firewalls, MikroTik routing, UniFi wireless networks, and enterprise-grade security architectures.",
                    "Previously at University of Haripur, I engineered campus-wide networking infrastructure serving 5000+ concurrent users with 99.8% availability. I transformed network performance through strategic upgrades, proactive monitoring, and comprehensive security policies. These experiences shaped my philosophy: infrastructure should be both well-architected and widely reliable."
                  ].map((para, i) => (
                    <p 
                      key={i}
                      className="text-base text-muted-foreground leading-relaxed"
                      style={{
                        animation: aboutInView ? `slideInBlur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.15}s both` : 'none'
                      }}
                    >
                      {para.includes('Splash Networks') && (
                        <>
                          {para.split('Splash Networks')[0]}
                          <span className="text-accent font-semibold">Splash Networks</span>
                          {para.split('Splash Networks')[1].split('160+')[0]}
                          <span className="text-accent font-semibold">160+ venues</span>
                          {para.split('160+')[1].split('99.9%')[0]}
                          <span className="text-accent font-semibold">99.9% uptime SLA</span>
                          {para.split('99.9%')[1]}
                        </>
                      )}
                      {para.includes('University of Haripur') && (
                        <>
                          {para.split('University of Haripur')[0]}
                          <span className="text-accent font-semibold">University of Haripur</span>
                          {para.split('University of Haripur')[1].split('5000+')[0]}
                          <span className="text-accent font-semibold">5000+ concurrent users</span>
                          {para.split('5000+')[1].split('99.8%')[0]}
                          <span className="text-accent font-semibold">99.8% availability</span>
                          {para.split('99.8%')[1]}
                        </>
                      )}
                      {!para.includes('Splash Networks') && !para.includes('University of Haripur') && para}
                    </p>
                  ))}
                </div>
              </section>

              <div className="divider-glow" />

              {/* Experience Section */}
              <section 
                id="experience" 
                ref={experienceRef}
                className={`transition-all duration-700 ${experienceInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              >
                <h2 className="section-title pt-4">Experience</h2>
                <div className="mt-8 space-y-12">
                  <ExperienceItem
                    title="Network Support Engineer"
                    company="Splash Networks (Client: Affinect)"
                    period="10/2024 – Present"
                    description="Lead infrastructure management for 160+ venues across UAE, KSA, Kuwait, and Bahrain. Architect multi-site guest network solutions with advanced VLAN segmentation, QoS optimization, and redundant WAN failover. Implement multi-vendor ecosystems (MikroTik, FortiGate, UniFi, Aruba, Meraki) with unified management. Develop Python automation scripts reducing configuration time by 60% and manual errors by 80%."
                    tech={["FortiGate", "MikroTik", "UniFi", "Python", "Multi-site", "VLAN"]}
                    delay={0}
                    inView={experienceInView}
                  />
                  <ExperienceItem
                    title="IT Engineer Intern"
                    company="Directorate of IT Services, University of Haripur"
                    period="07/2022 – 07/2024"
                    description="Engineered and maintained campus-wide core networking infrastructure serving 5000+ users. Resolved connectivity issues reducing incident rates by 40% through proactive monitoring and alerting. Deployed comprehensive firewall policies, switch configurations, and router security policies ensuring compliance. Led Cat6 cabling infrastructure upgrade across departments, improving bandwidth capacity by 300%."
                    tech={["Cisco IOS", "Firewalls", "Network Design", "Security", "Troubleshooting"]}
                    delay={0.2}
                    inView={experienceInView}
                  />
                </div>
              </section>

              <div className="divider-glow" />

              {/* Projects Section */}
              <section 
                id="projects" 
                ref={projectsRef}
                className={`transition-all duration-700 ${projectsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              >
                <h2 className="section-title pt-4">Featured Projects</h2>
                <div className="mt-8 projects-grid">
                  {[
                    {
                      title: "Grand Ambassador Hotel",
                      year: "2024",
                      description: "Engineered enterprise-grade network infrastructure with FortiGate 200F firewall, multi-tier VLAN segmentation, QoS policies for guest/management/POS networks, and redundant WAN links. Delivered 99.9% uptime SLA for mission-critical operations.",
                      tech: ["FortiGate", "VLAN", "QoS", "Enterprise"],
                      icon: Briefcase
                    },
                    {
                      title: "GCC Multi-Site Deployment",
                      year: "2024",
                      description: "Architected and executed captive portal and guest Wi-Fi migrations across 160+ venues. Implemented unified management platform with automated provisioning, reducing deployment time by 60% and standardizing configurations across all sites.",
                      tech: ["Automation", "Multi-site", "Orchestration"],
                      icon: Code2
                    },
                    {
                      title: "Hybrid Cloud Infrastructure",
                      year: "2023",
                      description: "Designed Azure AD integration, Office 365 migration, and enterprise identity management for hybrid cloud environments. Implemented seamless SSO and MFA across all endpoints, ensuring security compliance and user productivity.",
                      tech: ["Azure AD", "Office 365", "Cloud"],
                      icon: Zap
                    }
                  ].map((project, i) => (
                    <ProjectCard
                      key={i}
                      {...project}
                      delay={i * 0.15}
                      inView={projectsInView}
                    />
                  ))}
                </div>
              </section>

              <div className="divider-glow" />

              {/* Certifications Section */}
              <section 
                id="certifications" 
                ref={certificationsRef}
                className={`transition-all duration-700 ${certificationsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              >
                <h2 className="section-title pt-4">Certifications</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "CompTIA Network+", issuer: "CompTIA", year: "2023", level: "Intermediate" },
                    { title: "Cisco CCNA", issuer: "Cisco", year: "In Progress", level: "Advanced" },
                    { title: "Microsoft Azure Administrator", issuer: "Microsoft", year: "2023", level: "Intermediate" },
                    { title: "FortiGate NSE 4", issuer: "Fortinet", year: "2024", level: "Advanced" },
                    { title: "Meraki Certified Network Associate", issuer: "Cisco Meraki", year: "2024", level: "Intermediate" },
                    { title: "UniFi Network Associate", issuer: "Ubiquiti", year: "2023", level: "Intermediate" }
                  ].map((cert, i) => (
                    <CertItem key={i} {...cert} delay={i * 0.1} inView={certificationsInView} />
                  ))}
                </div>
              </section>

              {/* Footer */}
              <footer className="pt-12 border-t border-border text-sm text-muted-foreground">
                <p className="animate-fade-in">Designed & built by Sheriyar Alam • Infrastructure Excellence • 2026</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceItem({ title, company, period, description, tech, delay, inView }: any) {
  return (
    <div 
      className="experience-item group"
      style={{
        animation: inView ? `slideInBlur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s both` : 'none'
      }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">{title}</h3>
        <p className="text-accent font-semibold text-sm">{company}</p>
        <p className="text-xs text-muted-foreground">{period}</p>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t: string, i: number) => (
          <span 
            key={i} 
            className="tech-badge"
            style={{
              animation: inView ? `scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay + i * 0.08}s both` : 'none'
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ title, year, description, tech, icon: Icon, delay, inView }: any) {
  return (
    <div 
      className="grid-card group cursor-pointer"
      style={{
        animation: inView ? `flipIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s both` : 'none'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs text-muted-foreground">{year}</span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t: string, i: number) => (
          <span key={i} className="tech-badge">{t}</span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-accent text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
        View Details <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
}

function CertItem({ title, issuer, year, level, delay, inView }: any) {
  return (
    <div 
      className="grid-card group cursor-pointer"
      style={{
        animation: inView ? `zoomInRotate 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s both` : 'none'
      }}
    >
      <div className="flex items-start gap-3">
        <Award className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover:animate-float-up transition-all duration-300" />
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-foreground group-hover:text-accent transition-colors duration-300">{title}</h4>
          <p className="text-xs text-muted-foreground">{issuer}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-muted-foreground">{year}</span>
            <span className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent border border-accent/50 group-hover:border-accent group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">{level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
