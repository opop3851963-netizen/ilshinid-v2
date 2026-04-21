import { motion } from "motion/react";
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
  Gem
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#001e40] tracking-tighter">(주)일신아이디</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {["회사소개", "사업분야", "포트폴리오", "면허현황", "고객문의"].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-[15px] font-bold text-slate-600 hover:text-[#001e40] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="bg-[#001e40] text-white px-6 py-2.5 rounded-lg font-bold text-sm tracking-tight hover:bg-slate-800 transition-all">
            견적 문의
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-6 flex flex-col gap-4">
          {["회사소개", "사업분야", "포트폴리오", "면허현황", "고객문의"].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-lg font-bold text-slate-700"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="bg-[#001e40] text-white w-full py-3 rounded-lg font-bold">
            견적 문의
          </button>
        </div>
      )}
    </nav>
  );
};

const ServiceCard = ({ icon: Icon, title, description, features }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-white p-10 rounded-2xl border border-slate-100 hover:border-transparent hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
  >
    <div className="w-14 h-14 bg-slate-50 flex items-center justify-center rounded-xl mb-8 group-hover:bg-[#001e40] group-hover:text-white transition-colors duration-500">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-600 leading-relaxed mb-6">
      {description}
    </p>
    <ul className="space-y-3">
      {features.map((feature: string) => (
        <li key={feature} className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[900px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-500 text-xs font-black tracking-widest uppercase rounded-full mb-6">
              ARCHITECTURAL INNOVATION
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              신뢰와 전문성으로 <br />
              완성하는 공간의 가치, <br />
              <span className="text-amber-400 font-black">(주)일신아이디</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
              실내건축 및 건축공사 전문 면허 보유, <br />
              관공서 공사 및 여성기업 수의계약 전문 파트너입니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-[#001e40] font-black rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2 group">
                사업 실적 보기
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-black rounded-xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">
                문의하기
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Trust Icons */}
        <div className="absolute bottom-12 right-12 hidden lg:flex gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-2xl p-7 rounded-3xl border border-white/10 w-64"
          >
            <Award className="text-amber-400 w-10 h-10 mb-4" />
            <h4 className="text-white font-black text-lg mb-2">여성기업 인증 업체</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              수의계약이 가능한 여성기업 공식 인증을 보유하고 있습니다.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-2xl p-7 rounded-3xl border border-white/10 w-64"
          >
            <ShieldCheck className="text-amber-400 w-10 h-10 mb-4" />
            <h4 className="text-white font-black text-lg mb-2">전문건설업 면허</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              국가 공인 건축공사업 및 실내건축공사업 정식 면허를 보유합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-[#001e40] mb-6">Our Expertise</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                (주)일신아이디는 다년간의 노하우와 국가 공인 면허를 바탕으로 최적의 공간 솔루션을 제공합니다. 
                우리는 단순한 시공을 넘어 고객의 가치를 공간에 담아냅니다.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-amber-400 rounded-full" />
              <div className="w-4 h-1 bg-slate-200 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={LayoutPanelLeft}
              title="실내건축공사"
              description="감각적인 디자인과 정밀한 시공으로 최상의 실내 공간을 제안합니다. 상업 시설부터 사무 공간까지 최적화된 설계를 약속합니다."
              features={["상업 및 사무공간 인테리어", "공간 컨설팅 및 기획"]}
            />
            <ServiceCard 
              icon={Building2}
              title="건축공사업"
              description="탄탄한 기술력을 바탕으로 안전하고 전문적인 건축 시공 서비스를 제공합니다. 구조의 안정성과 미학적 완성도를 동시에 추구합니다."
              features={["신축 및 증축 공사", "건축 시설물 유지보수"]}
            />
            <ServiceCard 
              icon={SquareChartGantt}
              title="관공서 프로젝트"
              description="나라장터 입찰 및 수의계약을 통한 공공기관 공사 실적을 다수 보유하고 있습니다. 투명한 공정 관리와 신뢰를 보장합니다."
              features={["나라장터 G2B 수의계약 전문", "공공시설물 환경개선공사"]}
            />
          </div>
        </div>
      </section>

      {/* Bento Grid Trust Assets */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[600px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-[#001e40] rounded-[2.5rem] p-12 relative flex flex-col justify-between overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-slate-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 group-hover:scale-110 transition-transform duration-1000 blur-3xl" />
              
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 bg-slate-800 text-slate-300 text-xs font-black tracking-widest uppercase rounded-full mb-6 italic">
                  Certified Excellence
                </span>
                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                  고도의 기술력과 <br />
                  윤리적 가치를 결합한 <br />
                  <span className="text-amber-400">종합 건축 솔루션</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-12 relative z-10">
                <div>
                  <span className="text-6xl font-black text-white block mb-2 font-mono">25+</span>
                  <span className="text-slate-400 font-bold tracking-tight text-sm uppercase">Years Experience</span>
                </div>
                <div>
                  <span className="text-6xl font-black text-white block mb-2 font-mono">500+</span>
                  <span className="text-slate-400 font-bold tracking-tight text-sm uppercase">Projects Completed</span>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-5 grid grid-rows-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] p-10 flex items-center gap-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <Gem className="text-white w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">여성기업 인증 업체</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    수의계약 법령에 근거한 효율적인 공공 조달 파트너십을 제공합니다.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 flex items-center gap-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className="w-16 h-16 bg-[#001e40] rounded-3xl flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <CheckCircle2 className="text-white w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">전문건설업 면허 보유</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    법적 기준을 상회하는 기술인력과 자본금을 바탕으로 신뢰를 시공합니다.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#001e40] mb-10 tracking-tight leading-tight italic">
              "공간의 새로운 미래를 함께 설계합니다"
            </h2>
            <p className="text-xl text-slate-600 mb-16 font-medium leading-relaxed">
              (주)일신아이디는 고객님의 비즈니스 가치를 극대화할 수 있는 <br className="hidden md:block" />
              공간 인프라 구축을 위해 항상 준비되어 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
              <a href="tel:02-123-4567" className="flex items-center gap-3 text-3xl font-black text-[#001e40] group">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[#001e40] group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                02-123-4567
              </a>
              <div className="hidden sm:block w-px h-10 bg-slate-200" />
              <button className="bg-[#001e40] text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-300">
                온라인 견적 문의
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-24 pb-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-black text-white mb-8 tracking-tighter">(주)일신아이디</h3>
              <p className="text-lg leading-relaxed mb-8 max-w-sm">
                국가 공인 건축공사업 및 실내건축공사업 면허를 보유한 전문 건설 기업입니다. 
                관공서 및 대형 상업 시설 프로젝트의 성공적인 파트너가 되어 드립니다.
              </p>
              <div className="flex gap-3">
                <span className="px-3 py-1 bg-slate-800 text-slate-400 text-[11px] font-black rounded uppercase tracking-wider">여성기업 인증</span>
                <span className="px-3 py-1 bg-slate-800 text-slate-400 text-[11px] font-black rounded uppercase tracking-wider">전문건설면허</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-black text-lg mb-8">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 text-amber-500" />
                  <span className="text-[15px]">경기도 광명시 범안로 1039 <br />삼호빌딩 B103</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500" />
                  <span className="text-[15px]">Tel: 02-123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 rotate-90" />
                  <span className="text-[15px]">Fax: 02-123-4568</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-lg mb-8">Business Status</h4>
              <ul className="space-y-4 font-bold text-[15px]">
                <li className="hover:text-white cursor-pointer transition-colors">여성기업 인증업체</li>
                <li className="hover:text-white cursor-pointer transition-colors">정부공사 면허보유</li>
                <li className="hover:text-white cursor-pointer transition-colors">실내건축공사업 면허</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm font-medium">© 2024 (주)일신아이디. All Rights Reserved.</p>
            <div className="flex gap-8 text-sm font-bold">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors text-white">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
