import { useEffect, useRef, useState } from "react";

/* ─── Pre Activation Policy Edits ───────────────────────────── */

/* ─── Asset & font preload ───────────────────────────────────── */


const A = "assets";

const assetFiles = [
  "0103b.svg",
  "02878.svg",
  "03eae.svg",
  "0446f.svg",
  "0b9f6.svg",
  "11fa1.svg",
  "11705.svg",
  "138f9.svg",
  "15f5e.png",
  "175a1.svg",
  "17ad1.svg",
  "1cd0b.svg",
  "2072b.svg",
  "25fe5.svg",
  "25071.svg",
  "2523e.svg",
  "25633.svg",
  "285cc.svg",
  "291f0.svg",
  "2c597.svg",
  "2d425.svg",
  "306b1.svg",
  "32c4c.svg",
  "3730d.svg",
  "3809a.svg",
  "3a4ce.svg",
  "3ee15.svg",
  "3ff76.svg",
  "407e9.svg",
  "45436.svg",
  "46a24.svg",
  "463f2.svg",
  "48d7b.svg",
  "5d0ae.svg",
  "5f08f.svg",
  "5fe16.svg",
  "696ed.svg",
  "69ee9.svg",
  "6f511.svg",
  "7ab9c.svg",
  "780d0.svg",
  "85722.svg",
  "88535.svg",
  "8dcab.svg",
  "8b6f3.svg",
  "908c0.svg",
  "92ed0.svg",
  "93729.svg",
  "93984.svg",
  "957eb.svg",
  "9806e.svg",
  "9bb0d.svg",
  "a8a98.svg",
  "ac09c.svg",
  "adf89.svg",
  "780d0.svg",
  "8dcab.svg",
  "908c0.svg",
  "90b36.svg",
  "9806e.svg",
  "ac09c.svg",
  "b45ec.svg",
  "b0e52.svg",
  "b51ba.svg",
  "c051c.svg",
  "c5fb9.svg",
  "c3b4f.svg",
  "c73ff.svg",
  "c96ac.svg",
  "caa81.svg",
  "cd798.svg",
  "cd4d1.svg",
  "d1117.svg",
  "d4005.svg",
  "e13a9.svg",
  "eec2d.svg",
  "ec1c7.svg",
  "f03b6.svg",
  "fe965.svg",
];

if (typeof window !== "undefined") {
  assetFiles.forEach((file) => {
    const image = new Image();
    image.loading = "eager";
    image.decoding = "sync";
    image.src = `${A}/${file}`;
    void image.decode().catch(() => undefined);
  });
  void Promise.all([
    document.fonts.load('400 16px "Theinhardt:Regular"'),
    document.fonts.load('500 16px "Theinhardt:Medium"'),
    document.fonts.load('700 16px "Theinhardt:Bold"'),
    document.fonts.load('500 16px "Cambon:Book"'),
    document.fonts.load('400 13px "Hauss:Regular"'),
  ]);
}

function transitionUi(update: () => void) {
  const transitionDocument = document as Document & {
    startViewTransition?: (callback: () => void) => unknown;
  };
  if (transitionDocument.startViewTransition) {
    transitionDocument.startViewTransition(update);
  } else {
    update();
  }
}

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
      className={`bg-[#056257] sticky top-0 h-dvh shrink-0 flex flex-col gap-[24px] pt-[24px] overflow-hidden transition-[width] duration-300 ease-in-out drop-shadow-[0px_24px_24px_rgba(109,109,109,0.4)] ${expanded ? "w-[240px]" : "w-[64px]"}`}
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

/* ─── Payment schedule edit flow (ported from Route Payment Schedule Edits) ─── */


type EditableField =
  | "Start date"
  | "Payment schedule 1"
  | "Payment schedule 2"
  | "Payment schedule 3"
  | "Payment schedule 4";

const initialValues: Record<EditableField, string> = {
  "Start date": "12/27/25",
  "Payment schedule 1": "3rd of the month (SSB)",
  "Payment schedule 2": "Last of the month",
  "Payment schedule 3": "1st Monday",
  "Payment schedule 4": "Last Monday",
};

function Icon({ file, size = 16, alt = "" }: { file: string; size?: number; alt?: string }) {
  return (
    <img
      src={`${A}/${file}`}
      width={size}
      height={size}
      alt={alt}
      loading="eager"
      decoding="sync"
      fetchPriority="high"
    />
  );
}

function CopyButton({
  value,
  notify,
  file = "b51ba.svg",
}: {
  value: string;
  notify: (message: string) => void;
  file?: string;
}) {
  const copy = async () => {
    await navigator.clipboard?.writeText(value);
    notify("Copied to clipboard");
  };
  return (
    <button className="icon-button copy-button" onClick={copy} aria-label={`Copy ${value}`}>
      <Icon file={file} size={12} />
    </button>
  );
}

function Field({
  label,
  value,
  action,
  onAction,
}: {
  label: string;
  value: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="field">
      <div className="field-heading">
        <span>{label}</span>
        {action && (
          <button className="text-link blue" onClick={onAction}>
            {action}
          </button>
        )}
      </div>
      <strong>{value}</strong>
    </div>
  );
}

function SectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="section-title">
      <Icon file={icon} size={16} />
      <span>{children}</span>
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

type ScheduleRoute = "ssb" | "business" | "calendar";

function PaymentBadge({
  kind = "bank",
  disabled = false,
}: {
  kind?: "bank" | "card";
  disabled?: boolean;
}) {
  const icon =
    kind === "card" ? (disabled ? "3809a.svg" : "c73ff.svg") : disabled ? "25071.svg" : "90b36.svg";
  return (
    <span className={`payment-badge ${disabled ? "disabled" : ""}`}>
      <Icon file={icon} size={14} />
      {kind === "card" ? "Direct Express®" : "Bank account"}
    </span>
  );
}

