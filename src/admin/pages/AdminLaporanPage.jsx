import { useState } from "react"

const RANGES = ["Hari ini", "7hari", "Bulan"]
const TITLES = { "Hari ini": "hari ini.", "7hari": "pekan ini.", "Bulan": "bulan ini." }

const DATA = {
  "Hari ini": {
    big: "1,2", unit: "jt", growth: "5%",
    bars: { labels: ["08", "10", "12", "14", "16", "18", "20"], values: [14, 30, 52, 44, 70, 88, 46] },
    pesanan: 26, rata: "46rb",
    terlaris: [
      { name: "Nasi Goreng Raja", sold: 12 },
      { name: "Es Teh Manis", sold: 9 },
      { name: "Ayam Bakar Madu", sold: 7 },
    ],
  },
  "7hari": {
    big: "8,42", unit: "jt", growth: "12%",
    bars: { labels: ["S", "S", "R", "K", "J", "S", "M"], values: [32, 44, 30, 68, 50, 58, 38] },
    pesanan: 214, rata: "39rb",
    terlaris: [
      { name: "Nasi Goreng Raja", sold: 86 },
      { name: "Es Teh Manis", sold: 61 },
      { name: "Ayam Bakar Madu", sold: 47 },
    ],
  },
  "Bulan": {
    big: "36,8", unit: "jt", growth: "9%",
    bars: { labels: ["P1", "P2", "P3", "P4"], values: [140, 175, 160, 210] },
    pesanan: 912, rata: "40rb",
    terlaris: [
      { name: "Nasi Goreng Raja", sold: 342 },
      { name: "Es Kopi Panegar", sold: 290 },
      { name: "Pisang Keju", sold: 205 },
    ],
  },
}

export default function AdminLaporanPage() {
  const [range, setRange] = useState("7hari")
  const d = DATA[range]
  const max = Math.max(...d.bars.values)

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-[26px]">Resto</span>
          <span className="text-[11px] uppercase tracking-[0.25em] border border-black/15 rounded-full px-2.5 py-1 text-black/50">Admin</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#161513] text-white flex items-center justify-center text-[10px] tracking-widest">FK</div>
      </header>

      {/* judul */}
      <h1 className="text-[48px] font-serif text-gray-500 tracking-tight mt-5">
        <span className="font-serif font-normal text-black">Laporan</span>{" "}
        <span className="italic">{TITLES[range]}</span>
      </h1>

      {/* pilihan periode */}
      <div className="mt-4 bg-[#E7E5DF] rounded-full p-1 flex">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`flex-1 py-2.5 rounded-full text-xs transition-colors ${range === r ? "bg-[#161513] text-white" : "text-black/50"}`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* kartu pendapatan */}
      <div className="bg-[#161513] text-white rounded-3xl p-6 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/60">Pendapatan</span>
          <span className="flex items-center gap-1 bg-white text-[#161513] text-[11px] rounded-full px-2.5 py-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
            {d.growth}
          </span>
        </div>
        <div className="mt-3 flex items-end gap-1.5">
          <span className="font-serif text-7xl leading-none">{d.big}</span>
          <span className="font-serif text-2xl text-white/70 pb-1">{d.unit}</span>
        </div>
        <div className="flex items-end justify-between gap-2 mt-6">
          {d.bars.values.map((v, i) => {
            const top = v === max
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full rounded-lg ${top ? "bg-white" : "bg-white/25"}`}
                  style={{ height: `${Math.max(10, Math.round((v / max) * 80))}px` }}
                ></div>
                <span className={`text-[9px] ${top ? "text-white" : "text-white/40"}`}>{d.bars.labels[i]}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* statistik */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="bg-[#E7E5DF] rounded-2xl p-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-black/40">Pesanan</span>
          <div className="font-serif text-4xl mt-2">{d.pesanan}</div>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-black/40">Rata-rata</span>
          <div className="font-serif text-4xl mt-2">{d.rata}</div>
        </div>
      </div>

      {/* terlaris */}
      <div className="mt-6 pb-32">
        <span className="text-[9px] uppercase tracking-[0.25em] text-black/40">Terlaris</span>
        <div className="mt-3 space-y-2.5">
          {d.terlaris.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3">
              <span className="font-serif text-lg text-gray-700 w-7">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-serif text-lg truncate">{t.name}</span>
              <span className="text-[11px] text-gray-700">{t.sold} terjual</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}