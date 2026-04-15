"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   BROSKiiZZ — Full Platform v3
   ═══════════════════════════════════════════ */

const T = {
  bg: "#0a0a0a", card: "#141414", border: "#222", fg: "#f0efe9", muted: "#777",
  accent: "#c8ff00", accent2: "#ff5733", accent3: "#00d4ff",
  font: "'Syne', sans-serif", mono: "'Space Mono', monospace",
};

// ─── CITY & COUNTRY DATA ───
const COUNTRIES = {
  india: {
    name: "India", flag: "🇮🇳", color: "#FF9933",
    cities: [
      { id: "delhi", name: "Delhi", x: 57, y: 28, industries: "IT Services, E-commerce, EdTech, Government Contracts", marketInfo: "Delhi-NCR is India's largest startup hub with over 7,000 startups. The region attracts 25% of all Indian VC funding. Key sectors include SaaS, FinTech, and D2C brands. The government's Startup India initiative provides tax benefits and seed funding.", population: "32M metro", gdp: "$280B" },
      { id: "mumbai", name: "Mumbai", x: 38, y: 58, industries: "FinTech, Entertainment, Real Estate Tech, AdTech", marketInfo: "Mumbai is India's financial capital and home to the Bombay Stock Exchange. The city leads in FinTech innovation. Entertainment tech and media startups thrive due to Bollywood's presence.", population: "21M metro", gdp: "$310B" },
      { id: "bangalore", name: "Bangalore", x: 44, y: 76, industries: "AI/ML, SaaS, Deep Tech, Biotech", marketInfo: "Bangalore is India's Silicon Valley with 35% of all Indian startups. Home to Flipkart, Infosys, and Wipro. The city has the highest concentration of AI/ML talent in Asia. Average seed round is $500K-$1.5M.", population: "13M metro", gdp: "$180B" },
      { id: "hyderabad", name: "Hyderabad", x: 48, y: 64, industries: "Pharma, Defence Tech, Enterprise SaaS, Cybersecurity", marketInfo: "Hyderabad is emerging as a pharma and defence tech hub. HITEC City houses offices of Google, Microsoft, Amazon. The state government offers special incentives through T-Hub, India's largest incubator.", population: "10M metro", gdp: "$75B" },
      { id: "chennai", name: "Chennai", x: 50, y: 80, industries: "Automotive, Manufacturing, Hardware, EV Tech", marketInfo: "Chennai is the Detroit of India with a massive automotive ecosystem. Hardware and EV startups are booming. IIT Madras Research Park is one of India's best deep tech incubators.", population: "11M metro", gdp: "$66B" },
    ],
  },
  usa: {
    name: "USA", flag: "🇺🇸", color: "#3B82F6",
    cities: [
      { id: "sf", name: "San Francisco", x: 10, y: 42, industries: "AI/ML, SaaS, Web3, BioTech", marketInfo: "The global epicenter of tech startups. Home to Sand Hill Road VCs, Y Combinator, and every major tech company. Average seed round is $2-4M. SF still attracts the most VC dollars in the world.", population: "4.7M metro", gdp: "$592B" },
      { id: "nyc", name: "New York", x: 80, y: 32, industries: "FinTech, Media, Fashion Tech, AdTech", marketInfo: "NYC is the #2 startup ecosystem globally. FinTech dominates. The city's diversity fuels innovation in media, fashion, and health tech. Average seed round is $1.5-3M.", population: "20M metro", gdp: "$770B" },
      { id: "austin", name: "Austin", x: 48, y: 70, industries: "Enterprise SaaS, Gaming, SpaceTech, CleanTech", marketInfo: "Austin has exploded as a tech hub post-2020. Tesla, Oracle, and dozens of unicorns relocated here. No state income tax and lower cost of living attract young founders.", population: "2.3M metro", gdp: "$160B" },
      { id: "miami", name: "Miami", x: 78, y: 82, industries: "Web3, FinTech, LatAm Bridge, Real Estate Tech", marketInfo: "Miami is the crypto and Web3 capital of the US. The city serves as a gateway to Latin American markets. Zero state income tax draws founders and investors.", population: "6.1M metro", gdp: "$380B" },
      { id: "chicago", name: "Chicago", x: 62, y: 30, industries: "B2B SaaS, FinTech, FoodTech, LogisticsTech", marketInfo: "Chicago is a powerhouse for B2B companies. Strong university pipeline (UChicago, Northwestern) and a practical, revenue-first founder culture.", population: "9.5M metro", gdp: "$689B" },
    ],
  },
  europe: {
    name: "Europe", flag: "🇪🇺", color: "#8B5CF6",
    cities: [
      { id: "london", name: "London", x: 47, y: 22, industries: "FinTech, AI, HealthTech, EdTech", marketInfo: "London is Europe's #1 startup ecosystem and the global FinTech capital. Home to Revolut, Monzo, and DeepMind. The city attracts 3x more VC funding than any other European city.", population: "9.5M metro", gdp: "$580B" },
      { id: "berlin", name: "Berlin", x: 55, y: 20, industries: "Mobility, E-commerce, SaaS, Climate Tech", marketInfo: "Berlin is Europe's startup darling with the lowest cost of living among major tech hubs. Thriving international community — English widely spoken in tech.", population: "3.7M metro", gdp: "$170B" },
      { id: "paris", name: "Paris", x: 45, y: 32, industries: "AI, DeepTech, Luxury Tech, AgriTech", marketInfo: "Paris has risen fast thanks to Station F (world's largest startup campus) and pro-startup policies. Strong AI research ecosystem. France now has 30+ unicorns.", population: "12M metro", gdp: "$770B" },
      { id: "amsterdam", name: "Amsterdam", x: 51, y: 18, industries: "FinTech, Marketplace, Travel Tech, AgriTech", marketInfo: "Amsterdam punches above its weight with Booking.com, Adyen, and TomTom. English-friendly and strategically located for EU market access.", population: "2.5M metro", gdp: "$125B" },
      { id: "stockholm", name: "Stockholm", x: 58, y: 8, industries: "Gaming, FinTech, HealthTech, Music Tech", marketInfo: "Stockholm produces more unicorns per capita than any city except Silicon Valley. Spotify, Klarna, King — the list is legendary.", population: "2.4M metro", gdp: "$160B" },
    ],
  },
};

