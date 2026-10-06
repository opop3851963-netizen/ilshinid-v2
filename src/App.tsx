import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  ChevronRight, 
  Phone, 
  ShieldCheck, 
  Award, 
  LayoutPanelLeft, 
  MapPin, 
  Menu, 
  X,
  SquareChartGantt,
  CheckCircle2,
  Gem,
  Leaf,
  Clock,
  Printer,
  Calendar,
  Sparkles,
  ArrowUpRight,
  FileText,
  Building,
  Paintbrush,
  Layers,
  Send,
  Check
} from "lucide-react";
import { useState, FormEvent } from "react";

// Portfolio Data
const PORTFOLIO_CATEGORIES = [
  { id: "all", label: "전체 실적" },
  { id: "interior", label: "실내건축공사" },
  { id: "coating", label: "도장·습식·방수·석공사" },
  { id: "public", label: "관공서 & 교육시설" },
];

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    category: "interior",
    categoryLabel: "실내건축공사",
    title: "한국잡월드 라운지 & 공간 리모델링",
    client: "한국잡월드",
    period: "2025.10 - 2025.12",
    location: "경기도 성남시",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
    description: "친환경 자재를 활용한 밝고 모던한 공공 휴게 인프라 및 다목적 라운지 실내건축공사",
    features: ["친환경 E0 등급 자재 적용", "LED 저전력 스마트 조명 설계", "공공기관 가이드라인 준수"]
  },
  {
    id: 2,
    category: "public",
    categoryLabel: "관공서 & 교육시설",
    title: "광명시청 장애인 이음센터 조성 공사",
    client: "광명시청",
    period: "2025.07 - 2025.09",
    location: "경기도 광명시",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000",
    description: "무장애(Barrier-Free) 설계 기준을 적용한 차별 없는 맞춤형 공공 복지 인프라 구축",
    features: ["여성기업 수의계약 체결", "BF(무장애) 공간 동선 설계", "인체 무해 도료 시공"]
  },
  {
    id: 3,
    category: "interior",
    categoryLabel: "실내건축공사",
    title: "곡정고등학교 스마트 학습 공간 리모델링",
    client: "경기도교육청",
    period: "2025.04 - 2025.06",
    location: "경기도 수원시",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1000",
    description: "창의적 학습을 지원하는 밝은 채광 중심의 미래형 고등학교 스터디 커먼스 환경개선",
    features: ["학생 친환경 안전 자재", "소음 차단 음향 방음재", "유해물질 Zero 공법"]
  },
  {
    id: 4,
    category: "coating",
    categoryLabel: "도장·습식·방수·석공사",
    title: "중랑소방서 외벽 고성능 방수 & 도장 공사",
    client: "서울특별시 소방재난본부",
    period: "2025.02 - 2025.03",
    location: "서울특별시 중랑구",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000",
    description: "내후성이 뛰어난 친환경 친수성 수성 도료 및 옥상·외벽 고기능성 방수 시스템 적용",
    features: ["고 durability 방수 공법", "친환경 외부 수성 도장", "안전 진단 통과 시공"]
  },
  {
    id: 5,
    category: "public",
    categoryLabel: "관공서 & 교육시설",
    title: "열린시민청 공공급식 센터 환경 개선",
    client: "서울특별시",
    period: "2024.11 - 2024.12",
    location: "서울특별시 중구",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000",
    description: "위생적이고 친환경적인 마감재를 사용한 공공 식음료 및 라운지 리모델링",
    features: ["항균 및 항곰팡이 특수 타일", "쾌적한 환기 설비 연동", "위생 안전 인증"]
  },
  {
    id: 6,
    category: "coating",
    categoryLabel: "도장·습식·방수·석공사",
    title: "광문초등학교 & 광문중학교 옥상 방수 공사",
    client: "광명교육지원청",
    period: "2024.08 - 2024.09",
    location: "경기도 광명시",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1000",
    description: "누수 방지 최적화 우레탄 및 친환경 단열 방수 복합 공법을 적용한 시공",
    features: ["단열 차열 복합 방수", "하자 보증 책임 시공", "학사 일정 맞춤 완공"]
  }
];

