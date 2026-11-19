import { useState } from "react";

/* ─── Pre Activation Policy Edits ───────────────────────────── */

/* ─── Sidebar nav data ──────────────────────────────────────── */

const primaryNav = [
  { id: "home",        label: "Home",              iconExp: "assets/81827.svg", iconCol: "assets/51741.svg" },
  { id: "quote",       label: "Quote & application", iconExp: "assets/2dd50.svg", iconCol: "assets/2dd50.svg" },
  { id: "customers",   label: "Customers",          iconExp: "assets/b6eb6.svg", iconCol: "assets/e975e.svg" },
  { id: "earnings",    label: "Earnings",           iconExp: "assets/f4771.svg", iconCol: "assets/efa7c.svg" },
  { id: "performance", label: "Performance",        iconExp: "assets/f4492.svg", iconCol: "assets/5a7f8.svg" },
  { id: "rewards",     label: "Rewards",            iconExp: "assets/ffd18.svg", iconCol: "assets/cf6f9.svg" },
];

const secondaryNav = [
  { id: "share",     label: "Share website", iconExp: "assets/c6d9c.svg", iconCol: "assets/673c4.svg" },
  { id: "resources", label: "Resources",     iconExp: "assets/61cdb.svg", iconCol: "assets/477b7.svg" },
  { id: "faq",       label: "FAQs",          iconExp: "assets/130a4.svg", iconCol: "assets/d8d0e.svg" },
  { id: "contact",   label: "Contact us",    iconExp: "assets/8234e.svg", iconCol: "assets/fc8d9.svg" },
  { id: "settings",  label: "Settings",      iconExp: "assets/5aae0.svg", iconCol: "assets/cee3d.svg" },
];

const EthosLogo = () => (
  <svg width="38" height="8" viewBox="0 0 38 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.21581 0.116915V1.41119H9.49956V7.88334H10.6412V1.41119H12.9247V0.116915H7.21581ZM0 0.116915V7.88334H5.05563V6.5888H1.14164V4.64726H4.5424V3.35299H1.14164V1.41119H5.05563V0.116915H0ZM19.7753 0.116915V3.35299H16.3502V0.116915H15.2083V7.88334H16.3502V4.64726H19.7753V7.88334H20.917V0.116915H19.7753V0.116915ZM29.6541 0.849236C29.4225 0.586652 29.1475 0.378358 28.8449 0.236249C28.5423 0.0941387 28.2179 0.0209957 27.8904 0.0209957C27.5628 0.0209957 27.2385 0.0941387 26.9358 0.236249C26.6332 0.378358 26.3583 0.586652 26.1266 0.849236C25.9859 1.00906 25.6927 1.38269 25.5925 1.56671C26.0688 1.23343 26.6302 1.09168 27.1863 1.16432C27.7423 1.23697 28.2605 1.51976 28.6575 1.96713C29.0544 2.41449 29.3069 3.00036 29.3743 3.63028C29.4416 4.26021 29.3199 4.8975 29.0287 5.43942L29.0672 5.39581C29.2342 5.28093 29.5098 5.01181 29.6541 4.84826C29.8857 4.58568 30.0694 4.27396 30.1948 3.93088C30.3201 3.5878 30.3846 3.22009 30.3846 2.84875C30.3846 2.4774 30.3201 2.10969 30.1948 1.76662C30.0694 1.42354 29.8857 1.11181 29.6541 0.849236" fill="white"/>
    <path d="M25.4256 5.64321C24.4456 4.53217 23.8453 2.48851 24.9513 0.328111L24.4343 0.914216C23.7497 1.69035 23.3651 2.74299 23.3652 3.84058C23.3652 4.93817 23.7498 5.9908 24.4344 6.76689C25.119 7.54299 26.0475 7.97898 27.0157 7.97895C27.9838 7.97893 28.9123 7.54289 29.5969 6.76676L30.1139 6.18065C28.299 7.3768 26.4931 6.85345 25.4256 5.64321ZM35.2701 8C36.9285 8 38 7.06845 38 5.62659C38 4.27479 37.1619 3.78584 35.8094 3.43588L34.9809 3.22978C34.2349 3.04284 33.8306 2.82557 33.8306 2.21288C33.8306 1.58821 34.344 1.18462 35.1387 1.18462C35.8802 1.18462 36.5328 1.49682 36.9348 2.04277L37.7952 1.25873C37.3216 0.678116 36.4861 0 35.169 0C33.6809 0 32.6007 0.959468 32.6007 2.28166C32.6007 3.79054 33.6903 4.25112 34.6396 4.48381L35.5591 4.71304C36.286 4.89201 36.7702 5.13746 36.7702 5.75255C36.7702 6.41365 36.2454 6.79233 35.3308 6.79233C34.3332 6.79233 33.5791 6.23681 33.2631 5.67676L32.319 6.44742C32.8053 7.20292 33.8296 8 35.2701 8Z" fill="white"/>
  </svg>
);

