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

export default function AdminMejaPage({ onBack }) {
  const [tables, setTables] = useState([true, true, true, true, true, true, false, false, false, false])

  const aktif = tables.filter(Boolean).length
  const kosong = tables.length - aktif

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6 pb-10">
      <Back onBack={onBack} />

      <h1 className="text-[48px] font-serif text-gray-500 tracking-tight mt-4">
        <span className="font-serif font-normal text-black">Meja</span> <span className="italic">& QR.</span>
      </h1>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <div className="bg-[#161513] text-white rounded-2xl p-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">Aktif</span>
          <div className="font-serif text-4xl mt-2">{aktif}</div>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-black/40">Kosong</span>
          <div className="font-serif text-4xl mt-2">{kosong}</div>
        </div>
      </div>

      <span className="block text-[9px] uppercase tracking-[0.25em] text-black/40 mt-6">Daftar meja</span>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        {tables.map((t, i) => (
          <div
            key={i}
            onClick={() => setTables((arr) => arr.map((x, idx) => (idx === i ? !x : x)))}
            className={`rounded-2xl p-3.5 cursor-pointer transition active:scale-[0.98] ${t ? "bg-[#161513] text-white" : "bg-white text-[#161513]"}`}
          >
            <div className="font-serif text-2xl leading-none">{String(i + 1).padStart(2, "0")}</div>
            <div className={`text-[9px] uppercase tracking-[0.2em] mt-1.5 ${t ? "text-emerald-300" : "text-black/35"}`}>
              {t ? "Aktif" : "Kosong"}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setTables((arr) => [...arr, false])}
        className="mt-4 w-full border border-black/10 rounded-full py-3 text-xs text-black/50"
      >
        + Tambah meja
      </button>
      <button
        onClick={() => alert("Dummy: pengaturan meja & QR disimpan")}
        className="mt-3 w-full bg-[#161513] text-white rounded-full py-4 text-sm"
      >
        Simpan
      </button>
    </div>
  )
}