// News & Activities Data
const NEWS_ITEMS = [
  {
    id: 1,
    tag: "기업 소식",
    date: "2025.02.18",
    title: "2025년 광명시 지역기업 구매 상담회 참가",
    summary: "(주)일신아이디는 지역 공동체 자산화와 공공 조달 확대를 위해 광명시청 주관 구매상담회에 참가하였습니다."
  },
  {
    id: 2,
    tag: "사회 공헌",
    date: "2025.01.10",
    title: "지역 사회 취약계층 주거 환경 개선 기부 및 봉사",
    summary: "지역 내 주거약자 가구를 대상으로 친환경 실내 도장 및 도배 보수 공사를 무료로 진행하였습니다."
  },
  {
    id: 3,
    tag: "수상 내역",
    date: "2024.11.25",
    title: "광명상공회의소 기업사랑의 날 표창 수상",
    summary: "우수한 기술력과 성실 시공, 지역 경제 활성화에 기여한 공로로 상공대상을 수상하였습니다."
  }
];

const Certifications = [
  {
    title: "여성기업 확인서",
    issuer: "중소벤처기업부",
    desc: "여성기업 지원에 관한 법률에 따른 공식 여성기업 인증 (수의계약 우대)"
  },
  {
    title: "실내건축공사업 면허",
    issuer: "국토교통부 / 시·도지사",
    desc: "법적 기준을 상회하는 자본금과 전문 기술 인력을 갖춘 공인 면허"
  },
  {
    title: "건축공사업 면허",
    issuer: "국토교통부",
    desc: "종합적인 건축물 신축, 증축 및 대수선 공사 수행 자격 보유"
  },
  {
    title: "친환경 자재 사용 인증",
    issuer: "한국환경산업기술원",
    desc: "인체에 무해하고 휘발성 유기화합물(VOCs)을 최소화한 친환경 자재 사용"
  }
];