function SelectControl({
  value,
  options,
  onChange,
  arrow,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  arrow: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="schedule-select" ref={rootRef}>
      <button
        type="button"
        className={open ? "open" : ""}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value}</span>
        <Icon file={arrow} size={24} />
      </button>
      {open && (
        <div className="schedule-select-options" role="listbox" aria-label="Deposit schedule">
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option}
              className={value === option ? "selected" : ""}
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const benefitOptions = [
  {
    value: "Social Security Benefits (SSB)",
    description: "Retirement, disability (SSDI), or survivors benefits.",
  },
  {
    value: "Supplemental Security Income (SSI)",
    description: "Based on financial need, not work history.",
  },
  {
    value: "Both SSB and SSI",
    description: "Two deposits each month, one from each program.",
  },
  {
    value: "Social Security Benefits (SSB) started before May 1997",
    description: "Same benefit as above, on the older schedule.",
    special: true,
  },
  {
    value: "SSB, and the state pays their Medicare Part B premium",
    description: "Their Medicare premium isn't deducted from their Social Security deposit.",
    special: true,
  },
];

function BenefitSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="benefit-select" ref={rootRef}>
      <button
        className={`benefit-trigger ${open ? "open" : ""}`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value || "Select benefit type"}</span>
        <Icon file="25633.svg" size={24} />
      </button>
      {open && (
        <div className="benefit-menu" role="listbox" aria-label="Social Security benefit type">
          {benefitOptions.map((option, index) => (
            <div key={option.value}>
              {option.special && !benefitOptions[index - 1]?.special && (
                <div className="benefit-group-label">Special cases</div>
              )}
              <button
                type="button"
                role="option"
                aria-selected={value === option.value}
                className={value === option.value ? "selected" : ""}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <strong>{option.value}</strong>
                <span>{option.description}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="menu-select" ref={rootRef}>
      <label>{label}</label>
      <button
        type="button"
        className={open ? "open" : ""}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value}</span>
        <Icon file="291f0.svg" size={24} />
      </button>
      {open && (
        <div className="menu-select-options" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option}
              className={value === option ? "selected" : ""}
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SavedScheduleStep({
  route,
  benefit,
  schedule,
  onEdit,
}: {
  route: ScheduleRoute;
  benefit: string;
  schedule: string;
  onEdit: () => void;
}) {
  const isSsb = route === "ssb";
  const heading =
    route === "ssb"
      ? "Social Security Benefits"
      : route === "business"
        ? "Business day / Payroll"
        : "Calendar day";
  const benefitLabel =
    benefit === "Social Security Benefits (SSB) started before May 1997"
      ? "Social Security Benefits before May 1997"
      : benefit;
  const paymentDate = schedule.replace(" (SSB)", " (Recommended)");
  const detailRows = isSsb
    ? [
        ["Benefit type", benefitLabel],
        ["Payment date", paymentDate],
      ]
    : route === "business"
      ? [["Schedule type", schedule]]
      : [["Specific day", schedule]];

  return (
    <section className="saved-schedule-step">
      <h2>
        <span>1.</span> Set payment schedule
      </h2>
      <div className="saved-schedule-table">
        <div className="saved-schedule-head">
          <strong>{heading}</strong>
          <button onClick={onEdit}>Edit</button>
        </div>
        {detailRows.map(([label, value]) => (
          <div className="saved-schedule-row" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
        <div className="saved-schedule-row">
          <span>Payment methods available</span>
          <div className="saved-payment-methods">
            <PaymentBadge />
            {isSsb && <PaymentBadge kind="card" />}
          </div>
        </div>
      </div>
    </section>
  );
}

function SavedCoverageStep({
  coverageStart,
  onEdit,
}: {
  coverageStart: "today" | "scheduled";
  onEdit: () => void;
}) {
  return (
    <section className="compact-saved-step coverage-saved-step">
      <h2>
        <span>2.</span> Coverage start date
      </h2>
      <div className="compact-saved-value">
        <strong>{coverageStart === "today" ? "January 15, 2026" : "January 30, 2026"}</strong>
        <button onClick={onEdit}>Edit</button>
      </div>
    </section>
  );
}

function SavedPaymentMethodStep({
  method,
  onEdit,
}: {
  method: "bank" | "card";
  onEdit: () => void;
}) {
  return (
    <section className="compact-saved-step payment-saved-step">
      <h2>
        <span>3.</span> Update payment method
      </h2>
      <div className="compact-saved-value payment">
        <div>
          <Icon file={method === "bank" ? "407e9.svg" : "46a24.svg"} size={24} />
          <strong>
            {method === "bank" ? "****8808 | Chase | Checking" : "****7536 | Direct Express card"}
          </strong>
        </div>
        <button onClick={onEdit}>Edit</button>
      </div>
    </section>
  );
}

function PaymentMethodStep({
  method,
  supportsDirectExpress,
  onMethodChange,
  onSave,
}: {
  method: "bank" | "card";
  supportsDirectExpress: boolean;
  onMethodChange: (method: "bank" | "card") => void;
  onSave: () => void;
}) {
  const [accountType, setAccountType] = useState("Checking");
  const [routingNumber, setRoutingNumber] = useState("321237536");
  const [accountNumber, setAccountNumber] = useState("00000008808");
  const [cardNumber, setCardNumber] = useState("321237536");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");
  const visibleMethod = supportsDirectExpress ? method : "bank";

  return (
    <section className="payment-method-step">
      <h2>
        <span>3.</span> Update payment method
      </h2>
      <div className={`payment-method-content ${supportsDirectExpress ? "" : "bank-only"}`.trim()}>
        {supportsDirectExpress && (
          <div className="payment-method-tabs">
            <button
              className={method === "bank" ? "selected" : ""}
              onClick={() => onMethodChange("bank")}
            >
              <Icon file={method === "bank" ? "0103b.svg" : "908c0.svg"} size={20} />
              <span>
                <strong>Bank account</strong>
                <small>Confirmation takes {method === "bank" ? "4-6" : "2-3"} days</small>
              </span>
            </button>
            <button
              className={method === "card" ? "selected" : ""}
              onClick={() => onMethodChange("card")}
            >
              <Icon file={method === "card" ? "46a24.svg" : "2523e.svg"} size={20} />
              <span>
                <strong>Direct Express card</strong>
                <small>Instant confirmation</small>
              </span>
            </button>
          </div>
        )}

        {visibleMethod === "bank" ? (
          <div className="payment-method-form">
            <MenuSelect
              label="Account type"
              value={accountType}
              options={["Checking", "Savings"]}
              onChange={setAccountType}
            />
            <label>
              <span>Routing number</span>
              <input
                inputMode="numeric"
                value={routingNumber}
                onChange={(event) => setRoutingNumber(event.target.value)}
              />
            </label>
            <label>
              <span>Bank account number</span>
              <input
                inputMode="numeric"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
              />
            </label>
            <button
              className="routing-help"
              onClick={() => window.alert("Account and routing number help opened")}
            >
              How to find your account and routing numbers
            </button>
          </div>
        ) : (
          <div className="payment-method-form">
            <label>
              <span>Card number</span>
              <input
                inputMode="numeric"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
              />
            </label>
            <div className="payment-method-split">
              <label>
                <span>Expiry date</span>
                <input
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(event) => setExpiry(event.target.value)}
                />
              </label>
              <label>
                <span>CVV</span>
                <input
                  inputMode="numeric"
                  placeholder="***"
                  value={cvv}
                  onChange={(event) => setCvv(event.target.value)}
                />
              </label>
            </div>
            <label>
              <span>ZIP code</span>
              <input
                inputMode="numeric"
                placeholder="12345"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
              />
            </label>
          </div>
        )}
        <button className="schedule-save" onClick={onSave}>
          Save
        </button>
      </div>
    </section>
  );
}

function PaymentPlanSummary({
  coverageStart,
  onContinue,
}: {
  coverageStart: "today" | "scheduled";
  onContinue: () => void;
}) {
  const coverageDate = coverageStart === "today" ? "January 15, 2026" : "January 30, 2026";
  const recurringDate = coverageStart === "today" ? "January 30, 2026" : "February 28, 2026";
  const recurringSchedule = "1st of the month";

  return (
    <section className="plan-summary-step">
      <div className="plan-summary-heading">
        <h2>
          <span>4.</span> Payment plan summary
        </h2>
        <button onClick={() => window.open("about:blank", "_blank")}>
          <Icon file="f03b6.svg" size={12} />
          <span>Watch example video (32 sec)</span>
        </button>
      </div>
      <div className="plan-summary-content">
        <div className="plan-summary-table">
          <div>
            <span>Total premium</span>
            <strong>$490.12/month</strong>
          </div>
          <div>
            <span>
              Coverage start date
              <small>First premium paid on this date</small>
            </span>
            <strong>{coverageDate}</strong>
          </div>
          <div>
            <span>Recurring payment dates</span>
            <strong>
              {recurringDate}
              <button onClick={() => window.alert("Next 12 payment dates opened")}>
                See next 12 payment dates
              </button>
            </strong>
          </div>
          <div>
            <span>Recurring schedule</span>
            <strong>{recurringSchedule}</strong>
          </div>
        </div>
        <button className="schedule-save" onClick={onContinue}>
          Continue
        </button>
      </div>
    </section>
  );
}

type SubmissionScreen = "esign" | "code" | "success";

function FlowBackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="submission-back" onClick={onClick}>
      <Icon file="d4005.svg" size={24} />
      <span>Back</span>
    </button>
  );
}

function EsignSelectionScreen({
  onBack,
  onSendCode,
  onSendLink,
}: {
  onBack: () => void;
  onSendCode: () => void;
  onSendLink: () => void;
}) {
  return (
    <main className="submission-page">
      <div className="submission-container esign-container">
        <FlowBackButton onClick={onBack} />
        <section className="esign-card">
          <header>
            <h1>E-sign by sending code and Submit application</h1>
            <p>Select client’s preference to receive the e-sign code on ***-**-9999</p>
          </header>
          <div className="esign-option">
            <p>
              Initiate an SMS text that will share the verification code and a link to review the
              application
            </p>
            <button className="submission-outline compact" onClick={onSendCode}>
              <Icon file="c5fb9.svg" size={24} />
              Send via SMS
            </button>
          </div>
        </section>
        <div className="esign-divider" aria-hidden="true">
          <span>or</span>
        </div>
        <section className="esign-card">
          <header>
            <h1>Send application to client</h1>
          </header>
          <div className="esign-option">
            <p>Send application to client on XXX@GMAIL.com and ***-**-9999 for review and e-sign</p>
            <button className="send-link" onClick={onSendLink}>
              Send Link
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function VerificationCodeScreen({
  onBack,
  onVerified,
}: {
  onBack: () => void;
  onVerified: () => void;
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    setDigits(nextDigits);
    if (digit && index < nextDigits.length - 1) inputs.current[index + 1]?.focus();
    if (nextDigits.every(Boolean)) onVerified();
  };

  return (
    <main className="submission-page">
      <div className="submission-container code-container">
        <FlowBackButton onClick={onBack} />
        <section className="code-card">
          <div className="code-heading">
            <h1>Enter the code sent to your client</h1>
            <p>
              We sent a verification code and link to review application details to your client’s
              mobile: ***-**-9999.
            </p>
          </div>
          <div className="code-inputs" aria-label="Six digit verification code">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputs.current[index] = node;
                }}
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                placeholder="-"
                aria-label={`Digit ${index + 1}`}
                onChange={(event) => updateDigit(index, event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && !digit && index > 0) {
                    inputs.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </div>
          <div className="code-message">
            Code sent to your client, it will expire in 5 mins. Delivery may take a few seconds.
          </div>
          <div className="resend-section">
            <p>Client didn’t receive the code? Resend a code in 30 sec</p>
            <div>
              <button disabled>
                <Icon file="ec1c7.svg" size={20} />
                SMS
              </button>
              <button disabled>
                <Icon file="5d0ae.svg" size={20} />
                Voice Call
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function PolicyUpdatedScreen({
  coverageStart,
  schedule,
  paymentMethod,
  onBack,
  onDone,
}: {
  coverageStart: "today" | "scheduled";
  schedule: string;
  paymentMethod: "bank" | "card";
  onBack: () => void;
  onDone: () => void;
}) {
  const coverageDate = coverageStart === "today" ? "January 15, 2026" : "January 30, 2026";
  const recurringDate = coverageStart === "today" ? "January 30, 2026" : "February 28, 2026";
  const recurringSchedule = schedule.replace(" (SSB)", "");
  const method =
    paymentMethod === "bank" ? "****8808  |  Chase  |  Checking" : "****7536  |  Direct Express";

  return (
    <main className="submission-page success-page">
      <div className="submission-container">
        <FlowBackButton onClick={onBack} />
        <section className="success-card">
          <div className="success-content">
            <div className="success-icon">
              <Icon file="b0e52.svg" size={88} />
            </div>
            <h1>Policy details have been updated</h1>
            <div className="success-summary">
              <div>
                <span>
                  Coverage start date
                  <small>First premium paid on this date</small>
                </span>
                <strong>{coverageDate}</strong>
              </div>
              <div>
                <span>Recurring payment dates</span>
                <strong>
                  {recurringDate}
                  <button onClick={() => window.alert("Next 12 payment dates opened")}>
                    See next 12 payment dates
                  </button>
                </strong>
              </div>
              <div>
                <span>Recurring schedule</span>
                <strong>{recurringSchedule}</strong>
              </div>
              <div>
                <span>Payment method</span>
                <strong>{method}</strong>
              </div>
            </div>
          </div>
          <button className="submission-outline success-done" onClick={onDone}>
            Back to customer list
          </button>
        </section>
      </div>
    </main>
  );
}

function ReviewProgressRail() {
  const icons = ["9806e.svg", "cd4d1.svg", "02878.svg", "3ff76.svg"];
  return (
    <aside className="review-progress-rail" aria-label="Application progress">
      <img className="rail-shape" src={`${A}/69ee9.svg`} alt="" />
      <div className="rail-avatar">OR</div>
      <strong>4/4</strong>
      <div className="rail-steps">
        {icons.map((icon, index) => (
          <div className={`rail-step ${index === icons.length - 1 ? "current" : ""}`} key={icon}>
            <span>
              <Icon file={icon} size={24} />
            </span>
            {index < icons.length - 1 && <i />}
          </div>
        ))}
      </div>
      <div className="rail-bottom">
        <span />
        <span>
          <Icon file="780d0.svg" size={24} />
        </span>
      </div>
    </aside>
  );
}

function CoverageStartStep({
  value,
  onChange,
  onSave,
}: {
  value: "today" | "scheduled";
  onChange: (value: "today" | "scheduled") => void;
  onSave: () => void;
}) {
  return (
    <section className="coverage-step">
      <div className="coverage-step-heading">
        <h2>
          <span>2.</span> Coverage start date
        </h2>
        <button onClick={() => window.open("about:blank", "_blank")}>
          <Icon file="f03b6.svg" size={12} />
          <span>Watch help video (32 sec)</span>
        </button>
      </div>
      <div className="coverage-options">
        <button
          className={`coverage-option ${value === "today" ? "selected" : ""}`}
          onClick={() => onChange("today")}
        >
          <span className="coverage-radio">
            {value === "today" ? <Icon file="03eae.svg" size={16} /> : <span />}
          </span>
          <div>
            <div className="coverage-option-title">
              <strong>Today</strong>
              <em>Better persistency</em>
            </div>
            <ul>
              <li>Your client must have funds available in their account today.</li>
              <li>
                The first premium payment will be drawn <b>immediately</b> upon application
                submission.
              </li>
              <li>Future payments will follow the selected payment schedule.</li>
            </ul>
          </div>
        </button>
        <button
          className={`coverage-option ${value === "scheduled" ? "selected" : ""}`}
          onClick={() => onChange("scheduled")}
        >
          <span className="coverage-radio">
            {value === "scheduled" ? <Icon file="03eae.svg" size={16} /> : <span />}
          </span>
          <div>
            <div className="coverage-option-title">
              <strong>Start on first scheduled payment date</strong>
            </div>
            <p>Coverage begins and the first premium collected on January 30, 2026.</p>
          </div>
        </button>
      </div>
      <button className="schedule-save" onClick={onSave}>
        Save
      </button>
    </section>
  );
}

function PaymentSchedulePage({
  initialRoute,
  initialValue,
  initialStep = 1,
  onBack,
  onSave,
}: {
  initialRoute: ScheduleRoute;
  initialValue: string;
  initialStep?: 1 | 2;
  onBack: () => void;
  onSave: (value: string, coverageStart: "today" | "scheduled") => void;
}) {
  const [route, setRoute] = useState<ScheduleRoute>(initialRoute);
  const [benefit, setBenefit] = useState(
    initialRoute === "ssb" ? "Social Security Benefits (SSB)" : "",
  );
  const [deposit, setDeposit] = useState("3rd Wednesday (Recommended)");
  const businessOptions = [
    "1st of the month",
    "15th of the month",
    "Last day of the month",
    "Specific Weekday",
  ];
  const initialIsWeekday = /(Monday|Tuesday|Wednesday|Thursday|Friday)/.test(initialValue);
  const [businessSchedule, setBusinessSchedule] = useState(
    initialIsWeekday
      ? "Specific Weekday"
      : initialValue.includes("Last")
        ? "Last day of the month"
        : businessOptions.includes(initialValue)
          ? initialValue
          : "1st of the month",
  );
  const [businessWeek, setBusinessWeek] = useState(
    initialValue.match(/^(1st|2nd|3rd|Last)/)?.[1] || "Last",
  );
  const [businessDay, setBusinessDay] = useState(
    initialValue.match(/(Monday|Tuesday|Wednesday|Thursday|Friday)/)?.[1] || "Friday",
  );
  const [calendarDay, setCalendarDay] = useState("16");
  const isStandardSsbBenefit = benefit === "Social Security Benefits (SSB)";
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(initialStep);
  const [pendingSchedule, setPendingSchedule] = useState(initialValue);
  const [coverageStart, setCoverageStart] = useState<"today" | "scheduled">("today");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "card">("bank");
  const [submissionScreen, setSubmissionScreen] = useState<SubmissionScreen | null>(null);

  const save = () => {
    let nextSchedule: string;
    if (route === "ssb") {
      nextSchedule = isStandardSsbBenefit
        ? `${deposit.replace(" (Recommended)", "")} (SSB)`
        : "3rd of the month (SSB)";
    } else if (route === "calendar") {
      const suffix =
        calendarDay === "1" ? "st" : calendarDay === "2" ? "nd" : calendarDay === "3" ? "rd" : "th";
      nextSchedule = `${calendarDay}${suffix} of the month`;
    } else {
      nextSchedule =
        businessSchedule === "Specific Weekday"
          ? `${businessWeek} ${businessDay}`
          : businessSchedule;
    }
    transitionUi(() => {
      setPendingSchedule(nextSchedule);
      if (route !== "ssb") setPaymentMethod("bank");
      setActiveStep(2);
    });
  };

  if (submissionScreen === "esign") {
    return (
      <EsignSelectionScreen
        onBack={() => setSubmissionScreen(null)}
        onSendCode={() => setSubmissionScreen("code")}
        onSendLink={() => setSubmissionScreen("success")}
      />
    );
  }

  if (submissionScreen === "code") {
    return (
      <VerificationCodeScreen
        onBack={() => setSubmissionScreen("esign")}
        onVerified={() => setSubmissionScreen("success")}
      />
    );
  }

  if (submissionScreen === "success") {
    return (
      <PolicyUpdatedScreen
        coverageStart={coverageStart}
        schedule={pendingSchedule}
        paymentMethod={paymentMethod}
        onBack={() => setSubmissionScreen("code")}
        onDone={() => onSave(pendingSchedule, coverageStart)}
      />
    );
  }

  return (
    <main className="schedule-page">
      <div className="schedule-container">
        <button className="schedule-back" onClick={onBack}>
          <Icon file="d4005.svg" size={24} />
          <span>Back</span>
        </button>

        <div className="verification-banner">
          <div className="verification-icon">
            <Icon file="c051c.svg" size={20} />
          </div>
          <div>
            <strong>
              Changes to policy details take effect only after your client confirms with a one-time
              code
            </strong>
            <p>
              We’ll send a verification code to your client’s mobile: ***-**-9999 to confirm the
              changes
            </p>
          </div>
        </div>

        {activeStep === 1 ? (
          <section className="schedule-card">
            <div className="schedule-card-inner">
              <div className="schedule-heading">
                <h1>
                  <span>1.</span> Set payment schedule
                </h1>
                <button onClick={() => window.open("about:blank", "_blank")}>
                  <Icon file="f03b6.svg" size={12} />
                  <span>Watch help video (32 sec)</span>
                </button>
              </div>

              <div
                className={`billing-options ${initialRoute === "business" ? "business-inset" : ""}`}
              >
                <div
                  role="radio"
                  tabIndex={0}
                  aria-checked={route === "ssb"}
                  className={`billing-card ${route === "ssb" ? "selected" : "muted"}`}
                  onClick={() => setRoute("ssb")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setRoute("ssb");
                    }
                  }}
                >
                  <div className="billing-card-title">
                    {route === "ssb" ? (
                      <Icon file="3ee15.svg" size={20} />
                    ) : (
                      <span className="radio-empty" />
                    )}
                    <div>
                      <strong style={{ marginTop: "-7px" }}>Social Security Billing</strong>
                      <p>
                        Select the type of Social Security benefit the deposit is based on, and
                        we&apos;ll recommend the correct billing schedule. See the{" "}
                        <span className="inline-link">SSA payment guide</span> for details.
                      </p>
                    </div>
                  </div>

                  {route === "ssb" ? (
                    <div className="billing-controls" onClick={(event) => event.stopPropagation()}>
                      <label>
                        <strong>What benefit does your client receive?</strong>
                        <span>
                          Can be your client&apos;s own benefit, or a spouse&apos;s/family
                          member&apos;s
                        </span>
                      </label>
                      <BenefitSelect value={benefit} onChange={setBenefit} />
                      {benefit &&
                        (isStandardSsbBenefit ? (
                          <>
                            <label>
                              <strong>When does your client receive this deposit?</strong>
                              <span>
                                &lt;3rd Wednesday&gt; matches your client&apos;s birth date
                                (&lt;March 12&gt;)
                              </span>
                            </label>
                            <SelectControl
                              value={deposit}
                              options={[
                                "2nd Wednesday",
                                "3rd Wednesday (Recommended)",
                                "4th Wednesday",
                              ]}
                              onChange={setDeposit}
                              arrow="25633.svg"
                            />
                            <div
                              className="schedule-summary"
                              style={{
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                gap: "8px 16px",
                                rowGap: "8px",
                              }}
                            >
                              <span>Payment schedule</span>
                              <div>
                                <strong>{deposit.replace(" (Recommended)", "")}</strong>
                                <em>Next payment date: October 17, 2026</em>
                              </div>
                            </div>
                            <div className="payment-options">
                              <span>Payment options:</span>
                              <PaymentBadge />
                              <PaymentBadge kind="card" />
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className="schedule-summary alternate"
                              style={{
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                gap: "8px 16px",
                                rowGap: "8px",
                              }}
                            >
                              <span>Payment schedule</span>
                              <div>
                                <strong>3rd of the month</strong>
                                <em>Next payment date: October 3, 2026</em>
                              </div>
                            </div>
                            <div className="payment-options">
                              <span>Payment options:</span>
                              <PaymentBadge />
                              <PaymentBadge kind="card" />
                            </div>
                          </>
                        ))}
                    </div>
                  ) : (
                    <div className="payment-options disabled-options">
                      <span>Payment options:</span>
                      <PaymentBadge disabled />
                      <PaymentBadge kind="card" disabled />
                    </div>
                  )}
                </div>

                <div
                  role="radio"
                  tabIndex={0}
                  aria-checked={route === "business"}
                  className={`billing-card ${route === "business" ? "selected" : "muted"}`}
                  onClick={() => setRoute("business")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setRoute("business");
                    }
                  }}
                >
                  <div className="billing-card-title">
                    {route === "business" ? (
                      <Icon file="3ee15.svg" size={20} />
                    ) : (
                      <span className="radio-empty" />
                    )}
                    <div>
                      <strong style={{ marginTop: "-7px" }}>Business day / Payroll</strong>
                      <p>Ethos auto-adjusts for weekends &amp; holidays.</p>
                    </div>
                  </div>
                  {route === "business" ? (
                    <div className="billing-controls" onClick={(event) => event.stopPropagation()}>
                      <div
                        className={`business-select-grid ${businessSchedule === "Specific Weekday" ? "specific" : ""}`}
                      >
                        <MenuSelect
                          label="Schedule type"
                          value={businessSchedule}
                          options={businessOptions}
                          onChange={setBusinessSchedule}
                        />
                        {businessSchedule === "Specific Weekday" && (
                          <>
                            <MenuSelect
                              label="Day of week"
                              value={businessDay}
                              options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
                              onChange={setBusinessDay}
                            />
                            <MenuSelect
                              label="Week in month"
                              value={businessWeek}
                              options={["1st", "2nd", "3rd", "Last"]}
                              onChange={setBusinessWeek}
                            />
                          </>
                        )}
                      </div>
                      <div className="payment-options">
                        <span>Payment options:</span>
                        <PaymentBadge />
                      </div>
                    </div>
                  ) : (
                    <div className="payment-options disabled-options">
                      <span>Payment options:</span>
                      <PaymentBadge disabled />
                    </div>
                  )}
                </div>

                <div
                  role="radio"
                  tabIndex={0}
                  aria-checked={route === "calendar"}
                  className={`billing-card ${route === "calendar" ? "selected" : "muted"}`}
                  onClick={() => setRoute("calendar")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setRoute("calendar");
                    }
                  }}
                >
                  <div className="billing-card-title">
                    {route === "calendar" ? (
                      <Icon file="3ee15.svg" size={20} />
                    ) : (
                      <span className="radio-empty" />
                    )}
                    <div>
                      <strong style={{ marginTop: "-7px" }}>Calendar day</strong>
                      <p>Always due on the exact same day.</p>
                    </div>
                  </div>
                  {route === "calendar" ? (
                    <div className="billing-controls" onClick={(event) => event.stopPropagation()}>
                      <MenuSelect
                        label="Specific day (1-28)"
                        value={calendarDay}
                        options={Array.from({ length: 28 }, (_, index) => String(index + 1))}
                        onChange={setCalendarDay}
                      />
                      <div className="payment-options">
                        <span>Payment options:</span>
                        <PaymentBadge />
                      </div>
                    </div>
                  ) : (
                    <div className="payment-options disabled-options">
                      <span>Payment options:</span>
                      <PaymentBadge disabled />
                    </div>
                  )}
                </div>
              </div>

              <button
                className="schedule-save"
                disabled={route === "ssb" && !benefit}
                onClick={save}
              >
                Save
              </button>
            </div>
          </section>
        ) : (
          <SavedScheduleStep
            route={route}
            benefit={benefit}
            schedule={pendingSchedule}
            onEdit={() => setActiveStep(1)}
          />
        )}

        {activeStep === 2 ? (
          <CoverageStartStep
            value={coverageStart}
            onChange={setCoverageStart}
            onSave={() => {
              transitionUi(() => setActiveStep(3));
            }}
          />
        ) : activeStep >= 3 ? (
          <SavedCoverageStep coverageStart={coverageStart} onEdit={() => setActiveStep(2)} />
        ) : (
          <section className="collapsed-step step-two">
            <span>2.</span> Coverage start date
          </section>
        )}
        {activeStep === 4 ? (
          <>
            <PaymentMethodStep
              method={paymentMethod}
              supportsDirectExpress={route === "ssb"}
              onMethodChange={setPaymentMethod}
              onSave={() => transitionUi(() => setActiveStep(3))}
            />
            <section className="collapsed-step step-four">
              <span>4.</span> Payment plan summary
            </section>
          </>
        ) : activeStep === 3 ? (
          <>
            <SavedPaymentMethodStep method={paymentMethod} onEdit={() => setActiveStep(4)} />
            <PaymentPlanSummary
              coverageStart={coverageStart}
              onContinue={() => setSubmissionScreen("esign")}
            />
          </>
        ) : (
          <>
            <section className="collapsed-step step-three">
              <span>3.</span> Update payment method
            </section>
            <section className="collapsed-step step-four">
              <span>4.</span> Payment plan summary
            </section>
          </>
        )}
      </div>
    </main>
  );
}

type CustomerPaymentScreen = "method" | "loading" | "code" | "success";

function CustomerPaymentBreadcrumbs({ onClose }: { onClose: () => void }) {
  return (
    <nav className="customer-payment-breadcrumbs" aria-label="Breadcrumb">
      <button onClick={onClose}>Customer list</button>
      <span>/</span>
      <button onClick={onClose}>Mike Johnson</button>
      <span>/</span>
      <button>Manage customer payment</button>
      <span>/</span>
    </nav>
  );
}

function SecurityBadges() {
  return (
    <div className="security-badges" aria-label="Verified and SSL secured">
      <div className="security-seal">
        <span>VERIFY</span>
        <div>
          <img className="security-sprite first" src={`${A}/15f5e.png`} alt="" />
          <img className="security-sprite second" src={`${A}/15f5e.png`} alt="" />
          <strong>SECURED</strong>
        </div>
        <small>
          powered by <b>Symantec</b>
        </small>
      </div>
      <div className="ssl-badge">
        <img src={`${A}/45436.svg`} alt="" />
        <img src={`${A}/85722.svg`} alt="" />
        <img src={`${A}/957eb.svg`} alt="" />
        <img src={`${A}/6f511.svg`} alt="" />
      </div>
    </div>
  );
}

const loadingIllustrationParts = [
  ["1cd0b.svg", "part-2"],
  ["175a1.svg", "part-3"],
  ["adf89.svg", "part-4"],
  ["88535.svg", "part-5"],
  ["a8a98.svg", "part-6"],
  ["c96ac.svg", "part-7"],
  ["eec2d.svg", "part-8"],
  ["93729.svg", "part-9"],
  ["92ed0.svg", "part-10"],
  ["17ad1.svg", "part-11"],
  ["11fa1.svg", "part-12"],
  ["d1117.svg", "part-13"],
  ["25fe5.svg", "part-14"],
  ["e13a9.svg", "part-15"],
  ["7ab9c.svg", "part-16"],
  ["93984.svg", "part-17"],
  ["fe965.svg", "part-18"],
  ["8b6f3.svg", "part-19"],
  ["cd798.svg", "part-20"],
] as const;

function PaymentLoadingIllustration() {
  return (
    <div className="payment-loading-illustration" aria-hidden="true">
      <div className="loading-mask">
        <img src={`${A}/9bb0d.svg`} alt="" />
      </div>
      {loadingIllustrationParts.map(([file, className]) => (
        <img key={file} className={className} src={`${A}/${file}`} alt="" />
      ))}
    </div>
  );
}

function CustomerPaymentLoading({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 1600);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <main className="customer-payment-loading">
      <PaymentLoadingIllustration />
      <div className="loading-copy">
        <div>
          <h1>Sending SMS code to your client...</h1>
          <p>
            Before that, we&apos;re delivering the required payment authorization via Email and SMS.
          </p>
        </div>
        <div className="loading-progress">
          <img src={`${A}/463f2.svg`} alt="" />
          <div>
            <span>Almost there...</span>
            <span>85%</span>
          </div>
        </div>
      </div>
    </main>
  );
}

function CustomerPaymentCode({
  onBack,
  onComplete,
  onClose,
}: {
  onBack: () => void;
  onComplete: () => void;
  onClose: () => void;
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    setDigits(nextDigits);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
    if (nextDigits.every(Boolean)) onComplete();
  };

  return (
    <div className="app-shell customer-payment-shell">
      <Sidebar activeNav="customers" onNavChange={onClose} />
      <main className="page">
        <header className="topbar customer-payment-topbar">
          <button className="customer-payment-back" onClick={onBack}>
            <Icon file="138f9.svg" size={20} />
            Back
          </button>
        </header>
        <div className="customer-payment-content">
          <CustomerPaymentBreadcrumbs onClose={onClose} />
          <section className="customer-payment-card code-payment-card">
            <h1>Enter the code sent to your client</h1>
            <div className="customer-code-inputs" aria-label="Six digit verification code">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(node) => {
                    inputs.current[index] = node;
                  }}
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  placeholder="-"
                  aria-label={`Digit ${index + 1}`}
                  onChange={(event) => updateDigit(index, event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && !digit && index > 0) {
                      inputs.current[index - 1]?.focus();
                    }
                  }}
                />
              ))}
            </div>
            <div className="customer-code-message">
              Code sent to your client, it will expire in 5 mins. Delivery may take a few seconds.
            </div>
            <p className="customer-resend">Client didn’t receive the code? Resend code in 30 sec</p>
          </section>
        </div>
      </main>
    </div>
  );
}

