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

function IcChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export default function AdminPrinterPage({ onBack }) {
  const [connected, setConnected] = useState(true)
  const [autoPrint, setAutoPrint] = useState(true)

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6 pb-10">
      <Back onBack={onBack} />

      <h1 className="text-[48px] font-serif text-gray-500 tracking-tight mt-4">
        <span className="font-serif font-normal text-black">Print</span> <span className="italic">struk.</span>
      </h1>

      <div className={`rounded-3xl p-5 mt-5 ${connected ? "bg-[#161513] text-white" : "bg-white text-[#161513] border border-black/15"}`}>
        <span className={`text-[9px] uppercase tracking-[0.25em] ${connected ? "text-white/50" : "text-black/40"}`}>Status printer</span>
        <div className="mt-2 flex items-end justify-between">
          <span className="font-serif text-4xl">{connected ? "Terhubung" : "Terputus"}</span>
          <span className={`text-xs pb-1.5 ${connected ? "text-white/50" : "text-black/40"}`}>
            {connected ? "ESPON TM-T82 · Bluetooth" : "belum ada printer"}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm">Bluetooth</div>
            <div className="text-xs text-black/40 mt-0.5">ESPON TM-T82</div>
          </div>
          <Switch value={connected} onChange={setConnected} />
        </div>
        <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm">Auto print</div>
            <div className="text-xs text-black/40 mt-0.5">Print otomatis saat pesanan masuk</div>
          </div>
          <Switch value={autoPrint} onChange={setAutoPrint} />
        </div>
        <div
          onClick={() => alert("Dummy: pilih ukuran kertas (58 / 80 mm)")}
          className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer"
        >
          <div className="flex-1 text-sm">Ukuran kertas</div>
          <span className="text-sm text-black/50">58 mm</span>
          <span className="text-black/25"><IcChevron /></span>
        </div>
        <div
          onClick={() => alert("Dummy: struk tes dikirim ke printer")}
          className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer"
        >
          <div className="flex-1 text-sm">Test print</div>
          <span className="text-black/25"><IcChevron /></span>
        </div>
      </div>

      <button
        onClick={() => alert("Dummy: pengaturan printer disimpan")}
        className="mt-6 w-full bg-[#161513] text-white rounded-full py-4 text-sm"
      >
        Simpan
      </button>
    </div>
  )
}