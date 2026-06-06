import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Camera, Film, Palette, Share2, TrendingUp, Megaphone,
  ArrowUpRight, Phone, Mail, MapPin, Play, Star, Quote,
  CheckCircle2, Upload, X, Menu, Users, Clock, Aperture,
  MousePointerClick,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Brand colors ──────────────────────────────────────────────────────────────
const RED    = '#EF4444'
const BLUE   = '#3B82F6'
const YELLOW = '#FBBF24'

// ─── Doodle SVG Components ─────────────────────────────────────────────────────

function DStar({ color = RED, size = 40, opacity = 0.75, rotate = 0, filled = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}
      style={{ opacity, transform: `rotate(${rotate}deg)`, display: 'block' }}>
      <path d="M12 2L14.5 9.5H22.2L16 13.8L18.5 21.3L12 17L5.5 21.3L8 13.8L1.8 9.5H9.5Z"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DSparkle({ color = YELLOW, size = 28, opacity = 0.9, rotate = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}
      style={{ opacity, transform: `rotate(${rotate}deg)`, display: 'block' }}>
      <path d="M12 1.5L13.8 10.2L22.5 12L13.8 13.8L12 22.5L10.2 13.8L1.5 12L10.2 10.2Z"/>
    </svg>
  )
}

function DSquiggle({ color = BLUE, width = 80, opacity = 0.6, strokeWidth = 2.5 }) {
  const h = 20, w = width
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ display: 'block' }}>
      <path
        d={`M0 10 Q${w*0.12} 1 ${w*0.25} 10 Q${w*0.37} 19 ${w*0.5} 10 Q${w*0.62} 1 ${w*0.75} 10 Q${w*0.87} 19 ${w} 10`}
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={opacity}/>
    </svg>
  )
}

function DArrow({ color = RED, size = 32, opacity = 0.7, rotate = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      style={{ opacity, transform: `rotate(${rotate}deg)`, display: 'block' }}>
      <path d="M2 12H20M13 5L21 12L13 19"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DCircle({ color = BLUE, size = 50, opacity = 0.45 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none" style={{ opacity, display: 'block' }}>
      <path d="M47 25C47 12.9 37.1 3 25 3C12.9 3 3 12.9 3 25C3 37.1 12.9 47 25 47C37.1 47 47 37.1 47 25C47 20 45.5 16 43 13"
        stroke={color} strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

function DCross({ color = YELLOW, size = 24, opacity = 0.8, rotate = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      style={{ opacity, transform: `rotate(${rotate}deg)`, display: 'block' }}>
      <path d="M12 3V21M3 12H21"
        stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
    </svg>
  )
}

function DDots({ color = BLUE, size = 36, opacity = 0.55 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ opacity, display: 'block' }}>
      {[4,12,20].map(x => [4,12,20].map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" fill={color}/>
      )))}
    </svg>
  )
}