const STARTUPS = [
  { id: 1, name: "NexaAI", founder: "Arjun Mehta", sector: "AI / ML", stage: "Pre-Seed", ask: "$250K", traction: "1.2K beta users", revenue: "$0", oneliner: "AI copilot for sales teams that writes personalized outreach at scale", avatar: "🧠", hot: true, founded: "2025", city: "bangalore", country: "india", description: "NexaAI automates sales emails using AI. 3x higher reply rates.", businessModel: "SaaS — $49/user/month", team: [{ name: "Arjun Mehta", role: "CEO", bg: "Ex-Salesforce" }, { name: "Lily Zhang", role: "CTO", bg: "Ex-Google AI" }], products: [{ name: "NexaAI Extension", desc: "One-click personalized emails", icon: "🔌" }, { name: "NexaAI Dashboard", desc: "Campaign analytics", icon: "📊" }], brandColors: ["#6C5CE7", "#A29BFE", "#0F0F1A"], metrics: { mrr: "$0", users: "1,200", growth: "42% WoW", cac: "$12" } },
  { id: 2, name: "GreenLoop", founder: "Maya Chen", sector: "CleanTech", stage: "Seed", ask: "$1.2M", traction: "$40K MRR", revenue: "$40K MRR", oneliner: "Marketplace for verified carbon credits from reforestation", avatar: "🌿", hot: true, founded: "2024", city: "sf", country: "usa", description: "Satellite-verified carbon credits connecting buyers with reforestation projects.", businessModel: "Marketplace — 8% fee", team: [{ name: "Maya Chen", role: "CEO", bg: "Ex-McKinsey Climate" }, { name: "Tomás Rivera", role: "CTO", bg: "DeFi protocols" }], products: [{ name: "GreenLoop Marketplace", desc: "Buy verified credits", icon: "🌍" }], brandColors: ["#00B894", "#55E6C1", "#1A1A2E"], metrics: { mrr: "$40K", users: "320", growth: "18% MoM", cac: "$85" } },
  { id: 3, name: "PayBroski", founder: "Devon Williams", sector: "FinTech", stage: "Pre-Seed", ask: "$500K", traction: "3K waitlist", revenue: "$0", oneliner: "Split payments and shared wallets for Gen-Z", avatar: "💸", hot: false, founded: "2025", city: "nyc", country: "usa", description: "Shared wallets for roommates, trip funds, group savings with a social feed.", businessModel: "Freemium — $4.99/mo + interchange", team: [{ name: "Devon Williams", role: "CEO", bg: "Ex-Cash App" }], products: [{ name: "PayBroski App", desc: "Social money feed", icon: "📱" }], brandColors: ["#FDCB6E", "#E17055", "#2D3436"], metrics: { mrr: "$0", users: "3K", growth: "N/A", cac: "$8" } },
  { id: 4, name: "FitForge", founder: "Sarah Kim", sector: "Health", stage: "Series A", ask: "$5M", traction: "$180K MRR", revenue: "$180K MRR", oneliner: "AI personal trainer using phone camera form analysis", avatar: "💪", hot: true, founded: "2023", city: "london", country: "europe", description: "Computer vision for real-time exercise form analysis. 12K paying subscribers.", businessModel: "Subscription — $19.99/mo", team: [{ name: "Sarah Kim", role: "CEO", bg: "Ex-Nike" }, { name: "Dr. James Park", role: "CTO", bg: "PhD CV Stanford" }], products: [{ name: "FitForge App", desc: "Real-time form analysis", icon: "📱" }], brandColors: ["#E84393", "#FD79A8", "#0F0F1A"], metrics: { mrr: "$180K", users: "12K", growth: "22% MoM", cac: "$28" } },
  { id: 5, name: "Stackd", founder: "Liam O'Brien", sector: "SaaS", stage: "Seed", ask: "$800K", traction: "85 clients", revenue: "$65K MRR", oneliner: "No-code internal tool builder for ops teams", avatar: "🔧", hot: false, founded: "2024", city: "berlin", country: "europe", description: "Ops teams build approval flows and dashboards in minutes.", businessModel: "SaaS — $299/mo", team: [{ name: "Liam O'Brien", role: "CEO", bg: "Ex-Atlassian" }], products: [{ name: "Stackd Builder", desc: "Drag-and-drop apps", icon: "🧱" }], brandColors: ["#0984E3", "#74B9FF", "#1A1A2E"], metrics: { mrr: "$65K", users: "85", growth: "15% MoM", cac: "$420" } },
  { id: 6, name: "MealMap", founder: "Jessica Torres", sector: "FoodTech", stage: "Pre-Seed", ask: "$400K", traction: "5K MAU", revenue: "$2K MRR", oneliner: "Meal planning built around local grocery deals", avatar: "🍽️", hot: true, founded: "2025", city: "chicago", country: "usa", description: "Meals planned around store sales. Users save $127/month.", businessModel: "Freemium + affiliate", team: [{ name: "Jessica Torres", role: "CEO", bg: "Ex-Kroger" }], products: [{ name: "MealMap App", desc: "AI meal plans + grocery lists", icon: "🛒" }], brandColors: ["#00B894", "#FFEAA7", "#2D3436"], metrics: { mrr: "$2K", users: "5K", growth: "30% MoM", cac: "$5" } },
  { id: 7, name: "QuickShip", founder: "Rohit Kapoor", sector: "SaaS", stage: "Seed", ask: "$600K", traction: "200 merchants", revenue: "$30K MRR", oneliner: "One-click logistics for Indian D2C brands", avatar: "📦", hot: false, founded: "2024", city: "delhi", country: "india", description: "Aggregates 15+ courier partners with AI route optimization.", businessModel: "SaaS + per-shipment fee", team: [{ name: "Rohit Kapoor", role: "CEO", bg: "Ex-Delhivery" }], products: [{ name: "QuickShip Dashboard", desc: "Unified shipping", icon: "📊" }], brandColors: ["#E17055", "#FAB1A0", "#2D3436"], metrics: { mrr: "$30K", users: "200", growth: "20% MoM", cac: "$60" } },
  { id: 8, name: "FinBuddy", founder: "Ananya Joshi", sector: "FinTech", stage: "Pre-Seed", ask: "$350K", traction: "10K downloads", revenue: "$0", oneliner: "Personal finance app for young Indians in their first job", avatar: "💰", hot: true, founded: "2025", city: "mumbai", country: "india", description: "Gamified financial literacy with auto-invest for first-job Indians.", businessModel: "Freemium + mutual fund referrals", team: [{ name: "Ananya Joshi", role: "CEO", bg: "Ex-Zerodha" }], products: [{ name: "FinBuddy App", desc: "Learn, budget, invest", icon: "📱" }], brandColors: ["#6C5CE7", "#A29BFE", "#1A1A2E"], metrics: { mrr: "$0", users: "10K", growth: "35% WoW", cac: "$3" } },
  { id: 9, name: "Lyrique", founder: "Sophie Martin", sector: "AI / ML", stage: "Seed", ask: "$1M", traction: "2K creators", revenue: "$15K MRR", oneliner: "AI music production for independent artists", avatar: "🎵", hot: false, founded: "2024", city: "paris", country: "europe", description: "Studio-quality tracks using AI — stem separation, mastering, composition.", businessModel: "Subscription — €14.99/mo", team: [{ name: "Sophie Martin", role: "CEO", bg: "Ex-Deezer" }], products: [{ name: "Lyrique Studio", desc: "AI-powered DAW", icon: "🎹" }], brandColors: ["#8B5CF6", "#C4B5FD", "#1A1A2E"], metrics: { mrr: "€15K", users: "2K", growth: "12% MoM", cac: "€35" } },
  { id: 10, name: "SwiftHire", founder: "Marcus Brown", sector: "SaaS", stage: "Pre-Seed", ask: "$400K", traction: "50 companies", revenue: "$8K MRR", oneliner: "AI recruiting for high-volume hourly hiring", avatar: "⚡", hot: false, founded: "2025", city: "austin", country: "usa", description: "Automates screening, scheduling, onboarding for hourly workers.", businessModel: "SaaS — $199/location/mo", team: [{ name: "Marcus Brown", role: "CEO", bg: "Ex-Indeed" }], products: [{ name: "SwiftHire Platform", desc: "Hourly hiring automation", icon: "🤖" }], brandColors: ["#F59E0B", "#FBBF24", "#1A1A2E"], metrics: { mrr: "$8K", users: "50", growth: "25% MoM", cac: "$150" } },
];

const SECTORS = ["All", "AI / ML", "FinTech", "CleanTech", "Health", "SaaS", "FoodTech"];
const STAGES = ["All", "Pre-Seed", "Seed", "Series A"];

const AI_QUESTIONS = [
  { key: "name", q: "Hey broski! 🤙 What's the name of your startup?" },
];

const AI_SYSTEM_PROMPT = `You are BROSKiiZZ AI — a friendly, sharp startup advisor helping founders prepare their pitch for investors. You speak casually but with deep business knowledge. Use "broski" naturally.

You are conducting a pitch interview. Your goal is to deeply understand the founder's startup so you can generate an investor readiness score later.

Key areas to cover (adapt based on answers, don't ask all if already answered):
- What the startup does (one-liner)
- Problem being solved
- Solution / product
- Business model & pricing
- Traction & metrics (users, revenue, growth)
- Market size (TAM/SAM)
- Competition & differentiation
- Team background
- Funding ask & use of funds
- Vision

RULES:
- Ask ONE question at a time
- Build on the founder's previous answers — reference what they said
- If an answer is vague, dig deeper before moving on
- Be encouraging but real — call out gaps constructively
- After you've covered enough (8-12 exchanges), say exactly: "[ANALYSIS_READY]" at the START of your message, followed by a brief wrap-up message
- Keep responses under 60 words
- Never break character`;


const CHAT_SEED = [
  { id: 1, user: "Arjun Mehta", avatar: "🧠", badge: "NexaAI", time: "2h ago", msg: "Anyone with enterprise sales exp? Equity on the table." },
  { id: 2, user: "Jessica Torres", avatar: "🍽️", badge: "MealMap", time: "1h ago", msg: "Need technical co-founder for food tech. 5K users already." },
  { id: 3, user: "Devon Williams", avatar: "💸", badge: "PayBroski", time: "45m ago", msg: "Need a designer co-founder for Gen-Z fintech." },
  { id: 4, user: "Maya Chen", avatar: "🌿", badge: "GreenLoop", time: "30m ago", msg: "Hit $40K MRR! Need growth co-founder for US market." },
  { id: 5, user: "Rohit Kapoor", avatar: "📦", badge: "QuickShip", time: "15m ago", msg: "Scaling to 15 Indian cities — need ops co-founder." },
];

const STRESS_DATA = [
  { year: "2019", stressed: 62, funded: 12 },
  { year: "2020", stressed: 78, funded: 8 },
  { year: "2021", stressed: 71, funded: 15 },
  { year: "2022", stressed: 74, funded: 11 },
  { year: "2023", stressed: 81, funded: 9 },
  { year: "2024", stressed: 85, funded: 7 },
  { year: "2025", stressed: 88, funded: 6 },
];

const globalCSS = `
@keyframes fadeIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
@keyframes typing { 0% { opacity:.3; } 50% { opacity:1; } 100% { opacity:.3; } }
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }
@keyframes scroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
@keyframes slideIn { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
@keyframes scaleIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
input:focus,textarea:focus,select:focus { outline:none; }
::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#0a0a0a} ::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
* { box-sizing: border-box; }
`;

