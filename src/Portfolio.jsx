import { useState, useEffect, useRef } from "react";

const SECTIONS = ["HOME", "MILLIONSCAN", "ABOUT", "PROJECTS", "CAREER", "CAPABILITIES", "WORKFLOW", "CONTACT"];

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
  const [profileLightbox, setProfileLightbox] = useState(null);

  const t = {
    // Hero — 한 줄 포지셔닝만
    heroTag: { en: "WEB3 PM · BUILDING WITH AI", ko: "WEB3 PM · BUILDING WITH AI" },
    heroTitle1: { en: "I plan, I build,", ko: "기획하고, 빌드하고," },
    heroTitle2: { en: "I ship.", ko: "출시한다." },
    heroSub1: { en: "Web3 PM · AI-assisted product builder", ko: "Web3 프로덕트 매니저 · AI와 함께 빌드" },
    heroSub2: { en: "Started at Metakongz in 2021. 5+ years of experience across NFT/blockchain projects as a PM and contributor. Now building products solo with AI as my development partner — including MillionScan, soft-launched at millionscan.com.", ko: "2021년 한국 NFT 1세대 현장에서 시작해, 지금은 AI와 함께 라이브 프로덕트를 빌드하고 있습니다." },
    heroBtn1: { en: "VIEW LIVE PRODUCT →", ko: "라이브 프로덕트 보기 →" },
    heroBtn2: { en: "PROJECTS", ko: "프로젝트" },

    // Profile — 짧게 압축 (About로 흡수 전 단계)
    profileIntro: {
      en: "Started as a moderator at Metakongz in 2021. Now an AI-assisted Web3 product builder.",
      ko: "2021년 메타콩즈 모더레이터로 시작. 지금은 AI와 함께 빌드하는 Web3 프로덕트 빌더.",
    },
    profileCareer: {
      en: [
        { year: "2021–22", desc: "Metakongz — moderator + project planning" },
        { year: "2024", desc: "Art In Motion — NFT structure design & planning" },
        { year: "2024–26", desc: "Punkvism Holdings — NFT structure design across multiple drops" },
        { year: "2026–", desc: "MillionScan soft-launched · AI copy trading bot live-tested" },
      ],
      ko: [
        { year: "2021–22", desc: "메타콩즈 — 모더레이터 + 프로젝트 기획" },
        { year: "2024", desc: "아트인모션 — NFT 구조 설계 & 기획" },
        { year: "2024–26", desc: "펑크비즘 홀딩스 — 다수 드랍의 NFT 구조 설계" },
        { year: "2026–", desc: "MillionScan 소프트런칭 · AI 카피 봇 라이브 테스트" },
      ],
    },

    // MillionScan — Featured Product (Hero 바로 다음)
    msStatusLabel: { en: "LIVE PRODUCT · SOFT-LAUNCHED", ko: "라이브 프로덕트 · 소프트런칭" },
    msSubtitle: { en: "On-chain Perpetual Futures Trader Analytics", ko: "온체인 Perpetual Futures 트레이더 분석" },
    msTagline: {
      en: "A live SaaS I built solo, end-to-end, with AI as my development partner.",
      ko: "AI를 개발 파트너로 활용해 단독으로 끝까지 빌드한 라이브 SaaS.",
    },
    msDesc: {
      en: `Tracks <span style="color:#e8e6e3;font-weight:500">21,000+ on-chain perpetual futures traders</span> with a <span style="color:#e8e6e3;font-weight:500">68-point composite scoring system</span> (Profit Factor, Sharpe, MDD, Win Rate, Avg PnL). Automatic bot and wash-trading filters keep the dataset reliable. Liquidation Heatmap visualizes real-time liquidation prices.<br/><br/>Built <span style="color:#e8e6e3;font-weight:500">API-first</span> — REST + WebSocket + Python/TypeScript SDKs + OpenAPI spec — designed as a developer-grade data platform for AI-assisted research and trading workflows (Claude Code, Cursor, Cline, Aider). Crypto billing via NOWPayments (USDC).<br/><br/>Built end-to-end by me — service architecture, data pipelines, scoring engine, REST/WebSocket API, SDKs, web UI, and billing — with AI as my development partner.`,
      ko: `<span style="color:#e8e6e3;font-weight:500">21,000+ 온체인 Perpetual Futures 트레이더</span>를 <span style="color:#e8e6e3;font-weight:500">68점 컴포지트 스코어링 시스템</span>(Profit Factor, Sharpe, MDD, Win Rate, Avg PnL)으로 평가. 봇·자전거래성 트레이더를 자동 필터링해 데이터 품질을 유지합니다. Liquidation Heatmap으로 실시간 청산 가격을 시각화합니다.<br/><br/><span style="color:#e8e6e3;font-weight:500">API 우선 설계</span> — REST + WebSocket + Python/TypeScript SDK + OpenAPI spec — Claude Code, Cursor, Cline, Aider 등 AI 코딩 워크플로우를 위한 개발자 친화적인 데이터 플랫폼. NOWPayments(USDC) 크립토 결제.<br/><br/>서비스 구조, 데이터 파이프라인, 스코어링 엔진, REST/WebSocket API, SDK, 웹 UI, 결제까지 — AI를 개발 파트너로 활용해 본인이 직접 end-to-end로 빌드했습니다.`
    },
    msStats: {
      en: [
        { label: "STATUS", value: "Live · Stabilizing", color: "#00ff88" },
        { label: "TRADERS TRACKED", value: "21,000+", color: "#00aaff" },
        { label: "API", value: "REST + WS + SDKs", color: "#ff8800" },
        { label: "BUILT BY", value: "Solo · AI-assisted", color: "#ff4488" },
      ],
      ko: [
        { label: "상태", value: "라이브 · 안정화 중", color: "#00ff88" },
        { label: "추적 트레이더", value: "21,000+", color: "#00aaff" },
        { label: "API", value: "REST + WS + SDK", color: "#ff8800" },
        { label: "빌드 방식", value: "단독 빌드 (AI 활용)", color: "#ff4488" },
      ],
    },
    msImageCaptions: {
      en: ["Main dashboard — Big Moves & Asset Bias", "Liquidation Heatmap — real-time density viz", "Trader detail — score, ROI, positions", "Watchlist — alerts & top picks", "Developer API — curated, scored, filtered", "API reference — REST + WebSocket docs"],
      ko: ["메인 대시보드 — Big Moves & Asset Bias", "Liquidation Heatmap — 실시간 청산 밀도 시각화", "트레이더 상세 — 스코어·ROI·포지션", "워치리스트 — 알림 & Top Picks", "Developer API — 큐레이션·스코어링·필터링", "API 레퍼런스 — REST + WebSocket 문서"],
    },
    msTags: {
      en: ["On-chain Analytics", "Perpetual Futures", "68-point Scoring", "API-first", "REST + WebSocket", "Python · TypeScript SDK", "Liquidation Heatmap", "USDC Billing"],
      ko: ["온체인 분석", "Perpetual Futures", "68점 스코어링", "API 우선", "REST + WebSocket", "Python · TypeScript SDK", "Liquidation Heatmap", "USDC 결제"],
    },

    // About — 커리어 요약 (Hero와 다른 역할)
    aboutTitle1: { en: "Not just a planner —", ko: "모더레이터에서 시작해," },
    aboutTitle2: { en: "I build and ship.", ko: "AI와 함께, 직접 빌드합니다." },
    aboutDesc: {
      en: `I started in Web3 as a moderator at <span style="color:#e8e6e3;font-weight:500">Metakongz</span> in 2021 (Discord 50K+ at peak). Customer and community management was my main role, while I also participated in project planning. The on-the-ground experience became the foundation of my product instincts.<br/><br/>From there, I contributed to <span style="color:#e8e6e3;font-weight:500">7+ NFT/blockchain project launches as a PM and contributor</span> across Metakongz, Art In Motion, and Punkvism Holdings — covering NFT structure design (layers, rarity, metadata), service planning, community ops, and project management.<br/><br/>Now I'm <span style="color:#00ff88;font-weight:500">building products solo with AI as my development partner</span>. <a href="https://millionscan.com" target="_blank" rel="noopener" style="color:#00ff88;text-decoration:underline;text-underline-offset:3px;">MillionScan</a> is live; the AI copy trading bot was live-tested. For projects that need additional execution support, I can recruit and coordinate external designers and developers directly (most recently for VATICA's design phase).`,
      ko: `2021년 한국 NFT 1세대 현장이었던 <span style="color:#e8e6e3;font-weight:500">Metakongz</span>(전성기 디스코드 5만+)에서 모더레이터로 Web3에 진입했습니다. 유저 응대를 주 업무로 하면서 프로젝트 기획에도 참여 — 현장에서 쌓은 경험이 지금의 프로덕트 감각의 뿌리가 되었습니다.<br/><br/>이후 메타콩즈, 아트인모션, 펑크비즘 홀딩스를 거치며 <span style="color:#e8e6e3;font-weight:500">PM 및 프로젝트 참여로 7개 이상의 NFT/블록체인 프로젝트 런칭</span>에 기여 — NFT 구조 설계(레이어·레어리티·메타데이터), 서비스 기획, 커뮤니티 운영, 프로젝트 관리 담당.<br/><br/>이제는 <span style="color:#00ff88;font-weight:500">AI를 개발 파트너로 활용해 제품을 직접 빌드</span>합니다. <a href="https://millionscan.com" target="_blank" rel="noopener" style="color:#00ff88;text-decoration:underline;text-underline-offset:3px;">MillionScan</a>은 라이브 운영 중이고, AI 카피 매매 봇은 실제 환경에서 라이브 테스트를 마쳤습니다. 추가 실행 인력이 필요한 프로젝트는 외부 디자이너·개발자를 직접 섭외·관리할 수 있습니다 (최근 사례: VATICA 디자인 단계).`
    },
    aboutCards: {
      en: [
        { icon: "◆", title: "Early Web3 Field Experience", desc: "Started on the community front lines at Metakongz (Discord 50K+). Learned what users want through hands-on experience during the first wave of Korea's NFT market." },
        { icon: "◇", title: "NFT Structure & Planning", desc: "7+ project launches as a PM and contributor. Layer composition, rarity classification, asset QA, metadata management, generation handoff — full pipeline experience." },
        { icon: "●", title: "On-chain Product Planning", desc: "Beyond UI: I plan how products run on-chain — wallet flows, smart-contract-based participation and settlement flows, automatic prize-pool distribution. Brought this to VATICA." },
        { icon: "▲", title: "AI-Assisted Product Builder", desc: "MillionScan and the copy trading bot — built end-to-end as a solo product builder using AI as my development partner. Service design, data pipelines, APIs, web UI, billing — all by me." },
      ],
      ko: [
        { icon: "◆", title: "Web3 초기 현장 경험", desc: "메타콩즈(디스코드 5만+) 커뮤니티 최전선에서 시작. 한국 NFT 초기 시장의 현장에서 유저가 무엇을 원하는지 직접 익혔습니다." },
        { icon: "◇", title: "NFT 구조 설계 & 기획", desc: "PM 및 프로젝트 참여로 7+ 프로젝트 런칭. 레이어 구성, 레어리티 분류, 에셋 QA, 메타데이터 관리, 제너레이팅 핸드오프 — 풀 파이프라인 경험." },
        { icon: "●", title: "온체인 제품 시스템 기획", desc: "UI를 넘어 — 제품이 온체인에서 어떻게 굴러갈지 기획. 지갑 플로우, 스마트컨트랙트 기반 참여·정산 흐름, 상금 풀 자동 분배. VATICA에 이 접근 적용." },
        { icon: "▲", title: "AI 활용 프로덕트 빌더", desc: "MillionScan과 카피 매매 봇 — AI를 개발 파트너로 활용해 단독으로 end-to-end 빌드. 서비스 설계, 데이터 파이프라인, API, 웹 UI, 결제까지 전부 직접." },
      ],
    },

    // Projects (MillionScan은 위 별도 섹션에서 처리되므로 여기는 제외)
    projectsTitle1: { en: "Not just ideas —", ko: "아이디어에서 끝나지 않고," },
    projectsTitle2: { en: "built, tested, and shipped work.", ko: "빌드·테스트·출시까지 이어진 결과물." },

    // Bot
    botStatusLabel: { en: "LIVE-TESTED · PAUSED", ko: "라이브 테스트 완료 · 현재 운용 보류" },
    botSubtitle: { en: "AI Copy Trading Bot — origin of MillionScan", ko: "AI 카피 매매 봇 — MillionScan의 출발점" },
    botDesc: {
      en: `Built on <span style="color:#e8e6e3;font-weight:500">years of personal futures trading experience</span>. Designed custom indicators and a scoring framework to evaluate copy targets, then built a full pipeline: on-chain wallet tracking → target discovery → observation → data collection → copy execution.<br/><br/>Telegram-integrated control panel, real-time monitoring, bot/wash-trader filtering, security/risk-response logic. <span style="color:#e8e6e3;font-weight:500">Live-tested in a real trading environment.</span> Currently paused due to capital requirements.<br/><br/>The bot/wash filtering and scoring logic built here became the foundation for <a href="https://millionscan.com" target="_blank" rel="noopener" style="color:#ff8800;text-decoration:underline;text-underline-offset:3px;">MillionScan</a>'s data infrastructure.`,
      ko: `<span style="color:#e8e6e3;font-weight:500">개인 선물 트레이딩 경험</span>을 바탕으로 빌드. 카피 대상을 평가하는 개인 지표·스코어링 체계를 설계하고, 온체인 지갑 추적 → 대상 탐색 → 관찰 → 데이터 수집 → 카피 매매까지 이어지는 전체 파이프라인을 구축.<br/><br/>텔레그램 연동 제어판, 실시간 모니터링, 봇·자전거래 필터링, 보안·리스크 대응 구조. <span style="color:#e8e6e3;font-weight:500">실제 운용 환경에서 라이브 테스트 진행.</span> 현재는 자본 요건으로 인해 운용을 보류한 상태입니다.<br/><br/>여기서 만든 봇·자전거래 필터링과 스코어링 로직이 <a href="https://millionscan.com" target="_blank" rel="noopener" style="color:#ff8800;text-decoration:underline;text-underline-offset:3px;">MillionScan</a> 데이터 인프라의 기초가 되었습니다.`
    },
    botStats: {
      en: [
        { label: "STATUS", value: "Live-tested · Paused", color: "#00ff88" },
        { label: "BUILT BY", value: "Solo · AI-assisted", color: "#ff8800" },
        { label: "EVOLVED INTO", value: "MillionScan", color: "#ff4488" },
        { label: "ASSETS", value: "Code · Algorithm · Logs", color: "#00aaff" },
      ],
      ko: [
        { label: "상태", value: "라이브 테스트 완료 · 현재 운용 보류", color: "#00ff88" },
        { label: "빌드 방식", value: "단독 빌드 (AI 활용)", color: "#ff8800" },
        { label: "진화 결과", value: "MillionScan", color: "#ff4488" },
        { label: "보유 자산", value: "코드 · 알고리즘 · 운용기록", color: "#00aaff" },
      ],
    },
    botTags: {
      en: ["AI-Assisted Build", "Futures Trading Experience", "On-chain Tracking", "Scoring System", "Bot/Wash Filtering", "Telegram", "Live-tested", "MillionScan Origin"],
      ko: ["AI 활용 빌드", "선물 트레이딩 경험", "온체인 지갑 추적", "스코어링 시스템", "봇·자전거래 필터링", "텔레그램 연동", "라이브 테스트", "MillionScan 출발점"],
    },

    // VATICA
    vaticaStatusLabel: { en: "DESIGN COMPLETE · BUILD PAUSED", ko: "디자인 완료 · 빌드 보류" },
    vaticaSubtitle: { en: "Prediction Market Concept", ko: "예측 마켓 컨셉" },
    vaticaDesc: {
      en: `A blockchain-based <span style="color:#e8e6e3;font-weight:500">prediction market</span> I planned after Polymarket's emergence — adapted with a <span style="color:#e8e6e3;font-weight:500">Tinder-style swipe UX</span> to lower the entry barrier for casual users. Yes/No positions on real-world events.<br/><br/>I led <span style="color:#ff8800;font-weight:500">on-chain product system planning</span>: wallet connection, smart-contract-based participation and settlement flows, automatic prize-pool distribution. Service architecture, UX flows, feature specs, operational policy. <span style="color:#e8e6e3;font-weight:500">Recruited and managed an overseas designer directly</span> to bring the design phase to completion.<br/><br/><span style="color:#888;font-size:13px">Status: Design complete, development not started.</span>`,
      ko: `Polymarket의 등장을 보고 기획한 <span style="color:#e8e6e3;font-weight:500">블록체인 기반 예측 마켓</span>. 캐주얼 유저의 진입 장벽을 낮추기 위해 <span style="color:#e8e6e3;font-weight:500">Tinder 스타일 스와이프 UX</span>와 결합. 현실 세계 이벤트에 Yes/No 포지션을 잡는 구조입니다.<br/><br/><span style="color:#ff8800;font-weight:500">온체인 제품 시스템 기획</span> 담당: 지갑 연결, 스마트컨트랙트 기반 참여 및 정산 흐름, 상금 풀 자동 분배. 서비스 구조, UX 흐름, 기능 명세, 운영 정책까지 기획했습니다. <span style="color:#e8e6e3;font-weight:500">해외 디자이너를 직접 섭외·운영</span>해 디자인 단계를 완성.<br/><br/><span style="color:#888;font-size:13px">현재 상태: 디자인 완료, 개발 미착수.</span>`
    },
    vaticaIpNote: { en: "* Designs by the overseas designer I recruited and managed.", ko: "* 위 디자인은 직접 섭외·운영한 해외 디자이너의 작업물입니다." },
    vaticaRoles: {
      en: ["On-chain Product System Planning", "Service Architecture", "UX Flow (Tinder-style)", "Feature Specs", "Wallet Connection Flow", "Settlement Flow Planning", "Operational Policy", "Design Direction", "Overseas Designer Recruitment & Management"],
      ko: ["온체인 제품 시스템 기획", "서비스 구조 설계", "UX 흐름 (Tinder 스타일)", "기능 명세", "지갑 연결 플로우", "정산 흐름 기획", "운영 정책", "디자인 디렉션", "해외 디자이너 섭외·운영"],
    },

    // Web3 PM Career (Career section)
    careerTitle: { en: "Web3 PM Career", ko: "Web3 PM 경력" },
    careerSubtitle: { en: "PM / Contributor · 7+ NFT/blockchain project launches", ko: "PM 및 프로젝트 참여 · 7개+ NFT/블록체인 프로젝트 런칭 기여" },
    careerIntro: {
      en: `Across <span style="color:#e8e6e3;font-weight:500">Metakongz, Art In Motion, and Punkvism Holdings</span> — community ops, project planning, NFT structure design, project management.`,
      ko: `<span style="color:#e8e6e3;font-weight:500">메타콩즈, 아트인모션, 펑크비즘 홀딩스</span>를 거치며 — 커뮤니티 운영, 프로젝트 기획, NFT 구조 설계, 프로젝트 관리 담당.`
    },
    careerCompanies: {
      en: [
        {
          name: "METAKONGZ",
          period: "2021.11 — 2022.05",
          role: "Moderator + Project Planning",
          desc: "Customer and community management was my main role, while I also participated in project planning. Discord 50K+ at peak.",
          projects: [
            { name: "Metakongz NFT", note: "One of Korea's leading 1st-gen NFT projects" },
            { name: "Puuvilla Society", note: "Co-launched with Metakongz" },
          ],
          color: "#00ff88",
        },
        {
          name: "ART IN MOTION",
          period: "2024.02 — 2024.11",
          role: "Project Planning & Ops Lead (Contributor)",
          desc: "NFT parts/trait structure design — layer composition, rarity classification, asset QA, metadata management, generation handoff prep, final QA.",
          projects: [
            { name: "Impatient Tiger Social Club", note: "NFT collection" },
            { name: "Tokengaming.xyz", note: "Licensed crypto casino (no longer in operation)" },
            { name: "Tokenfighter", note: "NFT IP fighting game" },
          ],
          color: "#8888ff",
        },
        {
          name: "PUNKVISM HOLDINGS",
          period: "2024.11 — 2026.04",
          role: "Project Planning & Ops Lead (Contributor)",
          desc: "A successor studio founded by Metakongz leadership. NFT structure design across multiple drops. Combined community of 80K+ across Discord, KakaoTalk, and Telegram.",
          projects: [
            { name: "Punkvism Genesis", note: "" },
            { name: "Punkykongz", note: "" },
            { name: "Alya", note: "" },
            { name: "Punk Ha_G", note: "" },
          ],
          color: "#00aaff",
        },
      ],
      ko: [
        {
          name: "METAKONGZ",
          period: "2021.11 — 2022.05",
          role: "모더레이터 + 프로젝트 기획",
          desc: "유저 응대가 주 업무였고, 프로젝트 기획에도 참여했습니다. 전성기 디스코드 5만+.",
          projects: [
            { name: "Metakongz NFT", note: "한국 대표 1세대 NFT 프로젝트 중 하나" },
            { name: "푸빌라(Puuvilla Society)", note: "Metakongz에서 협력 발행" },
          ],
          color: "#00ff88",
        },
        {
          name: "ART IN MOTION",
          period: "2024.02 — 2024.11",
          role: "프로젝트 기획 및 운영 참여",
          desc: "NFT 파츠/트레이트 구조 설계 — 레이어 구성, 레어리티 분류, 에셋 QA, 메타데이터 관리, 제너레이팅 핸드오프, 최종 QA.",
          projects: [
            { name: "Impatient Tiger Social Club", note: "NFT 컬렉션" },
            { name: "Tokengaming.xyz", note: "라이선스 보유 크립토 카지노 (현재 운영 X)" },
            { name: "토큰파이터", note: "NFT IP 파이팅 게임" },
          ],
          color: "#8888ff",
        },
        {
          name: "PUNKVISM HOLDINGS",
          period: "2024.11 — 2026.04",
          role: "프로젝트 기획 및 운영 참여",
          desc: "메타콩즈 경영진의 후속 스튜디오. 다수 드랍의 NFT 구조 설계. 디스코드/카카오/텔레그램 통합 8만+ 커뮤니티 운영.",
          projects: [
            { name: "Punkvism Genesis", note: "" },
            { name: "Punkykongz", note: "" },
            { name: "Alya", note: "" },
            { name: "Punk Ha_G", note: "" },
          ],
          color: "#00aaff",
        },
      ],
    },

    // Capabilities (was Services)
    capabilitiesTitle1: { en: "What I can do —", ko: "할 수 있는 일 —" },
    capabilitiesTitle2: { en: "from planning to shipping.", ko: "기획부터 출시까지." },
    capabilityItems: {
      en: [
        { num: "01", title: "Web3 Product Planning", items: ["Service architecture", "NFT structure design (layers, rarity, metadata)", "Operational policy planning", "Roadmap planning & mgmt"] },
        { num: "02", title: "On-chain Product Planning", items: ["Wallet flow planning", "Smart-contract participation and settlement flows", "Prize-pool distribution systems", "Compliance-aware product flow"] },
        { num: "03", title: "AI-Assisted Product Build", items: ["End-to-end product build with AI", "Data pipelines & scoring engines", "REST/WebSocket APIs · SDKs", "Crypto billing integration"] },
        { num: "04", title: "Project Execution Management", items: ["External designer/developer coordination", "Timeline & resource control", "Communication & QA loops", "Operational documentation"] },
      ],
      ko: [
        { num: "01", title: "Web3 프로덕트 기획", items: ["서비스 구조 설계", "NFT 구조 설계 (레이어·레어리티·메타데이터)", "운영 정책 기획", "로드맵 수립 & 관리"] },
        { num: "02", title: "온체인 제품 기획", items: ["지갑 플로우 기획", "스마트컨트랙트 기반 참여·정산 흐름", "상금 풀 분배 시스템", "운영 정책 기반 제품 흐름"] },
        { num: "03", title: "AI 활용 프로덕트 빌드", items: ["AI 협업 end-to-end 빌드", "데이터 파이프라인 & 스코어링 엔진", "REST/WebSocket API · SDK", "크립토 결제 통합"] },
        { num: "04", title: "프로젝트 실행 관리", items: ["외부 디자이너·개발자 섭외 및 조율", "일정·리소스 관리", "커뮤니케이션 & QA 루프", "운영 문서화"] },
      ],
    },

    // Workflow (was Team)
    workflowTitle: { en: "AI first. External support when needed.", ko: "AI를 우선으로. 필요 시 외부 실행 지원." },
    workflowDesc: {
      en: "I primarily build with AI as my development partner — that's how MillionScan and the copy trading bot were built and launched.<br/>For projects requiring additional execution support, I can coordinate external designers and developers directly. Most recent example: VATICA's design phase.",
      ko: "기본적으로 AI를 주력 개발 파트너로 활용해 직접 빌드합니다 — MillionScan과 카피 매매 봇은 그렇게 빌드되고 출시/테스트되었습니다.<br/>추가 실행 인력이 필요한 프로젝트는 외부 디자이너·개발자를 직접 섭외·관리할 수 있습니다. 가장 최근 사례: VATICA 디자인 단계."
    },
    workflowCapabilities: {
      en: [
        { role: "AI as Build Partner", count: "PRIMARY", color: "#00ff88" },
        { role: "Blockchain Full-stack", count: "Coordinable", color: "#00aaff" },
        { role: "Web Dev / Design", count: "Coordinable", color: "#ff88ff" },
        { role: "Planning · PM · Ops", count: "ME", color: "#ff8800" },
      ],
      ko: [
        { role: "AI 빌드 파트너", count: "주력", color: "#00ff88" },
        { role: "블록체인 풀스택", count: "조율 가능", color: "#00aaff" },
        { role: "웹 개발 / 디자인", count: "조율 가능", color: "#ff88ff" },
        { role: "기획 · PM · 운영", count: "ME", color: "#ff8800" },
      ],
    },
    workflowQuote1: {
      en: "Working with me does not stop at planning —<br/>it leads to shipped products.",
      ko: "저와 함께하면 기획에서 끝나지 않고,<br/>실제 출시까지 이어집니다."
    },
    workflowQuote2: { en: "That's how I deliver value.", ko: "이것이 제가 드리는 가치입니다." },

    // Contact
    contactTitle1: { en: "Let's move your", ko: "프로젝트를 함께" },
    contactTitle2: { en: "project forward.", ko: "실행해봅시다." },
    contactDesc: {
      en: "Looking for a Web3 PM who can plan, build, and ship? Reach out.",
      ko: "기획·빌드·출시까지 가능한 Web3 PM을 찾고 계신가요? 연락 주세요."
    },
    contactBtn1: { en: "SEND EMAIL →", ko: "이메일 보내기 →" },

    // Footer
    footerTag: { en: "Web3 PM · AI-assisted product builder", ko: "Web3 PM · AI와 함께 빌드" },

    // Gallery hint
    galleryHint: { en: "Swipe to view →", ko: "스와이프해서 보기 →" },
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
        ::selection { background: #00ff8830; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 3px; }
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
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
          animation: grain 8s steps(10) infinite;
          pointer-events:none; z-index:9999; opacity:0.35;
        }
        /* Tags use soft green / muted */
        .tag { display:inline-block; padding:6px 14px; border:1px solid #00ff8830; color:#7fcca3; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; border-radius:2px; font-family:'Outfit',sans-serif; background: rgba(0, 255, 136, 0.04); }
        /* Live tag uses full neon green */
        .tag-live { display:inline-block; padding:6px 14px; border:1px solid #00ff88; color:#00ff88; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; border-radius:2px; font-family:'Outfit',sans-serif; background: rgba(0, 255, 136, 0.08); }
        /* Glow line - softer & only used between major transitions */
        .glow-line { height:1px; background:linear-gradient(90deg,transparent,#00ff8825,transparent); }
        a { color:#00ff88; text-decoration:none; }
        .card { background:#111; border:1px solid #1a1a1a; border-radius:8px; padding:32px; transition: all .3s ease; }
        .card:hover { border-color:#2a2a2a; background:#131313; transform:translateY(-2px); }
        .btn-primary { display:inline-flex; align-items:center; gap:8px; padding:14px 32px; background:#00ff88; color:#0a0a0a; font-weight:700; font-size:14px; letter-spacing:1px; text-transform:uppercase; border:none; cursor:pointer; border-radius:4px; font-family:'Outfit',sans-serif; transition:all .2s; }
        .btn-primary:hover { background:#00ffaa; box-shadow:0 0 30px #00ff8830; }
        .btn-outline { display:inline-flex; align-items:center; gap:8px; padding:14px 32px; background:transparent; color:#e8e6e3; font-weight:600; font-size:14px; letter-spacing:1px; text-transform:uppercase; border:1px solid #333; cursor:pointer; border-radius:4px; font-family:'Outfit',sans-serif; transition:all .2s; }
        .btn-outline:hover { border-color:#00ff88; color:#00ff88; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        /* Desktop layout */
        section, footer { max-width: 1200px; margin-left: auto; margin-right: auto; }
        @media(min-width:769px) {
          .ms-gallery {
            display: grid !important; grid-template-columns: repeat(3, 1fr) !important;
            overflow-x: visible !important;
          }
          .ms-gallery > div { min-width: unset !important; width: auto !important; }
          .ms-gallery img { height: 320px !important; }
          .vatica-gallery {
            display: grid !important; grid-template-columns: repeat(4, 1fr) !important;
            overflow-x: visible !important;
          }
          .vatica-gallery > div { min-width: unset !important; width: auto !important; }
          .vatica-gallery img { height: 420px !important; }
          .bot-gallery {
            display: grid !important; grid-template-columns: repeat(3, 1fr) !important;
            overflow-x: visible !important;
          }
          .bot-gallery > div { min-width: unset !important; width: auto !important; }
          .bot-gallery img { height: 550px !important; }
          .gallery-hint { display: none !important; }
        }

        /* Mobile Responsive */
        @media(max-width:768px) {
          body { line-height: 1.65; }
          .hero-section { padding-top: 120px !important; }
          .hero-stats { gap: 24px !important; }
          .hero-stats > div > div:first-child { font-size: 28px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .capabilities-grid { grid-template-columns: 1fr !important; }
          .capabilities-grid > div > div { border-right: none !important; }
          .ms-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .bot-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .workflow-grid { grid-template-columns: 1fr 1fr !important; }
          .workflow-quote { padding: 24px 20px !important; }
          .workflow-quote p:first-child { font-size: 15px !important; }
          .vatica-header { flex-direction: column !important; }
          .footer-wrap { flex-direction: column !important; text-align: center !important; gap: 12px !important; }
          .companies-grid { grid-template-columns: 1fr !important; }
          /* Image galleries: horizontal scroll w/ peek + snap */
          .ms-gallery, .vatica-gallery, .bot-gallery {
            display: flex !important; overflow-x: auto !important;
            grid-template-columns: unset !important; gap: 12px !important;
            scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
            padding-bottom: 8px; padding-right: 40px;
          }
          .ms-gallery > div, .vatica-gallery > div, .bot-gallery > div {
            flex-shrink: 0 !important;
            scroll-snap-align: start;
          }
          .ms-gallery > div { min-width: 280px !important; }
          .vatica-gallery > div { min-width: 240px !important; }
          .bot-gallery > div { min-width: 250px !important; }
          .ms-gallery img { height: 200px !important; object-fit: cover; object-position: top; }
          .vatica-gallery img { min-height: 200px; object-fit: cover; }
          .bot-gallery img { min-height: 180px; object-fit: cover; }
          /* Scrollbar styling */
          .ms-gallery::-webkit-scrollbar, .vatica-gallery::-webkit-scrollbar, .bot-gallery::-webkit-scrollbar { height: 4px; }
          .ms-gallery::-webkit-scrollbar-track, .vatica-gallery::-webkit-scrollbar-track, .bot-gallery::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 2px; }
          .ms-gallery::-webkit-scrollbar-thumb, .vatica-gallery::-webkit-scrollbar-thumb, .bot-gallery::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
        }
        @media(max-width:480px) {
          .hero-section { padding-top: 130px !important; }
          .hero-stats { gap: 20px !important; }
          .hero-stats > div > div:first-child { font-size: 24px !important; }
          .ms-stats-grid { grid-template-columns: 1fr !important; }
          .bot-stats-grid { grid-template-columns: 1fr !important; }
          .workflow-grid { grid-template-columns: 1fr !important; }
          .contact-buttons { flex-direction: column !important; align-items: center !important; }
          .contact-buttons a, .contact-buttons button { width: 100% !important; justify-content: center !important; }
          .ms-gallery > div { min-width: 260px !important; }
          .vatica-gallery > div { min-width: 220px !important; }
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
          <span style={{ color: "#00ff88" }}>●</span> {lang === "en" ? "Heo Yun-Beom" : "허윤범"}
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {SECTIONS.map(s => (
            <div key={s} onClick={() => scrollTo(s)} style={{
              fontSize: 11, letterSpacing: 1.5, cursor: "pointer", fontWeight: 500,
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
          background: "radial-gradient(circle, #00ff8806 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none",
        }} />

        <FadeIn delay={0.1}>
          <div className="tag" style={{ marginBottom: 28 }}>{L(t.heroTag)}</div>
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
          <p style={{ fontSize: 18, color: "#aaa", maxWidth: 680, lineHeight: 1.7, marginTop: 28, fontWeight: 400 }}>
            <span style={{ color: "#7fcca3", fontWeight: 600 }}>{L(t.heroSub1)}</span><br />
            {L(t.heroSub2)}
          </p>
        </FadeIn>
        <FadeIn delay={0.5}>
          <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
            <a href="https://millionscan.com" target="_blank" rel="noopener" className="btn-primary" style={{ textDecoration: "none" }}>{L(t.heroBtn1)}</a>
            <button className="btn-outline" onClick={() => scrollTo("PROJECTS")}>{L(t.heroBtn2)}</button>
          </div>
        </FadeIn>

        <FadeIn delay={0.7}>
          <div className="hero-stats" style={{ display: "flex", gap: 48, marginTop: 80, flexWrap: "wrap" }}>
            {[
              { num: "5+", label: lang === "en" ? "Years in Web3" : "Web3 경험 (년)" },
              { num: "7+", label: lang === "en" ? "NFT/Blockchain Projects" : "NFT/블록체인 프로젝트" },
              { num: "1", label: lang === "en" ? "Live Product" : "라이브 프로덕트" },
              { num: "AI+", label: lang === "en" ? "AI-assisted Build Mode" : "AI 활용 빌드 방식" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: "#00ff88" }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "#777", letterSpacing: 1.5, marginTop: 4, textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Compact profile strip — replaces standalone Profile section */}
        <FadeIn delay={0.9}>
          <div style={{
            marginTop: 60, padding: "20px 24px", border: "1px solid #1a1a1a", borderRadius: 8,
            background: "#0d0d0d", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <img src="/pfp.jpg" alt={lang === "en" ? "Heo Yun-Beom (NFT avatar)" : "허윤범 (NFT 아바타)"} onClick={() => setProfileLightbox("/pfp.jpg")} style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #00ff8830", objectFit: "cover", position: "relative", zIndex: 1, cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
              <img src="/profile-real.jpg" alt={lang === "en" ? "Heo Yun-Beom" : "허윤범"} onClick={() => setProfileLightbox("/profile-real.jpg")} style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #0d0d0d", objectFit: "cover", marginLeft: -16, position: "relative", zIndex: 2, boxShadow: "0 0 0 1px #1a1a1a", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.zIndex = "3"; }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.zIndex = "2"; }} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lang === "en" ? "Heo Yun-Beom" : "허윤범"}</div>
              <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{L(t.profileIntro)}</div>
            </div>
            <span style={{ padding: "6px 14px", border: "1px solid #00ff8830", borderRadius: 16, fontSize: 12, color: "#7fcca3", fontWeight: 500, flexShrink: 0 }}>Web3 PM · Building with AI</span>
          </div>
        </FadeIn>
      </section>

      <div className="glow-line" />

      {/* MILLIONSCAN — FEATURED PRODUCT (NEW POSITION) */}
      <section id="millionscan" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 13, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>{lang === "en" ? "FEATURED PRODUCT" : "주력 프로덕트"}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ padding: "clamp(28px,4vw,56px)", background: "linear-gradient(135deg, #111 0%, #0d1a13 100%)", border: "1px solid #00ff8825", borderRadius: 12, position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: -100, right: -100, width: 400, height: 400,
              background: "radial-gradient(circle, #00ff8810 0%, transparent 70%)",
              borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none",
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24, position: "relative" }}>
              <div>
                <a href="https://millionscan.com" target="_blank" rel="noopener" style={{ display: "block", marginBottom: 16, width: "fit-content" }}>
                  <img src="/millionscan-logo.png" alt="MillionScan" style={{ height: 64, width: "auto", display: "block", opacity: 0.95, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.95"} />
                </a>
                <div className="tag-live" style={{ marginBottom: 20 }}>
                  <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#00ff88", marginRight: 8, animation: "pulse 2s infinite", verticalAlign: "middle" }} />
                  {L(t.msStatusLabel)}
                </div>
                <p style={{ fontSize: "clamp(18px,2.2vw,24px)", color: "#e8e6e3", fontWeight: 600, letterSpacing: -0.3, marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>
                  {L(t.msSubtitle)}
                </p>
                <p style={{ fontSize: 15, color: "#aaa", fontWeight: 400, fontStyle: "italic", maxWidth: 560 }}>
                  {L(t.msTagline)}
                </p>
              </div>
              <a href="https://millionscan.com" target="_blank" rel="noopener" className="btn-primary" style={{ textDecoration: "none", flexShrink: 0 }}>
                VIEW LIVE →
              </a>
            </div>

            <p style={{ fontSize: 15, color: "#bbb", lineHeight: 1.9, maxWidth: 800, marginBottom: 32, fontWeight: 400, position: "relative" }} dangerouslySetInnerHTML={{ __html: L(t.msDesc) }} />

            {/* Image gallery */}
            <div style={{ marginBottom: 32, position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#777", letterSpacing: 2, fontWeight: 600, textTransform: "uppercase" }}>
                  {lang === "en" ? "Product Screens" : "프로덕트 화면"}
                </div>
                <div className="gallery-hint" style={{ fontSize: 11, color: "#666", letterSpacing: 1, fontStyle: "italic" }}>
                  {L(t.galleryHint)}
                </div>
              </div>
              <div className="ms-gallery" style={{ display: "flex", overflowX: "auto", gap: 12, WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory", scrollBehavior: "smooth", paddingBottom: 8 }}>
                {[
                  { src: "/millionscan/01_main_dark.png", label: L(t.msImageCaptions)[0] },
                  { src: "/millionscan/02_heatmap.png", label: L(t.msImageCaptions)[1] },
                  { src: "/millionscan/03_trader_detail.png", label: L(t.msImageCaptions)[2] },
                  { src: "/millionscan/04_watchlist.png", label: L(t.msImageCaptions)[3] },
                  { src: "/millionscan/05_dev_api.png", label: L(t.msImageCaptions)[4] },
                  { src: "/millionscan/06_api_reference.png", label: L(t.msImageCaptions)[5] },
                ].map((item, i) => (
                  <div key={i} style={{
                    borderRadius: 8, overflow: "hidden", border: "1px solid #1a1a1a",
                    background: "#0d0d0d", transition: "all .3s", cursor: "pointer",
                    width: 280, flexShrink: 0, scrollSnapAlign: "start", scrollSnapStop: "always",
                  }}
                  onClick={() => setLightboxImg(item.src)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ff8840"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.transform = "none"; }}
                  >
                    <img src={item.src} alt={item.label} style={{ width: "100%", height: 200, display: "block", objectFit: "cover", objectPosition: "top" }} />
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: 12, color: "#999", fontWeight: 400, lineHeight: 1.4 }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="ms-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28, position: "relative" }}>
              {L(t.msStats).map((s, i) => (
                <div key={i} style={{ padding: "16px", background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 72 }}>
                  <div style={{ fontSize: 10, color: "#777", letterSpacing: 1.5, marginBottom: 6, textTransform: "uppercase" }}>{s.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: s.color, fontFamily: "'Syne',sans-serif", lineHeight: 1.3 }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", position: "relative" }}>
              {L(t.msTags).map(tag => (
                <span key={tag} style={{
                  padding: "5px 11px", background: "#1a1a1a", borderRadius: 3,
                  fontSize: 12, color: "#999", fontWeight: 400,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="glow-line" />

      {/* ABOUT */}
      <section id="about" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 13, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>ABOUT</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 20, letterSpacing: -1 }}>
            {L(t.aboutTitle1)}<br /><span style={{ color: "#00ff88" }}>{L(t.aboutTitle2)}</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p style={{ fontSize: 17, color: "#aaa", lineHeight: 2, maxWidth: 720, marginBottom: 48, fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: L(t.aboutDesc) }} />
        </FadeIn>

        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {L(t.aboutCards).map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="card" style={{ height: "100%" }}>
                <div style={{ fontSize: 22, color: "#7fcca3", marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#999", lineHeight: 1.7, fontWeight: 400 }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 13, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>PROJECTS</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 48, letterSpacing: -1 }}>
            {L(t.projectsTitle1)}<br /><span style={{ color: "#888" }}>{L(t.projectsTitle2)}</span>
          </h2>
        </FadeIn>

        {/* Bot */}
        <FadeIn delay={0.1}>
          <div style={{ marginBottom: 48, padding: "clamp(28px,4vw,56px)", background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: -60, right: -60, width: 300, height: 300,
              background: "radial-gradient(circle, #ff880008 0%, transparent 70%)",
              borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none",
            }} />
            <div className="tag" style={{ borderColor: "#ff880030", color: "#c89a6f", marginBottom: 16, background: "rgba(255, 136, 0, 0.04)" }}>{L(t.botStatusLabel)}</div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, marginBottom: 4, letterSpacing: -0.5 }}>
              {lang === "en" ? "AI Copy Trading Bot" : "AI 카피 트레이딩 봇"}
            </h3>
            <p style={{ fontSize: 14, color: "#c89a6f", fontWeight: 500, marginBottom: 20, letterSpacing: 0.5 }}>
              {L(t.botSubtitle)}
            </p>
            <p style={{ fontSize: 15, color: "#aaa", lineHeight: 1.9, maxWidth: 720, marginBottom: 28, fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: L(t.botDesc) }} />

            {/* Bot Telegram Screenshots */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#777", letterSpacing: 2, fontWeight: 600, textTransform: "uppercase" }}>
                  Live System
                </div>
                <div className="gallery-hint" style={{ fontSize: 11, color: "#666", letterSpacing: 1, fontStyle: "italic" }}>
                  {L(t.galleryHint)}
                </div>
              </div>
              <div className="bot-gallery" style={{ display: "flex", overflowX: "auto", gap: 12, WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory", scrollBehavior: "smooth", paddingBottom: 8 }}>
                {[
                  { src: "/bot-01.jpg", label: "AI Report · VIP" },
                  { src: "/bot-02.jpg", label: "Target Ranking & Scoring" },
                  { src: "/bot-03.jpg", label: "Positions · Daily PnL" },
                ].map((item, i) => (
                  <div key={i} style={{
                    borderRadius: 8, overflow: "hidden", border: "1px solid #1a1a1a",
                    background: "#0d0d0d", transition: "all .3s", cursor: "pointer",
                    width: 250, flexShrink: 0, scrollSnapAlign: "start", scrollSnapStop: "always",
                  }}
                  onClick={() => setLightboxImg(item.src)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff880030"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.transform = "none"; }}
                  >
                    <img src={item.src} alt={item.label} style={{ width: "100%", height: 280, display: "block", objectFit: "cover", objectPosition: "top" }} />
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: 13, color: "#999", fontWeight: 400 }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bot Stats */}
            <div className="bot-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
              {L(t.botStats).map((s, i) => (
                <div key={i} style={{ padding: "16px", background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 8, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 72 }}>
                  <div style={{ fontSize: 10, color: "#777", letterSpacing: 1.5, marginBottom: 6, textTransform: "uppercase" }}>{s.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: s.color, fontFamily: "'Syne',sans-serif", lineHeight: 1.3 }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {L(t.botTags).map(tag => (
                <span key={tag} style={{
                  padding: "5px 11px", background: "#1a1a1a", borderRadius: 3,
                  fontSize: 12, color: "#999", fontWeight: 400,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* VATICA */}
        <FadeIn delay={0.15}>
          <div style={{ marginBottom: 0, padding: "clamp(28px,4vw,56px)", background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: -60, right: -60, width: 300, height: 300,
              background: "radial-gradient(circle, #ff880008 0%, transparent 70%)",
              borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none",
            }} />

            <div className="vatica-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
              <div>
                <div className="tag" style={{ marginBottom: 16, borderColor: "#ff880030", color: "#c89a6f", background: "rgba(255, 136, 0, 0.04)" }}>{L(t.vaticaStatusLabel)}</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: -0.5 }}>
                  VATICA
                </h3>
                <p style={{ fontSize: 14, color: "#c89a6f", fontWeight: 500, marginTop: 4, letterSpacing: 0.5 }}>
                  {L(t.vaticaSubtitle)}
                </p>
              </div>
            </div>

            <p style={{ fontSize: 15, color: "#aaa", lineHeight: 1.9, maxWidth: 720, marginBottom: 32, fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: L(t.vaticaDesc) }} />

            {/* App Design Showcase */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#777", letterSpacing: 2, fontWeight: 600, textTransform: "uppercase" }}>
                  {lang === "en" ? "App Design" : "앱 디자인"}
                </div>
                <div className="gallery-hint" style={{ fontSize: 11, color: "#666", letterSpacing: 1, fontStyle: "italic" }}>
                  {L(t.galleryHint)}
                </div>
              </div>
              <div className="vatica-gallery" style={{ display: "flex", overflowX: "auto", gap: 12, WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory", scrollBehavior: "smooth", paddingBottom: 8 }}>
                {[
                  { src: "/vatica/05_markets.jpg", label: lang === "en" ? "Markets — Swipe UX" : "Markets — 스와이프 UX" },
                  { src: "/vatica/04_portfolio.jpg", label: lang === "en" ? "Portfolio & P/L" : "포트폴리오 & 손익" },
                  { src: "/vatica/01_wallet_connect.jpg", label: lang === "en" ? "Wallet Connect" : "지갑 연결" },
                  { src: "/vatica/02_onboarding.jpg", label: lang === "en" ? "Onboarding & TOS" : "온보딩 & 약관" },
                  { src: "/vatica/03_how_it_works.jpg", label: lang === "en" ? "How It Works" : "사용 방법" },
                ].map((item, i) => (
                  <div key={i} style={{
                    borderRadius: 8, overflow: "hidden", border: "1px solid #1a1a1a",
                    background: "#0d0d0d", transition: "all .3s", cursor: "pointer",
                    width: 240, flexShrink: 0, scrollSnapAlign: "start", scrollSnapStop: "always",
                  }}
                  onClick={() => setLightboxImg(item.src)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff880030"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.transform = "none"; }}
                  >
                    <img src={item.src} alt={item.label} style={{ width: "100%", height: 420, display: "block", objectFit: "cover", objectPosition: "top" }} />
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: 13, color: "#999", fontWeight: 400 }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#666", marginTop: 10, fontStyle: "italic" }}>
                {L(t.vaticaIpNote)}
              </p>
            </div>

            {/* My Role */}
            <div style={{ padding: "20px 24px", background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: "#c89a6f", letterSpacing: 2, marginBottom: 12, fontWeight: 600, textTransform: "uppercase" }}>My Role</div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {L(t.vaticaRoles).map(r => (
                  <div key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 5, height: 5, background: "#c89a6f", borderRadius: "50%" }} />
                    <span style={{ fontSize: 13, color: "#999", fontWeight: 400 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
              {(lang === "en" ? ["Prediction Market", "Web3 Service", "Tinder-style UX", "Wallet Connect", "On-chain Settlement Flow", "USDC", "Mobile-first", "Overseas Designer"] : ["예측 마켓", "Web3 서비스", "Tinder 스타일 UX", "지갑 연결", "온체인 정산 흐름", "USDC", "Mobile-first", "해외 디자이너"]).map(tag => (
                <span key={tag} style={{
                  padding: "5px 11px", background: "#1a1a1a", borderRadius: 3,
                  fontSize: 12, color: "#999", fontWeight: 400,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="glow-line" />

      {/* WEB3 CAREER */}
      <section id="career" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 13, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>{lang === "en" ? "WEB3 CAREER" : "WEB3 경력"}</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 8, letterSpacing: -1 }}>
            {L(t.careerTitle)}
          </h2>
          <p style={{ fontSize: 15, color: "#7fcca3", fontWeight: 500, marginBottom: 20, letterSpacing: 0.3 }}>
            {L(t.careerSubtitle)}
          </p>
          <p style={{ fontSize: 16, color: "#aaa", lineHeight: 1.8, maxWidth: 720, marginBottom: 40, fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: L(t.careerIntro) }} />
        </FadeIn>

        {/* Companies grid */}
        <div className="companies-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {L(t.careerCompanies).map((company, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: "24px 20px", background: "#0d0d0d", border: `1px solid ${company.color}20`,
                borderRadius: 8, transition: "all .3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = company.color + "50"; e.currentTarget.style.background = "#101010"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = company.color + "20"; e.currentTarget.style.background = "#0d0d0d"; }}
              >
                <div style={{ fontSize: 11, color: company.color, letterSpacing: 1.5, marginBottom: 4, fontWeight: 600, fontFamily: "'Syne',sans-serif" }}>{company.period}</div>
                <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 4, letterSpacing: -0.3, color: "#e8e6e3" }}>{company.name}</h4>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 12, fontWeight: 500 }}>{company.role}</div>
                <p style={{ fontSize: 13, color: "#999", lineHeight: 1.7, marginBottom: 14, fontWeight: 400 }}>{company.desc}</p>
                <div style={{ paddingTop: 12, borderTop: "1px solid #1a1a1a" }}>
                  <div style={{ fontSize: 10, color: "#666", letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase", fontWeight: 600 }}>
                    {lang === "en" ? "Projects" : "프로젝트"}
                  </div>
                  {company.projects.map((p, j) => (
                    <div key={j} style={{ marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#ddd", fontWeight: 500 }}>{p.name}</span>
                      {p.note && <span style={{ fontSize: 12, color: "#777", marginLeft: 6, fontWeight: 400 }}>· {p.note}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="glow-line" />

      {/* CAPABILITIES (was SERVICES) */}
      <section id="capabilities" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 13, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>{lang === "en" ? "CAPABILITIES" : "핵심 역량"}</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 48, letterSpacing: -1 }}>
            {L(t.capabilitiesTitle1)} <span style={{ color: "#7fcca3" }}>{L(t.capabilitiesTitle2)}</span>
          </h2>
        </FadeIn>

        <div className="capabilities-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
          {L(t.capabilityItems).map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                padding: "40px 32px", borderBottom: "1px solid #1a1a1a",
                borderRight: "1px solid #1a1a1a", transition: "background .3s",
                cursor: "default",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#111"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 48, fontWeight: 800, color: "transparent", marginBottom: 16,
                  WebkitTextStroke: "1px #00ff8830",
                }}>{s.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, fontFamily: "'Syne',sans-serif" }}>{s.title}</h3>
                {s.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 4, height: 4, background: "#7fcca3", borderRadius: "50%" }} />
                    <span style={{ fontSize: 14, color: "#999", fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* WORKFLOW (was TEAM) */}
      <section id="workflow" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 13, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>{lang === "en" ? "AI WORKFLOW" : "AI 워크플로우"}</span>
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 16, letterSpacing: -1 }}>
            {L(t.workflowTitle)}
          </h2>
          <p style={{ fontSize: 16, color: "#888", maxWidth: 720, lineHeight: 1.7, marginBottom: 48, fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: L(t.workflowDesc) }} />
        </FadeIn>

        <div className="workflow-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {L(t.workflowCapabilities).map((m, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: "32px 24px", background: "#111", border: "1px solid #1a1a1a",
                borderRadius: 8, textAlign: "center", transition: "all .3s",
                cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = m.color + "40"; e.currentTarget.style.background = "#131313"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.background = "#111"; }}
              >
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{m.role}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: m.color, fontFamily: "'Syne',sans-serif", letterSpacing: 0.5 }}>{m.count}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="workflow-quote" style={{
            marginTop: 48, padding: "32px 40px", background: "linear-gradient(135deg, #111 0%, #0f1a14 100%)",
            border: "1px solid #00ff8815", borderRadius: 8,
          }}>
            <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.7, fontFamily: "'Syne',sans-serif" }}>
              <span style={{ color: "#00ff88" }}>"</span>
              <span dangerouslySetInnerHTML={{ __html: L(t.workflowQuote1) }} />
              <span style={{ color: "#00ff88" }}>"</span>
            </p>
            <p style={{ fontSize: 13, color: "#777", marginTop: 12 }}>{L(t.workflowQuote2)}</p>
          </div>
        </FadeIn>
      </section>

      <div className="glow-line" />

      {/* CONTACT */}
      <section id="contact" style={{ padding: "clamp(60px,10vw,140px) clamp(20px,8vw,120px)", textAlign: "center" }}>
        <FadeIn>
          <div style={{ display: "inline-flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
            <span style={{ fontSize: 13, color: "#00ff88", letterSpacing: 2, fontWeight: 500 }}>CONTACT</span>
            <div style={{ width: 32, height: 1, background: "#00ff88" }} />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 20, letterSpacing: -1 }}>
            {L(t.contactTitle1)}<br /><span style={{ color: "#00ff88" }}>{L(t.contactTitle2)}</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: 16, color: "#888", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: L(t.contactDesc) }} />
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="contact-buttons" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:94yoonbum@gmail.com" className="btn-primary" style={{ textDecoration: "none" }}>{L(t.contactBtn1)}</a>
            <a href="https://t.me/bbbeeeooommm" className="btn-outline" target="_blank" rel="noopener" style={{ textDecoration: "none" }}>Telegram</a>
            <a href="https://millionscan.com" target="_blank" rel="noopener" className="btn-outline" style={{ textDecoration: "none" }}>MillionScan ↗</a>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="footer-wrap" style={{
        borderTop: "1px solid #1a1a1a", padding: "40px clamp(20px,8vw,120px)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>
          <span style={{ color: "#00ff88" }}>●</span> {lang === "en" ? "Heo Yun-Beom" : "허윤범"}
        </div>
        <div style={{ fontSize: 13, color: "#666" }}>
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

      {/* Small profile lightbox — modest size */}
      {profileLightbox && (
        <div onClick={() => setProfileLightbox(null)} style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.85)", zIndex: 10000,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", backdropFilter: "blur(8px)",
        }}>
          <img src={profileLightbox} alt="" style={{
            width: "min(320px, 70vw)", height: "min(320px, 70vw)",
            borderRadius: "50%", objectFit: "cover",
            border: "3px solid #00ff8840",
            boxShadow: "0 0 80px rgba(0, 255, 136, 0.15)",
          }} />
        </div>
      )}
    </div>
  );
}
