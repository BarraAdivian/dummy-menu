import { useState } from "react"

function IcPie() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  )
}

function IcClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function IcQr() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M14 14h3v3h-3z" />
      <path d="M20 14v.01M14 20v.01M20 20v.01" />
    </svg>
  )
}

function IcCard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  )
}

function IcUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IcPrinter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6 9V3h12v6" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  )
}

function IcPercent() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M19 5 5 19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  )
}

function IcLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function IcLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}

function IcChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

const MENU = [
  { label: "Profil warung", icon: IcPie, key: "profil" },
  { label: "Jam buka", icon: IcClock, key: "jambuka" },
  { label: "Menu & QR", icon: IcQr, key: "meja" },
  { label: "Pembayaran", icon: IcCard, key: "pembayaran" },
  { label: "Staf", icon: IcUsers, key: "staf" },
  { label: "Printer", icon: IcPrinter, key: "printer" },
  { label: "Pajak & biaya", icon: IcPercent, key: null },
  { label: "Kata sandi", icon: IcLock, key: null },
]

export default function AdminAkunPage({ onOpen }) {
  const [buka, setBuka] = useState(true)

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6">
      <header className="flex items-center gap-2">
        <span className="font-serif text-[26px]">Resto</span>
        <span className="text-[11px] uppercase tracking-[0.25em] border border-black/15 rounded-full px-2.5 py-1 text-black/50">Admin</span>
      </header>

      <div className="flex items-center gap-3 mt-5">
        <div className="w-12 h-12 rounded-full bg-[#161513] text-white flex items-center justify-center font-serif text-lg">FK</div>
        <div>
          <div className="font-serif text-2xl leading-none">Fakih</div>
          <div className="text-xs text-black/40 mt-1">Owner</div>
        </div>
      </div>

      <div className={`rounded-3xl p-5 mt-5 transition-colors ${buka ? "bg-[#161513] text-white" : "bg-white text-[#161513] border border-black/15"}`}>
        <div className="flex items-center justify-between">
          <span className={`text-[9px] uppercase tracking-[0.25em] ${buka ? "text-white/50" : "text-black/40"}`}>Waktu buka</span>
          <button
            type="button"
            onClick={() => setBuka(!buka)}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors ${buka ? "bg-white/25" : "bg-black/15"}`}
          >
            <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${buka ? "translate-x-5" : "translate-x-0"}`}></span>
          </button>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="font-serif text-4xl">{buka ? "Buka" : "Tutup"}</span>
          <span className={`text-xs pb-1 ${buka ? "text-white/50" : "text-black/40"}`}>sampai {buka ? "22.00" : "08.00"}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {MENU.map((m) => {
          const Icon = m.icon
          return (
            <div
              key={m.label}
              onClick={() => (m.key ? onOpen(m.key) : alert("Belum ada mockup — masih dummy"))}
              className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer transition active:scale-[0.99]"
            >
              <span className="text-black/60"><Icon /></span>
              <span className="flex-1 text-sm">{m.label}</span>
              <span className="text-black/25"><IcChevron /></span>
            </div>
          )
        })}
      </div>

      <button
        onClick={() => alert("Dummy dulu — nanti ini logout beneran pas nyambung Firebase Auth.")}
        className="mt-4 mb-32 w-full bg-white rounded-full px-4 py-3.5 flex items-center justify-center gap-2 text-sm"
      >
        <span className="text-black/50"><IcLogout /></span>
        Keluar
      </button>
    </div>
  )
}