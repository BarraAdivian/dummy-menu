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

const AWAL = [
  { name: "Ramdan", role: "Owner", on: true },
  { name: "Lutfi", role: "Kasir", on: true },
  { name: "Abdilah", role: "Pelayan", on: false },
  { name: "Sari", role: "Kasir", on: false },
  { name: "Bima", role: "Dapur", on: true },
]

export default function AdminStafPage({ onBack }) {
  const [staf, setStaf] = useState(AWAL)

  const bertugas = staf.filter((s) => s.on).length

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6 pb-10">
      <Back onBack={onBack} />

      <h1 className="text-[48px] font-serif text-gray-500 tracking-tight mt-4">
        <span className="font-serif font-normal text-black">Tim</span> <span className="italic">staf.</span>
      </h1>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <div className="bg-[#161513] text-white rounded-2xl p-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">Semua staf</span>
          <div className="font-serif text-4xl mt-2">{staf.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-black/40">Bertugas</span>
          <div className="font-serif text-4xl mt-2">{bertugas}</div>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {staf.map((s, i) => (
          <div key={s.name} className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E7E5DF] flex items-center justify-center font-serif text-lg shrink-0">{s.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{s.name}</div>
              <div className="text-xs text-black/40">{s.role}</div>
            </div>
            <Switch value={s.on} onChange={() => setStaf((arr) => arr.map((x, idx) => (idx === i ? { ...x, on: !x.on } : x)))} />
          </div>
        ))}
      </div>

      <button
        onClick={() => alert("Dummy: tambah anggota staf baru")}
        className="mt-4 w-full border border-black/10 rounded-full py-3 text-xs text-black/50"
      >
        + Tambah staf
      </button>
      <button
        onClick={() => alert("Dummy: data staf disimpan")}
        className="mt-3 w-full bg-[#161513] text-white rounded-full py-4 text-sm"
      >
        Simpan
      </button>
    </div>
  )
}