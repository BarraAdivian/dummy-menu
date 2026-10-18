import { useEffect, useState } from "react"

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

const AWAL = [
  { name: "Senin", time: "08.00 - 22.00", open: true },
  { name: "Selasa", time: "08.00 - 22.00", open: true },
  { name: "Rabu", time: "08.00 - 22.00", open: true },
  { name: "Kamis", time: "08.00 - 22.00", open: true },
  { name: "Jumat", time: "08.00 - 22.00", open: true },
  { name: "Sabtu", time: "09.00 - 23.00", open: true },
  { name: "Minggu", time: "09.00 - 23.00", open: false },
]

export default function AdminJamBukaPage({ onBack }) {
  const [buka, setBuka] = useState(true)
  const [days, setDays] = useState(AWAL)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10000)
    return () => clearInterval(t)
  }, [])

  const jam = String(now.getHours()).padStart(2, "0")
  const menit = String(now.getMinutes()).padStart(2, "0")

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6 pb-10">
      <Back onBack={onBack} />

      <h1 className="text-[48px] font-serif text-gray-500 tracking-tight mt-4">
        <span className="font-serif font-normal text-black">Jam</span> <span className="italic">buka.</span>
      </h1>

      <div className={`rounded-3xl p-5 mt-5 ${buka ? "bg-[#161513] text-white" : "bg-white text-[#161513] border border-black/15"}`}>
        <div className="flex items-center justify-between">
          <span className={`text-[9px] uppercase tracking-[0.25em] ${buka ? "text-white/50" : "text-black/40"}`}>Jam operasional</span>
          <button
            type="button"
            onClick={() => setBuka(!buka)}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors ${buka ? "bg-white/25" : "bg-black/15"}`}
          >
            <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${buka ? "translate-x-5" : "translate-x-0"}`}></span>
          </button>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <span className="font-serif text-6xl leading-none">{buka ? `${jam}:${menit}` : "Tutup"}</span>
          <span className={`text-xs pb-1.5 ${buka ? "text-white/50" : "text-black/40"}`}>{buka ? "buka sekarang" : "buka besok 08.00"}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {days.map((d, i) => (
          <div key={d.name} className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3">
            <span className="flex-1 text-sm">{d.name}</span>
            <span className={`text-xs ${d.open ? "text-black/60" : "text-black/30"}`}>{d.open ? d.time : "Tutup"}</span>
            <Switch value={d.open} onChange={() => setDays((arr) => arr.map((x, idx) => (idx === i ? { ...x, open: !x.open } : x)))} />
          </div>
        ))}
      </div>

      <button
        onClick={() => alert("Dummy: jam buka disimpan")}
        className="mt-6 w-full bg-[#161513] text-white rounded-full py-4 text-sm"
      >
        Simpan
      </button>
    </div>
  )
}