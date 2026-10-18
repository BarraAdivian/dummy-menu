import { useState } from "react"

function Back({ onBack }) {
  return (
    <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
    </button>
  )
}

function Switch({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${value ? "bg-[#161513]" : "bg-black/15"}`}
    >
      <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`}></span>
    </button>
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

function IcBank() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 21h18" />
      <path d="M5 21v-9M9.5 21v-9M14.5 21v-9M19 21v-9" />
      <path d="m12 3 9 7H3z" />
    </svg>
  )
}

function IcCash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
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

const METODE = [
  { name: "QRIS", icon: IcQr },
  { name: "Bank BCA", icon: IcBank },
  { name: "Tunai / COD", icon: IcCash },
  { name: "Debit", icon: IcCard },
]

export default function AdminPembayaranPage({ onBack }) {
  const [metode, setMetode] = useState({ "QRIS": true, "Bank BCA": true, "Tunai / COD": true, "Debit": false })

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6 pb-10">
      <Back onBack={onBack} />

      <h1 className="text-[48px] font-serif text-gray-500 tracking-tight mt-4">
        <span className="font-serif font-normal text-black">Metode</span> <span className="italic">bayar.</span>
      </h1>

      <div className="mt-5 space-y-2.5">
        {METODE.map((m) => {
          const Icon = m.icon
          return (
            <div key={m.name} className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3">
              <span className="text-black/60"><Icon /></span>
              <span className="flex-1 text-sm">{m.name}</span>
              <Switch value={metode[m.name]} onChange={(v) => setMetode({ ...metode, [m.name]: v })} />
            </div>
          )
        })}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => alert("Dummy: tambah metode bayar baru")}
          className="w-12 h-12 rounded-full bg-[#161513] text-white flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <button
        onClick={() => alert("Dummy: metode pembayaran disimpan")}
        className="mt-3 w-full bg-[#161513] text-white rounded-full py-4 text-sm"
      >
        Simpan
      </button>
    </div>
  )
}