function CustomerPaymentSuccess({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  return (
    <div className="app-shell customer-payment-shell">
      <Sidebar activeNav="customers" onNavChange={onClose} />
      <main className="page">
        <header className="topbar customer-payment-topbar">
          <button className="customer-payment-back" onClick={onBack}>
            <Icon file="138f9.svg" size={20} />
            Back
          </button>
        </header>
        <div className="customer-payment-content">
          <CustomerPaymentBreadcrumbs onClose={onClose} />
          <section className="customer-payment-card customer-payment-success">
            <div className="success-icon">
              <Icon file="b0e52.svg" size={88} />
            </div>
            <div>
              <h1>Payment method saved</h1>
              <p>The payment method was successfully updated in our system</p>
            </div>
            <button onClick={onClose}>Back to customer list</button>
          </section>
        </div>
      </main>
    </div>
  );
}

function CustomerPaymentMethod({
  onBack,
  onSend,
  onClose,
}: {
  onBack: () => void;
  onSend: () => void;
  onClose: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "card">("bank");
  const [accountType, setAccountType] = useState("Checking");
  const [routingNumber, setRoutingNumber] = useState("321237536");
  const [accountNumber, setAccountNumber] = useState("00000008808");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className="app-shell customer-payment-shell">
      <Sidebar activeNav="customers" onNavChange={onClose} />
      <main className="page">
        <header className="topbar customer-payment-topbar">
          <button className="customer-payment-back" onClick={onBack}>
            <Icon file="138f9.svg" size={20} />
            Back
          </button>
        </header>
        <div className="customer-payment-content">
          <CustomerPaymentBreadcrumbs onClose={onClose} />
          <h1 className="customer-payment-title">Update primary payment</h1>
          <section className="customer-payment-card method-payment-card">
            <div className="customer-payment-methods">
              <h2>Select payment method</h2>
              <div>
                <button
                  className={paymentMethod === "bank" ? "selected" : ""}
                  onClick={() => setPaymentMethod("bank")}
                >
                  <Icon file={paymentMethod === "bank" ? "0103b.svg" : "908c0.svg"} size={20} />
                  <span>
                    <strong>Bank account</strong>
                    <small>Confirmation takes 4-6 days</small>
                  </span>
                </button>
                <button
                  className={paymentMethod === "card" ? "selected" : ""}
                  onClick={() => setPaymentMethod("card")}
                >
                  <Icon file={paymentMethod === "card" ? "46a24.svg" : "2523e.svg"} size={20} />
                  <span>
                    <strong>Direct Express card</strong>
                    <small>Instant confirmation</small>
                  </span>
                </button>
              </div>
            </div>
            <div className="customer-payment-form">
              {paymentMethod === "bank" ? (
                <>
                  <label>
                    <span>Account type</span>
                    <select
                      value={accountType}
                      onChange={(event) => setAccountType(event.target.value)}
                    >
                      <option>Checking</option>
                      <option>Savings</option>
                    </select>
                  </label>
                  <label>
                    <span>Routing number</span>
                    <input
                      inputMode="numeric"
                      value={routingNumber}
                      onChange={(event) => setRoutingNumber(event.target.value)}
                    />
                  </label>
                  <label>
                    <span>Bank account number</span>
                    <input
                      inputMode="numeric"
                      value={accountNumber}
                      onChange={(event) => setAccountNumber(event.target.value)}
                    />
                  </label>
                  <button
                    className="customer-routing-help"
                    onClick={() => window.alert("Account and routing number help opened")}
                  >
                    How to find your account and routing numbers
                  </button>
                </>
              ) : (
                <>
                  <label>
                    <span>Card number</span>
                    <input
                      inputMode="numeric"
                      placeholder="Enter card number"
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value)}
                    />
                  </label>
                  <div className="customer-card-fields">
                    <label>
                      <span>Expiry date</span>
                      <input
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(event) => setExpiry(event.target.value)}
                      />
                    </label>
                    <label>
                      <span>CVV</span>
                      <input
                        inputMode="numeric"
                        placeholder="***"
                        value={cvv}
                        onChange={(event) => setCvv(event.target.value)}
                      />
                    </label>
                    <label style={{ gridColumn: "1 / -1" }}>
                      <span>ZIP code</span>
                      <input inputMode="numeric" placeholder="12345" />
                    </label>
                  </div>
                </>
              )}
            </div>
            <button className="customer-payment-send" onClick={onSend}>
              Send SMS code to update and retry
            </button>
          </section>
          <SecurityBadges />
        </div>
      </main>
    </div>
  );
}