export default function App() {
  const [authScreen, setAuthScreen] = useState("login"); // login, signup, null (authenticated)
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [sectorFilter, setSectorFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [connections, setConnections] = useState({});
  const [notif, setNotif] = useState(null);
  const [chatStep, setChatStep] = useState(0);
  const [chatAnswers, setChatAnswers] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [aiTyping, setAiTyping] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [cfMessages, setCfMessages] = useState(CHAT_SEED);
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityView, setCityView] = useState("info");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const chatEndRef = useRef(null);
  const cfChatEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const cfInputRef = useRef(null);
  const earlyAccessRef = useRef(null);
  const loginNameRef = useRef(null);
  const loginEmailRef = useRef(null);
  const loginPassRef = useRef(null);
  const signupNameRef = useRef(null);
  const signupEmailRef = useRef(null);
  const signupPassRef = useRef(null);
  const signupRoleRef = useRef(null);

  const notify = (m) => { setNotif(m); setTimeout(() => setNotif(null), 2500); };
  const navTo = (p) => { setPage(p); setSelectedStartup(null); setSearch(""); setSectorFilter("All"); setStageFilter("All"); setShowCallModal(false); setSelectedCountry(null); setSelectedCity(null); setCityView("info"); if (p === "founder" && chatHistory.length === 0) setChatHistory([{ role: "ai", text: AI_QUESTIONS[0].q }]); };

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, aiTyping]);
  useEffect(() => { cfChatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [cfMessages]);

  const toggleConnect = (key, label) => { setConnections(prev => { const n = { ...prev }; if (n[key]) { delete n[key]; notify("Withdrawn"); } else { n[key] = true; notify(`🤝 ${label}`); } return n; }); };

  // ═══ AUTH SCREENS ═══
  if (authScreen) {
    const isLogin = authScreen === "login";
    const handleAuth = () => {
      if (isLogin) {
        const email = loginEmailRef.current?.value || "";
        const pass = loginPassRef.current?.value || "";
        if (!email || !pass) { notify("Please fill in all fields"); return; }
        setUser({ name: email.split("@")[0], email, role: "Founder" });
      } else {
        const name = signupNameRef.current?.value || "";
        const email = signupEmailRef.current?.value || "";
        const pass = signupPassRef.current?.value || "";
        if (!name || !email || !pass) { notify("Please fill in all fields"); return; }
        setUser({ name, email, role: "Founder" });
      }
      setAuthScreen(null);
      notify("Welcome to BROSKiiZZ! 🤙");
    };

    return (
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.font, color: T.fg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden" }}>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <style>{globalCSS}</style>
        {/* Grid bg */}
        <div style={{ position: "fixed", inset: 0, backgroundImage: `linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

        {/* Notification */}
        {notif && <div style={{ position: "fixed", top: 16, right: 16, zIndex: 999, background: T.card, border: `1px solid ${T.accent}`, padding: "10px 18px", fontFamily: T.mono, fontSize: "0.75rem", color: T.accent, animation: "fadeIn 0.3s" }}>{notif}</div>}

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420, animation: "fadeUp 0.6s ease" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: "2.4rem", fontWeight: 800, letterSpacing: -1, marginBottom: 6 }}>
              BROSKii<span style={{ color: T.accent }}>ZZ</span>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: "0.7rem", color: T.muted, letterSpacing: 3, textTransform: "uppercase" }}>
              {isLogin ? "// welcome back broski" : "// join the squad"}
            </div>
          </div>

          {/* Auth card */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: "32px 28px" }}>
            {/* Tabs */}
            <div style={{ display: "flex", marginBottom: 28, borderBottom: `1px solid ${T.border}` }}>
              {["login", "signup"].map(tab => (
                <button key={tab} onClick={() => setAuthScreen(tab)} style={{
                  flex: 1, padding: "12px 0", background: "transparent", border: "none",
                  borderBottom: authScreen === tab ? `2px solid ${T.accent}` : "2px solid transparent",
                  color: authScreen === tab ? T.accent : T.muted,
                  fontFamily: T.font, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
                  textTransform: "uppercase", letterSpacing: 1.5, transition: "all 0.2s",
                }}>
                  {tab === "login" ? "Log In" : "Sign Up"}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Signup: Name field */}
              {!isLogin && (
                <div>
                  <label style={{ fontFamily: T.mono, fontSize: "0.63rem", color: T.muted, textTransform: "uppercase", letterSpacing: 2, display: "block", marginBottom: 6 }}>Full Name</label>
                  <input ref={signupNameRef} defaultValue="" placeholder="e.g. John Doe" onKeyDown={e => e.key === "Enter" && handleAuth()} style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: "12px 14px", color: T.fg, fontFamily: T.font, fontSize: "0.9rem", transition: "border 0.3s" }} />
                </div>
              )}

              {/* Email */}
              <div>
                <label style={{ fontFamily: T.mono, fontSize: "0.63rem", color: T.muted, textTransform: "uppercase", letterSpacing: 2, display: "block", marginBottom: 6 }}>Email</label>
                <input ref={isLogin ? loginEmailRef : signupEmailRef} defaultValue="" type="email" placeholder="you@email.com" onKeyDown={e => e.key === "Enter" && handleAuth()} style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: "12px 14px", color: T.fg, fontFamily: T.font, fontSize: "0.9rem", transition: "border 0.3s" }} />
              </div>

              {/* Password */}
              <div>
                <label style={{ fontFamily: T.mono, fontSize: "0.63rem", color: T.muted, textTransform: "uppercase", letterSpacing: 2, display: "block", marginBottom: 6 }}>Password</label>
                <input ref={isLogin ? loginPassRef : signupPassRef} defaultValue="" type="password" placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleAuth()} style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: "12px 14px", color: T.fg, fontFamily: T.font, fontSize: "0.9rem", transition: "border 0.3s" }} />
              </div>

              {/* Signup: Role picker */}
              {!isLogin && (
                <div>
                  <label style={{ fontFamily: T.mono, fontSize: "0.63rem", color: T.muted, textTransform: "uppercase", letterSpacing: 2, display: "block", marginBottom: 6 }}>I am a...</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {[
                      { key: "founder", emoji: "🚀", label: "Founder", c: T.accent },
                      { key: "investor", emoji: "💰", label: "Investor", c: T.accent2 },
                      { key: "cofounder", emoji: "🤝", label: "Co-Founder", c: T.accent3 },
                    ].map(r => (
                      <button key={r.key}
                        onClick={() => { if (signupRoleRef.current === r.key) signupRoleRef.current = null; else signupRoleRef.current = r.key; }}
                        style={{
                          background: T.bg, border: `1px solid ${T.border}`, padding: "14px 8px",
                          cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = r.c; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; }}
                      >
                        <span style={{ fontSize: "1.4rem" }}>{r.emoji}</span>
                        <span style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.muted, letterSpacing: 1 }}>{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit */}
              <button onClick={handleAuth} style={{
                width: "100%", background: T.accent, color: T.bg, border: "none",
                padding: "14px", fontFamily: T.font, fontWeight: 700, fontSize: "0.95rem",
                cursor: "pointer", textTransform: "uppercase", letterSpacing: 2,
                marginTop: 4, transition: "all 0.3s",
              }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                {isLogin ? "Log In →" : "Create Account →"}
              </button>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
                <div style={{ flex: 1, height: 1, background: T.border }} />
                <span style={{ fontFamily: T.mono, fontSize: "0.6rem", color: "#444", letterSpacing: 1 }}>OR</span>
                <div style={{ flex: 1, height: 1, background: T.border }} />
              </div>

              {/* Social login buttons */}
              <button style={{
                width: "100%", background: T.bg, border: `1px solid ${T.border}`,
                padding: "12px", fontFamily: T.font, fontWeight: 600, fontSize: "0.85rem",
                color: T.fg, cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10, transition: "all 0.2s",
              }} onClick={() => { setUser({ name: "Google User", email: "user@gmail.com", role: "Founder" }); setAuthScreen(null); notify("Welcome to BROSKiiZZ! 🤙"); }}
                onMouseEnter={e => e.currentTarget.style.borderColor = T.accent} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                <span style={{ fontSize: "1.1rem" }}>G</span> Continue with Google
              </button>

              <button style={{
                width: "100%", background: T.bg, border: `1px solid ${T.border}`,
                padding: "12px", fontFamily: T.font, fontWeight: 600, fontSize: "0.85rem",
                color: T.fg, cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10, transition: "all 0.2s",
              }} onClick={() => { setUser({ name: "GitHub User", email: "user@github.com", role: "Founder" }); setAuthScreen(null); notify("Welcome to BROSKiiZZ! 🤙"); }}
                onMouseEnter={e => e.currentTarget.style.borderColor = T.accent} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                <span style={{ fontSize: "1.1rem" }}>⌘</span> Continue with GitHub
              </button>
            </div>
          </div>

          {/* Footer text */}
          <div style={{ textAlign: "center", marginTop: 20, fontFamily: T.mono, fontSize: "0.6rem", color: "#444", letterSpacing: 1 }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span style={{ color: T.accent, cursor: "pointer" }} onClick={() => setAuthScreen(isLogin ? "signup" : "login")}>
              {isLogin ? "Sign up" : "Log in"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const handleChatSend = async () => {
    const val = chatInputRef.current?.value || "";
    if (!val.trim() || aiTyping) return;
    const answer = val.trim();
    if (chatInputRef.current) chatInputRef.current.value = "";

    const newHistory = [...chatHistory, { role: "user", text: answer }];
    setChatHistory(newHistory);
    setChatAnswers(a => ({ ...a, [`q${chatStep}`]: answer }));
    setAiTyping(true);

    const step = chatStep; try { const apiM = []; let ff = false; for (const m of newHistory) { if (m.role === "user") ff = true; if (!ff) continue; const r = m.role === "ai" ? "assistant" : "user"; if (apiM.length > 0 && apiM[apiM.length-1].role === r) apiM[apiM.length-1].content += "\n" + m.text; else apiM.push({role: r, content: m.text}); } const res = await fetch("/api/chat", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system: AI_SYSTEM_PROMPT + '\nYou already asked: "' + AI_QUESTIONS[0].q + '". Continue.', messages: apiM})}); const d = await res.json(); if (d.content?.length) { const t = d.content.map(b=>b.text||"").join(""); if (t.includes("[ANALYSIS_READY]")) { setChatHistory(h=>[...h,{role:"ai",text:t.replace("[ANALYSIS_READY]","").trim()+"\n\n🔥 Generating analysis..."}]); setChatStep(s=>s+1); setAiTyping(false); return; } setChatHistory(h=>[...h,{role:"ai",text:t}]); setChatStep(s=>s+1); setAiTyping(false); return; } } catch(e) {}



    // Try live Claude API first (works when deployed on Vercel)
    try {
      const apiMessages = [];
      let foundFirst = false;
      for (const m of newHistory) {
        if (m.role === "user") foundFirst = true;
        if (!foundFirst) continue;
        const r = m.role === "ai" ? "assistant" : "user";
        if (apiMessages.length > 0 && apiMessages[apiMessages.length - 1].role === r) {
          apiMessages[apiMessages.length - 1].content += "\n" + m.text;
        } else {
          apiMessages.push({ role: r, content: m.text });
        }
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: AI_SYSTEM_PROMPT + "\n\nYou already greeted the founder with: \"" + AI_QUESTIONS[0].q + "\". Continue the conversation.",
          messages: apiMessages,
        }),
      });

      const data = await res.json();
      if (data.content && data.content.length > 0) {
        const aiText = data.content.map(b => b.text || "").join("");
        if (aiText.includes("[ANALYSIS_READY]")) {
          const cleanText = aiText.replace("[ANALYSIS_READY]", "").trim();
          setChatHistory(h => [...h, { role: "ai", text: cleanText + "\n\n🔥 Generating your investor readiness analysis now..." }]);
          setChatStep(s => s + 1);
          setAiTyping(false);
          // Generate analysis via API
          setTimeout(async () => {
            try {
              const convo = [...newHistory, { role: "ai", text: cleanText }].map(m => `${m.role === "ai" ? "AI" : "Founder"}: ${m.text}`).join("\n");
              const aRes = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: "Based on this pitch interview, return ONLY valid JSON (no backticks):\n\n" + convo + '\n\nJSON format: {"score":<0-100>,"label":"<label>","breakdown":[{"label":"Problem Clarity","score":<0-10>,"max":10},{"label":"Solution","score":<0-10>,"max":10},{"label":"Business Model","score":<0-12>,"max":12},{"label":"Traction","score":<0-15>,"max":15},{"label":"Revenue","score":<0-15>,"max":15},{"label":"Market Size","score":<0-8>,"max":8},{"label":"Competition","score":<0-8>,"max":8},{"label":"Team","score":<0-7>,"max":7},{"label":"Funding","score":<0-5>,"max":5},{"label":"Vision","score":<0-10>,"max":10}],"recommendations":["tip1","tip2","tip3","tip4"],"summary":{"name":"x","sector":"x","revenue":"x","raising":"x","model":"x","traction":"x"}}' }] }) });
              const aData = await aRes.json();
              const txt = aData.content?.map(b => b.text || "").join("") || "";
              const analysis = JSON.parse(txt.replace(/```json|```/g, "").trim());
              setChatAnswers(analysis);
              setShowAnalysis(true);
            } catch { fallbackAnalysis(step, answer); }
          }, 1000);
          return;
        }
        setChatHistory(h => [...h, { role: "ai", text: aiText }]);
        setChatStep(s => s + 1);
        setAiTyping(false);
        return;
      }
    } catch (e) {
      // API not available — fall through to predefined flow
    }

    // Fallback: predefined smart flow (works without API)
    const questions = [
      `Nice, ${answer}! 🔥 Love the name. Give me your one-liner — what does ${answer} do in one sentence?`,
      `Interesting! What sector does this fall into? (AI, FinTech, Health, SaaS, CleanTech, EdTech, etc.)`,
      `Got it. Now the important part — what problem are you solving and who has this pain?`,
      `That's a real problem, broski. How does your product actually solve it? Walk me through the core experience.`,
      `Makes sense. How do you make money? What's the business model and pricing?`,
      `Smart. What traction do you have so far? Users, revenue, waitlist, pilots — anything that shows momentum.`,
      `What's the current monthly revenue? (Zero is totally fine, just keeping it real)`,
      `Good to know. How big is the market opportunity? Any idea on TAM/SAM?`,
      `Who are your main competitors and what makes you different — what's your unfair advantage?`,
      `Tell me about the founding team. Who's building this and why are you the right people?`,
      `Almost there! How much are you raising and at what stage?`,
      `Last one — what's the 5-year vision if everything goes right?`,
    ];

    const delay = 600 + Math.random() * 500;
    setTimeout(() => {
      if (step < questions.length) {
        setChatHistory(h => [...h, { role: "ai", text: questions[step] }]);
        setChatStep(s => s + 1);
      } else {
        setChatHistory(h => [...h, { role: "ai", text: "That's everything I need! 🔥 Generating your financial analysis and investor readiness score now..." }]);
        setChatStep(s => s + 1);
        setTimeout(() => {
          // Generate score from answers
          const answers = { ...chatAnswers, [`q${step}`]: answer };
          let score = 0;
          const vals = Object.values(answers);
          vals.forEach(v => { if (v && v.length > 30) score += 7; else if (v && v.length > 10) score += 4; else if (v) score += 2; });
          score = Math.min(Math.round(score * 100 / (vals.length * 7)), 100);
          const name = answers.q0 || "Your Startup";
          const sector = answers.q2 || "TBD";
          
          setChatAnswers({
            score,
            label: score >= 80 ? "Investor Ready 🔥" : score >= 60 ? "Almost There 💪" : score >= 40 ? "Needs Work 🛠️" : "Early Stage 🌱",
            breakdown: [
              { label: "Problem Clarity", score: Math.min(Math.round((answers.q3?.length || 0) / 15), 10), max: 10 },
              { label: "Solution Strength", score: Math.min(Math.round((answers.q4?.length || 0) / 15), 10), max: 10 },
              { label: "Business Model", score: Math.min(Math.round((answers.q5?.length || 0) / 12), 12), max: 12 },
              { label: "Traction", score: Math.min(Math.round((answers.q6?.length || 0) / 10), 15), max: 15 },
              { label: "Revenue Signal", score: answers.q7 && !answers.q7.includes("0") ? 12 : 4, max: 15 },
              { label: "Market Size", score: Math.min(Math.round((answers.q8?.length || 0) / 12), 8), max: 8 },
              { label: "Competition", score: Math.min(Math.round((answers.q9?.length || 0) / 15), 8), max: 8 },
              { label: "Team", score: Math.min(Math.round((answers.q10?.length || 0) / 12), 7), max: 7 },
              { label: "Funding Clarity", score: answers.q11 ? 4 : 1, max: 5 },
              { label: "Vision", score: Math.min(Math.round((answers.q12?.length || 0) / 12), 10), max: 10 },
            ],
            recommendations: [
              answers.q7 && answers.q7.includes("0") ? "🎯 Get to first revenue ASAP — even $1K MRR makes your pitch 10x stronger" : "💰 Lead with your revenue numbers in every investor conversation",
              answers.q6?.length > 20 ? "📊 Great traction story — quantify growth rates and unit economics" : "📊 Beef up your traction section with specific, measurable numbers",
              answers.q9?.length > 30 ? "⚔️ Strong competitive awareness — make sure differentiation is defensible" : "⚔️ Research competitors deeper — 'no competitors' is a red flag for investors",
              "🤝 Your pitch is now live on BROSKiiZZ — investors can discover and connect with you!",
            ],
            summary: { name, sector, revenue: answers.q7 || "TBD", raising: answers.q11 || "TBD", model: answers.q5 || "TBD", traction: answers.q6 || "TBD" },
          });
          setShowAnalysis(true);
        }, 1500);
      }
      setAiTyping(false);
    }, delay);
  };

  const fallbackAnalysis = (step, answer) => {
    const answers = { ...chatAnswers, [`q${step}`]: answer };
    let score = 0;
    const vals = Object.values(answers);
    vals.forEach(v => { if (typeof v === "string" && v.length > 30) score += 7; else if (typeof v === "string" && v.length > 10) score += 4; else if (v) score += 2; });
    score = Math.min(Math.round(score * 100 / (Math.max(vals.length, 1) * 7)), 100);
    setChatAnswers({
      score, label: score >= 80 ? "Investor Ready 🔥" : score >= 60 ? "Almost There 💪" : score >= 40 ? "Needs Work 🛠️" : "Early Stage 🌱",
      breakdown: [{ label: "Problem", score: 6, max: 10 }, { label: "Solution", score: 6, max: 10 }, { label: "Business Model", score: 7, max: 12 }, { label: "Traction", score: 8, max: 15 }, { label: "Revenue", score: 5, max: 15 }, { label: "Market", score: 5, max: 8 }, { label: "Competition", score: 5, max: 8 }, { label: "Team", score: 4, max: 7 }, { label: "Funding", score: 3, max: 5 }, { label: "Vision", score: 5, max: 10 }],
      recommendations: ["Quantify traction with specific numbers", "Clarify revenue model and pricing", "Research and articulate your TAM/SAM", "Strengthen competitive differentiation"],
      summary: { name: answers.q0 || "Your Startup", sector: answers.q2 || "TBD", revenue: answers.q7 || "TBD", raising: answers.q11 || "TBD", model: answers.q5 || "TBD", traction: answers.q6 || "TBD" },
    });
    setShowAnalysis(true);
  };

  const handleCfSend = () => { const val = cfInputRef.current?.value || ""; if (!val.trim()) return; setCfMessages(m => [...m, { id: Date.now(), user: "You", avatar: "😎", badge: "New Founder", time: "now", msg: val.trim() }]); if (cfInputRef.current) cfInputRef.current.value = ""; };

  const calcScore = () => chatAnswers.score || 50;
  const getScoreLabel = (s) => chatAnswers.label || (s >= 80 ? "Investor Ready 🔥" : s >= 60 ? "Almost There 💪" : s >= 40 ? "Needs Work 🛠️" : "Early Stage 🌱");
  const getScoreColor = (s) => s >= 80 ? T.accent : s >= 60 ? "#FFEAA7" : s >= 40 ? T.accent2 : T.muted;

  const getFiltered = (cityId, countryId) => STARTUPS.filter(s => { if (cityId && s.city !== cityId) return false; if (countryId && !cityId && s.country !== countryId) return false; if (sectorFilter !== "All" && s.sector !== sectorFilter) return false; if (stageFilter !== "All" && s.stage !== stageFilter) return false; if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.oneliner.toLowerCase().includes(search.toLowerCase())) return false; return true; });
  const filtered = getFiltered(null, null);

  // Shared UI
  const Nav = () => (<nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", backdropFilter: "blur(20px)", background: "rgba(10,10,10,0.85)", borderBottom: `1px solid ${T.border}` }}><div style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: -1, cursor: "pointer", fontFamily: T.font }} onClick={() => navTo("home")}>BROSKii<span style={{ color: T.accent }}>ZZ</span></div><div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>{[{ k: "home", l: "Home" }, { k: "founder", l: "Pitch" }, { k: "investor", l: "Invest" }, { k: "cofounder", l: "Co-Found" }].map(n => (<button key={n.k} onClick={() => navTo(n.k)} style={{ background: page === n.k ? `${T.accent}15` : "transparent", border: page === n.k ? `1px solid ${T.accent}44` : "1px solid transparent", color: page === n.k ? T.accent : T.muted, padding: "6px 12px", cursor: "pointer", fontFamily: T.mono, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1.5 }}>{n.l}</button>))}{user && <button onClick={() => { setAuthScreen("login"); setUser(null); notify("Logged out"); }} style={{ background: `${T.accent}12`, border: `1px solid ${T.accent}33`, color: T.accent, padding: "6px 12px", cursor: "pointer", fontFamily: T.mono, fontSize: "0.6rem", letterSpacing: 1, marginLeft: 4, display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, height: 18, borderRadius: "50%", background: `${T.accent}33`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 800 }}>{user.name[0].toUpperCase()}</span>{user.name}</button>}</div></nav>);
  const GridBg = () => <div style={{ position: "fixed", inset: 0, backgroundImage: `linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 }} />;
  const Toast = () => notif ? <div style={{ position: "fixed", top: 14, right: 14, zIndex: 999, background: T.card, border: `1px solid ${T.accent}`, padding: "10px 18px", fontFamily: T.mono, fontSize: "0.75rem", color: T.accent, animation: "fadeIn 0.3s" }}>{notif}</div> : null;
  const Pill = ({ label, active, onClick, color = T.accent }) => (<button onClick={onClick} style={{ background: active ? `${color}18` : T.card, border: `1px solid ${active ? color : T.border}`, color: active ? color : T.muted, padding: "5px 12px", cursor: "pointer", fontFamily: T.mono, fontSize: "0.63rem", letterSpacing: 1, whiteSpace: "nowrap" }}>{label}</button>);
  const Shell = ({ children }) => (<div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.font, color: T.fg }}><link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" /><style>{globalCSS}</style><GridBg /><Nav /><Toast />{children}</div>);
  const Tag = ({ children, color = T.accent }) => <div style={{ fontFamily: T.mono, fontSize: "0.68rem", color, textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 }}>{children}</div>;

  // Startup card component
  const StartupCard = ({ s, i, accentC = T.accent2 }) => (
    <div onClick={() => { setPage("investor"); setSelectedStartup(s.id); }} style={{ background: T.card, border: `1px solid ${T.border}`, padding: "22px 20px", cursor: "pointer", transition: "all 0.3s", position: "relative", overflow: "hidden", animation: `fadeUp 0.4s ${i * 0.05}s both` }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = accentC; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
      {s.hot && <div style={{ position: "absolute", top: 0, right: 0, background: T.accent2, color: "#fff", fontFamily: T.mono, fontSize: "0.5rem", padding: "2px 8px", letterSpacing: 1 }}>HOT 🔥</div>}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, background: `${accentC}12`, border: `1px solid ${accentC}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{s.avatar}</div>
        <div><div style={{ fontSize: "1.05rem", fontWeight: 700 }}>{s.name}</div><div style={{ fontFamily: T.mono, fontSize: "0.63rem", color: T.muted }}>{s.founder}</div></div>
      </div>
      <p style={{ color: "#bbb", fontSize: "0.84rem", lineHeight: 1.45, marginBottom: 12 }}>{s.oneliner}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontFamily: T.mono, fontSize: "0.62rem", color: T.muted }}>
        <span style={{ background: T.bg, padding: "2px 8px", border: `1px solid ${T.border}` }}>{s.sector}</span>
        <span style={{ background: T.bg, padding: "2px 8px", border: `1px solid ${T.border}` }}>{s.stage}</span>
        <span style={{ background: T.bg, padding: "2px 8px", border: `1px solid ${T.border}` }}>{s.ask}</span>
      </div>
      <div style={{ fontFamily: T.mono, fontSize: "0.63rem", color: accentC, marginTop: 10, opacity: 0.6 }}>View profile →</div>
    </div>
  );

  // ═══ CITY EXPLORE ═══
  if (page === "cityExplore" && selectedCountry && selectedCity) {
    const country = COUNTRIES[selectedCountry];
    const city = country.cities.find(c => c.id === selectedCity);
    const cityStartups = getFiltered(selectedCity, selectedCountry);

    if (cityView === "businesses") {
      return (<Shell><div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "32px 20px 60px" }}>
        <button onClick={() => setCityView("info")} style={{ background: "transparent", border: "none", color: T.muted, fontFamily: T.mono, fontSize: "0.72rem", cursor: "pointer", padding: "8px 0", marginBottom: 16 }} onMouseEnter={e => e.currentTarget.style.color = country.color} onMouseLeave={e => e.currentTarget.style.color = T.muted}>← Back to {city.name} info</button>
        <Tag color={country.color}>// {city.name} businesses</Tag>
        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: -2, marginBottom: 6 }}>Startups in {city.name}</h1>
        <p style={{ color: T.muted, fontSize: "0.85rem", marginBottom: 24 }}>{cityStartups.length} startups in {city.name}</p>
        {cityStartups.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: T.muted }}><div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🏗️</div><p>No startups in {city.name} yet. <span style={{ color: T.accent, cursor: "pointer" }} onClick={() => navTo("founder")}>Be the first →</span></p></div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>{cityStartups.map((s, i) => <StartupCard key={s.id} s={s} i={i} accentC={country.color} />)}</div>
        )}
      </div></Shell>);
    }

    return (<Shell><div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "32px 20px 60px" }}>
      <button onClick={() => { setSelectedCity(null); setPage("countryMap"); }} style={{ background: "transparent", border: "none", color: T.muted, fontFamily: T.mono, fontSize: "0.72rem", cursor: "pointer", padding: "8px 0", marginBottom: 16 }} onMouseEnter={e => e.currentTarget.style.color = country.color} onMouseLeave={e => e.currentTarget.style.color = T.muted}>← Back to {country.name} map</button>
      <div style={{ animation: "fadeUp 0.5s" }}>
        <Tag color={country.color}>// market intelligence</Tag>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: -2, marginBottom: 6 }}>{city.name} <span style={{ color: country.color }}>{country.flag}</span></h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "24px 0" }}>
          {[{ l: "Population", v: city.population }, { l: "GDP", v: city.gdp }].map(m => (<div key={m.l} style={{ background: T.card, border: `1px solid ${T.border}`, padding: 20, textAlign: "center" }}><div style={{ fontSize: "1.6rem", fontWeight: 800, color: country.color }}>{m.v}</div><div style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.muted, letterSpacing: 2, marginTop: 4 }}>{m.l}</div></div>))}
        </div>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 24, marginBottom: 16 }}>
          <div style={{ fontFamily: T.mono, fontSize: "0.63rem", color: country.color, letterSpacing: 2, marginBottom: 10 }}>LEADING INDUSTRIES</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{city.industries.split(", ").map(ind => (<span key={ind} style={{ fontFamily: T.mono, fontSize: "0.7rem", color: T.fg, background: `${country.color}12`, padding: "6px 14px", border: `1px solid ${country.color}33` }}>{ind}</span>))}</div>
        </div>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 24, marginBottom: 24 }}>
          <div style={{ fontFamily: T.mono, fontSize: "0.63rem", color: country.color, letterSpacing: 2, marginBottom: 10 }}>MARKET OVERVIEW</div>
          <p style={{ color: "#ccc", lineHeight: 1.65, fontSize: "0.9rem" }}>{city.marketInfo}</p>
        </div>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 20, marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: country.color }}>{cityStartups.length}</div>
          <div style={{ fontFamily: T.mono, fontSize: "0.65rem", color: T.muted, letterSpacing: 2 }}>STARTUPS IN {city.name.toUpperCase()}</div>
        </div>
        <button onClick={() => setCityView("businesses")} style={{ width: "100%", background: country.color, color: T.bg, border: "none", padding: "16px", fontFamily: T.font, fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", textTransform: "uppercase", letterSpacing: 2, transition: "all 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
          Explore Businesses in {city.name} →
        </button>
      </div>
    </div></Shell>);
  }

  // ═══ COUNTRY MAP ═══
  if (page === "countryMap" && selectedCountry) {
    const country = COUNTRIES[selectedCountry];
    return (<Shell><div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "32px 20px 60px" }}>
      <button onClick={() => { setSelectedCountry(null); setPage("home"); }} style={{ background: "transparent", border: "none", color: T.muted, fontFamily: T.mono, fontSize: "0.72rem", cursor: "pointer", padding: "8px 0", marginBottom: 16 }} onMouseEnter={e => e.currentTarget.style.color = country.color} onMouseLeave={e => e.currentTarget.style.color = T.muted}>← Back to Home</button>
      <Tag color={country.color}>// explore {country.name.toLowerCase()}</Tag>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: -2, marginBottom: 6 }}>{country.flag} {country.name}</h1>
      <p style={{ color: T.muted, fontSize: "0.88rem", marginBottom: 32 }}>Tap a city to explore its market and startups.</p>
      {/* MAP — SVG Political Map */}
      <div style={{ position: "relative", background: T.card, border: `1px solid ${T.border}`, aspectRatio: "4/3", marginBottom: 32, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${country.color}05 1px, transparent 1px), linear-gradient(90deg, ${country.color}05 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <svg viewBox={selectedCountry === "india" ? "68 6 40 38" : selectedCountry === "usa" ? "-130 24 68 32" : "-12 35 50 30"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid meet">
          {/* Country outline path */}
          {selectedCountry === "india" && <path d="M77.5,7.2 L78.5,7.5 L80,8 L82,8.5 L83,9 L84,10 L85.5,10 L87,10.5 L88.5,11 L89,12 L90,13 L91,13 L92,14 L93,14.5 L94,15 L95,15 L96,14.5 L97,15 L97.5,16 L97,17 L96.5,18 L97,19 L97.5,20 L97,21 L96,21.5 L95,22 L94.5,23 L95,24 L94,25 L93,25.5 L92.5,26 L92,27 L91,27.5 L90.5,28 L90,29 L89,30 L88,31 L87,32 L86,33 L85,34 L84,35 L83,36 L82,37 L81,37.5 L80,38 L79.5,39 L79,40 L78,40 L77,39 L76.5,38 L76,37 L75.5,36 L75,35 L74,34 L73,33 L72.5,32 L72,31 L71,30 L70.5,29 L70,28 L69.5,27 L69,26 L68.5,25 L69,24 L69.5,23 L70,22 L70.5,21 L71,20 L72,19 L72.5,18 L73,17 L73.5,16 L74,15 L74.5,14 L75,13 L75.5,12 L76,11 L76.5,10 L77,9 L77.5,8 Z" fill={`${country.color}12`} stroke={country.color} strokeWidth="0.3" strokeOpacity="0.6" />}
          {selectedCountry === "usa" && <path d="M-124,49 L-123,48 L-122,47 L-120,46.5 L-118,46 L-117,45 L-116,44 L-114,43 L-112,42 L-110,41 L-108,40 L-106,39 L-104,38.5 L-102,38 L-100,37.5 L-98,37 L-96,37 L-94,37.5 L-92,38 L-90,38 L-88,37.5 L-86,37 L-84,36.5 L-82,36 L-80,35.5 L-78,35 L-76,35 L-74,35.5 L-72,36 L-70,37 L-68,38 L-67,39 L-67.5,40 L-68,41 L-69,42 L-70,43 L-71,44 L-72,44.5 L-74,44 L-76,43.5 L-78,43 L-80,43 L-82,43.5 L-84,44 L-86,44.5 L-88,45 L-90,45.5 L-92,45.5 L-94,45 L-96,44.5 L-98,44 L-100,44 L-102,44.5 L-104,45 L-106,45.5 L-108,46 L-110,47 L-112,47.5 L-114,48 L-116,48.5 L-118,49 L-120,49 L-122,49 L-124,49 Z" fill={`${country.color}12`} stroke={country.color} strokeWidth="0.3" strokeOpacity="0.6" />}
          {selectedCountry === "europe" && <>
            <path d="M-5,43 L-4,42 L-3,41.5 L-1,41 L0,40.5 L2,40 L3,40.5 L4,41 L5,42 L4,43 L3,44 L2,44.5 L0,44 L-1,43.5 L-3,43.5 L-5,43 Z" fill={`${country.color}12`} stroke={country.color} strokeWidth="0.2" strokeOpacity="0.4" />
            <path d="M-6,49 L-5,48 L-3,47 L-1,46.5 L1,46 L3,46 L4,47 L3,48 L2,49 L0,50 L-2,50 L-4,50 L-6,49 Z" fill={`${country.color}12`} stroke={country.color} strokeWidth="0.2" strokeOpacity="0.4" />
            <path d="M6,48 L8,47 L10,47 L12,47.5 L14,48 L15,49 L16,50 L14,51 L12,51 L10,50 L8,49 L6,48 Z" fill={`${country.color}12`} stroke={country.color} strokeWidth="0.2" strokeOpacity="0.4" />
            <path d="M8,44 L10,43 L12,42 L14,42 L16,43 L18,44 L20,45 L22,46 L24,47 L22,48 L20,48 L18,47 L16,46 L14,46 L12,45 L10,44 L8,44 Z" fill={`${country.color}12`} stroke={country.color} strokeWidth="0.2" strokeOpacity="0.4" />
            <path d="M18,40 L20,39 L22,39 L24,40 L26,41 L28,42 L30,43 L28,44 L26,44 L24,43 L22,42 L20,41 L18,40 Z" fill={`${country.color}12`} stroke={country.color} strokeWidth="0.2" strokeOpacity="0.4" />
          </>}
          {/* City markers */}
          {country.cities.map(city => {
            const coords = selectedCountry === "india"
              ? { delhi: [77.2,28.6], mumbai: [72.9,19.1], bangalore: [77.6,13], hyderabad: [78.5,17.4], chennai: [80.3,13.1] }
              : selectedCountry === "usa"
              ? { sf: [-122.4,37.8], nyc: [-74,40.7], austin: [-97.7,30.3], miami: [-80.2,25.8], chicago: [-87.6,41.9] }
              : { london: [-0.1,51.5], berlin: [13.4,52.5], paris: [2.3,48.9], amsterdam: [4.9,52.4], stockholm: [18.1,59.3] };
            const [cx, cy] = coords[city.id] || [0,0];
            return (
              <g key={city.id} onClick={() => { setSelectedCity(city.id); setCityView("info"); setPage("cityExplore"); }} style={{ cursor: "pointer" }}>
                <circle cx={cx} cy={cy} r="1.2" fill={country.color} opacity="0.3">
                  <animate attributeName="r" values="1.2;2;1.2" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx={cx} cy={cy} r="0.6" fill={country.color} stroke={T.bg} strokeWidth="0.2" />
                <text x={cx} y={cy - 1.8} textAnchor="middle" fill={T.fg} fontSize="1.4" fontFamily="monospace" fontWeight="bold">{city.name}</text>
              </g>
            );
          })}
        </svg>
        <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: T.mono, fontSize: "0.55rem", color: `${country.color}44`, letterSpacing: 3, textTransform: "uppercase" }}>{country.name} — Political Map</div>
        <div style={{ position: "absolute", bottom: 12, right: 12, fontFamily: T.mono, fontSize: "0.5rem", color: `${country.color}33`, letterSpacing: 1 }}>BROSKiiZZ Maps</div>
      </div>
      {/* City list */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
        {country.cities.map((city, i) => { const count = STARTUPS.filter(s => s.city === city.id).length; return (
          <div key={city.id} onClick={() => { setSelectedCity(city.id); setCityView("info"); setPage("cityExplore"); }}
            style={{ background: T.card, border: `1px solid ${T.border}`, padding: "18px 16px", cursor: "pointer", transition: "all 0.3s", animation: `fadeUp 0.4s ${i * 0.06}s both` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = country.color; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: "1rem" }}>{city.name}</span>
              <span style={{ fontFamily: T.mono, fontSize: "0.6rem", color: country.color, background: `${country.color}12`, padding: "2px 8px", border: `1px solid ${country.color}33` }}>{count} startups</span>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: "0.65rem", color: T.muted, lineHeight: 1.5 }}>{city.industries}</div>
          </div>
        ); })}
      </div>
    </div></Shell>);
  }

  // ═══ HOME ═══
  if (page === "home") {
    return (<Shell>
      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "70px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.accent, textTransform: "uppercase", letterSpacing: 4, marginBottom: 18, animation: "fadeUp 0.8s 0.2s both" }}>// where business meets brotherhood</div>
        <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, marginBottom: 24, animation: "fadeUp 0.8s 0.4s both" }}>
          Find your<br /><span style={{ color: T.accent, position: "relative", display: "inline-block" }}>business broski<span style={{ position: "absolute", bottom: 3, left: 0, right: 0, height: 5, background: T.accent, opacity: 0.25, transform: "skewX(-12deg)" }} /></span>
        </h1>
        <p style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)", color: T.muted, maxWidth: 520, lineHeight: 1.7, marginBottom: 36, animation: "fadeUp 0.8s 0.6s both" }}>BROSKiiZZ connects founders with investors and co-founders who actually get your vision. AI-powered onboarding. Real connections.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", animation: "fadeUp 0.8s 0.8s both" }}>
          {[{ p: "founder", l: "I'm a Founder →", c: T.accent, isBg: true }, { p: "investor", l: "I'm an Investor →", c: T.accent2 }, { p: "cofounder", l: "Find Co-Founder →", c: T.accent3 }].map(b => (
            <button key={b.p} onClick={() => navTo(b.p)} style={{ background: b.isBg ? T.accent : "transparent", color: b.isBg ? T.bg : T.fg, padding: "14px 28px", border: b.isBg ? "none" : `2px solid ${T.border}`, fontFamily: T.font, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", textTransform: "uppercase", letterSpacing: 1.5, transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; if (!b.isBg) { e.currentTarget.style.borderColor = b.c; e.currentTarget.style.color = b.c; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; if (!b.isBg) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.fg; } }}>{b.l}</button>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "32px 28px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, maxWidth: 1200, margin: "0 auto" }}>
        {[{ n: "500+", l: "Founders" }, { n: "120+", l: "Investors" }, { n: "$4.2M", l: "Connected" }, { n: "89%", l: "Match Rate" }].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 800, color: T.accent, letterSpacing: -2 }}>{s.n}</div><div style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.muted, textTransform: "uppercase", letterSpacing: 2 }}>{s.l}</div></div>
        ))}
      </div>

      {/* SHARK TANK SECTION */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <Tag>// the problem</Tag>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 24 }}>Not everyone gets on <span style={{ color: T.accent2 }}>Shark Tank.</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 16 }}>
          {[
            { icon: "🚫", title: "No access to investors", desc: "99.7% of startups never get on TV or into a top accelerator. They pitch into the void — cold emails, ignored DMs, dead-end events." },
            { icon: "😔", title: "No mentorship pipeline", desc: "Founders outside major tech hubs have zero access to experienced mentors. They're building blind — making avoidable mistakes." },
            { icon: "💔", title: "Great ideas die broke", desc: "72% of startups fail not because the idea was bad, but because they ran out of money or couldn't find the right partners." },
          ].map(c => (
            <div key={c.title} style={{ background: T.card, border: `1px solid ${T.border}`, padding: "28px 24px", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent2; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: "2rem", marginBottom: 14 }}>{c.icon}</div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 8 }}>{c.title}</h3>
              <p style={{ color: T.muted, lineHeight: 1.6, fontSize: "0.85rem" }}>{c.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background: `${T.accent}08`, border: `1px solid ${T.accent}22`, padding: "24px 28px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: T.accent }}>BROSKiiZZ fixes this.</h3>
          <p style={{ color: "#ccc", lineHeight: 1.6, fontSize: "0.9rem" }}>We democratize access to investment, mentorship, and co-founders. No gatekeepers. AI-powered pitch analysis. Real deal flow. Co-founder matching that works.</p>
        </div>
      </section>

      {/* STRESS GRAPH */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 28px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <Tag color={T.accent2}>// the gap</Tag>
        <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: -2, marginBottom: 8 }}>Great ideas. No funding. <span style={{ color: T.accent2 }}>Maximum stress.</span></h2>
        <p style={{ color: T.muted, fontSize: "0.88rem", marginBottom: 32, maxWidth: 600 }}>The gap between stressed entrepreneurs with viable ideas and those who actually get funded keeps growing.</p>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: "28px 24px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontFamily: T.mono, fontSize: "0.6rem", color: T.muted, flexWrap: "wrap", gap: 8 }}>
            <span>% of entrepreneurs</span>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, background: T.accent2, display: "inline-block" }} /> Stressed (no funding)</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, background: T.accent, display: "inline-block" }} /> Actually funded</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 200 }}>
            {STRESS_DATA.map((d, i) => (
              <div key={d.year} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", display: "flex", gap: 3, alignItems: "flex-end", justifyContent: "center", height: 180 }}>
                  <div style={{ width: "40%", height: `${(d.stressed / 100) * 170}px`, background: `${T.accent2}cc`, animation: `fadeUp 0.5s ${i * 0.1}s both`, position: "relative" }}>
                    <span style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", fontFamily: T.mono, fontSize: "0.5rem", color: T.accent2 }}>{d.stressed}%</span>
                  </div>
                  <div style={{ width: "40%", height: `${(d.funded / 100) * 170}px`, background: `${T.accent}cc`, animation: `fadeUp 0.5s ${i * 0.1 + 0.05}s both`, position: "relative" }}>
                    <span style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", fontFamily: T.mono, fontSize: "0.5rem", color: T.accent }}>{d.funded}%</span>
                  </div>
                </div>
                <span style={{ fontFamily: T.mono, fontSize: "0.55rem", color: T.muted }}>{d.year}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: "12px 16px", background: `${T.accent2}08`, border: `1px solid ${T.accent2}22`, fontFamily: T.mono, fontSize: "0.68rem", color: T.accent2, textAlign: "center" }}>2025: 88% stressed with viable ideas — only 6% get funded.</div>
        </div>
      </section>

      {/* EARLY ACCESS */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 28px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Tag>// join the movement</Tag>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 12 }}>Get <span style={{ color: T.accent }}>early access</span></h2>
        <p style={{ color: T.muted, fontSize: "0.95rem", marginBottom: 32, lineHeight: 1.6 }}>Join the waitlist. Be first in when we launch.</p>
        {emailSubmitted ? (
          <div style={{ background: `${T.accent}10`, border: `1px solid ${T.accent}33`, padding: "28px 24px", animation: "scaleIn 0.4s" }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>🎉</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>You're on the list, broski!</div>
            <div style={{ color: T.muted, fontSize: "0.85rem", marginTop: 6 }}>We'll hit you up when it's time.</div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 0, maxWidth: 480, margin: "0 auto" }}>
            <input ref={earlyAccessRef} defaultValue="" placeholder="your@email.com" type="email"
              style={{ flex: 1, background: T.card, border: `2px solid ${T.border}`, borderRight: "none", padding: "16px 20px", color: T.fg, fontFamily: T.mono, fontSize: "0.85rem" }}
              onKeyDown={e => { if (e.key === "Enter" && earlyAccessRef.current?.value) { setEmailSubmitted(true); notify("🤙 You're in!"); } }} />
            <button onClick={() => { if (earlyAccessRef.current?.value) { setEmailSubmitted(true); notify("🤙 You're in!"); } else notify("Enter your email!"); }}
              style={{ background: T.accent, color: T.bg, border: "none", padding: "16px 28px", fontFamily: T.font, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>I'm In →</button>
          </div>
        )}
      </section>

      {/* COUNTRY SELECTION */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <Tag color={T.accent3}>// explore by region</Tag>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: -2, marginBottom: 8 }}>Choose your <span style={{ color: T.accent3 }}>market</span></h2>
        <p style={{ color: T.muted, fontSize: "0.9rem", marginBottom: 32 }}>Explore startup ecosystems. Click a country to see an interactive map of cities, industries, and entrepreneurs.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {Object.entries(COUNTRIES).map(([key, c]) => { const count = STARTUPS.filter(s => s.country === key).length; return (
            <button key={key} onClick={() => { setSelectedCountry(key); setPage("countryMap"); }}
              style={{ background: T.card, border: `2px solid ${T.border}`, padding: "36px 20px", cursor: "pointer", transition: "all 0.4s", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${c.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <span style={{ fontSize: "3rem" }}>{c.flag}</span>
              <span style={{ fontFamily: T.font, fontWeight: 800, fontSize: "1.4rem", color: T.fg }}>{c.name}</span>
              <span style={{ fontFamily: T.mono, fontSize: "0.68rem", color: c.color }}>{c.cities.length} cities · {count} startups</span>
              <span style={{ fontFamily: T.mono, fontSize: "0.58rem", color: T.muted, marginTop: 4 }}>{c.cities.map(ci => ci.name).join(" · ")}</span>
            </button>
          ); })}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ position: "relative", zIndex: 1, overflow: "hidden", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "18px 0" }}>
        <div style={{ display: "flex", gap: 40, animation: "scroll 20s linear infinite", width: "max-content" }}>
          {Array(4).fill(["FOUNDERS", "INVESTORS", "CO-FOUNDERS", "BUSINESS BROSKiiZZ"]).flat().map((t, i) => (
            <div key={i} style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)", fontWeight: 800, whiteSpace: "nowrap", color: "#1a1a1a", letterSpacing: -1, display: "flex", alignItems: "center", gap: 12 }}>{t} <span style={{ color: T.accent, fontSize: "0.6em" }}>✦</span></div>
          ))}
        </div>
      </div>
      <footer style={{ position: "relative", zIndex: 1, padding: "28px", textAlign: "center" }}><div style={{ fontFamily: T.mono, fontSize: "0.6rem", color: "#333", letterSpacing: 1 }}>© 2026 BROSKiiZZ — BUILT WITH LOVE & HUSTLE</div></footer>
    </Shell>);
  }

  // ═══ FOUNDER AI CHAT ═══
  if (page === "founder") {
    return (<Shell><div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "24px 16px 0", display: "flex", flexDirection: "column", height: "calc(100vh - 53px)" }}>
      <div style={{ padding: "12px 0 16px", borderBottom: `1px solid ${T.border}`, marginBottom: 16, flexShrink: 0 }}>
        <Tag>// ai pitch builder</Tag>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: -1 }}>Tell us about your startup</h2>
        <p style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.muted, marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>Powered by <span style={{ color: T.accent3, fontWeight: 700 }}>Claude AI</span> — live conversation, not scripted</p>
        {!showAnalysis && <div style={{ marginTop: 10, background: T.card, border: `1px solid ${T.border}`, height: 6, borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", background: T.accent, width: `${Math.min((chatStep / 12) * 100, 100)}%`, transition: "width 0.5s", borderRadius: 3 }} /></div>}
      </div>
      {!showAnalysis ? (<>
        <div style={{ flex: 1, overflowY: "auto", paddingRight: 8 }}>
          {chatHistory.map((m, i) => (<div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12, animation: "fadeIn 0.3s" }}><div style={{ maxWidth: "80%", padding: "12px 16px", background: m.role === "user" ? `${T.accent}15` : T.card, border: `1px solid ${m.role === "user" ? `${T.accent}33` : T.border}`, fontSize: "0.88rem", lineHeight: 1.55 }}>{m.role === "ai" && <div style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.accent, marginBottom: 6, letterSpacing: 1 }}>BROSKii AI</div>}{m.text}</div></div>))}
          {aiTyping && <div style={{ display: "flex", marginBottom: 12 }}><div style={{ background: T.card, border: `1px solid ${T.border}`, padding: "12px 20px", display: "flex", gap: 6 }}>{[0,1,2].map(d => <div key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: T.accent, animation: `typing 1s ${d*0.2}s infinite` }} />)}</div></div>}
          <div ref={chatEndRef} />
        </div>
        <div style={{ flexShrink: 0, padding: "12px 0 16px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 8 }}>
          <input ref={chatInputRef} defaultValue="" onKeyDown={e => e.key === "Enter" && handleChatSend()} placeholder={showAnalysis ? "All done!" : "Type your answer..."} disabled={showAnalysis || aiTyping} style={{ flex: 1, background: T.card, border: `1px solid ${T.border}`, padding: "12px 16px", color: T.fg, fontFamily: T.font, fontSize: "0.9rem" }} />
          <button onClick={handleChatSend} style={{ background: T.accent, color: T.bg, border: "none", padding: "12px 20px", fontFamily: T.font, fontWeight: 700, cursor: "pointer" }}>SEND</button>
        </div>
      </>) : (
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 40, animation: "fadeUp 0.6s" }}>
          {(() => { const score = calcScore(); const color = getScoreColor(score); return (<div style={{ textAlign: "center", padding: "32px 0 24px" }}><div style={{ fontSize: "4rem", fontWeight: 800, color, letterSpacing: -3 }}>{score}</div><div style={{ fontFamily: T.mono, fontSize: "0.75rem", color, letterSpacing: 2, textTransform: "uppercase" }}>{getScoreLabel(score)}</div><div style={{ fontFamily: T.mono, fontSize: "0.65rem", color: T.muted, marginTop: 6 }}>INVESTOR READINESS SCORE</div></div>); })()}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 20, marginBottom: 16 }}>
            <div style={{ fontFamily: T.mono, fontSize: "0.65rem", color: T.accent, letterSpacing: 2, marginBottom: 14 }}>BREAKDOWN</div>
            {(chatAnswers.breakdown || []).map(it => { return (<div key={it.label} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: "0.78rem", color: T.muted }}>{it.label}</span><span style={{ fontFamily: T.mono, fontSize: "0.68rem" }}>{it.score}/{it.max}</span></div><div style={{ background: T.bg, height: 5, borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", background: it.score === it.max ? T.accent : it.score > 0 ? "#FFEAA7" : T.accent2, width: `${(it.score/it.max)*100}%`, borderRadius: 3, transition: "width 0.8s" }} /></div></div>); })}
          </div>
          {chatAnswers.summary && <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 20, marginBottom: 16 }}>
            <div style={{ fontFamily: T.mono, fontSize: "0.65rem", color: T.accent, letterSpacing: 2, marginBottom: 14 }}>FINANCIAL SNAPSHOT</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {Object.entries(chatAnswers.summary).map(([k, v]) => (<div key={k} style={{ background: T.bg, border: `1px solid ${T.border}`, padding: 12 }}><div style={{ fontFamily: T.mono, fontSize: "0.58rem", color: T.muted, letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" }}>{k}</div><div style={{ fontSize: "0.83rem", color: T.fg, lineHeight: 1.4 }}>{v}</div></div>))}
            </div>
          </div>}
          {chatAnswers.recommendations && <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 20, marginBottom: 16 }}>
            <div style={{ fontFamily: T.mono, fontSize: "0.65rem", color: T.accent, letterSpacing: 2, marginBottom: 14 }}>AI RECOMMENDATIONS</div>
            {chatAnswers.recommendations.map((tip, i) => (<div key={i} style={{ padding: "10px 0", borderBottom: i < chatAnswers.recommendations.length - 1 ? `1px solid ${T.border}` : "none", fontSize: "0.85rem", color: "#ccc", lineHeight: 1.5 }}>{tip}</div>))}
          </div>}
          <button onClick={() => navTo("investor")} style={{ width: "100%", background: T.accent, color: T.bg, border: "none", padding: "14px", fontFamily: T.font, fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1.5 }}>See Your Listing →</button>
        </div>
      )}
    </div></Shell>);
  }

  // ═══ INVESTOR ═══
  if (page === "investor") {
    if (selectedStartup) {
      const s = STARTUPS.find(x => x.id === selectedStartup);
      if (!s) return null;
      const isConn = connections[`s-${s.id}`];
      const cityD = Object.values(COUNTRIES).flatMap(c => c.cities).find(c => c.id === s.city);
      return (<Shell>
        {showCallModal && (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowCallModal(false)}><div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 32, maxWidth: 420, width: "100%", animation: "scaleIn 0.3s" }} onClick={e => e.stopPropagation()}>
          <div style={{ fontFamily: T.mono, fontSize: "0.65rem", color: T.accent, letterSpacing: 2, marginBottom: 12 }}>BOOK A CALL</div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 16 }}>Schedule with {s.founder}</h3>
          <input placeholder="Your name" style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: "10px 14px", color: T.fg, fontFamily: T.font, fontSize: "0.85rem", marginBottom: 10 }} />
          <input placeholder="Your email" style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: "10px 14px", color: T.fg, fontFamily: T.font, fontSize: "0.85rem", marginBottom: 10 }} />
          <select style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: "10px 14px", color: T.fg, fontFamily: T.font, fontSize: "0.85rem", marginBottom: 16, cursor: "pointer" }}><option>Select time...</option><option>Tomorrow, 10 AM</option><option>Tomorrow, 2 PM</option><option>Wednesday, 11 AM</option></select>
          <button onClick={() => { setShowCallModal(false); notify("📞 Call booked!"); }} style={{ width: "100%", background: T.accent, color: T.bg, border: "none", padding: "12px", fontFamily: T.font, fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>Confirm →</button>
        </div></div>)}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "24px 20px 60px" }}>
          <button onClick={() => setSelectedStartup(null)} style={{ background: "transparent", border: "none", color: T.muted, fontFamily: T.mono, fontSize: "0.72rem", cursor: "pointer", padding: "8px 0", marginBottom: 16 }} onMouseEnter={e => e.currentTarget.style.color = T.accent} onMouseLeave={e => e.currentTarget.style.color = T.muted}>← Back</button>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 20, flexWrap: "wrap", gap: 16, animation: "fadeUp 0.4s" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 56, height: 56, background: `${T.accent2}15`, border: `1px solid ${T.accent2}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>{s.avatar}</div>
              <div><h1 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: -1 }}>{s.name}</h1><div style={{ fontFamily: T.mono, fontSize: "0.7rem", color: T.muted }}>{s.founder} · {s.founded}{cityD ? ` · ${cityD.name}` : ""}</div></div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.accent2, background: `${T.accent2}12`, padding: "4px 10px", border: `1px solid ${T.accent2}33` }}>{s.stage}</span>
              <span style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.accent, background: `${T.accent}12`, padding: "4px 10px", border: `1px solid ${T.accent}33` }}>{s.sector}</span>
            </div>
          </div>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "#ddd", marginBottom: 24, fontWeight: 600 }}>{s.oneliner}</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>{s.brandColors.map((c, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: T.card, border: `1px solid ${T.border}`, padding: "5px 10px" }}><div style={{ width: 14, height: 14, background: c }} /><span style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.muted }}>{c}</span></div>))}</div>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 20, marginBottom: 14 }}><div style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.accent, letterSpacing: 2, marginBottom: 8 }}>ABOUT</div><p style={{ color: "#ccc", lineHeight: 1.6, fontSize: "0.88rem" }}>{s.description}</p><div style={{ marginTop: 10, fontFamily: T.mono, fontSize: "0.72rem", color: T.accent2 }}>Model: <span style={{ color: "#ccc" }}>{s.businessModel}</span></div></div>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 20, marginBottom: 14 }}><div style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.accent, letterSpacing: 2, marginBottom: 12 }}>METRICS</div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8 }}>{Object.entries(s.metrics).map(([k, v]) => (<div key={k} style={{ background: T.bg, border: `1px solid ${T.border}`, padding: 12, textAlign: "center" }}><div style={{ fontSize: "1rem", fontWeight: 800, color: T.accent }}>{v}</div><div style={{ fontFamily: T.mono, fontSize: "0.55rem", color: T.muted, textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>{k}</div></div>))}</div></div>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 20, marginBottom: 14 }}><div style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.accent, letterSpacing: 2, marginBottom: 12 }}>PRODUCTS</div>{s.products.map((p, i) => (<div key={i} style={{ display: "flex", gap: 12, alignItems: "center", background: T.bg, border: `1px solid ${T.border}`, padding: 14, marginBottom: 8 }}><div style={{ width: 38, height: 38, background: `${T.accent2}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{p.icon}</div><div><div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: 2 }}>{p.name}</div><div style={{ color: T.muted, fontSize: "0.78rem" }}>{p.desc}</div></div></div>))}</div>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: 20, marginBottom: 14 }}><div style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.accent, letterSpacing: 2, marginBottom: 12 }}>TEAM</div>{s.team.map((t, i) => (<div key={i} style={{ display: "flex", gap: 10, alignItems: "center", background: T.bg, border: `1px solid ${T.border}`, padding: 12, marginBottom: 8 }}><div style={{ width: 34, height: 34, background: `${T.accent3}15`, border: `1px solid ${T.accent3}33`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", color: T.accent3, flexShrink: 0 }}>{t.name.split(" ").map(n => n[0]).join("")}</div><div><div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{t.name} <span style={{ color: T.muted, fontWeight: 400, fontSize: "0.75rem" }}>— {t.role}</span></div><div style={{ color: T.muted, fontSize: "0.75rem" }}>{t.bg}</div></div></div>))}</div>
          <div style={{ background: `${T.accent2}08`, border: `1px solid ${T.accent2}33`, padding: 20, marginBottom: 20, textAlign: "center" }}><div style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.accent2, letterSpacing: 2, marginBottom: 4 }}>RAISING</div><div style={{ fontSize: "2rem", fontWeight: 800, color: T.accent2 }}>{s.ask}</div><div style={{ fontFamily: T.mono, fontSize: "0.68rem", color: T.muted }}>{s.stage}</div></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <button onClick={() => toggleConnect(`s-${s.id}`, "Connected with " + s.founder)} style={{ padding: "14px", background: isConn ? "transparent" : T.accent, color: isConn ? T.accent : T.bg, border: isConn ? `1px solid ${T.accent}` : "none", fontFamily: T.font, fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>{isConn ? "✓ Connected" : "🤝 Connect"}</button>
            <button onClick={() => notify("💬 Chat sent!")} style={{ padding: "14px", background: "transparent", border: `1px solid ${T.accent3}`, color: T.accent3, fontFamily: T.font, fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>💬 Message</button>
            <button onClick={() => setShowCallModal(true)} style={{ padding: "14px", background: "transparent", border: `1px solid ${T.accent2}`, color: T.accent2, fontFamily: T.font, fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>📞 Book Call</button>
          </div>
        </div>
      </Shell>);
    }
    return (<Shell><div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "40px 20px 60px" }}>
      <Tag color={T.accent2}>// investor dashboard</Tag>
      <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: -2, marginBottom: 6 }}>Browse deal flow</h1>
      <p style={{ color: T.muted, fontSize: "0.88rem", marginBottom: 28 }}>Click any startup for full profile.</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}><span style={{ fontFamily: T.mono, fontSize: "0.6rem", color: "#444", letterSpacing: 2, marginRight: 2 }}>SECTOR</span>{SECTORS.map(s => <Pill key={s} label={s} active={sectorFilter === s} onClick={() => setSectorFilter(s)} color={T.accent2} />)}</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}><span style={{ fontFamily: T.mono, fontSize: "0.6rem", color: "#444", letterSpacing: 2, marginRight: 2 }}>STAGE</span>{STAGES.map(s => <Pill key={s} label={s} active={stageFilter === s} onClick={() => setStageFilter(s)} color={T.accent2} />)}<div style={{ marginLeft: "auto" }}><input key="inv-search" placeholder="Search..." defaultValue="" onInput={e => setSearch(e.target.value)} style={{ background: T.card, border: `1px solid ${T.border}`, padding: "7px 12px", color: T.fg, fontFamily: T.mono, fontSize: "0.7rem", width: 170 }} /></div></div>
      <div style={{ fontFamily: T.mono, fontSize: "0.65rem", color: T.muted, marginBottom: 12 }}>{filtered.length} startups</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>{filtered.map((s, i) => <StartupCard key={s.id} s={s} i={i} />)}</div>
    </div></Shell>);
  }

  // ═══ CO-FOUNDER ═══
  if (page === "cofounder") {
    return (<Shell><div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "24px 16px 0", display: "flex", flexDirection: "column", height: "calc(100vh - 53px)" }}>
      <div style={{ padding: "10px 0 14px", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <Tag color={T.accent3}>// co-founder lounge</Tag>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: -1 }}>Find your missing piece</h2>
        <div style={{ display: "flex", gap: 10, marginTop: 10, fontFamily: T.mono, fontSize: "0.62rem" }}>
          <span style={{ color: T.accent3, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent3, animation: "pulse 2s infinite" }} /> {cfMessages.length} messages</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 0" }}>
        {cfMessages.map((m, i) => (
          <div key={m.id} style={{ marginBottom: 16, animation: i >= CHAT_SEED.length ? "slideIn 0.3s" : "none" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: `${T.accent3}12`, border: `1px solid ${T.accent3}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{m.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>{m.user}</span>
                  <span style={{ fontFamily: T.mono, fontSize: "0.55rem", color: T.accent3, background: `${T.accent3}12`, padding: "2px 6px", border: `1px solid ${T.accent3}25` }}>{m.badge}</span>
                  <span style={{ fontFamily: T.mono, fontSize: "0.58rem", color: "#444" }}>{m.time}</span>
                </div>
                <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: "12px 14px", fontSize: "0.86rem", color: "#ccc", lineHeight: 1.5 }}>{m.msg}</div>
              </div>
            </div>
          </div>
        ))}
        <div ref={cfChatEndRef} />
      </div>
      <div style={{ flexShrink: 0, padding: "12px 0 16px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 8 }}>
        <input ref={cfInputRef} defaultValue="" onKeyDown={e => e.key === "Enter" && handleCfSend()} placeholder="Tell the community what you're looking for..."
          style={{ flex: 1, background: T.card, border: `1px solid ${T.border}`, padding: "12px 14px", color: T.fg, fontFamily: T.font, fontSize: "0.88rem" }} />
        <button onClick={handleCfSend} style={{ background: T.accent3, color: T.bg, border: "none", padding: "12px 20px", fontFamily: T.font, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>SEND</button>
      </div>
    </div></Shell>);
  }
  return null;
}