function Sidebar({ activeNav, onNavChange }: { activeNav: string; onNavChange: (id: string) => void }) {
  const [expanded, setExpanded] = useState(true);
  const [moreOpen, setMoreOpen] = useState(true);

  const labelClass = `overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${expanded ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0"}`;

  return (
    <div
      className={`bg-[#056257] h-full shrink-0 flex flex-col gap-[24px] pt-[24px] overflow-hidden transition-[width] duration-300 ease-in-out drop-shadow-[0px_24px_24px_rgba(109,109,109,0.4)] ${expanded ? "w-[240px]" : "w-[64px]"}`}
    >
      {/* Header — always rendered, text fades out */}
      <div className={`flex items-center shrink-0 min-h-[44px] ${expanded ? "justify-between gap-[8px] px-[20px]" : "justify-center"}`}>
        <div className={`flex flex-col gap-[4px] overflow-hidden transition-all duration-300 ease-in-out ${expanded ? "opacity-100 max-w-[160px]" : "opacity-0 max-w-0"}`}>
          <p
            className="font-['Cambon:Regular',Georgia,serif] text-[16px] text-white whitespace-nowrap leading-[24px]"
            style={{ fontFeatureSettings: '"case" 1' }}
          >
            Century Insurance Co.
          </p>
          <div className="flex gap-[10px] items-center h-[16px]">
            <p className="font-['Theinhardt:Regular',sans-serif] text-[#f4f4f4] text-[12px] tracking-[0.09px] leading-[18px] whitespace-nowrap" style={{ fontFeatureSettings: '"case" 1' }}>
              Powered by
            </p>
            <EthosLogo />
          </div>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="bg-[#f4f4f4] drop-shadow-[0px_0.875px_0.875px_rgba(16,24,40,0.06),0px_0.875px_1.313px_rgba(16,24,40,0.1)] rounded-full shrink-0 size-[28px] flex items-center justify-center cursor-pointer border-none"
        >
          <img alt="" src={expanded ? "assets/dc865.svg" : "assets/2d7d0.svg"} width="20" height="20" />
        </button>
      </div>

      {/* Nav body */}
      <div className="flex flex-1 flex-col gap-[16px] min-h-0 overflow-y-auto w-full">
        {/* Primary nav */}
        <div className="flex flex-col gap-[2px] shrink-0 w-full">
          {primaryNav.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <div key={item.id} className="flex flex-col items-center justify-center px-[8px] w-full">
                <button
                  onClick={() => onNavChange(item.id)}
                  className={`flex gap-[8px] items-center p-[12px] w-full cursor-pointer border-none transition-colors ${
                    isActive ? "bg-[rgba(255,255,255,0.8)] rounded-[8px]" : "rounded-[4px] hover:bg-[rgba(255,255,255,0.1)]"
                  }`}
                >
                  <div className="relative shrink-0 size-[20px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={isActive ? item.iconExp : item.iconCol} />
                  </div>
                  <div className={labelClass}>
                    <p
                      className={`text-left text-[14px] leading-[20px] tracking-[-0.14px] ${isActive ? "font-['Theinhardt:Bold',sans-serif] text-[#056257]" : "font-['Theinhardt:Medium',sans-serif] text-white"}`}
                      style={{ fontFeatureSettings: '"case" 1' }}
                    >
                      {item.label}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* More section */}
        <div className="flex flex-col gap-[2px] shrink-0 w-full">
          {/* Divider (collapsed) / More toggle (expanded) */}
          <div className={`transition-all duration-300 overflow-hidden ${expanded ? "max-h-[40px] opacity-100" : "max-h-0 opacity-0"}`}>
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className="flex gap-[8px] items-center mx-[8px] px-[12px] py-[4px] rounded-[4px] border-none bg-transparent cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors w-[calc(100%-16px)]"
            >
              <p className="flex-1 min-w-0 font-['Theinhardt:Medium',sans-serif] text-[#d4d4d4] text-[14px] tracking-[-0.14px] leading-[20px] text-left" style={{ fontFeatureSettings: '"case" 1' }}>
                More
              </p>
              <img
                alt=""
                src="assets/0d186.svg"
                width="16"
                height="16"
                className={`shrink-0 transition-transform duration-200 ${moreOpen ? "" : "rotate-180"}`}
              />
            </button>
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${!expanded ? "max-h-[4px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="mx-auto h-px w-[40px] bg-white opacity-20 my-[4px]" />
          </div>

          {/* Secondary nav items */}
          <div className={`flex flex-col gap-[2px] transition-all duration-300 overflow-hidden ${expanded && !moreOpen ? "max-h-0 opacity-0" : "max-h-[400px] opacity-100"}`}>
            {secondaryNav.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <div key={item.id} className="flex flex-col items-center justify-center px-[8px] w-full">
                  <button
                    onClick={() => onNavChange(item.id)}
                    className={`flex gap-[8px] items-center p-[12px] w-full cursor-pointer border-none transition-colors ${
                      isActive ? "bg-[rgba(255,255,255,0.8)] rounded-[8px]" : "rounded-[4px] hover:bg-[rgba(255,255,255,0.1)]"
                    }`}
                  >
                    <div className="relative shrink-0 size-[20px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isActive ? item.iconExp : item.iconCol} />
                    </div>
                    <div className={labelClass}>
                      <p
                        className={`text-left font-['Theinhardt:Medium',sans-serif] text-[14px] leading-[20px] tracking-[-0.14px] ${isActive ? "text-[#056257]" : "text-white"}`}
                        style={{ fontFeatureSettings: '"case" 1' }}
                      >
                        {item.label}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Profile footer */}
      <div className="flex flex-col items-start p-[6px] shrink-0 w-full">
        <div className={`bg-[rgba(0,0,0,0.05)] drop-shadow-[0px_1px_1px_rgba(16,24,40,0.05)] flex gap-[8px] items-center rounded-[8px] w-full ${expanded ? "px-[20px] py-[16px]" : "justify-center p-[12px]"}`}>
          <div className="border border-white rounded-full shrink-0 size-[40px] relative overflow-hidden">
            <img alt="Pranjal Jain" className="absolute inset-0 size-full object-cover rounded-full" src="assets/970de.png" />
          </div>
          <div className={`flex flex-col gap-[2px] overflow-hidden transition-all duration-300 ease-in-out ${expanded ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"}`}>
            <p className="font-['Theinhardt:Medium',sans-serif] text-white text-[14px] tracking-[-0.14px] leading-[20px] whitespace-nowrap" style={{ fontFeatureSettings: '"case" 1' }}>
              Pranjal Jain
            </p>
            <p className="font-['Theinhardt:Regular',sans-serif] text-white text-[12px] tracking-[0.09px] leading-[18px] whitespace-nowrap" style={{ fontFeatureSettings: '"case" 1' }}>
              pranjal.jain@getethos.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── App ───────────────────────────────────────────────────── */

export default function App() {
  const [activeNav, setActiveNav] = useState("customers");

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f4f4f4]">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="flex-1 flex items-center justify-center">
        <p className="font-['Theinhardt:Medium',sans-serif] text-[#a9a9a9] text-[16px]" style={{ fontFeatureSettings: '"case" 1' }}>
          Pre Activation Policy Edits — pick a frame to implement next.
        </p>
      </div>
    </div>
  );
}