function CustomerPaymentFlow({
  screen,
  setScreen,
  onClose,
}: {
  screen: CustomerPaymentScreen;
  setScreen: (screen: CustomerPaymentScreen) => void;
  onClose: () => void;
}) {
  if (screen === "loading") {
    return <CustomerPaymentLoading onComplete={() => setScreen("code")} />;
  }
  if (screen === "code") {
    return (
      <CustomerPaymentCode
        onBack={() => setScreen("method")}
        onComplete={() => setScreen("success")}
        onClose={onClose}
      />
    );
  }
  if (screen === "success") {
    return <CustomerPaymentSuccess onBack={() => setScreen("code")} onClose={onClose} />;
  }
  return (
    <CustomerPaymentMethod onBack={onClose} onSend={() => setScreen("loading")} onClose={onClose} />
  );
}

function PolicyPage() {
  const [activeNav, setActiveNav] = useState("customers");
  const [toast, setToast] = useState("");
  const [values, setValues] = useState(initialValues);
  const [editing, setEditing] = useState<EditableField | null>(null);
  const [draft, setDraft] = useState("");
  const [modal, setModal] = useState<"payment" | "beneficiaries" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scheduleRoute, setScheduleRoute] = useState<ScheduleRoute | null>(null);
  const [scheduleField, setScheduleField] = useState<EditableField | null>(null);
  const [flowInitialStep, setFlowInitialStep] = useState<1 | 2>(1);
  const [customerPaymentScreen, setCustomerPaymentScreen] = useState<CustomerPaymentScreen | null>(
    null,
  );

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const navLabelById = Object.fromEntries(
    [...primaryNav, ...secondaryNav].map((item) => [item.id, item.label]),
  );
  const selectNav = (id: string) => {
    setActiveNav(id);
    notify(`${navLabelById[id] ?? id} selected`);
  };

  const startEdit = (field: EditableField) => {
    if (field.startsWith("Payment schedule")) {
      setFlowInitialStep(1);
      setScheduleField(field);
      setScheduleRoute(
        values[field].includes("SSB")
          ? "ssb"
          : /^(?:[2-9]|1[0-4]|1[6-9]|2[0-8])(?:nd|rd|th) of the month$/.test(values[field])
            ? "calendar"
            : "business",
      );
      return;
    }
    setDraft(values[field]);
    setEditing(field);
  };

  const openCoverageStartEdit = () => {
    const schedule = values["Payment schedule 1"];
    setFlowInitialStep(2);
    setScheduleField("Payment schedule 1");
    setScheduleRoute(
      schedule.includes("SSB")
        ? "ssb"
        : /^(?:[2-9]|1[0-4]|1[6-9]|2[0-8])(?:nd|rd|th) of the month$/.test(schedule)
          ? "calendar"
          : "business",
    );
  };

  const saveEdit = () => {
    if (!editing || !draft.trim()) return;
    setValues((current) => ({ ...current, [editing]: draft.trim() }));
    setEditing(null);
    notify("Application details updated");
  };

  const downloadApplication = () => {
    const blob = new Blob(
      ["Century Insurance Co.\nApplication IUL002970733\nApplicant: Mike Johnson"],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "application-IUL002970733.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    notify("Application downloaded");
  };

  if (customerPaymentScreen) {
    return (
      <CustomerPaymentFlow
        screen={customerPaymentScreen}
        setScreen={setCustomerPaymentScreen}
        onClose={() => setCustomerPaymentScreen(null)}
      />
    );
  }

  if (scheduleRoute && scheduleField) {
    return (
      <PaymentSchedulePage
        initialRoute={scheduleRoute}
        initialValue={values[scheduleField]}
        initialStep={flowInitialStep}
        onBack={() => {
          transitionUi(() => {
            setScheduleRoute(null);
            setScheduleField(null);
          });
        }}
        onSave={(value, coverageStart) => {
          transitionUi(() => {
            setValues((current) => ({
              ...current,
              ...(flowInitialStep === 1 ? { [scheduleField]: value } : {}),
              "Start date": coverageStart === "today" ? "01/15/26" : "01/30/26",
            }));
            setScheduleRoute(null);
            setScheduleField(null);
            notify(flowInitialStep === 2 ? "Coverage start date updated" : "Payment plan updated");
          });
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      <Sidebar activeNav={activeNav} onNavChange={selectNav} />
      <main className="page">
        <header className="topbar" style={{ position: "sticky" }}>
          <button className="back-button" onClick={() => notify("Back to customers")}>
            <Icon file="138f9.svg" size={24} />
            <span>Back</span>
          </button>
        </header>

        <div className="content">
          <section className="policy-card">
            <div className="customer-row">
              <div className="avatar">MJ</div>
              <div className="customer-meta">
                <strong className="customer-name">Mike Johnson</strong>
                <span className="dot">•</span>
                <span>08/21/1996 (29 years)</span>
                <span className="dot">•</span>
                <span className="copy-group">
                  mike.johnson@gmail.com{" "}
                  <CopyButton value="mike.johnson@gmail.com" notify={notify} />
                </span>
                <span className="dot">•</span>
                <span className="copy-group">
                  +1 (678) 595-4900 <CopyButton value="+1 (678) 595-4900" notify={notify} />
                </span>
              </div>
            </div>
            <div className="policy-row">
              <div>
                <div className="product-line">
                  <h1>TruStage Term Life</h1>
                  <span>•</span>
                  <span>TruStage®</span>
                  <span>•</span>
                  <span>$300,000</span>
                </div>
                <div className="badges">
                  <button
                    className="status-badge"
                    onClick={() => notify("Status: Submitted for Future Issuance")}
                  >
                    Submitted for Future Issuance
                  </button>
                  <div className="policy-badge">
                    Policy number: IUL002970733{" "}
                    <CopyButton value="IUL002970733" notify={notify} file="caa81.svg" />
                  </div>
                </div>
              </div>
              <div className="policy-actions">
                <button
                  className="primary-button"
                  onClick={() => setCustomerPaymentScreen("method")}
                >
                  Manage customer payment
                </button>
                <div className="menu-wrap">
                  <button
                    className="more-button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label="More actions"
                    aria-expanded={menuOpen}
                  >
                    <Icon file="0446f.svg" size={24} />
                  </button>
                  {menuOpen && (
                    <div className="action-menu">
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          notify("Policy summary printed");
                        }}
                      >
                        Print policy summary
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          notify("Policy ID copied");
                        }}
                      >
                        Copy policy ID
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          notify("Support request started");
                        }}
                      >
                        Contact support
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="details-layout">
            <section className="details-card">
              <h2>Application details</h2>
              <div className="info-banner">
                <Icon file="11705.svg" size={24} />
                <p>
                  You can now edit <strong>coverage start date and payment schedule</strong> to
                  match client funds.
                </p>
                <button className="text-link blue" onClick={() => startEdit("Start date")}>
                  Edit
                </button>
              </div>
              <div className="details-grid">
                <Field label="Coverage" value="$300,000" />
                <Field label="Monthly premium" value="$920" />
                <Field label="Term Length" value="30 yrs" />
                <Field label="State" value="Arizona" />
                <Field label="Rate class" value="Preferred Plus Non-Tobacco" />
                <Field label="Citizenship" value="US citizen" />
                <Field label="Created date" value="12/22/25" />
                <Field
                  label="Beneficiaries"
                  value="2 added"
                  action="View"
                  onAction={() => setModal("beneficiaries")}
                />
                <Field label="Submission date" value="-" />
                <Field
                  label="Start date"
                  value={values["Start date"]}
                  action="Edit"
                  onAction={openCoverageStartEdit}
                />
                <Field
                  label="Payment schedule"
                  value={values["Payment schedule 1"]}
                  action="Edit"
                  onAction={() => startEdit("Payment schedule 1")}
                />
                <Field
                  label="Payment schedule"
                  value={values["Payment schedule 2"]}
                  action="Edit"
                  onAction={() => startEdit("Payment schedule 2")}
                />
                <Field
                  label="Payment schedule"
                  value={values["Payment schedule 3"]}
                  action="Edit"
                  onAction={() => startEdit("Payment schedule 3")}
                />
                <Field
                  label="Payment schedule"
                  value={values["Payment schedule 4"]}
                  action="Edit"
                  onAction={() => startEdit("Payment schedule 4")}
                />
              </div>
            </section>

            <aside className="side-card">
              <section className="side-section">
                <SectionTitle icon="306b1.svg">Support lines</SectionTitle>
                <div className="outlined-card support-card">
                  <div className="support-details">
                    <div className="support-head">
                      <button
                        className="blue-link"
                        onClick={() => notify("Opening general queries")}
                      >
                        General queries
                      </button>
                      <span className="ethos-badge">Ethos</span>
                    </div>
                    <div className="support-contact">
                      <span>(415) 797-0864</span>
                      <CopyButton value="(415) 797-0864" notify={notify} file="caa81.svg" />
                      <span>•</span>
                      <span>agents@getethos.com</span>
                      <CopyButton value="agents@getethos.com" notify={notify} file="caa81.svg" />
                    </div>
                  </div>
                  <button className="view-all" onClick={() => notify("All support contacts shown")}>
                    View all
                  </button>
                </div>
              </section>

              <section className="side-section">
                <SectionTitle icon="ac09c.svg">Resources</SectionTitle>
                <div className="outlined-card resource-list">
                  {["Underwriting Guidelines", "Status cheatsheet"].map((item) => (
                    <button key={item} onClick={() => notify(`${item} opened`)}>
                      <span>{item}</span>
                      <Icon file="ac09c.svg" size={16} />
                    </button>
                  ))}
                </div>
              </section>

              <section className="side-section compact">
                <SectionTitle icon="3a4ce.svg">Documents</SectionTitle>
                <button className="document-row" onClick={downloadApplication}>
                  <span>Application</span>
                  <Icon file="32c4c.svg" size={16} />
                </button>
              </section>

              <section className="side-section compact">
                <SectionTitle icon="c3b4f.svg">Writing agent</SectionTitle>
                <button
                  className="agent-card"
                  onClick={() => notify("Writing agent profile opened")}
                >
                  <strong>Mike Ross</strong>
                  <span>mike.ross@gmail.com · +1 (678) 372-3254</span>
                </button>
              </section>
            </aside>
          </div>
        </div>
      </main>

      {editing && (
        <Modal title={`Edit ${editing.replace(/\s\d$/, "")}`} onClose={() => setEditing(null)}>
          <label className="input-label" htmlFor="edit-value">
            Value
          </label>
          <input
            id="edit-value"
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
          />
          <div className="modal-actions">
            <button className="secondary-button" onClick={() => setEditing(null)}>
              Cancel
            </button>
            <button className="primary-button" onClick={saveEdit}>
              Save changes
            </button>
          </div>
        </Modal>
      )}

      {modal === "payment" && (
        <Modal title="Manage customer payment" onClose={() => setModal(null)}>
          <p className="modal-copy">
            Choose how you’d like to manage Mike Johnson’s monthly premium of <strong>$920.</strong>
          </p>
          <div className="choice-list">
            <button
              onClick={() => {
                setModal(null);
                startEdit("Payment schedule 1");
              }}
            >
              Change payment schedule <span>›</span>
            </button>
            <button
              onClick={() => {
                setModal(null);
                setCustomerPaymentScreen("method");
              }}
            >
              Update payment method <span>›</span>
            </button>
            <button
              onClick={() => {
                setModal(null);
                notify("Payment history opened");
              }}
            >
              View payment history <span>›</span>
            </button>
          </div>
        </Modal>
      )}

      {modal === "beneficiaries" && (
        <Modal title="Beneficiaries" onClose={() => setModal(null)}>
          <div className="beneficiary">
            <div className="avatar small">SJ</div>
            <div>
              <strong>Sarah Johnson</strong>
              <span>Primary · 70%</span>
            </div>
          </div>
          <div className="beneficiary">
            <div className="avatar small">EJ</div>
            <div>
              <strong>Evan Johnson</strong>
              <span>Contingent · 30%</span>
            </div>
          </div>
          <div className="modal-actions">
            <button
              className="primary-button"
              onClick={() => {
                setModal(null);
                notify("Beneficiary editor opened");
              }}
            >
              Manage beneficiaries
            </button>
          </div>
        </Modal>
      )}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ─── App ───────────────────────────────────────────────────── */

export default function App() {
  return <PolicyPage />;
}