function DZigzag({ color = RED, width = 60, opacity = 0.55 }) {
  const h = 28, w = width
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ opacity, display: 'block' }}>
      <path d={`M0 4 L${w*0.25} 24 L${w*0.5} 4 L${w*0.75} 24 L${w} 4`}
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DWave({ color = YELLOW, width = 100, opacity = 0.5 }) {
  const w = width
  return (
    <svg width={w} height={16} viewBox={`0 0 ${w} 16`} fill="none" style={{ opacity, display: 'block' }}>
      <path d={`M0 8 C${w*0.15} 0,${w*0.2} 0,${w*0.25} 8 C${w*0.3} 16,${w*0.35} 16,${w*0.4} 8 C${w*0.45} 0,${w*0.5} 0,${w*0.55} 8 C${w*0.6} 16,${w*0.65} 16,${w*0.7} 8 C${w*0.75} 0,${w*0.8} 0,${w*0.85} 8 C${w*0.9} 16,${w*0.95} 16,${w} 8`}
        stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',      href: '#home' },
  { label: 'About',     href: '#about' },
  { label: 'Services',  href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact',   href: '#contact' },
]

const SERVICES = [
  { icon: Camera,   title: 'Content Creation',          text: 'High-impact photography, videos, and copy crafted to stop the scroll and drive real engagement across all platforms.', color: RED },
  { icon: Share2,   title: 'Social Media Strategy',     text: 'Data-driven platform planning, content calendars, and growth tactics that convert followers into loyal customers.',      color: BLUE },
  { icon: Film,     title: 'Videography & Production',  text: 'Cinematic brand films, short-form reels, product showcases, and full event coverage with professional-grade gear.',    color: YELLOW },
  { icon: Palette,  title: 'Brand Identity & Design',   text: 'Complete visual identity — logo, brand guidelines, typography systems, and assets that make you unforgettable.',       color: RED },
  { icon: Users,    title: 'Influencer & KOL Marketing', text: 'Connecting brands with the right local voices across Sumatera Selatan to amplify reach and build authentic trust.',  color: BLUE },
  { icon: Megaphone,title: 'Digital Advertising',       text: 'Performance-driven Meta, TikTok Ads, and Google campaigns with precise targeting and measurable ROAS.',               color: YELLOW },
]

const PORTFOLIO = [
  { id:1, title:'Kopi Muaro Rebrand',        category:'Brand Identity',  tag:'+340% Brand Recall', img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80' },
  { id:2, title:'Sriwijaya Fashion Week',    category:'Videography',     tag:'1.2M Views',          img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { id:3, title:'Wisata Palembang Campaign', category:'Content Creation', tag:'+85K Reach',          img:'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80' },
  { id:4, title:'Pempek Nusantara Launch',   category:'Social Media',    tag:'+12K Followers',      img:'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80' },
  { id:5, title:'Batik Palembang x KOL',     category:'Influencer',      tag:'4.2× ROAS',           img:'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80' },
  { id:6, title:'Musi River Hotel Promo',    category:'Digital Ads',     tag:'+220% Bookings',      img:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80' },
]

const RESULTS = [
  { end:120, suffix:'+',  label:'Brands Served',   desc:'From local UMKM to enterprise brands across Sumatera Selatan and beyond.', color: RED },
  { end:12,  suffix:'M+', label:'Content Views',   desc:'Total impressions generated across all platforms for our clients combined.', color: BLUE },
  { end:85,  suffix:'%',  label:'Client Retention',desc:"Most clients stay and grow with us — that's our strongest testimonial.", color: YELLOW },
]

const CLIENTS = ['Kopi Muaro','Bank Sumsel Babel','Musi Hotel Collection','Palembang Fashion Week','Sriwijaya Kuliner','Sumatera Digital','Batik Nusantara','GoFood Palembang']

const TESTIMONIALS = [
  { name:'Budi Santoso',  role:'CEO, PT Sriwijaya Kuliner',       avatar:'B', borderColor: RED,
    text:'lifeatkreabi totally transformed our online presence. In just 3 months, our Instagram jumped from 2K to 50K followers and daily orders doubled. The team really understands the Palembang market.', rating:5 },
  { name:'Dewi Rahayu',   role:'Marketing Director, Batik Nusantara', avatar:'D', borderColor: BLUE,
    text:'The brand film they produced for our collection launch has been viewed over 200K times organically. The quality matched international agencies at a fraction of the cost. Luar biasa.', rating:5 },
  { name:'Ahmad Fauzi',   role:'Founder, Pempek Street Food',     avatar:'A', borderColor: YELLOW,
    text:"We trusted lifeatkreabi to run our TikTok ads and the results blew us away — 4.2x ROAS in the first month. They're not just an agency, they're a real growth partner.", rating:5 },
]

// ─── CountUp ───────────────────────────────────────────────────────────────────

function CountUp({ end, suffix = '', duration = 2200 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTs = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - startTs) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(Math.round(end * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])
  return <span ref={ref} className="tabular-nums">{value}{suffix}</span>
}

// ─── Creative Signature Animation (light theme) ────────────────────────────────

function CreativeAnim() {
  const [statusIdx, setStatusIdx] = useState(0)
  const statuses = ['Concepting', 'Producing', 'Reviewing', 'Delivered ✓']
  useEffect(() => {
    const id = setInterval(() => setStatusIdx(i => (i + 1) % 4), 2300)
    return () => clearInterval(id)
  }, [])
  const sparkles = [
    { left:'12%', delay:'0s',   dur:'2.4s', size:14 },
    { left:'26%', delay:'0.4s', dur:'2.0s', size:10 },
    { left:'40%', delay:'0.8s', dur:'2.6s', size:16 },
    { left:'56%', delay:'0.2s', dur:'2.2s', size:12 },
    { left:'68%', delay:'1.0s', dur:'2.8s', size:14 },
    { left:'80%', delay:'0.6s', dur:'2.1s', size:10 },
    { left:'91%', delay:'1.4s', dur:'2.5s', size:11 },
  ]
  return (
    <div className="relative h-44 rounded-3xl overflow-hidden border border-divider"
      style={{ background:'linear-gradient(180deg,#FFF7ED 0%,#FFEDD5 55%,#FED7AA 100%)' }}>
      <style>{`
        @keyframes spark-fall{0%{transform:translate(-50%,-14px) rotate(0deg);opacity:0;}10%{opacity:.9;}80%{opacity:.75;}100%{transform:translate(-50%,105px) rotate(180deg);opacity:0;}}
        @keyframes spark-ripple{0%{transform:translateX(-50%) scale(.35);opacity:.8;}80%{transform:translateX(-50%) scale(3.4);opacity:0;}100%{transform:translateX(-50%) scale(3.4);opacity:0;}}
        @keyframes spark-fadein{from{opacity:0;transform:translateY(3px);}to{opacity:1;transform:translateY(0);}}
        @keyframes lens-glow2{0%,100%{opacity:.35;}50%{opacity:.65;}}
      `}</style>
      {/* blobs */}
      <div className="absolute top-3 left-6 w-14 h-14 rounded-full blur-2xl opacity-40" style={{background:'#FBBF24'}}/>
      <div className="absolute top-0 right-8 w-10 h-10 rounded-full blur-xl opacity-30" style={{background:'#EF4444'}}/>
      {/* camera aperture */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2">
        <svg width="52" height="22" viewBox="0 0 52 22">
          <rect x="0" y="7" width="52" height="8" rx="4" fill="none" stroke="#F97316" strokeWidth="1.5"/>
          <circle cx="26" cy="11" r="6.5" fill="none" stroke="#EF4444" strokeWidth="1" opacity=".8"/>
          <circle cx="26" cy="11" r="3" fill="#EF4444" opacity=".6" style={{animation:'lens-glow2 2s ease-in-out infinite'}}/>
          <circle cx="5"  cy="11" r="3" fill="#FFF7ED" stroke="#F97316" strokeWidth="1.5"/>
          <circle cx="47" cy="11" r="3" fill="#FFF7ED" stroke="#F97316" strokeWidth="1.5"/>
          <line x1="11" y1="11" x2="19" y2="11" stroke="#EF4444" strokeWidth=".8" opacity=".4"/>
          <line x1="33" y1="11" x2="41" y2="11" stroke="#EF4444" strokeWidth=".8" opacity=".4"/>
        </svg>
      </div>
      {/* header */}
      <div className="absolute top-1.5 left-3 right-3 flex items-center justify-between">
        <span className="font-mono text-[9px] text-orange-600/70 uppercase tracking-widest">Creative Studio</span>
        <span className="font-mono text-[9px] text-orange-500/60">7 active</span>
      </div>
      {/* particles */}
      {sparkles.map((s, i) => (
        <div key={i} className="absolute top-0"
          style={{left:s.left, animation:`spark-fall ${s.dur} ${s.delay} infinite ease-in`}}>
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" style={{transform:'translateX(-50%)'}}>
            <defs>
              <linearGradient id={`sg2-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#FBBF24"/>
                <stop offset="55%"  stopColor="#EF4444"/>
                <stop offset="100%" stopColor="#DC2626"/>
              </linearGradient>
            </defs>
            <path d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z" fill={`url(#sg2-${i})`}/>
          </svg>
        </div>
      ))}
      {/* canvas surface */}
      <div className="absolute bottom-10 left-0 right-0">
        <svg width="100%" height="10" viewBox="0 0 300 10">
          <line x1="0" y1="5" x2="300" y2="5" stroke="#F97316" strokeWidth=".8" strokeOpacity=".35"/>
          {[0,25,50,75,100,125,150,175,200,225,250,275,300].map((x,i)=>(
            <line key={i} x1={x} y1="2" x2={x} y2="8" stroke="#EF4444" strokeWidth=".6" strokeOpacity=".25"/>
          ))}
        </svg>
      </div>
      {/* ripples */}
      {[{left:'22%',delay:'0s'},{left:'50%',delay:'0.8s'},{left:'76%',delay:'1.5s'}].map((r,i)=>(
        <div key={i} className="absolute"
          style={{bottom:'36px',left:r.left,width:'18px',height:'6px',borderRadius:'50%',
            border:'1px solid #F97316',animation:`spark-ripple 2s ${r.delay} infinite ease-out`}}/>
      ))}
      {/* status */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-1.5 rounded-b-3xl"
        style={{background:'rgba(255,237,213,.8)',borderTop:'1px solid rgba(249,115,22,.2)'}}>
        <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"
          style={{boxShadow:'0 0 6px #EF4444',animation:'pulse 1.8s ease-in-out infinite'}}/>
        <span key={statusIdx} className="font-mono text-[10px] text-orange-700"
          style={{animation:'spark-fadein 0.3s ease forwards'}}>{statuses[statusIdx]}</span>
      </div>
    </div>
  )
}

// ─── Brand Shuffler ────────────────────────────────────────────────────────────

function BrandShuffler() {
  const [front, setFront] = useState(0)
  const cards = [
    { label:'Brand Identity', sub:'Visual systems that last', icon:'✦', bg: RED },
    { label:'Social Content',  sub:'10M+ total impressions',  icon:'◈', bg: BLUE },
    { label:'Video Campaign',  sub:'Cinematic storytelling',   icon:'▶', bg: YELLOW },
  ]
  useEffect(() => {
    const id = setInterval(() => setFront(i => (i + 1) % 3), 3000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative h-44">
      {cards.map((card, i) => {
        const offset = (i - front + 3) % 3
        const isYellow = card.bg === YELLOW
        return (
          <div key={i}
            className="absolute inset-x-0 rounded-2xl p-5 border border-white/20 transition-all duration-700"
            style={{
              background: card.bg, height:'140px',
              transform: offset===0 ? 'scale(1) translateY(0)' : offset===1 ? 'scale(0.94) translateY(10px)' : 'scale(0.88) translateY(20px)',
              zIndex: offset===0 ? 3 : offset===1 ? 2 : 1,
              opacity: offset===0 ? 1 : offset===1 ? 0.65 : 0.35,
              filter: offset===0 ? 'none' : 'blur(1px)',
            }}>
            <div className="text-xl mb-2" style={{color: isYellow ? '#78350F' : 'rgba(255,255,255,0.6)'}}>{card.icon}</div>
            <div className="font-display font-bold text-sm" style={{color: isYellow ? '#1C0A00' : '#FFFFFF'}}>{card.label}</div>
            <div className="font-body text-xs mt-1" style={{color: isYellow ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.7)'}}>{card.sub}</div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Campaign Scheduler ────────────────────────────────────────────────────────

function CampaignScheduler() {
  const [step, setStep] = useState(0)
  const [confirmed, setConfirmed] = useState(false)
  const days  = ['Mon','Tue','Wed','Thu','Fri','Sat']
  const tasks = ['Strategy','Content','Review','Launch','Analyze']
  const activeDay  = step % days.length
  const activeTask = Math.floor(step / days.length) % tasks.length
  useEffect(() => {
    const id = setInterval(() => {
      setConfirmed(true)
      setTimeout(() => { setConfirmed(false); setStep(s => s + 1) }, 600)
    }, 1500)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="h-44 rounded-3xl overflow-hidden border border-divider bg-surface">
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-divider">
        <span className="font-mono text-[9px] text-muted uppercase tracking-widest">Campaign Planner</span>
        <span className="text-[9px] font-mono font-bold" style={{color:BLUE}}>{tasks[activeTask]}</span>
      </div>
      <div className="grid grid-cols-6 gap-1 px-3 py-2">
        {days.map((d,i) => (
          <div key={d} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[8px] text-muted">{d}</span>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
              i===activeDay ? 'text-white scale-110 shadow-lg' : 'bg-surface-2 text-muted'
            }`} style={i===activeDay ? {background:BLUE,boxShadow:`0 4px 12px ${BLUE}50`} : {}}>
              {i+9}
            </div>
            {i<activeDay && <div className="w-1 h-1 rounded-full" style={{background:BLUE,opacity:0.5}}/>}
          </div>
        ))}
      </div>
      <div className="px-3 pb-3 flex items-center gap-2">
        {confirmed ? (
          <div className="flex items-center gap-1.5" style={{color:'#16A34A'}}>
            <CheckCircle2 className="h-3 w-3"/><span className="font-mono text-[9px]">Scheduled!</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5" style={{color:BLUE}}>
            <MousePointerClick className="h-3 w-3"/><span className="font-mono text-[9px]">Setting: {tasks[activeTask]}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 ${
      scrolled ? 'glass shadow-xl shadow-black/5 border border-divider' : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg" style={{background:RED,boxShadow:`0 4px 12px ${RED}50`}}>
            <Aperture className="h-4 w-4 text-white"/>
          </div>
          <span className="font-display font-bold text-ink text-sm tracking-tight">lifeatkreabi</span>
        </a>
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href}
              className="font-body text-sm text-muted hover:text-ink transition-colors duration-200">{l.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#contact"
            className="magnetic-btn hidden sm:inline-flex items-center gap-1.5 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            style={{background:RED,boxShadow:`0 4px 14px ${RED}45`}}>
            Start a Project <ArrowUpRight className="h-3.5 w-3.5"/>
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-ink">
            {open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-2 rounded-3xl bg-white/97 backdrop-blur-2xl border border-divider shadow-xl p-6 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="font-body text-base text-ink hover:text-primary transition-colors">{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
            className="magnetic-btn inline-flex items-center justify-center gap-1.5 text-white px-5 py-3 rounded-full text-sm font-semibold mt-2"
            style={{background:RED}}>
            Start a Project <ArrowUpRight className="h-3.5 w-3.5"/>
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge',  { y:16, opacity:0, duration:0.7, delay:0.3, ease:'power3.out' })
      gsap.from('.hero-line-1', { y:55, opacity:0, duration:1.0, delay:0.5, ease:'power3.out' })
      gsap.from('.hero-line-2', { y:70, opacity:0, duration:1.1, delay:0.65, ease:'power3.out' })
      gsap.from('.hero-sub',    { y:24, opacity:0, duration:0.8, delay:0.85, ease:'power3.out' })
      gsap.from('.hero-cta',    { y:20, opacity:0, duration:0.7, delay:1.0, stagger:0.1, ease:'power3.out' })
      gsap.from('.hero-doodle', { scale:0, opacity:0, duration:0.6, delay:1.1, stagger:0.08, ease:'back.out(1.5)' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref}
      className="relative min-h-[100dvh] bg-white overflow-hidden flex flex-col justify-center">

      {/* Large doodle background elements */}
      <div className="absolute top-16 right-6 sm:right-16 lg:right-24 hero-doodle pointer-events-none">
        <DStar color={RED} size={90} opacity={0.18} rotate={12}/>
      </div>
      <div className="absolute top-28 right-20 sm:right-36 hero-doodle pointer-events-none">
        <DSparkle color={YELLOW} size={44} opacity={0.9} rotate={20}/>
      </div>
      <div className="absolute bottom-32 right-8 sm:right-20 hero-doodle pointer-events-none">
        <DCircle color={BLUE} size={80} opacity={0.35}/>
      </div>
      <div className="absolute top-1/3 left-4 sm:left-10 hero-doodle pointer-events-none">
        <DSquiggle color={BLUE} width={70} opacity={0.45}/>
      </div>
      <div className="absolute bottom-20 left-8 sm:left-20 hero-doodle pointer-events-none">
        <DDots color={RED} size={42} opacity={0.5}/>
      </div>
      <div className="absolute top-24 left-1/3 hero-doodle pointer-events-none hidden lg:block">
        <DCross color={YELLOW} size={22} opacity={0.7} rotate={15}/>
      </div>
      <div className="absolute bottom-44 right-1/4 hero-doodle pointer-events-none hidden md:block">
        <DZigzag color={YELLOW} width={50} opacity={0.55}/>
      </div>

      {/* Thin top line */}
      <div className="absolute top-0 inset-x-0 h-1 flex">
        <div className="flex-1" style={{background:RED}}/>
        <div className="flex-1" style={{background:BLUE}}/>
        <div className="flex-1" style={{background:YELLOW}}/>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-divider bg-surface text-xs font-mono text-muted">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{background:RED}}/>
          Creative Agency · Palembang, Indonesia · Est. 2020
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-ink tracking-tighter leading-[0.9] max-w-4xl"
          style={{fontSize:'clamp(3rem,9vw,6rem)'}}>
          <span className="hero-line-1 block">We Bring Your</span>
          <span className="hero-line-2 block">
            <span className="highlight-yellow">Brand</span>
            <span className="font-serif italic font-medium text-muted"> to Life.</span>
          </span>
        </h1>

        {/* Tagline deco */}
        <div className="mt-6 mb-2 flex items-center gap-3">
          <DWave color={RED} width={60} opacity={0.65}/>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Create. Grow. Inspire.</span>
          <DWave color={BLUE} width={60} opacity={0.65}/>
        </div>

        <p className="hero-sub mt-4 max-w-xl text-muted text-base sm:text-lg leading-relaxed">
          Palembang's leading creative agency. We craft compelling stories, build distinctive brands,
          and drive measurable results for businesses across Indonesia.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#contact"
            className="hero-cta magnetic-btn inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-semibold text-sm shadow-xl"
            style={{background:RED, boxShadow:`0 8px 28px ${RED}45`}}>
            Start a Project <ArrowUpRight className="h-4 w-4"/>
          </a>
          <a href="#portfolio"
            className="hero-cta magnetic-btn inline-flex items-center gap-2 border-2 text-ink px-7 py-3.5 rounded-full font-semibold text-sm"
            style={{borderColor:BLUE, color:BLUE}}>
            <Play className="h-4 w-4" style={{fill:BLUE}}/> See Our Work
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap gap-8 sm:gap-12 border-t border-divider pt-10">
          {RESULTS.map(r => (
            <div key={r.label}>
              <div className="font-display text-2xl font-bold" style={{color:r.color}}>{r.end}{r.suffix}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-0.5">{r.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────────

function About() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-header', { scrollTrigger:{trigger:ref.current,start:'top 80%',once:true}, y:30,opacity:0,duration:0.8,ease:'power3.out' })
      gsap.from('.feature-card', { scrollTrigger:{trigger:ref.current,start:'top 75%',once:true}, y:45,opacity:0,duration:0.9,stagger:0.15,ease:'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      {/* Doodle bg */}
      <div className="absolute top-12 right-8 pointer-events-none opacity-60"><DSparkle color={YELLOW} size={36} rotate={30}/></div>
      <div className="absolute bottom-16 left-12 pointer-events-none opacity-40"><DSquiggle color={RED} width={90}/></div>
      <div className="absolute top-1/2 right-1/4 pointer-events-none opacity-30 hidden lg:block"><DStar color={BLUE} size={50} rotate={20}/></div>

      <div className="about-header mb-16 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <DArrow color={RED} size={22} opacity={0.8}/>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Who We Are</p>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
          More than an agency —{' '}
          <span className="font-serif italic font-normal text-muted">your creative partner.</span>
        </h2>
        <p className="mt-6 text-muted leading-relaxed text-sm sm:text-base">
          lifeatkreabi was born in Palembang with one mission: to give local and national brands
          access to world-class creative execution. We combine bold strategy with meticulous craft
          to build brands that people remember and businesses that grow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="feature-card bg-surface border border-divider rounded-3xl p-6 sm:p-8"
          style={{borderTopColor:RED,borderTopWidth:'3px'}}>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{color:RED}}>Our Range</p>
          <h3 className="font-display text-lg font-bold text-ink mb-5">From identity to impact</h3>
          <BrandShuffler/>
          <p className="mt-5 text-sm text-muted leading-relaxed">We work across branding, content, and campaigns — one creative partner who handles the full picture.</p>
          <ul className="mt-4 space-y-1.5">
            {['Brand strategy & identity','Content production','Paid & organic growth'].map(item => (
              <li key={item} className="flex items-center gap-2 text-xs text-muted">
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{background:RED}}/>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Card 2 */}
        <div className="feature-card bg-surface border border-divider rounded-3xl p-6 sm:p-8"
          style={{borderTopColor:BLUE,borderTopWidth:'3px'}}>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{color:BLUE}}>Our Process</p>
          <h3 className="font-display text-lg font-bold text-ink mb-5">Creative at every stage</h3>
          <CreativeAnim/>
          <p className="mt-5 text-sm text-muted leading-relaxed">From the first concept to final delivery — every stage is deliberate and crafted to exceed expectations.</p>
          <ul className="mt-4 space-y-1.5">
            {['Discover & research','Create & produce','Deliver & optimize'].map(item => (
              <li key={item} className="flex items-center gap-2 text-xs text-muted">
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{background:BLUE}}/>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Card 3 */}
        <div className="feature-card bg-surface border border-divider rounded-3xl p-6 sm:p-8"
          style={{borderTopColor:YELLOW,borderTopWidth:'3px'}}>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{color:'#D97706'}}>Our Rhythm</p>
          <h3 className="font-display text-lg font-bold text-ink mb-5">Campaigns that run like clockwork</h3>
          <CampaignScheduler/>
          <p className="mt-5 text-sm text-muted leading-relaxed">We plan, execute, and optimize on a structured calendar so your content never falls behind.</p>
          <ul className="mt-4 space-y-1.5">
            {['Structured content calendar','Real-time performance tracking','Monthly reporting & strategy'].map(item => (
              <li key={item} className="flex items-center gap-2 text-xs text-muted">
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{background:YELLOW}}/>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─── Services ──────────────────────────────────────────────────────────────────

function Services() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', { scrollTrigger:{trigger:ref.current,start:'top 75%',once:true}, y:32,opacity:0,duration:0.7,stagger:0.1,ease:'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={ref} className="relative py-28 sm:py-36 overflow-hidden"
      style={{background:'#111111'}}>
      {/* Doodles on dark bg */}
      <div className="absolute top-12 right-16 pointer-events-none opacity-15">
        <DStar color={YELLOW} size={100} rotate={-15}/>
      </div>
      <div className="absolute bottom-16 left-8 pointer-events-none opacity-10">
        <DCircle color={RED} size={120}/>
      </div>
      <div className="absolute top-1/2 left-1/2 pointer-events-none opacity-8 hidden lg:block">
        <DDots color={BLUE} size={60}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <DSparkle color={YELLOW} size={20}/>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">Services</p>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              What we do,{' '}
              <span className="font-serif italic font-normal" style={{color:YELLOW}}>exceptionally well.</span>
            </h2>
          </div>
          <a href="#contact"
            className="magnetic-btn self-start sm:self-auto inline-flex items-center gap-2 border text-white px-5 py-3 rounded-full text-sm font-medium transition-colors"
            style={{borderColor:'rgba(255,255,255,0.15)'}}>
            Discuss your project <ArrowUpRight className="h-4 w-4"/>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{background:'rgba(255,255,255,0.06)'}}>
          {SERVICES.map(({ icon:Icon, title, text, color }) => (
            <div key={title}
              className="svc-tile p-8 sm:p-10 group transition-colors duration-300 cursor-default"
              style={{background:'#111111'}}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = '#111111'}>
              <div className="mb-5 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{background:`${color}18`}}>
                <Icon className="h-5 w-5" style={{color}}/>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-3">{title}</h3>
              <p className="text-sm leading-relaxed" style={{color:'rgba(255,255,255,0.45)'}}>{text}</p>
              <div className="mt-5 w-8 h-0.5 rounded-full transition-all duration-300 group-hover:w-16"
                style={{background:color}}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Portfolio ─────────────────────────────────────────────────────────────────

function Portfolio() {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-card', { scrollTrigger:{trigger:ref.current,start:'top 75%',once:true}, y:45,opacity:0,duration:0.8,stagger:0.1,ease:'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  const tagColors = [RED, BLUE, YELLOW, RED, BLUE, YELLOW]

  return (
    <section id="portfolio" ref={ref} className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute top-16 right-12 pointer-events-none"><DSquiggle color={YELLOW} width={80} opacity={0.5}/></div>
      <div className="absolute bottom-20 left-6 pointer-events-none"><DZigzag color={BLUE} width={60} opacity={0.4}/></div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <DArrow color={BLUE} size={22} opacity={0.8}/>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Portfolio</p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
            Work that speaks{' '}
            <span className="font-serif italic font-normal text-muted">for itself.</span>
          </h2>
        </div>
        <span className="font-mono text-xs text-muted self-start sm:self-auto">Selected Projects 2022–2025</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PORTFOLIO.map((proj, idx) => (
          <div key={proj.id}
            className="portfolio-card group relative rounded-3xl overflow-hidden cursor-pointer"
            style={{aspectRatio:'4/3'}}
            onMouseEnter={() => setHovered(proj.id)}
            onMouseLeave={() => setHovered(null)}>
            <img src={proj.img} alt={proj.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{filter:'brightness(0.75)'}}/>
            <div className={`absolute inset-0 transition-opacity duration-300 ${hovered===proj.id ? 'opacity-100' : 'opacity-70'}`}
              style={{background:'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'}}/>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-1.5">{proj.category}</span>
              <h3 className="font-display text-base font-bold text-white mb-2 leading-tight">{proj.title}</h3>
              <div className={`transition-all duration-300 ${hovered===proj.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <span className="inline-flex items-center gap-1.5 text-white text-[10px] font-semibold px-3 py-1 rounded-full"
                  style={{background:tagColors[idx]}}>
                  <TrendingUp className="h-3 w-3"/> {proj.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Results ───────────────────────────────────────────────────────────────────

function Results() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.result-pillar', { scrollTrigger:{trigger:ref.current,start:'top 75%',once:true}, y:32,opacity:0,duration:0.8,stagger:0.15,ease:'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-28 sm:py-36 overflow-hidden bg-surface">
      {/* Doodles */}
      <div className="absolute top-8 left-12 pointer-events-none"><DDots color={YELLOW} size={40} opacity={0.5}/></div>
      <div className="absolute bottom-8 right-16 pointer-events-none"><DSquiggle color={RED} width={70} opacity={0.45}/></div>
      <div className="absolute top-1/2 right-8 pointer-events-none hidden md:block"><DCross color={BLUE} size={28} opacity={0.5} rotate={15}/></div>
      <div className="absolute top-16 right-1/3 pointer-events-none hidden lg:block"><DSparkle color={RED} size={24} opacity={0.6} rotate={10}/></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-4">
            <DWave color={RED} width={50} opacity={0.6}/>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Results</p>
            <DWave color={BLUE} width={50} opacity={0.6}/>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
            Numbers that prove{' '}
            <span className="font-serif italic font-normal text-muted">our work works.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-divider">
          {RESULTS.map(({ end, suffix, label, desc, color }) => (
            <div key={label} className="result-pillar flex flex-col items-center text-center px-8 py-10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4">{label}</p>
              <div className="font-display text-7xl sm:text-8xl font-bold tracking-tighter mb-4"
                style={{color}}>
                <CountUp end={end} suffix={suffix} duration={2200}/>
              </div>
              <p className="text-sm text-muted leading-relaxed max-w-xs">{desc}</p>
              <div className="mt-8 relative w-full h-1 rounded-full overflow-hidden bg-divider">
                <div className="absolute inset-y-0 left-0 rounded-full" style={{background:color,width:'70%',animation:'pillar-grow 2s ease-out forwards'}}/>
                <style>{`@keyframes pillar-grow{from{width:0}to{width:70%}}`}</style>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Clients ───────────────────────────────────────────────────────────────────

function Clients() {
  const ref = useRef(null)
  const clientColors = [RED, BLUE, YELLOW, RED, BLUE, YELLOW, RED, BLUE]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.client-logo', { scrollTrigger:{trigger:ref.current,start:'top 80%',once:true}, y:20,opacity:0,duration:0.6,stagger:0.08,ease:'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} className="py-20 border-y border-divider bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted text-center mb-12">
          Trusted by brands across Indonesia
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
          {CLIENTS.map((name, i) => (
            <div key={name}
              className="client-logo flex items-center justify-center px-3 py-4 rounded-xl border border-divider hover:border-current transition-all duration-300 group cursor-default"
              style={{'--hc': clientColors[i]}}>
              <span className="font-display text-[10px] font-bold text-muted/50 group-hover:text-[var(--hc)] text-center leading-tight transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

function Testimonials() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', { scrollTrigger:{trigger:ref.current,start:'top 75%',once:true}, y:45,opacity:0,duration:0.9,stagger:0.15,ease:'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      {/* Doodles */}
      <div className="absolute top-12 left-8 pointer-events-none"><DZigzag color={BLUE} width={70} opacity={0.4}/></div>
      <div className="absolute bottom-16 right-10 pointer-events-none"><DSparkle color={RED} size={32} opacity={0.6} rotate={-15}/></div>
      <div className="absolute top-1/2 right-1/3 pointer-events-none hidden lg:block"><DCross color={YELLOW} size={20} opacity={0.6} rotate={10}/></div>

      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-4 mb-4">
          <DSparkle color={YELLOW} size={18}/>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Testimonials</p>
          <DSparkle color={RED} size={18} rotate={45}/>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
          What our clients{' '}
          <span className="font-serif italic font-normal text-muted">are saying.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={i}
            className="testimonial-card bg-white border border-divider rounded-3xl p-7 flex flex-col gap-5 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
            {/* Colored top stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{background:t.borderColor}}/>
            <div className="flex gap-1 mt-2">
              {Array.from({length:t.rating}).map((_,j) => (
                <Star key={j} className="h-3.5 w-3.5" style={{fill:t.borderColor,color:t.borderColor}}/>
              ))}
            </div>
            <Quote className="h-5 w-5 opacity-30" style={{color:t.borderColor}}/>
            <p className="text-sm text-muted leading-relaxed flex-1">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-2 border-t border-divider">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-white text-sm flex-shrink-0"
                style={{background:t.borderColor}}>
                {t.avatar}
              </div>
              <div>
                <div className="font-display font-bold text-ink text-sm">{t.name}</div>
                <div className="font-mono text-[10px] text-muted">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Contact ───────────────────────────────────────────────────────────────────

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const ref = useRef(null)

  const onSubmit = (e) => { e.preventDefault(); setStatus('sending'); setTimeout(() => setStatus('sent'), 1200) }
  const onDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const list = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/')).slice(0, 5 - files.length)
    setFiles(prev => [...prev, ...list])
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-col', { scrollTrigger:{trigger:ref.current,start:'top 75%',once:true}, y:35,opacity:0,duration:0.8,stagger:0.2,ease:'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  const inputClass = 'w-full bg-white border border-divider rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/45 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200'

  return (
    <section id="contact" ref={ref} className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-surface overflow-hidden">
      {/* Doodles */}
      <div className="absolute top-12 right-12 pointer-events-none"><DStar color={RED} size={60} opacity={0.12} rotate={10}/></div>
      <div className="absolute bottom-20 left-8 pointer-events-none"><DDots color={BLUE} size={44} opacity={0.4}/></div>
      <div className="absolute top-1/2 left-1/3 pointer-events-none hidden lg:block"><DCross color={YELLOW} size={24} opacity={0.5} rotate={20}/></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left */}
          <div className="contact-col lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <DArrow color={RED} size={22} opacity={0.8}/>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Contact</p>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight leading-tight mb-8">
              Let's build something{' '}
              <span className="font-serif italic font-normal text-muted">great together.</span>
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-10">
              Ready to take your brand to the next level? Tell us about your project and we'll get back within one business day.
            </p>
            <div className="space-y-4">
              {[
                { icon:Phone, label:'Phone / WhatsApp', value:'+62 812-3456-7890', color:RED },
                { icon:Mail,  label:'Email',            value:'hello@lifeatkreabi.com', color:BLUE },
                { icon:MapPin,label:'Location',         value:'Palembang, Sumatera Selatan', color:YELLOW },
                { icon:Clock, label:'Office Hours',     value:'Mon–Fri 09:00–18:00 WIB', color:RED },
              ].map(({ icon:Icon, label, value, color }) => (
                <div key={label}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-divider bg-white hover:shadow-md transition-shadow duration-300">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{background:`${color}15`}}>
                    <Icon className="h-4 w-4" style={{color}}/>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-0.5">{label}</div>
                    <div className="font-body text-sm text-ink">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="contact-col lg:col-span-7">
            <div className="bg-white rounded-3xl border border-divider shadow-sm p-6 sm:p-10">
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center h-80 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{background:'#F0FDF4'}}>
                    <CheckCircle2 className="h-7 w-7 text-green-500"/>
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted max-w-xs">Thanks for reaching out — we'll be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">Full Name</label>
                      <input required type="text" placeholder="Your name" className={inputClass}/></div>
                    <div><label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">Email</label>
                      <input required type="email" placeholder="your@email.com" className={inputClass}/></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">WhatsApp</label>
                      <input type="tel" placeholder="+62 8xx-xxxx-xxxx" className={inputClass}/></div>
                    <div><label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">Service Needed</label>
                      <select className={inputClass}>
                        <option value="">Select a service…</option>
                        {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                      </select></div>
                  </div>
                  <div><label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2">Tell Us About Your Project</label>
                    <textarea rows={4} placeholder="Describe your brand, goals, timeline…" className={`${inputClass} resize-none`}/></div>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={`border-2 border-dashed rounded-2xl px-6 py-8 text-center transition-colors duration-200 cursor-pointer ${dragging ? 'border-primary/60 bg-primary/5' : 'border-divider hover:border-primary/40'}`}>
                    <Upload className="h-5 w-5 text-muted mx-auto mb-2"/>
                    <p className="text-xs text-muted">Drag reference images here, or{' '}
                      <label className="cursor-pointer hover:underline" style={{color:RED}}>browse
                        <input type="file" accept="image/*" multiple className="hidden"
                          onChange={e => setFiles(prev => [...prev, ...[...e.target.files].slice(0, 5 - prev.length)])}/>
                      </label></p>
                    {files.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2 justify-center">
                        {files.map((f,i) => (
                          <span key={i} className="inline-flex items-center gap-1 bg-surface text-muted text-[10px] px-2 py-1 rounded-lg border border-divider">
                            {f.name.slice(0,18)}
                            <button type="button" onClick={() => setFiles(prev => prev.filter((_,j) => j!==i))}>
                              <X className="h-3 w-3 hover:text-primary"/>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button type="submit"
                    className="magnetic-btn w-full flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-semibold text-sm shadow-xl"
                    style={{background:RED, boxShadow:`0 8px 24px ${RED}40`}}>
                    {status === 'sending' ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Sending…</>
                    ) : <>Send Message <ArrowUpRight className="h-4 w-4"/></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{background:'#111111'}} className="border-t border-white/5 text-white">
      {/* Color stripe */}
      <div className="flex h-1">
        <div className="flex-1" style={{background:RED}}/>
        <div className="flex-1" style={{background:BLUE}}/>
        <div className="flex-1" style={{background:YELLOW}}/>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                style={{background:RED}}>
                <Aperture className="h-4 w-4 text-white"/>
              </div>
              <span className="font-display font-bold text-white text-sm tracking-tight">lifeatkreabi</span>
            </div>
            {/* Color trio */}
            <div className="flex gap-2 mb-4">
              <DSparkle color={RED} size={14} opacity={0.9}/>
              <DSparkle color={BLUE} size={14} opacity={0.9}/>
              <DSparkle color={YELLOW} size={14} opacity={0.9}/>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{color:'rgba(255,255,255,0.4)'}}>
              Palembang's leading creative agency — crafting stories, building brands, and driving real growth across Indonesia.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 ring-pulse"/>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{color:'rgba(255,255,255,0.3)'}}>
                All systems operational
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest mb-5" style={{color:'rgba(255,255,255,0.5)'}}>Services</h4>
            <ul className="space-y-3">
              {SERVICES.map(s => (
                <li key={s.title}>
                  <a href="#services" className="text-sm transition-colors duration-200 hover:text-white"
                    style={{color:'rgba(255,255,255,0.3)'}}>{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest mb-5" style={{color:'rgba(255,255,255,0.5)'}}>Company</h4>
            <ul className="space-y-3">
              {['About Us','Portfolio','Results','Blog','Careers'].map(l => (
                <li key={l}>
                  <a href="#about" className="text-sm transition-colors duration-200 hover:text-white"
                    style={{color:'rgba(255,255,255,0.3)'}}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest mb-5" style={{color:'rgba(255,255,255,0.5)'}}>Contact</h4>
            <ul className="space-y-3 text-sm" style={{color:'rgba(255,255,255,0.3)'}}>
              <li>+62 812-3456-7890</li>
              <li>hello@lifeatkreabi.com</li>
              <li className="leading-relaxed">Palembang,<br/>Sumatera Selatan, ID</li>
              <li className="pt-1">
                <a href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                  style={{color:RED}}>
                  Start a project <ArrowUpRight className="h-3 w-3"/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t" style={{borderColor:'rgba(255,255,255,0.06)'}}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px]" style={{color:'rgba(255,255,255,0.2)'}}>
            © {new Date().getFullYear()} lifeatkreabi. All rights reserved. · Palembang, Indonesia
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="font-mono text-[10px] transition-colors hover:text-white/60"
              style={{color:'rgba(255,255,255,0.2)'}}>Privacy Policy</Link>
            <Link to="/terms" className="font-mono text-[10px] transition-colors hover:text-white/60"
              style={{color:'rgba(255,255,255,0.2)'}}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App Root ──────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])
  return (
    <div className="relative">
      <div className="noise-overlay"/>
      <Navbar/>
      <main>
        <Hero/>
        <About/>
        <Services/>
        <Portfolio/>
        <Results/>
        <Clients/>
        <Testimonials/>
        <ContactForm/>
      </main>
      <Footer/>
    </div>
  )
}
