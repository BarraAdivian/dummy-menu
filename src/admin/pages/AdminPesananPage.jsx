import { useMemo, useState } from "react"
import { useOrders, STATUS_LABEL, advance } from "../orderStore"

const TABS = ["Semua", "Baru", "Dimasak", "Siap"]
const TAB_KEY = { Semua: "semua", Baru: "baru", Dimasak: "dimasak", Siap: "siap" }

function StatCard({ label, value, gray }) {
  return (
    <div className={`${gray ? "bg-[#E7E5DF]" : "bg-white"} rounded-2xl p-4`}>
      <span className="text-[9px] uppercase tracking-[0.25em] text-black/40">{label}</span>
      <div className="font-serif text-4xl mt-2">{value}</div>
    </div>
  )
}

export default function AdminPesananPage({ onOpen }) {
  const orders = useOrders()
  const [tab, setTab] = useState("Semua")

  const aktif = useMemo(() => orders.filter((o) => o.status !== "selesai"), [orders])
  const sedangDimasak = aktif.filter((o) => o.status === "dimasak").length
  const siapDiambil = aktif.filter((o) => o.status === "siap").length

  const list = useMemo(() => {
    if (tab === "Semua") return aktif
    return aktif.filter((o) => o.status === TAB_KEY[tab])
  }, [aktif, tab])

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-[26px]">Resto</span>
          <span className="text-[11px] uppercase tracking-[0.25em] border border-black/15 rounded-full px-2.5 py-1 text-black/50">Admin</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#161513] text-white flex items-center justify-center text-[10px] tracking-widest">FK</div>
      </header>

      <h1 className="font-serif text-[48px] tracking-tight mt-5">
        Pesanan <span className="italic text-gray-500">hari ini</span>.
      </h1>

      <div className="bg-[#161513] text-white rounded-3xl p-6 mt-4 min-h-[230px] flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">Pesanan aktif</span>
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] bg-white/10 rounded-full px-2.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Aktif
          </span>
        </div>
        <div>
          <div className="font-serif text-8xl leading-none">{aktif.length}</div>
          <p className="text-xs text-white/50 mt-3">Sedang berjalan di semua meja</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <StatCard gray label="Dimasak" value={sedangDimasak} />
        <StatCard label="Siap" value={siapDiambil} />
      </div>

      <div className="flex items-center gap-5 mt-5">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="relative pb-1.5">
            <span className={`text-sm ${tab === t ? "text-[#161513]" : "text-black/40"}`}>{t}</span>
            {tab === t && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#161513]"></span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2.5 pb-32">
        {list.map((o) => {
          const qty = o.items.reduce((s, it) => s + it.qty, 0)
          return (
            <div key={o.id} onClick={() => onOpen(o.id)} className="bg-white rounded-2xl p-3 flex items-center gap-3 cursor-pointer transition active:scale-[0.99]">
              <div className="w-11 h-11 rounded-xl bg-[#E7E5DF] flex items-center justify-center font-serif text-lg shrink-0">{o.table}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">#{o.code}</div>
                <div className="text-xs text-black/45">Meja {o.table} · {qty} item</div>
              </div>
              <div className="text-sm font-medium">Rp{o.total.toLocaleString("id-ID")}</div>
              {o.status === "baru" ? (
                <button
                  onClick={(e) => { e.stopPropagation(); advance(o.id) }}
                  className="w-9 h-9 rounded-full bg-[#161513] text-white flex items-center justify-center shrink-0"
                  title="Mulai masak"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </button>
              ) : (
                <span className="text-[9px] uppercase tracking-[0.2em] bg-[#E7E5DF] text-black/60 px-2.5 py-1.5 rounded-full shrink-0">
                  {STATUS_LABEL[o.status]}
                </span>
              )}
            </div>
          )
        })}
        {list.length === 0 && (
          <p className="text-sm text-black/40 text-center mt-10">Tidak ada pesanan di tab ini.</p>
        )}
      </div>
    </div>
  )
}