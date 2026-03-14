import { useState, useEffect, useRef } from "react";

const SECTIONS = ["HOME", "ABOUT", "JOURNEY", "SERVICES", "PROJECTS", "TEAM", "CONTACT"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", direction = "up" }) {
  const [ref, visible] = useInView(0.1);
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const NAV_HEIGHT = 64;

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("HOME");
  const [lang, setLang] = useState("en");
  const [lightboxImg, setLightboxImg] = useState(null);

  const t = {
    // Hero
    heroTag: { en: "BLOCKCHAIN · WEB3 · PM · EXECUTION", ko: "BLOCKCHAIN · WEB3 · PM · EXECUTION" },
    heroTitle1: { en: "I don't stop at planning.", ko: "기획에서 끝나지 않는다." },
    heroTitle2: { en: "I drive execution.", ko: "실행까지 굴린다." },
    heroSub1: { en: "Web3 Project Planning · PM · Service Design", ko: "Web3 프로젝트 기획 · PM · 서비스 설계" },
    heroSub2: { en: "An execution-focused partner who leads real collaboration with developers and designers", ko: "개발자·디자이너 팀을 직접 운영하는 실행형 파트너" },
    heroBtn1: { en: "VIEW PROJECTS →", ko: "프로젝트 보기 →" },

    // About
    aboutTitle1: { en: "Not just a planner —", ko: "모더레이터에서 시작해," },
    aboutTitle2: { en: "an execution partner.", ko: "팀을 이끄는 실행자가 되었습니다." },
    aboutDesc: {
      en: `In 2021, I started as a moderator at <span style="color:#e8e6e3;font-weight:500">Metakongz</span>, Korea's top NFT project. The lessons I learned on the front lines — engaging with users firsthand — became the foundation of my planning skills and operational instincts.<br/><br/>I grew into a project manager, leading NFT project planning directly, and built real-world expertise across <span style="color:#e8e6e3;font-weight:500">community ops → PM → service design</span> at multiple blockchain companies.<br/><br/>Now, I've taken all that experience and <span style="color:#00ff88;font-weight:500">built my own team — recruiting overseas developers and designers, paying them directly, and building my own projects from scratch.</span>`,
      ko: `2021년, 대한민국 최고의 NFT 프로젝트 <span style="color:#e8e6e3;font-weight:500">Metakongz</span>에서 모더레이터로 시작했습니다. 커뮤니티 현장에서 유저와 부딪히며 배운 것들이 지금의 기획력과 운영 감각의 뿌리가 되었습니다.<br/><br/>이후 프로젝트 매니저로 성장하며 NFT 프로젝트 기획을 직접 주도했고, 여러 블록체인 회사를 거치며 <span style="color:#e8e6e3;font-weight:500">커뮤니티 운영 → PM → 서비스 기획</span>까지 실전 역량을 쌓아왔습니다.<br/><br/>그리고 지금, 그 모든 경험을 기반으로 <span style="color:#00ff88;font-weight:500"> 해외 개발자·디자이너를 직접 찾아 팀을 꾸리고, 급여를 지급하며, 나만의 프로젝트를 만들어가고 있습니다.</span>`
    },
    aboutCards: {
      en: [
        { icon: "◆", title: "Battle-tested Instincts", desc: "Started on the community front lines. A planner who learned what users want through hands-on experience." },
        { icon: "◇", title: "Planning → Execution", desc: "Service architecture, UX flows, operational policies — I organize and lead everything needed to kick off development." },
        { icon: "●", title: "AI System Build & Ops", desc: "Designed proprietary scoring metrics from futures trading experience, then automated the entire copy-trading pipeline with AI. Live with real capital." },
        { icon: "▲", title: "Team Building & Ops", desc: "Recruited 4 overseas team members, paying them directly, and running a project for over a year." },
      ],
      ko: [
        { icon: "◆", title: "현장에서 쌓은 감각", desc: "커뮤니티 최전선에서 시작. 유저가 무엇을 원하는지 몸으로 익힌 기획자." },
        { icon: "◇", title: "기획 → 실행 연결", desc: "서비스 구조, UX 흐름, 운영 정책까지 — 개발 착수에 필요한 모든 것을 직접 정리하고 주도." },
        { icon: "●", title: "AI 시스템 구축·운용", desc: "선물 트레이딩 경험 기반의 개인 지표·점수 체계를 설계하고, AI로 카피 매매 전체 파이프라인을 자동화. 실제 자금 운용·수익 검증 완료." },
        { icon: "▲", title: "팀 빌딩 & 운영", desc: "해외 인력 4명을 직접 리크루팅하고 급여를 지급하며 1년째 프로젝트를 운영 중." },
      ],
    },

    // Journey
    journeyTitle: { en: "2021 — Present", ko: "2021 — 현재" },
    journeyItems: {
      en: [
        { year: "2021", title: "Joined Metakongz", subtitle: "Korea's #1 NFT Project", desc: "Started as a moderator. Entered the Web3 industry by engaging directly with users on the community front lines.", color: "#00ff88", tags: ["Moderator", "Community", "NFT"] },
        { year: "2022", title: "Grew into Project Manager", subtitle: "Led NFT Project Planning", desc: "Took charge of planning for NFT projects built by Metakongz. Expanded from community operator to planner and PM.", color: "#00aaff", tags: ["PM", "Service Planning", "Project Mgmt"] },
        { year: "2022–26", title: "Multiple NFT/Blockchain Projects", subtitle: "Real-world Experience", desc: "Gained diverse experience across multiple blockchain companies — community ops, PM, service planning. Currently active as a freelancer on an RWA project.", color: "#8888ff", tags: ["Blockchain", "Multi-project", "RWA", "Freelance"] },
        { year: "2025–26", title: "Overseas Team Building & VATICA", subtitle: "From Planner to Execution Partner", desc: "Recruited overseas developers and designers to build a team. Working with 1 blockchain full-stack dev, 2 web devs, and 1 web designer to plan and develop the personal project VATICA.", color: "#ff8800", tags: ["Team Building", "VATICA", "Overseas Talent"] },
        { year: "2026", title: "AI Copy Trading Bot", subtitle: "Live Operations & Profit Verified", desc: "Designed proprietary scoring metrics from years of futures trading experience. Built an AI-powered system automating the entire pipeline from target discovery to copy trading. Live with real capital, generating profit.", color: "#ff4488", tags: ["AI", "Futures Trading", "Scoring System", "Automated Trading"] },
        { year: "2026", title: "Looking for the right opportunity", subtitle: "Yes, that means you", desc: "When you work with me, you don't just get ideas — you get execution that moves projects forward. If you're looking for an execution partner, let's talk.", color: "#00ff88", tags: ["Planning → Execution", "Web3", "PM", "Available"] },
      ],
      ko: [
        { year: "2021", title: "Metakongz 입사", subtitle: "대한민국 최고의 NFT 프로젝트", desc: "모더레이터로 시작. 커뮤니티 현장에서 유저와 직접 소통하며 Web3 업계에 첫 발을 내딛다.", color: "#00ff88", tags: ["Moderator", "Community", "NFT"] },
        { year: "2022", title: "프로젝트 매니저로 성장", subtitle: "NFT 프로젝트 기획 주도", desc: "Metakongz에서 만든 다른 NFT 프로젝트들의 기획을 직접 담당. 커뮤니티 운영자에서 기획자·PM으로 역할 확장.", color: "#00aaff", tags: ["PM", "서비스 기획", "프로젝트 관리"] },
        { year: "2022–26", title: "다수의 NFT/블록체인 프로젝트", subtitle: "실전 경험 축적", desc: "여러 블록체인 회사를 거치며 커뮤니티 운영, PM, 서비스 기획 등 다양한 역할을 수행. 현장 경험 기반의 실전 역량을 쌓아감. 현재도 프리랜서 형태로 한 RWA 프로젝트에 소속되어 활동 중.", color: "#8888ff", tags: ["블록체인", "다중 프로젝트", "RWA", "프리랜서"] },
        { year: "2025–26", title: "해외 팀 빌딩 & VATICA", subtitle: "기획자에서 실행 파트너로", desc: "해외 개발자·디자이너를 직접 리크루팅하여 팀을 꾸림. 블록체인 풀스택 개발자 1명, 웹 개발자 2명, 웹 디자이너 1명과 함께 개인 프로젝트 VATICA를 직접 기획하고 개발 중.", color: "#ff8800", tags: ["팀 빌딩", "VATICA", "해외 인력"] },
        { year: "2026", title: "AI 카피 매매 봇 구축", subtitle: "실제 운용 & 수익 검증", desc: "수년간의 선물 트레이딩 경력을 기반으로 개인 지표·점수 체계를 설계하고, AI를 활용하여 카피 대상 탐색부터 매매까지 자동화한 시스템을 구축. 실제 자금 투입·수익 검증 완료.", color: "#ff4488", tags: ["AI", "선물 트레이딩", "스코어링 시스템", "자동매매", "수익 검증"] },
        { year: "2026", title: "다음 챕터를 함께할 팀을 찾고 있습니다", subtitle: "지금 이 포트폴리오를 보고 있는 당신에게", desc: "기획만 하는 사람은 많습니다. 하지만 팀을 꾸리고, 시스템을 만들고, 실제로 돌아가게 만드는 사람은 많지 않습니다. 다음 프로젝트의 실행 파트너를 찾고 계시다면 — 연락 주세요.", color: "#00ff88", tags: ["기획 → 실행", "Web3", "PM", "Available"] },
      ],
    },
    journeyNow: { en: "In progress — VATICA development & AI bot operations", ko: "현재 진행형 — VATICA 개발 & AI 봇 운용 중" },

    // Services
    servicesTitle1: { en: "From planning", ko: "맡기면" },
    servicesTitle2: { en: "to execution.", ko: "굴러갑니다." },
    serviceItems: {
      en: [
        { num: "01", title: "Service Planning & PM", items: ["Service architecture design", "Feature specs & UX flows", "Operational policy setup", "Roadmap planning & mgmt"] },
        { num: "02", title: "Project Execution", items: ["Dev team coordination & mgmt", "Design communication", "Timeline & resource mgmt", "QA & feedback loops"] },
        { num: "03", title: "Community & Operations", items: ["Community strategy", "Channel management", "User feedback mgmt", "Onboarding flow design"] },
        { num: "04", title: "AI & Automation", items: ["AI system planning", "Trading bot development", "Data-driven decisions", "Ops automation design"] },
      ],
      ko: [
        { num: "01", title: "서비스 기획 & PM", items: ["서비스 구조 설계", "기능 명세 & UX 흐름", "운영 정책 정리", "로드맵 수립 & 관리"] },
        { num: "02", title: "프로젝트 실행", items: ["개발 팀 연계 & 관리", "디자인 커뮤니케이션", "일정·리소스 관리", "QA & 피드백 루프"] },
        { num: "03", title: "커뮤니티 & 운영", items: ["커뮤니티 전략 수립", "소통 채널 운영", "유저 피드백 관리", "온보딩 플로우 기획"] },
        { num: "04", title: "AI & 자동화", items: ["AI 활용 시스템 기획", "트레이딩 봇 구축", "데이터 기반 의사결정", "운영 자동화 설계"] },
      ],
    },

    // Projects
    projectsTitle1: { en: "Not just ideas —", ko: "아이디어가 아니라," },
    projectsTitle2: { en: "real execution.", ko: "결과물입니다." },
    vaticaDesc: {
      en: `A blockchain-based <span style="color:#e8e6e3;font-weight:500">Decentralized Prediction Market Protocol</span>. A P2P structure where users take Yes/No positions on real-world events (politics, sports, crypto, finance, tech). I led the entire project — service architecture, UX flows, feature planning, TOS/legal docs, operational policies — and am developing it with an overseas team. <span style="color:#00ff88;font-weight:500">IP agreements and equity distribution contracts were completed before development began</span>, with <span style="color:#00ff88;font-weight:500">equity structured under the future VATICA entity</span> to prepare for investment.`,
      ko: `블록체인 기반의 <span style="color:#e8e6e3;font-weight:500">탈중앙화 예측 마켓(Prediction Market) 프로토콜</span>. 실제 세계의 이벤트(정치, 스포츠, 크립토, 금융, 기술)에 대해 유저가 Yes/No 포지션을 잡고 거래하는 P2P 구조. 서비스 구조 설계, UX 흐름, 기능 기획, TOS/법률 문서, 운영 정책까지 전반을 직접 기획하고, 해외 팀과 함께 개발을 진행 중. 개발 착수 전 <span style="color:#00ff88;font-weight:500">IP 계약서와 지분 분배 계약서를 모두 완료</span>한 프로젝트이며, 미래 투자 유치를 고려하여 <span style="color:#00ff88;font-weight:500">지분은 향후 설립될 VATICA 법인 소유</span>로 설계해둔 상태.`
    },
    vaticaFeatures: {
      en: [
        { icon: "🏠", name: "Markets Home", desc: "Browse prediction markets by category (Politics, Sports, Crypto, Finance, Tech)" },
        { icon: "👆", name: "Swipe Survey", desc: "Tinder-style swipe UX for quick prediction participation — gamification at its core" },
        { icon: "💼", name: "Portfolio & P/L", desc: "Real-time portfolio tracking, daily/weekly returns, prediction history dashboard" },
        { icon: "💳", name: "Deposit / Withdrawal", desc: "USDC-based deposit/withdrawal system with chain selection and QR address generation" },
        { icon: "📋", name: "Terms & Onboarding", desc: "Legal TOS v1.0.4, geo-restrictions, wallet connect → email → terms agreement flow" },
      ],
      ko: [
        { icon: "🏠", name: "Markets Home", desc: "카테고리별 예측 마켓 브라우징 (Politics, Sports, Crypto, Finance, Tech)" },
        { icon: "👆", name: "Swipe Survey", desc: "Tinder 스타일 스와이프 UX로 빠르게 예측에 참여하는 게이미피케이션 모드" },
        { icon: "💼", name: "Portfolio & P/L", desc: "실시간 포트폴리오 추적, 일간/주간 수익률, 예측 히스토리 대시보드" },
        { icon: "💳", name: "Deposit / Withdrawal", desc: "USDC 기반 입출금 시스템. 체인 선택, QR 주소 생성까지 구현" },
        { icon: "📋", name: "Terms & Onboarding", desc: "법적 TOS v1.0.4, 지역 제한, 월렛 연결 → 이메일 수집 → 약관 동의 플로우" },
      ],
    },
    vaticaIpNote: { en: "* The designs above are work produced by a designer under my team. All IP belongs to me.", ko: "* 상기 디자인은 본인 소속 디자이너의 작업물이며, 모든 IP는 본인에게 귀속됩니다." },
    vaticaRoles: {
      en: ["Service Architecture", "Feature Specs", "UX Flow Design", "TOS/Legal Docs", "Ops Policy", "Design Direction", "Overseas Team Mgmt", "IP & Equity Design"],
      ko: ["서비스 구조 설계", "기능 명세 작성", "UX 흐름 기획", "TOS/법률 문서 작성", "운영 정책 수립", "디자인 디렉션", "해외 팀 관리", "IP 계약 · 지분 설계"],
    },
    botDesc: {
      en: `Designed proprietary scoring metrics based on <span style="color:#e8e6e3;font-weight:500">years of futures trading experience</span>, creating <span style="color:#ff8800;font-weight:500">custom indicators and a scoring framework</span> to evaluate copy targets. <span style="color:#e8e6e3;font-weight:500">Tracks all active wallets on-chain</span> and automates the full pipeline — target discovery → observation → data collection → copy trading — using AI. Integrated with Telegram for <span style="color:#e8e6e3;font-weight:500">easy control and real-time monitoring</span>, with <span style="color:#e8e6e3;font-weight:500">high-level security design</span> against hacking. Live with real capital, generating profit.`,
      ko: `<span style="color:#e8e6e3;font-weight:500">수년간의 선물 트레이딩 경력</span>에서 축적한 노하우를 기반으로, 카피 대상의 성과를 평가하는 <span style="color:#ff8800;font-weight:500">각종 개인 지표와 점수 체계</span>를 직접 설계. <span style="color:#e8e6e3;font-weight:500">온체인에서 활동이 있는 지갑들을 추적</span>하여 카피 대상 탐색 → 관찰 → 데이터 수집 → 카피 매매까지 이어지는 전체 파이프라인을 AI를 활용하여 자동화. 텔레그램 앱과 연동하여 <span style="color:#e8e6e3;font-weight:500">손쉬운 조작과 실시간 모니터링</span>이 가능하며, 해킹 방지를 위한 <span style="color:#e8e6e3;font-weight:500">높은 수준의 보안 설계</span>까지 적용. 실제 자금을 투입하여 운용 중이며 수익이 발생하고 있는 라이브 프로젝트.`
    },
    botStats: {
      en: [
        { label: "STATUS", value: "LIVE", color: "#00ff88" },
        { label: "BASED ON", value: "Futures Trading Exp.", color: "#ff8800" },
        { label: "CORE", value: "On-chain · Scoring", color: "#ff4488" },
        { label: "OPS", value: "Telegram · Security", color: "#00aaff" },
      ],
      ko: [
        { label: "상태", value: "LIVE", color: "#00ff88" },
        { label: "기반", value: "선물 트레이딩 경력", color: "#ff8800" },
        { label: "핵심", value: "온체인 추적 · 스코어링", color: "#ff4488" },
        { label: "운영", value: "텔레그램 연동 · 보안 설계", color: "#00aaff" },
      ],
    },
    botTags: {
      en: ["Futures Trading", "On-chain Tracking", "Scoring System", "AI Trading", "Telegram", "Security", "Risk Mgmt"],
      ko: ["선물 트레이딩", "온체인 지갑 추적", "스코어링 시스템", "AI 자동매매", "텔레그램 연동", "보안 설계", "리스크 관리"],
    },
    web3Desc: {
      en: `Starting from <span style="color:#e8e6e3;font-weight:500">Metakongz</span>, gained experience across multiple NFT and blockchain projects in community ops, PM, and service planning. The on-the-ground experience built the foundation for current planning and execution capabilities.`,
      ko: `<span style="color:#e8e6e3;font-weight:500">Metakongz</span>를 시작으로 다수의 NFT·블록체인 프로젝트에서 커뮤니티 운영, PM, 서비스 기획을 담당. 현장에서 유저와 부딪히며 쌓은 경험이 지금의 기획력과 실행력의 기반이 됨.`
    },

    // Team
    teamTitle: { en: "I work with a real team.", ko: "혼자가 아닙니다." },
    teamDesc: {
      en: "A real team I've been running for over a year, with overseas talent I recruited directly.<br/>I pay salaries and connect planning → development → design → execution.",
      ko: "해외에서 직접 인력을 찾아 1년째 운영 중인 실제 협업 팀입니다.<br/>직접 급여를 지급하며 기획 → 개발 → 디자인 → 실행까지 연결합니다."
    },
    teamMembers: {
      en: [
        { role: "Blockchain Full-stack Dev", count: "×1", icon: "⛓", color: "#00ff88" },
        { role: "Web Developers", count: "×2", icon: "💻", color: "#00aaff" },
        { role: "Web Designer", count: "×1", icon: "🎨", color: "#ff88ff" },
        { role: "Planning · PM · Ops", count: "ME", icon: "◉", color: "#ff8800" },
      ],
      ko: [
        { role: "블록체인 풀스택 개발자", count: "1명", icon: "⛓", color: "#00ff88" },
        { role: "웹 개발자", count: "2명", icon: "💻", color: "#00aaff" },
        { role: "웹 디자이너", count: "1명", icon: "🎨", color: "#ff88ff" },
        { role: "기획 · PM · 운영", count: "ME", icon: "◉", color: "#ff8800" },
      ],
    },
    teamQuote1: {
      en: "When you work with me, you don't just get ideas —<br/>you get execution that actually moves projects forward.",
      ko: "이 사람에게 맡기면 기획만 나오는 게 아니라,<br/>실제로 프로젝트가 굴러간다."
    },
    teamQuote2: { en: "— That's how I work.", ko: "— 이것이 내가 주는 가치입니다." },

    // Contact
    contactTitle1: { en: "Let's move your", ko: "프로젝트를 함께" },
    contactTitle2: { en: "project forward.", ko: "굴려봅시다." },
    contactDesc: {
      en: "If you need support with blockchain/Web3 project planning, PM, or service structure design,<br/>feel free to reach out.",
      ko: "블록체인/Web3 프로젝트 기획, PM, 서비스 구조 설계가 필요하시다면<br/>편하게 연락 주세요."
    },
    contactBtn1: { en: "SEND EMAIL →", ko: "이메일 보내기 →" },

    // Footer
    footerTag: { en: "Built with execution, not just ideas.", ko: "Built with execution, not just ideas." },
  };

  const L = (key) => key[lang] || key.en;

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const sects = SECTIONS.map(s => document.getElementById(s.toLowerCase()));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id.toUpperCase()); });
    }, { threshold: 0.3, rootMargin: `-${NAV_HEIGHT}px 0px 0px 0px` });
    sects.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "#0a0a0a", color: "#e8e6e3", fontFamily: "'Outfit', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        ::selection { background: #00ff8840; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes grain {
          0%,100%{transform:translate(0,0)}
          10%{transform:translate(-5%,-10%)}
          30%{transform:translate(3%,2%)}
          50%{transform:translate(-3%,5%)}
          70%{transform:translate(7%,-8%)}
          90%{transform:translate(-1%,3%)}
        }
        .grain::before {
          content:''; position:fixed; top:-50%; left:-50%; width:200%; height:200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          animation: grain 8s steps(10) infinite;
          pointer-events:none; z-index:9999; opacity:0.5;
        }
        .tag { display:inline-block; padding:6px 14px; border:1px solid #00ff8850; color:#00ff88; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; border-radius:2px; font-family:'Outfit',sans-serif; }
        .glow-line { height:1px; background:linear-gradient(90deg,transparent,#00ff8840,transparent); }
        a { color:#00ff88; text-decoration:none; }
        .card { background:#111; border:1px solid #1a1a1a; border-radius:8px; padding:32px; transition: all .3s ease; }
        .card:hover { border-color:#00ff8830; background:#131313; transform:translateY(-2px); }
        .btn-primary { display:inline-flex; align-items:center; gap:8px; padding:14px 32px; background:#00ff88; color:#0a0a0a; font-weight:700; font-size:14px; letter-spacing:1px; text-transform:uppercase; border:none; cursor:pointer; border-radius:4px; font-family:'Outfit',sans-serif; transition:all .2s; }
        .btn-primary:hover { background:#00ffaa; box-shadow:0 0 30px #00ff8830; }
        .btn-outline { display:inline-flex; align-items:center; gap:8px; padding:14px 32px; background:transparent; color:#e8e6e3; font-weight:600; font-size:14px; letter-spacing:1px; text-transform:uppercase; border:1px solid #333; cursor:pointer; border-radius:4px; font-family:'Outfit',sans-serif; transition:all .2s; }
        .btn-outline:hover { border-color:#00ff88; color:#00ff88; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        /* Desktop gallery sizing */
        @media(min-width:769px) {
          .vatica-gallery > div { min-width: 220px !important; }
          .vatica-gallery img { height: 420px !important; }
          .bot-gallery > div { min-width: 220px !important; }
          .bot-gallery img { height: 400px !important; }
        }

        /* Mobile Responsive */
        @media(max-width:768px) {
          .hero-section { padding-top: 120px !important; }
          .hero-stats { gap: 24px !important; }
          .hero-stats > div > div:first-child { font-size: 28px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .services-grid > div > div { border-right: none !important; }
          .vatica-features-grid { grid-template-columns: 1fr 1fr !important; }
          .bot-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .team-quote { padding: 24px 20px !important; }
          .team-quote p:first-child { font-size: 15px !important; }
          .vatica-header { flex-direction: column !important; }
          .vatica-roles-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-wrap { flex-direction: column !important; text-align: center !important; gap: 12px !important; }
          /* Image galleries: horizontal scroll */
          .vatica-gallery {
            display: flex !important; overflow-x: auto !important;
            grid-template-columns: unset !important; gap: 12px !important;
            scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
            padding-bottom: 8px;
          }
          .vatica-gallery > div {
            min-width: 280px !important; flex-shrink: 0 !important;
            scroll-snap-align: start;
          }
          .vatica-gallery img { min-height: 200px; object-fit: cover; }
          .bot-gallery {
            display: flex !important; overflow-x: auto !important;
            grid-template-columns: unset !important; gap: 12px !important;
            scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
            padding-bottom: 8px;
          }
          .bot-gallery > div {
            min-width: 250px !important; flex-shrink: 0 !important;
            scroll-snap-align: start;
          }
          .bot-gallery img { min-height: 180px; object-fit: cover; }
          /* Scrollbar styling for galleries */
          .vatica-gallery::-webkit-scrollbar, .bot-gallery::-webkit-scrollbar { height: 4px; }
          .vatica-gallery::-webkit-scrollbar-track, .bot-gallery::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 2px; }
          .vatica-gallery::-webkit-scrollbar-thumb, .bot-gallery::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        }
        @media(max-width:480px) {
          .hero-section { padding-top: 130px !important; }
          .hero-stats { gap: 20px !important; }
          .hero-stats > div > div:first-child { font-size: 24px !important; }
          .vatica-features-grid { grid-template-columns: 1fr !important; }
          .bot-stats-grid { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .vatica-roles-grid { grid-template-columns: 1fr !important; }
          .contact-buttons { flex-direction: column !important; align-items: center !important; }
          .contact-buttons a, .contact-buttons button { width: 100% !important; justify-content: center !important; }
          .vatica-gallery > div { min-width: 260px !important; }
          .bot-gallery > div { min-width: 230px !important; }
        }

        /* Mobile menu overlay */
        .mobile-menu-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(10,10,10,.97); z-index: 999;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 24px; backdrop-filter: blur(20px);
        }
        .mobile-menu-overlay > div {
          font-size: 18px; letter-spacing: 3px; cursor: pointer; font-weight: 600;
          color: #888; transition: color .2s; padding: 8px 0;
        }
        .mobile-menu-overlay > div:hover { color: #00ff88; }
        .mobile-menu-overlay > div.active-mobile { color: #00ff88; }

        /* Hamburger button */
        .hamburger {
          display: none; flex-direction: column; gap: 5px; cursor: pointer;
          padding: 8px; z-index: 1001; background: none; border: none;
        }
        .hamburger span {
          display: block; width: 20px; height: 2px; background: #e8e6e3;
          transition: all .3s ease; border-radius: 1px;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        @media(max-width:768px) {
          .hamburger { display: flex; }
          .nav-links { display: none !important; }
        }
      `}</style>

      <div className="grain" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, height: NAV_HEIGHT,
        background: scrollY > 50 ? "rgba(10,10,10,.9)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid #1a1a1a" : "1px solid transparent",
        zIndex: 1000, transition: "all .3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(20px,5vw,60px)",
      }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: -0.5, cursor: "pointer" }} onClick={() => scrollTo("HOME")}>
          <span style={{ color: "#00ff88" }}>●</span> Mr. BEOM
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {SECTIONS.map(s => (
            <div key={s} onClick={() => scrollTo(s)} style={{
              fontSize: 12, letterSpacing: 1.5, cursor: "pointer", fontWeight: 500,
              color: activeSection === s ? "#00ff88" : "#666",
              transition: "color .2s",
            }}
            onMouseEnter={e => e.target.style.color = "#00ff88"}
            onMouseLeave={e => { if (activeSection !== s) e.target.style.color = "#666"; }}
            >{s}</div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "4px 5px", background: "#1a1a1a", borderRadius: 20,
            border: "1px solid #2a2a2a",
          }}>
            {["EN", "KR"].map(l => (
              <div key={l} onClick={() => setLang(l === "EN" ? "en" : "ko")} style={{
                padding: "5px 12px", borderRadius: 16, fontSize: 11, fontWeight: 600,
                letterSpacing: 1, cursor: "pointer", transition: "all .2s",
                background: (l === "EN" ? "en" : "ko") === lang ? "#00ff88" : "transparent",
                color: (l === "EN" ? "en" : "ko") === lang ? "#0a0a0a" : "#666",
              }}>{l}</div>
            ))}
          </div>
          <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          {SECTIONS.map(s => (
            <div key={s} className={activeSection === s ? "active-mobile" : ""} onClick={() => scrollTo(s)}>{s}</div>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="hero-section" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 clamp(20px,8vw,120px)", paddingTop: 100, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "15%", right: "-5%", width: 500, height: 500,
          background: "radial-gradient(circle, #00ff8808 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-10%", width: 400, height: 400,
          background: "radial-gradient(circle, #00ff8805 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none",
        }} />

        <FadeIn delay={0.1}>
          <div className="tag" style={{ marginBottom: 28 }}>BLOCKCHAIN · WEB3 · PM · EXECUTION</div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontSize: "clamp(42px,7vw,88px)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: -2, maxWidth: 900,
          }}>
            {L(t.heroTitle1)}<br />
            <span style={{ color: "#00ff88" }}>{L(t.heroTitle2)}</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.35}>
          <p style={{ fontSize: 18, color: "#888", maxWidth: 560, lineHeight: 1.7, marginTop: 28, fontWeight: 300 }}>
            {L(t.heroSub1)}<br />
            {L(t.heroSub2)}
          </p>
        </FadeIn>
        <FadeIn delay={0.5}>
          <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("PROJECTS")}>{L(t.heroBtn1)}</button>
            <button className="btn-outline" onClick={() => scrollTo("CONTACT")}>CONTACT</button>
          </div>
        </FadeIn>

        <FadeIn delay={0.7}>
          <div className="hero-stats" style={{ display: "flex", gap: 48, marginTop: 80, flexWrap: "wrap" }}>
            {[
              { num: "5+", label: "Years in Web3" },
              { num: "4", label: "Team Members" },
              { num: "1yr", label: "Team Operating" },
              { num: "∞", label: "Execution Power" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: "#00ff88" }}>{s.num}</div>
                <div style={{ fontSize: 12, color: "#555", letterSpacing: 1.5, marginTop: 4, textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <div className="glow-line" />

      {/* ABOUT */}
      <section id="about" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 12, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>ABOUT</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 20, letterSpacing: -1 }}>
            {L(t.aboutTitle1)}<br /><span style={{ color: "#00ff88" }}>{L(t.aboutTitle2)}</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p style={{ fontSize: 17, color: "#999", lineHeight: 2, maxWidth: 760, marginBottom: 48, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: L(t.aboutDesc) }} />
        </FadeIn>

        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {L(t.aboutCards).map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="card" style={{ height: "100%" }}>
                <div style={{ fontSize: 24, color: "#00ff88", marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="glow-line" />

      {/* JOURNEY */}
      <section id="journey" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 12, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>JOURNEY</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 60, letterSpacing: -1 }}>
            {L(t.journeyTitle)}
          </h2>
        </FadeIn>

        <div style={{ position: "relative", paddingLeft: 40 }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: 11, top: 8, bottom: 8, width: 1,
            background: "linear-gradient(180deg, #00ff88 0%, #00ff8840 50%, #1a1a1a 100%)",
          }} />

          {L(t.journeyItems).map((item, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ marginBottom: 48, position: "relative" }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: -35, top: 6, width: 12, height: 12,
                  borderRadius: "50%", background: item.color, boxShadow: `0 0 12px ${item.color}50`,
                }} />
                {/* Year badge */}
                <div style={{
                  display: "inline-block", padding: "4px 12px", background: item.color + "15",
                  border: `1px solid ${item.color}30`, borderRadius: 4, marginBottom: 12,
                  fontSize: 13, fontWeight: 700, color: item.color, fontFamily: "'Syne',sans-serif",
                  letterSpacing: 1,
                }}>{item.year}</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 12, fontWeight: 500 }}>{item.subtitle}</div>
                <p style={{ fontSize: 14, color: "#888", lineHeight: 1.8, maxWidth: 600, fontWeight: 300, marginBottom: 12 }}>
                  {item.desc}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{
                      padding: "4px 10px", background: "#1a1a1a", borderRadius: 3,
                      fontSize: 11, color: "#777", fontWeight: 400,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div style={{
            marginTop: 24, padding: "24px 32px", border: "1px solid #1a1a1a", borderRadius: 8,
            background: "#111", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff88", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 14, color: "#888", fontWeight: 300 }}>
              {L(t.journeyNow)}
            </span>
          </div>
        </FadeIn>
      </section>

      <div className="glow-line" />

      {/* SERVICES */}
      <section id="services" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 12, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>SERVICES</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 48, letterSpacing: -1 }}>
            {L(t.servicesTitle1)} <span style={{ color: "#00ff88" }}>{L(t.servicesTitle2)}</span>
          </h2>
        </FadeIn>

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
          {L(t.serviceItems).map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                padding: "40px 32px", borderBottom: "1px solid #1a1a1a",
                borderRight: "1px solid #1a1a1a", transition: "background .3s",
                cursor: "default",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#111"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 48, fontWeight: 800, color: "#1a1a1a", marginBottom: 16,
                  WebkitTextStroke: "1px #333",
                }}>{s.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, fontFamily: "'Syne',sans-serif" }}>{s.title}</h3>
                {s.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 4, height: 4, background: "#00ff88", borderRadius: "50%" }} />
                    <span style={{ fontSize: 14, color: "#888", fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="glow-line" />

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 12, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>PROJECTS</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 48, letterSpacing: -1 }}>
            {L(t.projectsTitle1)}<br /><span style={{ color: "#666" }}>{L(t.projectsTitle2)}</span>
          </h2>
        </FadeIn>

        {/* Project 1 - VATICA */}
        <FadeIn>
          <div style={{ marginBottom: 48, padding: "clamp(28px,4vw,56px)", background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: -60, right: -60, width: 300, height: 300,
              background: "radial-gradient(circle, #00ff8810 0%, transparent 70%)",
              borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none",
            }} />

            <div className="vatica-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
              <div>
                <div className="tag" style={{ marginBottom: 16 }}>IN DEVELOPMENT</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: -0.5 }}>
                  VATICA
                </h3>
                <p style={{ fontSize: 14, color: "#00ff88", fontWeight: 500, marginTop: 4, letterSpacing: 0.5 }}>
                  Decentralized Prediction Protocol
                </p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ padding: "8px 16px", background: "#1a1a1a", borderRadius: 6, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#00ff88", fontFamily: "'Syne',sans-serif" }}>4</div>
                  <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, marginTop: 2 }}>TEAM</div>
                </div>
                <div style={{ padding: "8px 16px", background: "#1a1a1a", borderRadius: 6, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#00ff88", fontFamily: "'Syne',sans-serif" }}>1yr</div>
                  <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, marginTop: 2 }}>{lang === "en" ? "OPS" : "운영"}</div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: 15, color: "#999", lineHeight: 1.9, maxWidth: 720, marginBottom: 32, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: L(t.vaticaDesc) }} />


            {/* App Design Showcase */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginBottom: 16, fontWeight: 600, textTransform: "uppercase" }}>
                App Design
              </div>
              <div className="vatica-gallery" style={{ display: "flex", overflowX: "auto", gap: 12, WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory", scrollBehavior: "smooth", paddingBottom: 8 }}>
                {[
                  { src: "/vatica-01.jpg", label: "Wallet Connect" },
                  { src: "/vatica-02.jpg", label: "Portfolio & Earnings" },
                  { src: "/vatica-03.jpg", label: "Swipe Survey" },
                  { src: "/vatica-04.jpg", label: "P/L Results" },
                ].map((item, i) => (
                  <div key={i} style={{
                    borderRadius: 8, overflow: "hidden", border: "1px solid #1a1a1a",
                    background: "#0d0d0d", transition: "all .3s", cursor: "pointer",
                    width: 160, flexShrink: 0, scrollSnapAlign: "center", scrollSnapStop: "always",
                  }}
                  onClick={() => setLightboxImg(item.src)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ff8830"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.transform = "none"; }}
                  >
                    <img src={item.src} alt={item.label} style={{ width: "100%", height: 280, display: "block", objectFit: "cover", objectPosition: "top" }} />
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: 12, color: "#888", fontWeight: 400 }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: "#444", marginTop: 10, fontStyle: "italic" }}>
                {L(t.vaticaIpNote)}
              </p>
            </div>

            {/* Feature Showcase Grid */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginBottom: 16, fontWeight: 600, textTransform: "uppercase" }}>
                Core Features
              </div>
              <div className="vatica-features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {L(t.vaticaFeatures).map((f, i) => (
                  <div key={i} style={{
                    padding: "20px 16px", background: "#0d0d0d", border: "1px solid #1a1a1a",
                    borderRadius: 8, transition: "border-color .3s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#00ff8830"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}
                  >
                    <div style={{ fontSize: 20, marginBottom: 10 }}>{f.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, fontFamily: "'Syne',sans-serif", color: "#e8e6e3" }}>{f.name}</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6, fontWeight: 300 }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Role */}
            <div style={{ padding: "20px 24px", background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "#00ff88", letterSpacing: 2, marginBottom: 12, fontWeight: 600, textTransform: "uppercase" }}>My Role</div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[
                  ...L(t.vaticaRoles),
                ].map(r => (
                  <div key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 5, height: 5, background: "#00ff88", borderRadius: "50%" }} />
                    <span style={{ fontSize: 13, color: "#888", fontWeight: 400 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(lang === "en" ? ["Prediction Market", "dApp", "Solidity", "P2P", "USDC", "IP Agreement", "Equity Design", "Mobile-first"] : ["Prediction Market", "dApp", "Solidity", "P2P", "USDC", "IP 계약", "지분 설계", "Mobile-first"]).map(tag => (
                <span key={tag} style={{
                  padding: "5px 11px", background: "#1a1a1a", borderRadius: 3,
                  fontSize: 11, color: "#777", fontWeight: 400,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Project 2 - Copy Trading Bot */}
        <FadeIn delay={0.1}>
          <div style={{ marginBottom: 24, padding: "clamp(28px,4vw,56px)", background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: -60, right: -60, width: 300, height: 300,
              background: "radial-gradient(circle, #ff880010 0%, transparent 70%)",
              borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none",
            }} />
            <div className="tag" style={{ borderColor: "#ff880050", color: "#ff8800", marginBottom: 16 }}>LIVE & OPERATING</div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, marginBottom: 4, letterSpacing: -0.5 }}>
              AI Copy Trading Bot
            </h3>
            <p style={{ fontSize: 14, color: "#ff8800", fontWeight: 500, marginBottom: 20, letterSpacing: 0.5 }}>
              Automated Trading System — On-chain Tracking · Telegram Control · Live
            </p>
            <p style={{ fontSize: 15, color: "#999", lineHeight: 1.9, maxWidth: 720, marginBottom: 28, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: L(t.botDesc) }} />


            {/* Bot Telegram Screenshots */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginBottom: 16, fontWeight: 600, textTransform: "uppercase" }}>
                Live System
              </div>
              <div className="bot-gallery" style={{ display: "flex", overflowX: "auto", gap: 12, WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory", scrollBehavior: "smooth", paddingBottom: 8 }}>
                {[
                  { src: "/bot-01.jpg", label: "AI Report · VIP" },
                  { src: "/bot-02.jpg", label: "Target Scoring · 87" },
                  { src: "/bot-03.jpg", label: "Positions · Daily PnL" },
                ].map((item, i) => (
                  <div key={i} style={{
                    borderRadius: 8, overflow: "hidden", border: "1px solid #1a1a1a",
                    background: "#0d0d0d", transition: "all .3s", cursor: "pointer",
                    width: 160, flexShrink: 0, scrollSnapAlign: "center", scrollSnapStop: "always",
                  }}
                  onClick={() => setLightboxImg(item.src)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff880030"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.transform = "none"; }}
                  >
                    <img src={item.src} alt={item.label} style={{ width: "100%", height: 280, display: "block", objectFit: "cover", objectPosition: "top" }} />
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: 12, color: "#888", fontWeight: 400 }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bot Feature highlights */}
            <div className="bot-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
              {[
...L(t.botStats),
              ].map((s, i) => (
                <div key={i} style={{ padding: "16px", background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 8 }}>
                  <div style={{ fontSize: 10, color: "#555", letterSpacing: 1.5, marginBottom: 6, textTransform: "uppercase" }}>{s.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: s.color, fontFamily: "'Syne',sans-serif" }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {L(t.botTags).map(tag => (
                <span key={tag} style={{
                  padding: "5px 11px", background: "#1a1a1a", borderRadius: 3,
                  fontSize: 11, color: "#777", fontWeight: 400,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Project 3 - Web3 Experience */}
        <FadeIn delay={0.2}>
          <div style={{ padding: "clamp(28px,4vw,48px)", background: "#111", border: "1px solid #1a1a1a", borderRadius: 12 }}>
            <div className="tag" style={{ borderColor: "#8888ff50", color: "#8888ff", marginBottom: 16 }}>EXPERIENCE</div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, marginBottom: 12, letterSpacing: -0.5 }}>
              Web3 프로젝트 다수 경험
            </h3>
            <p style={{ fontSize: 15, color: "#999", lineHeight: 1.9, maxWidth: 720, marginBottom: 24, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: L(t.web3Desc) }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(lang === "en" ? ["Metakongz", "NFT", "Community Ops", "PM", "Service Planning", "Blockchain"] : ["Metakongz", "NFT", "커뮤니티 운영", "PM", "서비스 기획", "블록체인"]).map(tag => (
                <span key={tag} style={{
                  padding: "5px 11px", background: "#1a1a1a", borderRadius: 3,
                  fontSize: 11, color: "#777", fontWeight: 400,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="glow-line" />

      {/* TEAM */}
      <section id="team" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 12, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>TEAM</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 16, letterSpacing: -1 }}>
            {L(t.teamTitle)}
          </h2>
          <p style={{ fontSize: 16, color: "#666", maxWidth: 600, lineHeight: 1.7, marginBottom: 48, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: L(t.teamDesc) }} />
        </FadeIn>

        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
...L(t.teamMembers),
          ].map((m, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: "32px 24px", background: "#111", border: "1px solid #1a1a1a",
                borderRadius: 8, textAlign: "center", transition: "all .3s",
                cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = m.color + "40"; e.currentTarget.style.background = "#131313"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.background = "#111"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{m.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{m.role}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: m.color, fontFamily: "'Syne',sans-serif" }}>{m.count}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="team-quote" style={{
            marginTop: 48, padding: "32px 40px", background: "linear-gradient(135deg, #111 0%, #0f1a14 100%)",
            border: "1px solid #00ff8815", borderRadius: 8,
          }}>
            <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.7, fontFamily: "'Syne',sans-serif" }}>
              <span style={{ color: "#00ff88" }}>"</span>
              <span dangerouslySetInnerHTML={{ __html: L(t.teamQuote1) }} />
              <span style={{ color: "#00ff88" }}>"</span>
            </p>
            <p style={{ fontSize: 13, color: "#555", marginTop: 12 }}>{L(t.teamQuote2)}</p>
          </div>
        </FadeIn>
      </section>

      <div className="glow-line" />

      {/* CONTACT */}
      <section id="contact" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)", textAlign: "center" }}>
        <FadeIn>
          <div style={{ display: "inline-flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 12, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>CONTACT</span>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 20, letterSpacing: -1 }}>
            {L(t.contactTitle1)}<br /><span style={{ color: "#00ff88" }}>{L(t.contactTitle2)}</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: 16, color: "#666", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: L(t.contactDesc) }} />
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="contact-buttons" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:94yoonbum@gmail.com" className="btn-primary" style={{ textDecoration: "none" }}>{L(t.contactBtn1)}</a>
            <a href="https://t.me/bbbeeeooommm" className="btn-outline" target="_blank" rel="noopener" style={{ textDecoration: "none" }}>Telegram</a>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="footer-wrap" style={{
        borderTop: "1px solid #1a1a1a", padding: "40px clamp(20px,8vw,120px)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>
          <span style={{ color: "#00ff88" }}>●</span> Mr. BEOM
        </div>
        <div style={{ fontSize: 12, color: "#444" }}>
          © 2026 — {L(t.footerTag)}
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.95)", zIndex: 10000,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>
          <img src={lightboxImg} alt="" style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
}