const Navbar = ({ onOpenQuote }: { onOpenQuote: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Top Info Bar */}
      <div className="bg-[#0b192c] text-slate-300 text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              대표전화: <strong className="text-white">02-2689-5009</strong>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 font-medium">
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              FAX: 02-2689-6550
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)
            </span>
          </div>
          <div className="flex items-center gap-3 font-semibold text-[11px]">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              여성기업 인증업체
            </span>
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
              전문건설업 면허보유
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0b192c] to-[#1e3e62] text-amber-400 rounded-xl flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              一
            </div>
            <div>
              <span className="text-2xl font-black text-[#0b192c] tracking-tight block leading-none">
                (주)일신아이디
              </span>
              <span className="text-[10px] font-bold text-amber-600 tracking-widest uppercase block mt-1">
                ILSHIN INTERIOR & CONSTRUCTION
              </span>
            </div>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { label: "회사소개", href: "#about" },
              { label: "친환경 자재", href: "#eco" },
              { label: "사업분야", href: "#services" },
              { label: "포트폴리오", href: "#portfolio" },
              { label: "면허·인증서", href: "#certifications" },
              { label: "기업소식", href: "#news" },
            ].map((menu) => (
              <a 
                key={menu.label} 
                href={menu.href} 
                className="text-[15px] font-bold text-slate-700 hover:text-amber-600 transition-colors relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 hover:after:w-full after:transition-all"
              >
                {menu.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={onOpenQuote}
              className="bg-[#0b192c] text-white hover:bg-amber-600 px-6 py-2.5 rounded-xl font-bold text-sm tracking-tight transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              무료 견적 문의
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-slate-700 hover:text-[#0b192c]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl">
            {[
              { label: "회사소개", href: "#about" },
              { label: "친환경 자재", href: "#eco" },
              { label: "사업분야", href: "#services" },
              { label: "포트폴리오", href: "#portfolio" },
              { label: "면허·인증서", href: "#certifications" },
              { label: "기업소식", href: "#news" },
            ].map((menu) => (
              <a 
                key={menu.label} 
                href={menu.href} 
                className="text-lg font-bold text-slate-800 py-1"
                onClick={() => setIsOpen(false)}
              >
                {menu.label}
              </a>
            ))}
            <button 
              onClick={() => { setIsOpen(false); onOpenQuote(); }}
              className="bg-[#0b192c] text-white w-full py-3.5 rounded-xl font-bold mt-2 shadow-md"
            >
              무료 견적 문의하기
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "실내건축공사",
    budget: "",
    address: "",
    message: ""
  });

  const filteredProjects = activeTab === "all" 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeTab);

  const handleSubmitQuote = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsQuoteOpen(false);
      setFormData({ name: "", phone: "", category: "실내건축공사", budget: "", address: "", message: "" });
      alert("견적 문의가 성공적으로 접수되었습니다. 담당자가 조속히 연락드리겠습니다!");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-amber-500 selection:text-white">
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* BRIGHT & AIRY HERO SECTION (No Children, Sunlight Filled, Crisp Modern Aesthetic) */}
      <section className="relative min-h-[85vh] pt-32 pb-20 flex items-center overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-slate-50">
        {/* Bright Background Image with Soft Glass Overlays */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Bright Modern Architecture"
            className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-black tracking-wider uppercase rounded-full mb-6 shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-amber-600" />
                친환경 자재 & 정밀 시공 전문 기업
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0b192c] leading-[1.15] mb-6 tracking-tight">
                자연과 인간을 생각하는 <br />
                밝고 건강한 공간의 가치 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                  (주)일신아이디
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium max-w-2xl">
                인체에 무해한 친환경 자재와 국가 공인 전문건설업 면허로 <br className="hidden sm:block" />
                관공서, 교육시설, 상업공간의 품격 높은 리모델링을 약속드립니다.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button 
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-8 py-4 bg-[#0b192c] text-white hover:bg-amber-600 font-extrabold rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 group"
                >
                  <span>빠른 견적 상담 신청</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-amber-400" />
                </button>
                <a 
                  href="#portfolio"
                  className="px-8 py-4 bg-white text-slate-800 font-extrabold rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 transition-all shadow-sm flex items-center gap-2"
                >
                  주요 공사 실적 보기
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
                <div>
                  <span className="block text-2xl font-black text-[#0b192c]">여성기업</span>
                  <span className="text-xs text-slate-500 font-bold">공식 인증 보유</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-[#0b192c]">실내건축</span>
                  <span className="text-xs text-slate-500 font-bold">국가 공인 면허</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-[#0b192c]">친환경</span>
                  <span className="text-xs text-slate-500 font-bold">인체 무해 자재</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-[#0b192c]">관공서</span>
                  <span className="text-xs text-slate-500 font-bold">G2B 수의계약</span>
                </div>
              </div>
            </motion.div>

            {/* Right Card / Interactive Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    TRUST & QUALITY
                  </span>
                  <span className="text-xs font-bold text-slate-400">안심 시공 솔루션</span>
                </div>

                <h3 className="text-2xl font-black text-[#0b192c] mb-6 leading-snug">
                  체계적인 프로세스로 <br />
                  완벽한 결과물을 만듭니다
                </h3>

                <div className="space-y-4 mb-8">
                  {[
                    { title: "친환경 자재 검증", desc: "휘발성 유기화합물 및 아토피 유발 물질 차단", icon: Leaf },
                    { title: "수의계약 지원", desc: "여성기업 법적 혜택 적용으로 간소화된 계약", icon: ShieldCheck },
                    { title: "철저한 하자보수", desc: "공사 완료 후 2년 무상 A/S 보장 체계", icon: CheckCircle2 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0b192c] text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a 
                  href="tel:02-2689-5009"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-[#0b192c] font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  전화 직통 상담: 02-2689-5009
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ECO-FRIENDLY & SAFETY MATERIALS FEATURE (Subtle Reference to Non-toxic materials) */}
      <section id="eco" className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-4">
                ECO-FRIENDLY MATERIALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] leading-tight mb-6">
                인체에 무해한 <br />
                <span className="text-emerald-600">친환경 자재 사용</span> 약속
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium mb-8">
                (주)일신아이디는 실내공기질관리법 기준을 준수하며, 관공서, 학교, 의료 및 보육시설 시공 시 유해 물질이 발생하지 않는 최고 등급의 친환경 마감재만을 선별하여 사용합니다.
              </p>

              <div className="space-y-4">
                {[
                  { title: "친환경 수성 도료 & 페인트", text: "냄새와 독성이 없는 친환경 인증 수성 도료 시공" },
                  { title: "E0 / SE0 등급 목재 및 마감재", text: "포름알데히드 방출량을 극소화한 안전 자재" },
                  { title: "항균 및 라돈 차단 자재", text: "쾌적한 실내 환경 유지를 위한 첨단 마감 기술" },
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{point.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">실내 공기질 쾌적성</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  새집증후군 및 유해 유기화합물 차단 기술로 시공 즉시 안심하고 이용할 수 있는 친환경 공간을 만듭니다.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">KS 규격 인증 마감재</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  국가 공인 기관의 엄격한 성능 시험 기준을 통과한 검증된 시공 자재만을 사용하여 내구성을 강화합니다.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all sm:col-span-2">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-lg font-black text-slate-900 mb-1">관공서 및 교육시설 시공 특화자재</h4>
                    <p className="text-xs text-slate-500">어린이집, 학교, 도서관, 공공민원실 맞춤형 친환경 자재 솔루션</p>
                  </div>
                  <button 
                    onClick={() => setIsQuoteOpen(true)}
                    className="shrink-0 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-emerald-700 transition-colors shadow-md"
                  >
                    자재 설명 및 상담 받기
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* BUSINESS EXPERTISE SECTION */}
      <section id="services" className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black text-amber-600 bg-amber-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-4">
              BUSINESS AREAS
            </span>
            <h2 className="text-4xl font-black text-[#0b192c] mb-6">
              (주)일신아이디 주요 사업분야
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              탄탄한 국가 공인 면허와 우수한 기술력을 바탕으로 실내건축부터 대규모 도장·방수·석공사까지 최적의 공간을 구현합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white p-10 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-[#0b192c] text-amber-400 rounded-2xl flex items-center justify-center mb-8 shadow-md">
                  <LayoutPanelLeft className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-amber-600 tracking-widest uppercase block mb-2">01. INTERIOR DESIGN</span>
                <h3 className="text-2xl font-black text-slate-900 mb-4">실내건축공사</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  상업 공간, 오피스, 관공서 및 공공 시설의 효율적인 동선 설계와 미학적 가치를 담은 정밀 실내건축 시공을 제공합니다.
                </p>
                <ul className="space-y-2.5 mb-8 border-t border-slate-100 pt-6">
                  {["공공기관 & 관공서 환경개선", "오피스 & 상업시설 인테리어", "맞춤형 수납 & 공간 기획"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="w-4 h-4 text-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="w-full py-3 bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-amber-700 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                상담 문의하기
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white p-10 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-md">
                  <Paintbrush className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-amber-600 tracking-widest uppercase block mb-2">02. COATING & WATERPROOF</span>
                <h3 className="text-2xl font-black text-slate-900 mb-4">도장·습식·방수·석공사</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  건축물의 수명을 연장하는 전문 외벽 도장, 옥상 복합 방수, 습식 및 석공사 시공으로 안전한 구조체를 보장합니다.
                </p>
                <ul className="space-y-2.5 mb-8 border-t border-slate-100 pt-6">
                  {["건물 외벽 친환경 도장 시공", "옥상 우레탄 & 복합 방수 공법", "석재 마감 및 습식 보수"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="w-4 h-4 text-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="w-full py-3 bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-amber-700 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                상담 문의하기
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white p-10 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-md">
                  <Building className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase block mb-2">03. PUBLIC & EDUCATION</span>
                <h3 className="text-2xl font-black text-slate-900 mb-4">관공서 & 교육시설</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  나라장터 G2B 수의계약이 가능한 여성기업 공식 인증업체로서 투명하고 신뢰성 높은 공공 프로젝트를 수행합니다.
                </p>
                <ul className="space-y-2.5 mb-8 border-t border-slate-100 pt-6">
                  {["여성기업 수의계약 제도 활용", "초·중·고 교육시설 환경개선", "공공기관 맞춤 예산 및 공정"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="w-4 h-4 text-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="w-full py-3 bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-amber-700 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                상담 문의하기
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>

          </div>
        </div>
      </section>


      {/* PORTFOLIO SECTION WITH CATEGORY TABS (Subtle reference to jd123.co.kr portfolio tabs) */}
      <section id="portfolio" className="py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
                OUR WORKS
              </span>
              <h2 className="text-4xl font-black text-[#0b192c]">
                주요 공사 실적 및 포트폴리오
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-sm max-w-md">
              (주)일신아이디가 성실히 완성해 온 다양한 공공기관 및 실내건축 프로젝트 실적을 확인하세요.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-200 pb-4">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === cat.id
                    ? "bg-[#0b192c] text-white shadow-md"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProject(item)}
                  className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/70 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative h-64 overflow-hidden bg-slate-200">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#0b192c]/90 text-amber-300 text-xs font-black px-3 py-1 rounded-full backdrop-blur-md">
                          {item.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-7">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-2">
                        <span>{item.client}</span>
                        <span>{item.period}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 pb-7 pt-0 flex items-center justify-between border-t border-slate-200/60 pt-4">
                    <span className="text-xs font-bold text-slate-500">{item.location}</span>
                    <span className="text-xs font-extrabold text-amber-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      상세보기 <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>


      {/* CERTIFICATIONS & LICENSES SECTION */}
      <section id="certifications" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3 border border-amber-400/20">
              QUALIFIED PARTNER
            </span>
            <h2 className="text-4xl font-black mb-4">
              신뢰할 수 있는 면허 및 공식 인증
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              (주)일신아이디는 엄격한 법적 요건 및 국가 공인 기준을 완벽히 이행하는 정식 등록 기업입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Certifications.map((cert, idx) => (
              <div key={idx} className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/80 hover:border-amber-500/50 transition-all">
                <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  {cert.issuer}
                </span>
                <h3 className="text-xl font-black text-white mb-3">{cert.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* COMPANY NEWS & ACTIVITIES SECTION (Subtle Reference to jd123 news & community) */}
      <section id="news" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
            <div>
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
                COMPANY NEWS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c]">
                (주)일신아이디 소식 및 사회공헌
              </h2>
            </div>
            <a href="tel:02-2689-5009" className="text-xs font-extrabold text-amber-600 hover:underline flex items-center gap-1">
              문의하기 <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_ITEMS.map((news) => (
              <div key={news.id} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-4">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">{news.tag}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {news.date}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 leading-snug hover:text-amber-600 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {news.summary}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400">일신아이디 커뮤니케이션</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAST QUOTE & CONTACT SECTION (Rich interactive consultation) */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-[#0b192c] to-[#1e3e62] text-white rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Text */}
              <div className="lg:col-span-6">
                <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 text-xs font-black tracking-widest uppercase rounded-full mb-6 border border-amber-500/30">
                  ONLINE INQUIRY
                </span>
                <h2 className="text-3xl md:text-5xl font-black leading-tight mb-8">
                  공간의 새로운 변화, <br />
                  <span className="text-amber-400">(주)일신아이디</span>와 상의하세요
                </h2>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 font-medium">
                  실내건축, 관공서 리모델링, 도장 및 방수 공사에 관한 맞춤형 견적을 신속하게 안내해 드립니다.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                    <Phone className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">대표 상담 전화</span>
                      <strong className="text-xl text-white">02-2689-5009</strong>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                    <Printer className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">팩스 (도면 접수 가능)</span>
                      <strong className="text-lg text-white">02-2689-6550</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                    <MapPin className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">본사 위치</span>
                      <span className="text-sm text-white font-medium">경기도 광명시 오리로 651번길 8 현대테라타워 광명 619호</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Fast Form */}
              <div className="lg:col-span-6">
                <form onSubmit={handleSubmitQuote} className="bg-white text-slate-800 p-8 rounded-3xl shadow-xl space-y-4">
                  <h3 className="text-2xl font-black text-[#0b192c] mb-2">무료 견적 신청서</h3>
                  <p className="text-xs text-slate-500 mb-6 font-medium">기본 정보를 입력해주시면 담당자가 빠르게 연락드립니다.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">성함 / 담당자명</label>
                      <input 
                        type="text" 
                        required
                        placeholder="홍길동"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">연락처</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="010-0000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">공사 구분</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option>실내건축공사 (상업/오피스)</option>
                      <option>관공서 & 교육시설 리모델링</option>
                      <option>도장·습식·방수·석공사</option>
                      <option>기타 문의</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">문의 내용</label>
                    <textarea 
                      rows={3}
                      placeholder="공사 위치, 예상 면적 및 요청사항을 간단히 적어주세요."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-medium resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formSubmitted}
                    className="w-full py-4 bg-[#0b192c] hover:bg-amber-600 text-white font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    {formSubmitted ? (
                      <span>접수 처리 중...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>견적 상담 신청하기</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-[#07101c] pt-20 pb-12 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 text-[#0b192c] rounded-lg flex items-center justify-center font-black text-lg">
                  一
                </div>
                <span className="text-2xl font-black text-white tracking-tight">(주)일신아이디</span>
              </div>
              <p className="text-xs leading-relaxed mb-6 max-w-md text-slate-400 font-medium">
                (주)일신아이디는 국토교통부 정식 실내건축공사업 면허 및 여성기업 인증을 보유한 전문 시공 기업입니다. 인체에 무해한 친환경 자재와 정밀 시공으로 고객 만족에 최선을 다합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-slate-800 text-amber-400 text-[11px] font-bold rounded-full border border-slate-700">여성기업 인증</span>
                <span className="px-3 py-1 bg-slate-800 text-blue-400 text-[11px] font-bold rounded-full border border-slate-700">실내건축공사업</span>
                <span className="px-3 py-1 bg-slate-800 text-emerald-400 text-[11px] font-bold rounded-full border border-slate-700">친환경 자재 사용</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-black text-sm mb-6">Contact Us</h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>경기도 광명시 오리로 651번길 8 현대테라타워 광명 619호</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>TEL : 02-2689-5009</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Printer className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>FAX : 02-2689-6550</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-sm mb-6">Company Info</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li>상호명: (주)일신아이디</li>
                <li>사업자등록번호: 140-81-37823</li>
                <li>업종: 실내건축공사업 / 건축공사업</li>
                <li>이메일: jd12488@hanmail.net</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
            <p>© (주)일신아이디 CO.,LTD. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300 transition-colors">이용약관</a>
              <a href="#" className="hover:text-slate-300 transition-colors">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>


      {/* PORTFOLIO DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-72 bg-slate-100 relative shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 overflow-y-auto">
                <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="text-2xl font-black text-[#0b192c] mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl mb-6 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block">발주처</span>
                    <strong className="text-slate-800 font-extrabold">{selectedProject.client}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">공사 기간</span>
                    <strong className="text-slate-800 font-extrabold">{selectedProject.period}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">공사 위치</span>
                    <strong className="text-slate-800 font-extrabold">{selectedProject.location}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">주요 적용 자재</span>
                    <strong className="text-emerald-700 font-extrabold">친환경 E0 자재 & 인체 무해 도료</strong>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">주요 공사 특징</h4>
                  {selectedProject.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-amber-500" />
                      {feat}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => { setSelectedProject(null); setIsQuoteOpen(true); }}
                  className="w-full py-4 bg-[#0b192c] text-white rounded-xl font-bold text-xs hover:bg-amber-600 transition-colors shadow-lg"
                >
                  이와 유사한 프로젝트 견적 문의하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* MODAL QUOTE FORM */}
      <AnimatePresence>
        {isQuoteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsQuoteOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl font-black text-[#0b192c] mb-2">(주)일신아이디 견적 상담</h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                공사 관련 정보를 남겨주시면 24시간 이내에 상담 전화를 드립니다.
              </p>

              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">성함 / 업체명 *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="담당자 성함"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">연락처 *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">공사 분야</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option>실내건축공사 (상업/오피스)</option>
                    <option>관공서 & 교육시설 리모델링</option>
                    <option>도장·습식·방수·석공사</option>
                    <option>기타 문의</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">상세 문의 및 요청사항</label>
                  <textarea 
                    rows={4}
                    placeholder="공사 위치, 예상 면적, 공사 시기 등을 상세히 기술해주시면 정밀한 상담이 가능합니다."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-medium resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full py-4 bg-[#0b192c] hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {formSubmitted ? "접수 완료 중..." : "상담 신청하기"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
