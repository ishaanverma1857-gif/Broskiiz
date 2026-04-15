'use client';

import { useState, useEffect, useRef } from “react”;

const T = {
bg: “#0a0a0a”, card: “#141414”, border: “#222”, fg: “#f0efe9”, muted: “#777”,
accent: “#c8ff00”, accent2: “#ff5733”, accent3: “#00d4ff”,
font: “‘Syne’, sans-serif”, mono: “‘Space Mono’, monospace”,
};

const COUNTRIES = {
india: {
name: “India”, flag: “\u{1f1ee}\u{1f1f3}”, color: “#FF9933”,
cities: [
{ id: “delhi”, name: “Delhi”, x: 57, y: 28, industries: “IT Services, E-commerce, EdTech”, marketInfo: “Delhi-NCR is India’s largest startup hub with over 7,000 startups.”, population: “32M”, gdp: “$280B” },
{ id: “mumbai”, name: “Mumbai”, x: 38, y: 58, industries: “FinTech, Entertainment, AdTech”, marketInfo: “India’s financial capital, leading in FinTech innovation.”, population: “21M”, gdp: “$310B” },
{ id: “bangalore”, name: “Bangalore”, x: 44, y: 76, industries: “AI/ML, SaaS, Deep Tech”, marketInfo: “India’s Silicon Valley with 35% of all Indian startups.”, population: “13M”, gdp: “$180B” },
{ id: “hyderabad”, name: “Hyderabad”, x: 48, y: 64, industries: “Pharma, Defence Tech, SaaS”, marketInfo: “Emerging pharma and defence tech hub with T-Hub incubator.”, population: “10M”, gdp: “$75B” },
{ id: “chennai”, name: “Chennai”, x: 50, y: 80, industries: “Automotive, Hardware, EV Tech”, marketInfo: “The Detroit of India with booming EV startups.”, population: “11M”, gdp: “$66B” },
],
},
usa: {
name: “USA”, flag: “\u{1f1fa}\u{1f1f8}”, color: “#3B82F6”,
cities: [
{ id: “sf”, name: “San Francisco”, x: 10, y: 42, industries: “AI/ML, SaaS, Web3, BioTech”, marketInfo: “Global epicenter of tech startups and VC funding.”, population: “4.7M”, gdp: “$592B” },
{ id: “nyc”, name: “New York”, x: 80, y: 32, industries: “FinTech, Media, Fashion Tech”, marketInfo: “#2 startup ecosystem globally. FinTech dominates.”, population: “20M”, gdp: “$770B” },
{ id: “austin”, name: “Austin”, x: 48, y: 70, industries: “Enterprise SaaS, Gaming, CleanTech”, marketInfo: “Exploding tech hub. No state income tax.”, population: “2.3M”, gdp: “$160B” },
{ id: “miami”, name: “Miami”, x: 78, y: 82, industries: “Web3, FinTech, LatAm Bridge”, marketInfo: “Crypto capital of the US. Gateway to Latin America.”, population: “6.1M”, gdp: “$380B” },
{ id: “chicago”, name: “Chicago”, x: 62, y: 30, industries: “B2B SaaS, FinTech, FoodTech”, marketInfo: “Powerhouse for B2B with practical founder culture.”, population: “9.5M”, gdp: “$689B” },
],
},
europe: {
name: “Europe”, flag: “\u{1f1ea}\u{1f1fa}”, color: “#8B5CF6”,
cities: [
{ id: “london”, name: “London”, x: 47, y: 22, industries: “FinTech, AI, HealthTech”, marketInfo: “Europe’s #1 startup ecosystem and global FinTech capital.”, population: “9.5M”, gdp: “$580B” },
{ id: “berlin”, name: “Berlin”, x: 55, y: 20, industries: “Mobility, E-commerce, Climate Tech”, marketInfo: “Lowest cost of living among major European tech hubs.”, population: “3.7M”, gdp: “$170B” },
{ id: “paris”, name: “Paris”, x: 45, y: 32, industries: “AI, DeepTech, Luxury Tech”, marketInfo: “Home to Station F, world’s largest startup campus.”, population: “12M”, gdp: “$770B” },
{ id: “amsterdam”, name: “Amsterdam”, x: 51, y: 18, industries: “FinTech, Marketplace, Travel Tech”, marketInfo: “Home to Booking.com and Adyen. EU market gateway.”, population: “2.5M”, gdp: “$125B” },
{ id: “stockholm”, name: “Stockholm”, x: 58, y: 8, industries: “Gaming, FinTech, Music Tech”, marketInfo: “Most unicorns per capita outside Silicon Valley.”, population: “2.4M”, gdp: “$160B” },
],
},
};

const STARTUPS = [
{ id: 1, name: “NexaAI”, founder: “Arjun Mehta”, sector: “AI / ML”, stage: “Pre-Seed”, ask: “$250K”, traction: “1.2K users”, revenue: “$0”, oneliner: “AI copilot for sales teams that writes personalized outreach at scale”, avatar: “\u{1f9e0}”, hot: true, founded: “2025”, city: “bangalore”, country: “india”, description: “NexaAI automates sales emails using AI. 3x higher reply rates.”, businessModel: “SaaS $49/user/month”, team: [{ name: “Arjun Mehta”, role: “CEO”, bg: “Ex-Salesforce” }, { name: “Lily Zhang”, role: “CTO”, bg: “Ex-Google AI” }], products: [{ name: “NexaAI Extension”, desc: “One-click personalized emails”, icon: “\u{1f50c}” }, { name: “NexaAI Dashboard”, desc: “Campaign analytics”, icon: “\u{1f4ca}” }], brandColors: [”#6C5CE7”, “#A29BFE”, “#0F0F1A”], metrics: { mrr: “$0”, users: “1,200”, growth: “42% WoW”, cac: “$12” } },
{ id: 2, name: “GreenLoop”, founder: “Maya Chen”, sector: “CleanTech”, stage: “Seed”, ask: “$1.2M”, traction: “$40K MRR”, revenue: “$40K MRR”, oneliner: “Marketplace for verified carbon credits from reforestation”, avatar: “\u{1f33f}”, hot: true, founded: “2024”, city: “sf”, country: “usa”, description: “Satellite-verified carbon credits connecting buyers with projects.”, businessModel: “Marketplace 8% fee”, team: [{ name: “Maya Chen”, role: “CEO”, bg: “Ex-McKinsey” }, { name: “Tomas Rivera”, role: “CTO”, bg: “DeFi protocols” }], products: [{ name: “GreenLoop Marketplace”, desc: “Buy verified credits”, icon: “\u{1f30d}” }], brandColors: [”#00B894”, “#55E6C1”, “#1A1A2E”], metrics: { mrr: “$40K”, users: “320”, growth: “18% MoM”, cac: “$85” } },
{ id: 3, name: “PayBroski”, founder: “Devon Williams”, sector: “FinTech”, stage: “Pre-Seed”, ask: “$500K”, traction: “3K waitlist”, revenue: “$0”, oneliner: “Split payments and shared wallets for Gen-Z”, avatar: “\u{1f4b8}”, hot: false, founded: “2025”, city: “nyc”, country: “usa”, description: “Shared wallets for roommates, trip funds, group savings.”, businessModel: “Freemium $4.99/mo + interchange”, team: [{ name: “Devon Williams”, role: “CEO”, bg: “Ex-Cash App” }], products: [{ name: “PayBroski App”, desc: “Social money feed”, icon: “\u{1f4f1}” }], brandColors: [”#FDCB6E”, “#E17055”, “#2D3436”], metrics: { mrr: “$0”, users: “3K”, growth: “N/A”, cac: “$8” } },
{ id: 4, name: “FitForge”, founder: “Sarah Kim”, sector: “Health”, stage: “Series A”, ask: “$5M”, traction: “$180K MRR”, revenue: “$180K MRR”, oneliner: “AI personal trainer using phone camera form analysis”, avatar: “\u{1f4aa}”, hot: true, founded: “2023”, city: “london”, country: “europe”, description: “Computer vision for real-time exercise form analysis. 12K subscribers.”, businessModel: “Subscription $19.99/mo”, team: [{ name: “Sarah Kim”, role: “CEO”, bg: “Ex-Nike” }, { name: “Dr. James Park”, role: “CTO”, bg: “PhD CV Stanford” }], products: [{ name: “FitForge App”, desc: “Real-time form analysis”, icon: “\u{1f4f1}” }], brandColors: [”#E84393”, “#FD79A8”, “#0F0F1A”], metrics: { mrr: “$180K”, users: “12K”, growth: “22% MoM”, cac: “$28” } },
{ id: 5, name: “Stackd”, founder: “Liam OBrien”, sector: “SaaS”, stage: “Seed”, ask: “$800K”, traction: “85 clients”, revenue: “$65K MRR”, oneliner: “No-code internal tool builder for ops teams”, avatar: “\u{1f527}”, hot: false, founded: “2024”, city: “berlin”, country: “europe”, description: “Ops teams build approval flows and dashboards in minutes.”, businessModel: “SaaS $299/mo”, team: [{ name: “Liam OBrien”, role: “CEO”, bg: “Ex-Atlassian” }], products: [{ name: “Stackd Builder”, desc: “Drag-and-drop apps”, icon: “\u{1f9f1}” }], brandColors: [”#0984E3”, “#74B9FF”, “#1A1A2E”], metrics: { mrr: “$65K”, users: “85”, growth: “15% MoM”, cac: “$420” } },
{ id: 6, name: “MealMap”, founder: “Jessica Torres”, sector: “FoodTech”, stage: “Pre-Seed”, ask: “$400K”, traction: “5K MAU”, revenue: “$2K MRR”, oneliner: “Meal planning built around local grocery deals”, avatar: “\u{1f37d}”, hot: true, founded: “2025”, city: “chicago”, country: “usa”, description: “Meals planned around store sales. Users save $127/month.”, businessModel: “Freemium + affiliate”, team: [{ name: “Jessica Torres”, role: “CEO”, bg: “Ex-Kroger” }], products: [{ name: “MealMap App”, desc: “AI meal plans + grocery lists”, icon: “\u{1f6d2}” }], brandColors: [”#00B894”, “#FFEAA7”, “#2D3436”], metrics: { mrr: “$2K”, users: “5K”, growth: “30% MoM”, cac: “$5” } },
{ id: 7, name: “QuickShip”, founder: “Rohit Kapoor”, sector: “SaaS”, stage: “Seed”, ask: “$600K”, traction: “200 merchants”, revenue: “$30K MRR”, oneliner: “One-click logistics for Indian D2C brands”, avatar: “\u{1f4e6}”, hot: false, founded: “2024”, city: “delhi”, country: “india”, description: “Aggregates 15+ courier partners with AI route optimization.”, businessModel: “SaaS + per-shipment fee”, team: [{ name: “Rohit Kapoor”, role: “CEO”, bg: “Ex-Delhivery” }], products: [{ name: “QuickShip Dashboard”, desc: “Unified shipping”, icon: “\u{1f4ca}” }], brandColors: [”#E17055”, “#FAB1A0”, “#2D3436”], metrics: { mrr: “$30K”, users: “200”, growth: “20% MoM”, cac: “$60” } },
{ id: 8, name: “FinBuddy”, founder: “Ananya Joshi”, sector: “FinTech”, stage: “Pre-Seed”, ask: “$350K”, traction: “10K downloads”, revenue: “$0”, oneliner: “Personal finance app for young Indians in their first job”, avatar: “\u{1f4b0}”, hot: true, founded: “2025”, city: “mumbai”, country: “india”, description: “Gamified financial literacy with auto-invest.”, businessModel: “Freemium + mutual fund referrals”, team: [{ name: “Ananya Joshi”, role: “CEO”, bg: “Ex-Zerodha” }], products: [{ name: “FinBuddy App”, desc: “Learn, budget, invest”, icon: “\u{1f4f1}” }], brandColors: [”#6C5CE7”, “#A29BFE”, “#1A1A2E”], metrics: { mrr: “$0”, users: “10K”, growth: “35% WoW”, cac: “$3” } },
{ id: 9, name: “Lyrique”, founder: “Sophie Martin”, sector: “AI / ML”, stage: “Seed”, ask: “$1M”, traction: “2K creators”, revenue: “$15K MRR”, oneliner: “AI music production for independent artists”, avatar: “\u{1f3b5}”, hot: false, founded: “2024”, city: “paris”, country: “europe”, description: “Studio-quality tracks using AI.”, businessModel: “Subscription E14.99/mo”, team: [{ name: “Sophie Martin”, role: “CEO”, bg: “Ex-Deezer” }], products: [{ name: “Lyrique Studio”, desc: “AI-powered DAW”, icon: “\u{1f3b9}” }], brandColors: [”#8B5CF6”, “#C4B5FD”, “#1A1A2E”], metrics: { mrr: “E15K”, users: “2K”, growth: “12% MoM”, cac: “E35” } },
{ id: 10, name: “SwiftHire”, founder: “Marcus Brown”, sector: “SaaS”, stage: “Pre-Seed”, ask: “$400K”, traction: “50 companies”, revenue: “$8K MRR”, oneliner: “AI recruiting for high-volume hourly hiring”, avatar: “\u{26a1}”, hot: false, founded: “2025”, city: “austin”, country: “usa”, description: “Automates screening and scheduling for hourly workers.”, businessModel: “SaaS $199/location/mo”, team: [{ name: “Marcus Brown”, role: “CEO”, bg: “Ex-Indeed” }], products: [{ name: “SwiftHire Platform”, desc: “Hourly hiring automation”, icon: “\u{1f916}” }], brandColors: [”#F59E0B”, “#FBBF24”, “#1A1A2E”], metrics: { mrr: “$8K”, users: “50”, growth: “25% MoM”, cac: “$150” } },
];

const SECTORS = [“All”, “AI / ML”, “FinTech”, “CleanTech”, “Health”, “SaaS”, “FoodTech”];
const STAGES = [“All”, “Pre-Seed”, “Seed”, “Series A”];

const AI_SYSTEM_PROMPT = ‘You are BROSKiiZZ AI, a friendly sharp startup advisor. You speak casually but with deep business knowledge. Use “broski” naturally. You are conducting a pitch interview. Ask ONE question at a time. Build on previous answers. Cover: what they do, problem, solution, business model, traction, revenue, market size, competition, team, funding ask, vision. After 8-12 exchanges say “[ANALYSIS_READY]” at the START of your message. Keep responses under 60 words.’;

const CHAT_SEED = [
{ id: 1, user: “Arjun Mehta”, avatar: “\u{1f9e0}”, badge: “NexaAI”, time: “2h ago”, msg: “Anyone with enterprise sales exp? Equity on the table.” },
{ id: 2, user: “Jessica Torres”, avatar: “\u{1f37d}”, badge: “MealMap”, time: “1h ago”, msg: “Need technical co-founder for food tech. 5K users already.” },
{ id: 3, user: “Devon Williams”, avatar: “\u{1f4b8}”, badge: “PayBroski”, time: “45m ago”, msg: “Need a designer co-founder for Gen-Z fintech.” },
{ id: 4, user: “Maya Chen”, avatar: “\u{1f33f}”, badge: “GreenLoop”, time: “30m ago”, msg: “Hit $40K MRR! Need growth co-founder for US market.” },
{ id: 5, user: “Rohit Kapoor”, avatar: “\u{1f4e6}”, badge: “QuickShip”, time: “15m ago”, msg: “Scaling to 15 Indian cities, need ops co-founder.” },
];

const STRESS_DATA = [
{ year: “2019”, stressed: 62, funded: 12 },{ year: “2020”, stressed: 78, funded: 8 },{ year: “2021”, stressed: 71, funded: 15 },{ year: “2022”, stressed: 74, funded: 11 },{ year: “2023”, stressed: 81, funded: 9 },{ year: “2024”, stressed: 85, funded: 7 },{ year: “2025”, stressed: 88, funded: 6 },
];

const globalCSS = ‘@keyframes fadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes typing{0%{opacity:.3}50%{opacity:1}100%{opacity:.3}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}@keyframes scaleIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}input:focus,textarea:focus,select:focus{outline:none}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0a0a0a}::-webkit-scrollbar-thumb{background:#333;border-radius:3px}*{box-sizing:border-box}’;

export default function App() {
const [authScreen, setAuthScreen] = useState(“login”);
const [user, setUser] = useState(null);
const [page, setPage] = useState(“home”);
const [selectedStartup, setSelectedStartup] = useState(null);
const [sectorFilter, setSectorFilter] = useState(“All”);
const [stageFilter, setStageFilter] = useState(“All”);
const [search, setSearch] = useState(””);
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
const [cityView, setCityView] = useState(“info”);
const [emailSubmitted, setEmailSubmitted] = useState(false);

const chatEndRef = useRef(null);
const cfChatEndRef = useRef(null);
const chatInputRef = useRef(null);
const cfInputRef = useRef(null);
const earlyAccessRef = useRef(null);
const loginEmailRef = useRef(null);
const loginPassRef = useRef(null);
const signupNameRef = useRef(null);
const signupEmailRef = useRef(null);
const signupPassRef = useRef(null);

const notify = (m) => { setNotif(m); setTimeout(() => setNotif(null), 2500); };
const navTo = (p) => { setPage(p); setSelectedStartup(null); setSearch(””); setSectorFilter(“All”); setStageFilter(“All”); setShowCallModal(false); setSelectedCountry(null); setSelectedCity(null); setCityView(“info”); if (p === “founder” && chatHistory.length === 0) setChatHistory([{ role: “ai”, text: “Hey broski! \u{1f44d} What’s the name of your startup?” }]); };

useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: “smooth” }); }, [chatHistory, aiTyping]);
useEffect(() => { cfChatEndRef.current?.scrollIntoView({ behavior: “smooth” }); }, [cfMessages]);

const toggleConnect = (key, label) => { setConnections(prev => { const n = { …prev }; if (n[key]) { delete n[key]; notify(“Withdrawn”); } else { n[key] = true; notify(”\u{1f91d} “ + label); } return n; }); };

// AUTH
if (authScreen) {
const isLogin = authScreen === “login”;
const handleAuth = () => {
if (isLogin) {
const email = loginEmailRef.current?.value || “”; const pass = loginPassRef.current?.value || “”;
if (!email || !pass) { notify(“Please fill in all fields”); return; }
setUser({ name: email.split(”@”)[0], email });
} else {
const name = signupNameRef.current?.value || “”; const email = signupEmailRef.current?.value || “”; const pass = signupPassRef.current?.value || “”;
if (!name || !email || !pass) { notify(“Please fill in all fields”); return; }
setUser({ name, email });
}
setAuthScreen(null); notify(“Welcome to BROSKiiZZ! \u{1f919}”);
};
return (
<div style={{ minHeight: “100vh”, background: T.bg, fontFamily: T.font, color: T.fg, display: “flex”, alignItems: “center”, justifyContent: “center”, padding: 20, position: “relative” }}>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
<style>{globalCSS}</style>
<div style={{ position: “fixed”, inset: 0, backgroundImage: “linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)”, backgroundSize: “60px 60px”, pointerEvents: “none” }} />
{notif && <div style={{ position: “fixed”, top: 16, right: 16, zIndex: 999, background: T.card, border: “1px solid “ + T.accent, padding: “10px 18px”, fontFamily: T.mono, fontSize: “0.75rem”, color: T.accent, animation: “fadeIn 0.3s” }}>{notif}</div>}
<div style={{ position: “relative”, zIndex: 1, width: “100%”, maxWidth: 420, animation: “fadeUp 0.6s” }}>
<div style={{ textAlign: “center”, marginBottom: 40 }}>
<div style={{ fontSize: “2.4rem”, fontWeight: 800, letterSpacing: -1, marginBottom: 6 }}>BROSKii<span style={{ color: T.accent }}>ZZ</span></div>
<div style={{ fontFamily: T.mono, fontSize: “0.7rem”, color: T.muted, letterSpacing: 3, textTransform: “uppercase” }}>{isLogin ? “// welcome back broski” : “// join the squad”}</div>
</div>
<div style={{ background: T.card, border: “1px solid “ + T.border, padding: “32px 28px” }}>
<div style={{ display: “flex”, marginBottom: 28, borderBottom: “1px solid “ + T.border }}>
{[“login”, “signup”].map(tab => (<button key={tab} onClick={() => setAuthScreen(tab)} style={{ flex: 1, padding: “12px 0”, background: “transparent”, border: “none”, borderBottom: authScreen === tab ? “2px solid “ + T.accent : “2px solid transparent”, color: authScreen === tab ? T.accent : T.muted, fontFamily: T.font, fontWeight: 700, fontSize: “0.9rem”, cursor: “pointer”, textTransform: “uppercase”, letterSpacing: 1.5 }}>{tab === “login” ? “Log In” : “Sign Up”}</button>))}
</div>
<div style={{ display: “flex”, flexDirection: “column”, gap: 16 }}>
{!isLogin && <div><label style={{ fontFamily: T.mono, fontSize: “0.63rem”, color: T.muted, textTransform: “uppercase”, letterSpacing: 2, display: “block”, marginBottom: 6 }}>Full Name</label><input ref={signupNameRef} defaultValue=”” placeholder=“e.g. John Doe” onKeyDown={e => e.key === “Enter” && handleAuth()} style={{ width: “100%”, background: T.bg, border: “1px solid “ + T.border, padding: “12px 14px”, color: T.fg, fontFamily: T.font, fontSize: “0.9rem” }} /></div>}
<div><label style={{ fontFamily: T.mono, fontSize: “0.63rem”, color: T.muted, textTransform: “uppercase”, letterSpacing: 2, display: “block”, marginBottom: 6 }}>Email</label><input ref={isLogin ? loginEmailRef : signupEmailRef} defaultValue=”” type=“email” placeholder=“you@email.com” onKeyDown={e => e.key === “Enter” && handleAuth()} style={{ width: “100%”, background: T.bg, border: “1px solid “ + T.border, padding: “12px 14px”, color: T.fg, fontFamily: T.font, fontSize: “0.9rem” }} /></div>
<div><label style={{ fontFamily: T.mono, fontSize: “0.63rem”, color: T.muted, textTransform: “uppercase”, letterSpacing: 2, display: “block”, marginBottom: 6 }}>Password</label><input ref={isLogin ? loginPassRef : signupPassRef} defaultValue=”” type=“password” placeholder=”……..” onKeyDown={e => e.key === “Enter” && handleAuth()} style={{ width: “100%”, background: T.bg, border: “1px solid “ + T.border, padding: “12px 14px”, color: T.fg, fontFamily: T.font, fontSize: “0.9rem” }} /></div>
<button onClick={handleAuth} style={{ width: “100%”, background: T.accent, color: T.bg, border: “none”, padding: “14px”, fontFamily: T.font, fontWeight: 700, fontSize: “0.95rem”, cursor: “pointer”, textTransform: “uppercase”, letterSpacing: 2, marginTop: 4 }}>{isLogin ? “Log In \u2192” : “Create Account \u2192”}</button>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, margin: “4px 0” }}><div style={{ flex: 1, height: 1, background: T.border }} /><span style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: “#444”, letterSpacing: 1 }}>OR</span><div style={{ flex: 1, height: 1, background: T.border }} /></div>
<button style={{ width: “100%”, background: T.bg, border: “1px solid “ + T.border, padding: “12px”, fontFamily: T.font, fontWeight: 600, fontSize: “0.85rem”, color: T.fg, cursor: “pointer”, display: “flex”, alignItems: “center”, justifyContent: “center”, gap: 10 }} onClick={() => { setUser({ name: “Google User”, email: “user@gmail.com” }); setAuthScreen(null); notify(“Welcome to BROSKiiZZ! \u{1f919}”); }}>G Continue with Google</button>
<button style={{ width: “100%”, background: T.bg, border: “1px solid “ + T.border, padding: “12px”, fontFamily: T.font, fontWeight: 600, fontSize: “0.85rem”, color: T.fg, cursor: “pointer”, display: “flex”, alignItems: “center”, justifyContent: “center”, gap: 10 }} onClick={() => { setUser({ name: “GitHub User”, email: “user@github.com” }); setAuthScreen(null); notify(“Welcome to BROSKiiZZ! \u{1f919}”); }}>\u2318 Continue with GitHub</button>
</div>
</div>
<div style={{ textAlign: “center”, marginTop: 20, fontFamily: T.mono, fontSize: “0.6rem”, color: “#444”, letterSpacing: 1 }}>{isLogin ? “Don’t have an account? “ : “Already have an account? “}<span style={{ color: T.accent, cursor: “pointer” }} onClick={() => setAuthScreen(isLogin ? “signup” : “login”)}>{isLogin ? “Sign up” : “Log in”}</span></div>
</div>
</div>
);
}

// CHAT HANDLER - tries live Claude API first, falls back to predefined
const handleChatSend = async () => {
const val = chatInputRef.current?.value || “”;
if (!val.trim() || aiTyping) return;
const answer = val.trim();
if (chatInputRef.current) chatInputRef.current.value = “”;
const newHistory = […chatHistory, { role: “user”, text: answer }];
setChatHistory(newHistory);
setChatAnswers(a => ({ …a, [“q” + chatStep]: answer }));
setAiTyping(true);
const step = chatStep;

```
// Try live API
try {
  const apiM = [];
  let ff = false;
  for (const m of newHistory) { if (m.role === "user") ff = true; if (!ff) continue; const r = m.role === "ai" ? "assistant" : "user"; if (apiM.length > 0 && apiM[apiM.length - 1].role === r) apiM[apiM.length - 1].content += "\n" + m.text; else apiM.push({ role: r, content: m.text }); }
  const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ system: AI_SYSTEM_PROMPT + '\nYou already asked: "Hey broski! What is the name of your startup?". Continue.', messages: apiM }) });
  const d = await res.json();
  if (d.content && d.content.length > 0) {
    const t = d.content.map(b => b.text || "").join("");
    if (t.includes("[ANALYSIS_READY]")) {
      const clean = t.replace("[ANALYSIS_READY]", "").trim();
      setChatHistory(h => [...h, { role: "ai", text: clean + "\n\n\u{1f525} Generating your analysis..." }]);
      setChatStep(s => s + 1); setAiTyping(false);
      setTimeout(() => doAnalysis(newHistory, clean), 1500);
      return;
    }
    setChatHistory(h => [...h, { role: "ai", text: t }]);
    setChatStep(s => s + 1); setAiTyping(false);
    return;
  }
} catch (e) { /* fall through to predefined */ }

// Predefined fallback
const questions = [
  "Nice, " + answer + "! \u{1f525} Love the name. Give me your one-liner \u2014 what does " + answer + " do in one sentence?",
  "Interesting! What sector does this fall into? (AI, FinTech, Health, SaaS, CleanTech, EdTech, etc.)",
  "Got it. Now the important part \u2014 what problem are you solving and who has this pain?",
  "That's a real problem, broski. How does your product actually solve it?",
  "Makes sense. How do you make money? What's the business model and pricing?",
  "Smart. What traction do you have so far? Users, revenue, waitlist?",
  "What's the current monthly revenue? (Zero is totally fine)",
  "Good to know. How big is the market opportunity?",
  "Who are your main competitors and what makes you different?",
  "Tell me about the founding team. Who's building this?",
  "Almost there! How much are you raising and at what stage?",
  "Last one \u2014 what's the 5-year vision if everything goes right?",
];
const delay = 600 + Math.random() * 500;
setTimeout(() => {
  if (step < questions.length) {
    setChatHistory(h => [...h, { role: "ai", text: questions[step] }]);
    setChatStep(s => s + 1);
  } else {
    setChatHistory(h => [...h, { role: "ai", text: "That's everything! \u{1f525} Generating your analysis..." }]);
    setChatStep(s => s + 1);
    setTimeout(() => buildLocalAnalysis(step, answer), 1500);
  }
  setAiTyping(false);
}, delay);
```

};

const doAnalysis = async (history, lastAiText) => {
try {
const convo = […history, { role: “ai”, text: lastAiText }].map(m => (m.role === “ai” ? “AI” : “Founder”) + “: “ + m.text).join(”\n”);
const res = await fetch(”/api/chat”, { method: “POST”, headers: { “Content-Type”: “application/json” }, body: JSON.stringify({ messages: [{ role: “user”, content: ‘Based on this pitch interview, return ONLY valid JSON (no backticks):\n\n’ + convo + ‘\n\nJSON: {“score”:<0-100>,“label”:”<label>”,“breakdown”:[{“label”:“Problem”,“score”:<0-10>,“max”:10},{“label”:“Solution”,“score”:<0-10>,“max”:10},{“label”:“Business Model”,“score”:<0-12>,“max”:12},{“label”:“Traction”,“score”:<0-15>,“max”:15},{“label”:“Revenue”,“score”:<0-15>,“max”:15},{“label”:“Market”,“score”:<0-8>,“max”:8},{“label”:“Competition”,“score”:<0-8>,“max”:8},{“label”:“Team”,“score”:<0-7>,“max”:7},{“label”:“Funding”,“score”:<0-5>,“max”:5},{“label”:“Vision”,“score”:<0-10>,“max”:10}],“recommendations”:[“t1”,“t2”,“t3”,“t4”],“summary”:{“name”:“x”,“sector”:“x”,“revenue”:“x”,“raising”:“x”,“model”:“x”,“traction”:“x”}}’ }] }) });
const d = await res.json();
const txt = d.content?.map(b => b.text || “”).join(””) || “”;
const analysis = JSON.parse(txt.replace(/`json|`/g, “”).trim());
setChatAnswers(analysis); setShowAnalysis(true);
} catch (e) { buildLocalAnalysis(chatStep, “”); }
};

const buildLocalAnalysis = (step, answer) => {
const answers = { …chatAnswers, [“q” + step]: answer };
let score = 0; const vals = Object.values(answers);
vals.forEach(v => { if (typeof v === “string” && v.length > 30) score += 7; else if (typeof v === “string” && v.length > 10) score += 4; else if (v) score += 2; });
score = Math.min(Math.round(score * 100 / (Math.max(vals.length, 1) * 7)), 100);
const name = answers.q0 || “Your Startup”; const sector = answers.q2 || “TBD”;
setChatAnswers({
score, label: score >= 80 ? “Investor Ready \u{1f525}” : score >= 60 ? “Almost There \u{1f4aa}” : score >= 40 ? “Needs Work \u{1f6e0}” : “Early Stage \u{1f331}”,
breakdown: [{ label: “Problem”, score: Math.min(Math.round((answers.q3?.length || 0) / 15), 10), max: 10 }, { label: “Solution”, score: Math.min(Math.round((answers.q4?.length || 0) / 15), 10), max: 10 }, { label: “Business Model”, score: Math.min(Math.round((answers.q5?.length || 0) / 12), 12), max: 12 }, { label: “Traction”, score: Math.min(Math.round((answers.q6?.length || 0) / 10), 15), max: 15 }, { label: “Revenue”, score: answers.q7 && !answers.q7.includes(“0”) ? 12 : 4, max: 15 }, { label: “Market”, score: Math.min(Math.round((answers.q8?.length || 0) / 12), 8), max: 8 }, { label: “Competition”, score: Math.min(Math.round((answers.q9?.length || 0) / 15), 8), max: 8 }, { label: “Team”, score: Math.min(Math.round((answers.q10?.length || 0) / 12), 7), max: 7 }, { label: “Funding”, score: answers.q11 ? 4 : 1, max: 5 }, { label: “Vision”, score: Math.min(Math.round((answers.q12?.length || 0) / 12), 10), max: 10 }],
recommendations: [answers.q7?.includes(“0”) ? “\u{1f3af} Get to first revenue ASAP” : “\u{1f4b0} Lead with revenue numbers”, answers.q6?.length > 20 ? “\u{1f4ca} Quantify growth rates” : “\u{1f4ca} Beef up traction with numbers”, answers.q9?.length > 30 ? “\u2694 Make differentiation defensible” : “\u2694 Research competitors deeper”, “\u{1f91d} Your pitch is now live on BROSKiiZZ!”],
summary: { name, sector, revenue: answers.q7 || “TBD”, raising: answers.q11 || “TBD”, model: answers.q5 || “TBD”, traction: answers.q6 || “TBD” },
});
setShowAnalysis(true);
};

const handleCfSend = () => { const val = cfInputRef.current?.value || “”; if (!val.trim()) return; setCfMessages(m => […m, { id: Date.now(), user: “You”, avatar: “\u{1f60e}”, badge: “New Founder”, time: “now”, msg: val.trim() }]); if (cfInputRef.current) cfInputRef.current.value = “”; };

const calcScore = () => chatAnswers.score || 50;
const getScoreLabel = (s) => chatAnswers.label || (s >= 80 ? “Investor Ready” : s >= 60 ? “Almost There” : s >= 40 ? “Needs Work” : “Early Stage”);
const getScoreColor = (s) => s >= 80 ? T.accent : s >= 60 ? “#FFEAA7” : s >= 40 ? T.accent2 : T.muted;
const getFiltered = (cityId, countryId) => STARTUPS.filter(s => { if (cityId && s.city !== cityId) return false; if (countryId && !cityId && s.country !== countryId) return false; if (sectorFilter !== “All” && s.sector !== sectorFilter) return false; if (stageFilter !== “All” && s.stage !== stageFilter) return false; if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.oneliner.toLowerCase().includes(search.toLowerCase())) return false; return true; });
const filtered = getFiltered(null, null);

// Shared UI
const Nav = () => (<nav style={{ position: “sticky”, top: 0, zIndex: 100, display: “flex”, justifyContent: “space-between”, alignItems: “center”, padding: “12px 20px”, backdropFilter: “blur(20px)”, background: “rgba(10,10,10,0.85)”, borderBottom: “1px solid “ + T.border }}><div style={{ fontSize: “1.3rem”, fontWeight: 800, letterSpacing: -1, cursor: “pointer”, fontFamily: T.font }} onClick={() => navTo(“home”)}>BROSKii<span style={{ color: T.accent }}>ZZ</span></div><div style={{ display: “flex”, gap: 4, flexWrap: “wrap”, alignItems: “center” }}>{[{ k: “home”, l: “Home” }, { k: “founder”, l: “Pitch” }, { k: “investor”, l: “Invest” }, { k: “cofounder”, l: “Co-Found” }].map(n => (<button key={n.k} onClick={() => navTo(n.k)} style={{ background: page === n.k ? T.accent + “15” : “transparent”, border: page === n.k ? “1px solid “ + T.accent + “44” : “1px solid transparent”, color: page === n.k ? T.accent : T.muted, padding: “6px 12px”, cursor: “pointer”, fontFamily: T.mono, fontSize: “0.65rem”, textTransform: “uppercase”, letterSpacing: 1.5 }}>{n.l}</button>))}{user && <button onClick={() => { setAuthScreen(“login”); setUser(null); notify(“Logged out”); }} style={{ background: T.accent + “12”, border: “1px solid “ + T.accent + “33”, color: T.accent, padding: “6px 12px”, cursor: “pointer”, fontFamily: T.mono, fontSize: “0.6rem”, letterSpacing: 1, marginLeft: 4, display: “flex”, alignItems: “center”, gap: 6 }}><span style={{ width: 18, height: 18, borderRadius: “50%”, background: T.accent + “33”, display: “inline-flex”, alignItems: “center”, justifyContent: “center”, fontSize: “0.55rem”, fontWeight: 800 }}>{user.name[0].toUpperCase()}</span>{user.name}</button>}</div></nav>);
const GridBg = () => <div style={{ position: “fixed”, inset: 0, backgroundImage: “linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)”, backgroundSize: “60px 60px”, pointerEvents: “none”, zIndex: 0 }} />;
const Toast = () => notif ? <div style={{ position: “fixed”, top: 14, right: 14, zIndex: 999, background: T.card, border: “1px solid “ + T.accent, padding: “10px 18px”, fontFamily: T.mono, fontSize: “0.75rem”, color: T.accent, animation: “fadeIn 0.3s” }}>{notif}</div> : null;
const Pill = ({ label, active, onClick, color = T.accent }) => (<button onClick={onClick} style={{ background: active ? color + “18” : T.card, border: “1px solid “ + (active ? color : T.border), color: active ? color : T.muted, padding: “5px 12px”, cursor: “pointer”, fontFamily: T.mono, fontSize: “0.63rem”, letterSpacing: 1, whiteSpace: “nowrap” }}>{label}</button>);
const Shell = ({ children }) => (<div style={{ minHeight: “100vh”, background: T.bg, fontFamily: T.font, color: T.fg }}><link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" /><style>{globalCSS}</style><GridBg /><Nav /><Toast />{children}</div>);
const Tag = ({ children, color = T.accent }) => <div style={{ fontFamily: T.mono, fontSize: “0.68rem”, color, textTransform: “uppercase”, letterSpacing: 3, marginBottom: 8 }}>{children}</div>;
const StartupCard = ({ s, i, accentC = T.accent2 }) => (<div onClick={() => { setPage(“investor”); setSelectedStartup(s.id); }} style={{ background: T.card, border: “1px solid “ + T.border, padding: “22px 20px”, cursor: “pointer”, transition: “all 0.3s”, position: “relative”, overflow: “hidden”, animation: “fadeUp 0.4s “ + (i * 0.05) + “s both” }} onMouseEnter={e => { e.currentTarget.style.borderColor = accentC; e.currentTarget.style.transform = “translateY(-3px)”; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = “translateY(0)”; }}>{s.hot && <div style={{ position: “absolute”, top: 0, right: 0, background: T.accent2, color: “#fff”, fontFamily: T.mono, fontSize: “0.5rem”, padding: “2px 8px”, letterSpacing: 1 }}>HOT \u{1f525}</div>}<div style={{ display: “flex”, gap: 12, alignItems: “center”, marginBottom: 12 }}><div style={{ width: 40, height: 40, background: accentC + “12”, border: “1px solid “ + accentC + “25”, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: “1.3rem” }}>{s.avatar}</div><div><div style={{ fontSize: “1.05rem”, fontWeight: 700 }}>{s.name}</div><div style={{ fontFamily: T.mono, fontSize: “0.63rem”, color: T.muted }}>{s.founder}</div></div></div><p style={{ color: “#bbb”, fontSize: “0.84rem”, lineHeight: 1.45, marginBottom: 12 }}>{s.oneliner}</p><div style={{ display: “flex”, gap: 8, flexWrap: “wrap”, fontFamily: T.mono, fontSize: “0.62rem”, color: T.muted }}><span style={{ background: T.bg, padding: “2px 8px”, border: “1px solid “ + T.border }}>{s.sector}</span><span style={{ background: T.bg, padding: “2px 8px”, border: “1px solid “ + T.border }}>{s.stage}</span><span style={{ background: T.bg, padding: “2px 8px”, border: “1px solid “ + T.border }}>{s.ask}</span></div><div style={{ fontFamily: T.mono, fontSize: “0.63rem”, color: accentC, marginTop: 10, opacity: 0.6 }}>View profile \u2192</div></div>);

// HOME
if (page === “home”) {
return (<Shell>
<section style={{ position: “relative”, zIndex: 1, minHeight: “85vh”, display: “flex”, flexDirection: “column”, justifyContent: “center”, padding: “70px 28px”, maxWidth: 1200, margin: “0 auto” }}>
<div style={{ fontFamily: T.mono, fontSize: “0.72rem”, color: T.accent, textTransform: “uppercase”, letterSpacing: 4, marginBottom: 18, animation: “fadeUp 0.8s 0.2s both” }}>// where business meets brotherhood</div>
<h1 style={{ fontSize: “clamp(2.5rem, 8vw, 6.5rem)”, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, marginBottom: 24, animation: “fadeUp 0.8s 0.4s both” }}>Find your<br /><span style={{ color: T.accent, position: “relative”, display: “inline-block” }}>business broski<span style={{ position: “absolute”, bottom: 3, left: 0, right: 0, height: 5, background: T.accent, opacity: 0.25, transform: “skewX(-12deg)” }} /></span></h1>
<p style={{ fontSize: “clamp(0.9rem, 1.6vw, 1.15rem)”, color: T.muted, maxWidth: 520, lineHeight: 1.7, marginBottom: 36, animation: “fadeUp 0.8s 0.6s both” }}>BROSKiiZZ connects founders with investors and co-founders who actually get your vision. AI-powered onboarding. Real connections.</p>
<div style={{ display: “flex”, gap: 10, flexWrap: “wrap”, animation: “fadeUp 0.8s 0.8s both” }}>
{[{ p: “founder”, l: “I’m a Founder \u2192”, c: T.accent, isBg: true }, { p: “investor”, l: “I’m an Investor \u2192”, c: T.accent2 }, { p: “cofounder”, l: “Find Co-Founder \u2192”, c: T.accent3 }].map(b => (<button key={b.p} onClick={() => navTo(b.p)} style={{ background: b.isBg ? T.accent : “transparent”, color: b.isBg ? T.bg : T.fg, padding: “14px 28px”, border: b.isBg ? “none” : “2px solid “ + T.border, fontFamily: T.font, fontWeight: 700, fontSize: “0.85rem”, cursor: “pointer”, textTransform: “uppercase”, letterSpacing: 1.5, transition: “all 0.3s” }} onMouseEnter={e => { e.currentTarget.style.transform = “translateY(-3px)”; if (!b.isBg) { e.currentTarget.style.borderColor = b.c; e.currentTarget.style.color = b.c; } }} onMouseLeave={e => { e.currentTarget.style.transform = “translateY(0)”; if (!b.isBg) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.fg; } }}>{b.l}</button>))}
</div>
</section>
<div style={{ position: “relative”, zIndex: 1, borderTop: “1px solid “ + T.border, borderBottom: “1px solid “ + T.border, padding: “32px 28px”, display: “grid”, gridTemplateColumns: “repeat(4, 1fr)”, gap: 12, maxWidth: 1200, margin: “0 auto” }}>{[{ n: “500+”, l: “Founders” }, { n: “120+”, l: “Investors” }, { n: “$4.2M”, l: “Connected” }, { n: “89%”, l: “Match Rate” }].map((s, i) => (<div key={i} style={{ textAlign: “center” }}><div style={{ fontSize: “clamp(1.5rem, 3vw, 2.5rem)”, fontWeight: 800, color: T.accent, letterSpacing: -2 }}>{s.n}</div><div style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.muted, textTransform: “uppercase”, letterSpacing: 2 }}>{s.l}</div></div>))}</div>
<section style={{ position: “relative”, zIndex: 1, padding: “80px 28px”, maxWidth: 1200, margin: “0 auto” }}>
<Tag>// explore by region</Tag>
<h2 style={{ fontSize: “clamp(1.8rem, 4vw, 3rem)”, fontWeight: 800, letterSpacing: -2, marginBottom: 32 }}>Choose your <span style={{ color: T.accent3 }}>market</span></h2>
<div style={{ display: “grid”, gridTemplateColumns: “repeat(3, 1fr)”, gap: 16 }}>{Object.entries(COUNTRIES).map(([key, c]) => { const count = STARTUPS.filter(s => s.country === key).length; return (<button key={key} onClick={() => { setSelectedCountry(key); setPage(“countryMap”); }} style={{ background: T.card, border: “2px solid “ + T.border, padding: “36px 20px”, cursor: “pointer”, transition: “all 0.4s”, textAlign: “center”, display: “flex”, flexDirection: “column”, alignItems: “center”, gap: 12 }} onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.transform = “translateY(-6px)”; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = “translateY(0)”; }}><span style={{ fontSize: “3rem” }}>{c.flag}</span><span style={{ fontFamily: T.font, fontWeight: 800, fontSize: “1.4rem”, color: T.fg }}>{c.name}</span><span style={{ fontFamily: T.mono, fontSize: “0.68rem”, color: c.color }}>{c.cities.length} cities \u00b7 {count} startups</span></button>); })}</div>
</section>
<div style={{ position: “relative”, zIndex: 1, overflow: “hidden”, borderTop: “1px solid “ + T.border, borderBottom: “1px solid “ + T.border, padding: “18px 0” }}><div style={{ display: “flex”, gap: 40, animation: “scroll 20s linear infinite”, width: “max-content” }}>{Array(4).fill([“FOUNDERS”, “INVESTORS”, “CO-FOUNDERS”, “BUSINESS BROSKiiZZ”]).flat().map((t, i) => (<div key={i} style={{ fontSize: “clamp(1rem, 2vw, 1.6rem)”, fontWeight: 800, whiteSpace: “nowrap”, color: “#1a1a1a”, letterSpacing: -1, display: “flex”, alignItems: “center”, gap: 12 }}>{t} <span style={{ color: T.accent, fontSize: “0.6em” }}>\u2726</span></div>))}</div></div>
<footer style={{ position: “relative”, zIndex: 1, padding: “28px”, textAlign: “center” }}><div style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: “#333”, letterSpacing: 1 }}>\u00a9 2026 BROSKiiZZ</div></footer>
</Shell>);
}

// COUNTRY MAP
if (page === “countryMap” && selectedCountry) {
const country = COUNTRIES[selectedCountry];
return (<Shell><div style={{ position: “relative”, zIndex: 1, maxWidth: 900, margin: “0 auto”, padding: “32px 20px 60px” }}>
<button onClick={() => { setSelectedCountry(null); setPage(“home”); }} style={{ background: “transparent”, border: “none”, color: T.muted, fontFamily: T.mono, fontSize: “0.72rem”, cursor: “pointer”, padding: “8px 0”, marginBottom: 16 }}>\u2190 Back</button>
<Tag color={country.color}>// explore {country.name.toLowerCase()}</Tag>
<h1 style={{ fontSize: “clamp(2rem, 5vw, 3rem)”, fontWeight: 800, letterSpacing: -2, marginBottom: 24 }}>{country.flag} {country.name}</h1>
<div style={{ display: “grid”, gridTemplateColumns: “repeat(auto-fill, minmax(250px, 1fr))”, gap: 12 }}>{country.cities.map((city, i) => { const count = STARTUPS.filter(s => s.city === city.id).length; return (<div key={city.id} onClick={() => { setSelectedCity(city.id); setCityView(“info”); setPage(“cityExplore”); }} style={{ background: T.card, border: “1px solid “ + T.border, padding: “18px 16px”, cursor: “pointer”, transition: “all 0.3s”, animation: “fadeUp 0.4s “ + (i * 0.06) + “s both” }} onMouseEnter={e => { e.currentTarget.style.borderColor = country.color; e.currentTarget.style.transform = “translateY(-3px)”; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = “translateY(0)”; }}><div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 8 }}><span style={{ fontWeight: 700, fontSize: “1rem” }}>{city.name}</span><span style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: country.color, background: country.color + “12”, padding: “2px 8px”, border: “1px solid “ + country.color + “33” }}>{count} startups</span></div><div style={{ fontFamily: T.mono, fontSize: “0.65rem”, color: T.muted, lineHeight: 1.5 }}>{city.industries}</div></div>); })}</div>
</div></Shell>);
}

// CITY EXPLORE
if (page === “cityExplore” && selectedCountry && selectedCity) {
const country = COUNTRIES[selectedCountry]; const city = country.cities.find(c => c.id === selectedCity); const cityStartups = getFiltered(selectedCity, selectedCountry);
if (cityView === “businesses”) { return (<Shell><div style={{ position: “relative”, zIndex: 1, maxWidth: 1100, margin: “0 auto”, padding: “32px 20px 60px” }}><button onClick={() => setCityView(“info”)} style={{ background: “transparent”, border: “none”, color: T.muted, fontFamily: T.mono, fontSize: “0.72rem”, cursor: “pointer”, padding: “8px 0”, marginBottom: 16 }}>\u2190 Back</button><Tag color={country.color}>// {city.name} businesses</Tag><h1 style={{ fontSize: “clamp(1.6rem, 4vw, 2.5rem)”, fontWeight: 800, letterSpacing: -2, marginBottom: 24 }}>Startups in {city.name}</h1>{cityStartups.length === 0 ? <div style={{ textAlign: “center”, padding: 60, color: T.muted }}>No startups yet. <span style={{ color: T.accent, cursor: “pointer” }} onClick={() => navTo(“founder”)}>Be the first \u2192</span></div> : <div style={{ display: “grid”, gridTemplateColumns: “repeat(auto-fill, minmax(300px, 1fr))”, gap: 14 }}>{cityStartups.map((s, i) => <StartupCard key={s.id} s={s} i={i} accentC={country.color} />)}</div>}</div></Shell>); }
return (<Shell><div style={{ position: “relative”, zIndex: 1, maxWidth: 800, margin: “0 auto”, padding: “32px 20px 60px” }}>
<button onClick={() => { setSelectedCity(null); setPage(“countryMap”); }} style={{ background: “transparent”, border: “none”, color: T.muted, fontFamily: T.mono, fontSize: “0.72rem”, cursor: “pointer”, padding: “8px 0”, marginBottom: 16 }}>\u2190 Back</button>
<Tag color={country.color}>// market intelligence</Tag>
<h1 style={{ fontSize: “clamp(2rem, 5vw, 3rem)”, fontWeight: 800, letterSpacing: -2, marginBottom: 6 }}>{city.name} <span style={{ color: country.color }}>{country.flag}</span></h1>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 12, margin: “24px 0” }}>{[{ l: “Population”, v: city.population }, { l: “GDP”, v: city.gdp }].map(m => (<div key={m.l} style={{ background: T.card, border: “1px solid “ + T.border, padding: 20, textAlign: “center” }}><div style={{ fontSize: “1.6rem”, fontWeight: 800, color: country.color }}>{m.v}</div><div style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.muted, letterSpacing: 2, marginTop: 4 }}>{m.l}</div></div>))}</div>
<div style={{ background: T.card, border: “1px solid “ + T.border, padding: 24, marginBottom: 16 }}><div style={{ fontFamily: T.mono, fontSize: “0.63rem”, color: country.color, letterSpacing: 2, marginBottom: 10 }}>INDUSTRIES</div><div style={{ display: “flex”, gap: 8, flexWrap: “wrap” }}>{city.industries.split(”, “).map(ind => (<span key={ind} style={{ fontFamily: T.mono, fontSize: “0.7rem”, color: T.fg, background: country.color + “12”, padding: “6px 14px”, border: “1px solid “ + country.color + “33” }}>{ind}</span>))}</div></div>
<div style={{ background: T.card, border: “1px solid “ + T.border, padding: 24, marginBottom: 24 }}><div style={{ fontFamily: T.mono, fontSize: “0.63rem”, color: country.color, letterSpacing: 2, marginBottom: 10 }}>MARKET OVERVIEW</div><p style={{ color: “#ccc”, lineHeight: 1.65, fontSize: “0.9rem” }}>{city.marketInfo}</p></div>
<button onClick={() => setCityView(“businesses”)} style={{ width: “100%”, background: country.color, color: T.bg, border: “none”, padding: “16px”, fontFamily: T.font, fontWeight: 700, fontSize: “0.95rem”, cursor: “pointer”, textTransform: “uppercase”, letterSpacing: 2 }}>Explore Businesses in {city.name} \u2192</button>
</div></Shell>);
}

// FOUNDER PITCH
if (page === “founder”) {
return (<Shell><div style={{ position: “relative”, zIndex: 1, maxWidth: 720, margin: “0 auto”, padding: “24px 16px 0”, display: “flex”, flexDirection: “column”, height: “calc(100vh - 53px)” }}>
<div style={{ padding: “12px 0 16px”, borderBottom: “1px solid “ + T.border, marginBottom: 16, flexShrink: 0 }}>
<Tag>// ai pitch builder</Tag>
<h2 style={{ fontSize: “1.4rem”, fontWeight: 800, letterSpacing: -1 }}>Tell us about your startup</h2>
<p style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.muted, marginTop: 6 }}>Powered by <span style={{ color: T.accent3, fontWeight: 700 }}>Claude AI</span> \u2014 live conversation</p>
{!showAnalysis && <div style={{ marginTop: 10, background: T.card, border: “1px solid “ + T.border, height: 6, borderRadius: 3, overflow: “hidden” }}><div style={{ height: “100%”, background: T.accent, width: Math.min((chatStep / 12) * 100, 100) + “%”, transition: “width 0.5s”, borderRadius: 3 }} /></div>}
</div>
{!showAnalysis ? (<>
<div style={{ flex: 1, overflowY: “auto”, paddingRight: 8 }}>
{chatHistory.map((m, i) => (<div key={i} style={{ display: “flex”, justifyContent: m.role === “user” ? “flex-end” : “flex-start”, marginBottom: 12, animation: “fadeIn 0.3s” }}><div style={{ maxWidth: “80%”, padding: “12px 16px”, background: m.role === “user” ? T.accent + “15” : T.card, border: “1px solid “ + (m.role === “user” ? T.accent + “33” : T.border), fontSize: “0.88rem”, lineHeight: 1.55 }}>{m.role === “ai” && <div style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.accent, marginBottom: 6, letterSpacing: 1 }}>BROSKii AI</div>}{m.text}</div></div>))}
{aiTyping && <div style={{ display: “flex”, marginBottom: 12 }}><div style={{ background: T.card, border: “1px solid “ + T.border, padding: “12px 20px”, display: “flex”, gap: 6 }}>{[0, 1, 2].map(d => <div key={d} style={{ width: 7, height: 7, borderRadius: “50%”, background: T.accent, animation: “typing 1s “ + (d * 0.2) + “s infinite” }} />)}</div></div>}
<div ref={chatEndRef} />
</div>
<div style={{ flexShrink: 0, padding: “12px 0 16px”, borderTop: “1px solid “ + T.border, display: “flex”, gap: 8 }}>
<input ref={chatInputRef} defaultValue=”” onKeyDown={e => e.key === “Enter” && handleChatSend()} placeholder=“Type your answer…” disabled={showAnalysis || aiTyping} style={{ flex: 1, background: T.card, border: “1px solid “ + T.border, padding: “12px 16px”, color: T.fg, fontFamily: T.font, fontSize: “0.9rem” }} />
<button onClick={handleChatSend} style={{ background: T.accent, color: T.bg, border: “none”, padding: “12px 20px”, fontFamily: T.font, fontWeight: 700, cursor: “pointer” }}>SEND</button>
</div>
</>) : (
<div style={{ flex: 1, overflowY: “auto”, paddingBottom: 40, animation: “fadeUp 0.6s” }}>
{(() => { const score = calcScore(); const color = getScoreColor(score); return (<div style={{ textAlign: “center”, padding: “32px 0 24px” }}><div style={{ fontSize: “4rem”, fontWeight: 800, color, letterSpacing: -3 }}>{score}</div><div style={{ fontFamily: T.mono, fontSize: “0.75rem”, color, letterSpacing: 2, textTransform: “uppercase” }}>{getScoreLabel(score)}</div><div style={{ fontFamily: T.mono, fontSize: “0.65rem”, color: T.muted, marginTop: 6 }}>INVESTOR READINESS SCORE</div></div>); })()}
<div style={{ background: T.card, border: “1px solid “ + T.border, padding: 20, marginBottom: 16 }}>
<div style={{ fontFamily: T.mono, fontSize: “0.65rem”, color: T.accent, letterSpacing: 2, marginBottom: 14 }}>BREAKDOWN</div>
{(chatAnswers.breakdown || []).map(it => (<div key={it.label} style={{ marginBottom: 10 }}><div style={{ display: “flex”, justifyContent: “space-between”, marginBottom: 4 }}><span style={{ fontSize: “0.78rem”, color: T.muted }}>{it.label}</span><span style={{ fontFamily: T.mono, fontSize: “0.68rem” }}>{it.score}/{it.max}</span></div><div style={{ background: T.bg, height: 5, borderRadius: 3, overflow: “hidden” }}><div style={{ height: “100%”, background: it.score === it.max ? T.accent : it.score > 0 ? “#FFEAA7” : T.accent2, width: (it.score / it.max) * 100 + “%”, borderRadius: 3 }} /></div></div>))}
</div>
{chatAnswers.summary && <div style={{ background: T.card, border: “1px solid “ + T.border, padding: 20, marginBottom: 16 }}><div style={{ fontFamily: T.mono, fontSize: “0.65rem”, color: T.accent, letterSpacing: 2, marginBottom: 14 }}>SNAPSHOT</div><div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 10 }}>{Object.entries(chatAnswers.summary).map(([k, v]) => (<div key={k} style={{ background: T.bg, border: “1px solid “ + T.border, padding: 12 }}><div style={{ fontFamily: T.mono, fontSize: “0.58rem”, color: T.muted, letterSpacing: 1, marginBottom: 3, textTransform: “uppercase” }}>{k}</div><div style={{ fontSize: “0.83rem”, color: T.fg, lineHeight: 1.4 }}>{v}</div></div>))}</div></div>}
{chatAnswers.recommendations && <div style={{ background: T.card, border: “1px solid “ + T.border, padding: 20, marginBottom: 16 }}><div style={{ fontFamily: T.mono, fontSize: “0.65rem”, color: T.accent, letterSpacing: 2, marginBottom: 14 }}>RECOMMENDATIONS</div>{chatAnswers.recommendations.map((tip, i) => (<div key={i} style={{ padding: “10px 0”, borderBottom: i < chatAnswers.recommendations.length - 1 ? “1px solid “ + T.border : “none”, fontSize: “0.85rem”, color: “#ccc”, lineHeight: 1.5 }}>{tip}</div>))}</div>}
<button onClick={() => navTo(“investor”)} style={{ width: “100%”, background: T.accent, color: T.bg, border: “none”, padding: “14px”, fontFamily: T.font, fontWeight: 700, cursor: “pointer”, textTransform: “uppercase”, letterSpacing: 1.5 }}>See Your Listing \u2192</button>
</div>
)}
</div></Shell>);
}

// INVESTOR
if (page === “investor”) {
if (selectedStartup) {
const s = STARTUPS.find(x => x.id === selectedStartup); if (!s) return null;
const isConn = connections[“s-” + s.id];
return (<Shell>
{showCallModal && (<div style={{ position: “fixed”, inset: 0, background: “rgba(0,0,0,0.7)”, zIndex: 200, display: “flex”, alignItems: “center”, justifyContent: “center”, padding: 20 }} onClick={() => setShowCallModal(false)}><div style={{ background: T.card, border: “1px solid “ + T.border, padding: 32, maxWidth: 420, width: “100%”, animation: “scaleIn 0.3s” }} onClick={e => e.stopPropagation()}><div style={{ fontFamily: T.mono, fontSize: “0.65rem”, color: T.accent, letterSpacing: 2, marginBottom: 12 }}>BOOK A CALL</div><h3 style={{ fontSize: “1.2rem”, fontWeight: 700, marginBottom: 16 }}>Schedule with {s.founder}</h3><input placeholder=“Your name” style={{ width: “100%”, background: T.bg, border: “1px solid “ + T.border, padding: “10px 14px”, color: T.fg, fontFamily: T.font, fontSize: “0.85rem”, marginBottom: 10 }} /><input placeholder=“Your email” style={{ width: “100%”, background: T.bg, border: “1px solid “ + T.border, padding: “10px 14px”, color: T.fg, fontFamily: T.font, fontSize: “0.85rem”, marginBottom: 10 }} /><select style={{ width: “100%”, background: T.bg, border: “1px solid “ + T.border, padding: “10px 14px”, color: T.fg, fontFamily: T.font, fontSize: “0.85rem”, marginBottom: 16, cursor: “pointer” }}><option>Select time…</option><option>Tomorrow, 10 AM</option><option>Tomorrow, 2 PM</option><option>Wednesday, 11 AM</option></select><button onClick={() => { setShowCallModal(false); notify(”\u{1f4de} Call booked!”); }} style={{ width: “100%”, background: T.accent, color: T.bg, border: “none”, padding: “12px”, fontFamily: T.font, fontWeight: 700, cursor: “pointer”, textTransform: “uppercase”, letterSpacing: 1 }}>Confirm \u2192</button></div></div>)}
<div style={{ position: “relative”, zIndex: 1, maxWidth: 900, margin: “0 auto”, padding: “24px 20px 60px” }}>
<button onClick={() => setSelectedStartup(null)} style={{ background: “transparent”, border: “none”, color: T.muted, fontFamily: T.mono, fontSize: “0.72rem”, cursor: “pointer”, padding: “8px 0”, marginBottom: 16 }}>\u2190 Back</button>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “start”, marginBottom: 20, flexWrap: “wrap”, gap: 16, animation: “fadeUp 0.4s” }}><div style={{ display: “flex”, gap: 14, alignItems: “center” }}><div style={{ width: 56, height: 56, background: T.accent2 + “15”, border: “1px solid “ + T.accent2 + “33”, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: “1.8rem” }}>{s.avatar}</div><div><h1 style={{ fontSize: “1.6rem”, fontWeight: 800, letterSpacing: -1 }}>{s.name}</h1><div style={{ fontFamily: T.mono, fontSize: “0.7rem”, color: T.muted }}>{s.founder} \u00b7 {s.founded}</div></div></div><div style={{ display: “flex”, gap: 6 }}><span style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.accent2, background: T.accent2 + “12”, padding: “4px 10px”, border: “1px solid “ + T.accent2 + “33” }}>{s.stage}</span><span style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.accent, background: T.accent + “12”, padding: “4px 10px”, border: “1px solid “ + T.accent + “33” }}>{s.sector}</span></div></div>
<p style={{ fontSize: “1.05rem”, lineHeight: 1.6, color: “#ddd”, marginBottom: 24, fontWeight: 600 }}>{s.oneliner}</p>
<div style={{ display: “flex”, gap: 8, marginBottom: 24 }}>{s.brandColors.map((c, i) => (<div key={i} style={{ display: “flex”, alignItems: “center”, gap: 6, background: T.card, border: “1px solid “ + T.border, padding: “5px 10px” }}><div style={{ width: 14, height: 14, background: c }} /><span style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.muted }}>{c}</span></div>))}</div>
<div style={{ background: T.card, border: “1px solid “ + T.border, padding: 20, marginBottom: 14 }}><div style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.accent, letterSpacing: 2, marginBottom: 8 }}>ABOUT</div><p style={{ color: “#ccc”, lineHeight: 1.6, fontSize: “0.88rem” }}>{s.description}</p><div style={{ marginTop: 10, fontFamily: T.mono, fontSize: “0.72rem”, color: T.accent2 }}>Model: <span style={{ color: “#ccc” }}>{s.businessModel}</span></div></div>
<div style={{ background: T.card, border: “1px solid “ + T.border, padding: 20, marginBottom: 14 }}><div style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.accent, letterSpacing: 2, marginBottom: 12 }}>METRICS</div><div style={{ display: “grid”, gridTemplateColumns: “repeat(auto-fit, minmax(110px, 1fr))”, gap: 8 }}>{Object.entries(s.metrics).map(([k, v]) => (<div key={k} style={{ background: T.bg, border: “1px solid “ + T.border, padding: 12, textAlign: “center” }}><div style={{ fontSize: “1rem”, fontWeight: 800, color: T.accent }}>{v}</div><div style={{ fontFamily: T.mono, fontSize: “0.55rem”, color: T.muted, textTransform: “uppercase”, letterSpacing: 1, marginTop: 2 }}>{k}</div></div>))}</div></div>
<div style={{ background: T.card, border: “1px solid “ + T.border, padding: 20, marginBottom: 14 }}><div style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.accent, letterSpacing: 2, marginBottom: 12 }}>PRODUCTS</div>{s.products.map((p, i) => (<div key={i} style={{ display: “flex”, gap: 12, alignItems: “center”, background: T.bg, border: “1px solid “ + T.border, padding: 14, marginBottom: 8 }}><div style={{ width: 38, height: 38, background: T.accent2 + “12”, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: “1.2rem”, flexShrink: 0 }}>{p.icon}</div><div><div style={{ fontWeight: 700, fontSize: “0.88rem”, marginBottom: 2 }}>{p.name}</div><div style={{ color: T.muted, fontSize: “0.78rem” }}>{p.desc}</div></div></div>))}</div>
<div style={{ background: T.card, border: “1px solid “ + T.border, padding: 20, marginBottom: 14 }}><div style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.accent, letterSpacing: 2, marginBottom: 12 }}>TEAM</div>{s.team.map((t, i) => (<div key={i} style={{ display: “flex”, gap: 10, alignItems: “center”, background: T.bg, border: “1px solid “ + T.border, padding: 12, marginBottom: 8 }}><div style={{ width: 34, height: 34, background: T.accent3 + “15”, border: “1px solid “ + T.accent3 + “33”, display: “flex”, alignItems: “center”, justifyContent: “center”, fontWeight: 800, fontSize: “0.8rem”, color: T.accent3, flexShrink: 0 }}>{t.name.split(” “).map(n => n[0]).join(””)}</div><div><div style={{ fontWeight: 700, fontSize: “0.85rem” }}>{t.name} <span style={{ color: T.muted, fontWeight: 400, fontSize: “0.75rem” }}>\u2014 {t.role}</span></div><div style={{ color: T.muted, fontSize: “0.75rem” }}>{t.bg}</div></div></div>))}</div>
<div style={{ background: T.accent2 + “08”, border: “1px solid “ + T.accent2 + “33”, padding: 20, marginBottom: 20, textAlign: “center” }}><div style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: T.accent2, letterSpacing: 2, marginBottom: 4 }}>RAISING</div><div style={{ fontSize: “2rem”, fontWeight: 800, color: T.accent2 }}>{s.ask}</div><div style={{ fontFamily: T.mono, fontSize: “0.68rem”, color: T.muted }}>{s.stage}</div></div>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr 1fr”, gap: 10 }}>
<button onClick={() => toggleConnect(“s-” + s.id, “Connected with “ + s.founder)} style={{ padding: “14px”, background: isConn ? “transparent” : T.accent, color: isConn ? T.accent : T.bg, border: isConn ? “1px solid “ + T.accent : “none”, fontFamily: T.font, fontWeight: 700, fontSize: “0.78rem”, cursor: “pointer”, textTransform: “uppercase”, letterSpacing: 1 }}>{isConn ? “\u2713 Connected” : “\u{1f91d} Connect”}</button>
<button onClick={() => notify(”\u{1f4ac} Chat sent!”)} style={{ padding: “14px”, background: “transparent”, border: “1px solid “ + T.accent3, color: T.accent3, fontFamily: T.font, fontWeight: 700, fontSize: “0.78rem”, cursor: “pointer”, textTransform: “uppercase”, letterSpacing: 1 }}>\u{1f4ac} Message</button>
<button onClick={() => setShowCallModal(true)} style={{ padding: “14px”, background: “transparent”, border: “1px solid “ + T.accent2, color: T.accent2, fontFamily: T.font, fontWeight: 700, fontSize: “0.78rem”, cursor: “pointer”, textTransform: “uppercase”, letterSpacing: 1 }}>\u{1f4de} Book Call</button>
</div>
</div>
</Shell>);
}
return (<Shell><div style={{ position: “relative”, zIndex: 1, maxWidth: 1100, margin: “0 auto”, padding: “40px 20px 60px” }}>
<Tag color={T.accent2}>// investor dashboard</Tag>
<h1 style={{ fontSize: “clamp(1.8rem, 4vw, 2.8rem)”, fontWeight: 800, letterSpacing: -2, marginBottom: 6 }}>Browse deal flow</h1>
<p style={{ color: T.muted, fontSize: “0.88rem”, marginBottom: 28 }}>Click any startup for full profile.</p>
<div style={{ display: “flex”, gap: 6, flexWrap: “wrap”, marginBottom: 8 }}><span style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: “#444”, letterSpacing: 2, marginRight: 2 }}>SECTOR</span>{SECTORS.map(s => <Pill key={s} label={s} active={sectorFilter === s} onClick={() => setSectorFilter(s)} color={T.accent2} />)}</div>
<div style={{ display: “flex”, gap: 6, flexWrap: “wrap”, marginBottom: 20 }}><span style={{ fontFamily: T.mono, fontSize: “0.6rem”, color: “#444”, letterSpacing: 2, marginRight: 2 }}>STAGE</span>{STAGES.map(s => <Pill key={s} label={s} active={stageFilter === s} onClick={() => setStageFilter(s)} color={T.accent2} />)}<div style={{ marginLeft: “auto” }}><input key=“inv-search” placeholder=“Search…” defaultValue=”” onInput={e => setSearch(e.target.value)} style={{ background: T.card, border: “1px solid “ + T.border, padding: “7px 12px”, color: T.fg, fontFamily: T.mono, fontSize: “0.7rem”, width: 170 }} /></div></div>
<div style={{ fontFamily: T.mono, fontSize: “0.65rem”, color: T.muted, marginBottom: 12 }}>{filtered.length} startups</div>
<div style={{ display: “grid”, gridTemplateColumns: “repeat(auto-fill, minmax(300px, 1fr))”, gap: 14 }}>{filtered.map((s, i) => <StartupCard key={s.id} s={s} i={i} />)}</div>
</div></Shell>);
}

// CO-FOUNDER
if (page === “cofounder”) {
return (<Shell><div style={{ position: “relative”, zIndex: 1, maxWidth: 800, margin: “0 auto”, padding: “24px 16px 0”, display: “flex”, flexDirection: “column”, height: “calc(100vh - 53px)” }}>
<div style={{ padding: “10px 0 14px”, borderBottom: “1px solid “ + T.border, flexShrink: 0 }}>
<Tag color={T.accent3}>// co-founder lounge</Tag>
<h2 style={{ fontSize: “1.3rem”, fontWeight: 800, letterSpacing: -1 }}>Find your missing piece</h2>
<div style={{ display: “flex”, gap: 10, marginTop: 10, fontFamily: T.mono, fontSize: “0.62rem” }}><span style={{ color: T.accent3, display: “flex”, alignItems: “center”, gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: “50%”, background: T.accent3, animation: “pulse 2s infinite” }} /> {cfMessages.length} messages</span></div>
</div>
<div style={{ flex: 1, overflowY: “auto”, padding: “16px 0” }}>
{cfMessages.map((m, i) => (<div key={m.id} style={{ marginBottom: 16, animation: i >= CHAT_SEED.length ? “slideIn 0.3s” : “none” }}><div style={{ display: “flex”, gap: 10 }}><div style={{ width: 36, height: 36, background: T.accent3 + “12”, border: “1px solid “ + T.accent3 + “25”, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: “1.1rem”, flexShrink: 0 }}>{m.avatar}</div><div style={{ flex: 1 }}><div style={{ display: “flex”, alignItems: “center”, gap: 8, marginBottom: 4, flexWrap: “wrap” }}><span style={{ fontWeight: 700, fontSize: “0.88rem” }}>{m.user}</span><span style={{ fontFamily: T.mono, fontSize: “0.55rem”, color: T.accent3, background: T.accent3 + “12”, padding: “2px 6px”, border: “1px solid “ + T.accent3 + “25” }}>{m.badge}</span><span style={{ fontFamily: T.mono, fontSize: “0.58rem”, color: “#444” }}>{m.time}</span></div><div style={{ background: T.card, border: “1px solid “ + T.border, padding: “12px 14px”, fontSize: “0.86rem”, color: “#ccc”, lineHeight: 1.5 }}>{m.msg}</div></div></div></div>))}
<div ref={cfChatEndRef} />
</div>
<div style={{ flexShrink: 0, padding: “12px 0 16px”, borderTop: “1px solid “ + T.border, display: “flex”, gap: 8 }}>
<input ref={cfInputRef} defaultValue=”” onKeyDown={e => e.key === “Enter” && handleCfSend()} placeholder=“Tell the community what you’re looking for…” style={{ flex: 1, background: T.card, border: “1px solid “ + T.border, padding: “12px 14px”, color: T.fg, fontFamily: T.font, fontSize: “0.88rem” }} />
<button onClick={handleCfSend} style={{ background: T.accent3, color: T.bg, border: “none”, padding: “12px 20px”, fontFamily: T.font, fontWeight: 700, cursor: “pointer”, letterSpacing: 1 }}>SEND</button>
</div>
</div></Shell>);
}
return null;
}
