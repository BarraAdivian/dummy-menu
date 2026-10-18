function IcReceipt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6 3h12v18l-2.4-1.6-2.4 1.6-2.4-1.6L8.4 21 6 19.4V3z" />
      <path d="M9.5 8h5M9.5 12h5" />
    </svg>
  )
}

function IcUtensils() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}

function IcChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 3v18h18" />
      <path d="M18 17V9M13 17V5M8 17v-3" />
    </svg>
  )
}

function IcUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

export default function AdminNav({ page, onNav }) {
  const base = "flex items-center gap-2 px-4 h-10 rounded-full text-xs transition-colors"
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#161513] border border-white/10 shadow-xl shadow-black/25 rounded-full p-1.5 flex items-center gap-1">
      <button onClick={() => onNav("pesanan")} className={`${base} ${page === "pesanan" ? "bg-[#F2F1EC] text-[#161513]" : "text-white/40"}`}>
        <IcReceipt />
        {page === "pesanan" && <span>Pesanan</span>}
      </button>
      <button onClick={() => onNav("menu")} className={`${base} ${page === "menu" ? "bg-[#F2F1EC] text-[#161513]" : "text-white/40"}`}>
        <IcUtensils />
        {page === "menu" && <span>Menu</span>}
      </button>
      <span className="w-10 h-10 rounded-full flex items-center justify-center text-white/40"><IcChart /></span>
      <span className="w-10 h-10 rounded-full flex items-center justify-center text-white/40"><IcUser /></span>
    </nav>
  )
}