import { useOrders, setStatus, NEXT, ACTION_LABEL, STATUS_LABEL } from "../orderStore"

const STEPS = ["baru", "dimasak", "siap", "selesai"]

const IcBack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
)
const IcArrowR = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
const IcPrint = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V3h12v6M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><path d="M6 14h12v7H6z" /></svg>
)

export default function AdminOrderDetailPage({ id, onBack }) {
  const orders = useOrders()
  const o = orders.find(x => x.id === id)

  if (!o) {
    return (
      <div className="min-h-screen bg-[#F2F1EC] text-[#161513] flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-black/50">Pesanan tidak ditemukan.</p>
        <button onClick={onBack} className="bg-[#161513] text-white rounded-full px-6 py-3 text-sm font-semibold">Kembali</button>
      </div>
    )
  }

  const qty = o.items.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513]">
      <div className="max-w-md mx-auto px-5 pt-6 pb-32">

        {/* bar atas */}
        <div className="flex items-center justify-between">
          <button onClick={onBack}
            className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center">
            <IcBack />
          </button>
          <span className="text-[10px] font-bold px-3.5 py-1.5 rounded-full bg-[#161513] text-white">
            {STATUS_LABEL[o.status]}
          </span>
        </div>

        {/* kartu meja */}
        <div className="bg-[#161513] text-white rounded-3xl p-5 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-semibold tracking-[0.25em] text-white/60">MEJA</p>
            <p className="text-[11px] text-white/60">#{o.code}</p>
          </div>
          <div className="flex items-end justify-between mt-1">
            <p className="font-serif text-8xl leading-none">{o.table}</p>
            <div className="text-right pb-1">
              <p className="text-xs font-semibold">{o.guests} tamu</p>
              <p className="text-[11px] text-white/60 mt-0.5">{o.time} · {o.payment}</p>
            </div>
          </div>
        </div>

        {/* langkah status (bisa diklik langsung) */}
        <div className="flex gap-4 mt-5 border-b border-black/10">
          {STEPS.map(s => (
            <button key={s} onClick={() => setStatus(o.id, s)}
              className={"relative pb-2.5 text-[11px] font-semibold " + (o.status === s ? "text-[#161513]" : "text-black/30")}>
              {STATUS_LABEL[s]}
              {o.status === s && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] w-1 h-1 rounded-full bg-[#161513]"></span>
              )}
            </button>
          ))}
        </div>

        {/* daftar item */}
        <p className="text-[9px] font-semibold tracking-[0.25em] text-black/45 mt-6">{qty} ITEM</p>
        <div className="mt-1 divide-y divide-black/5">
          {o.items.map((it, i) => (
            <div key={i} className="py-3.5 flex items-start gap-3">
              <p className="text-sm pt-0.5 shrink-0">
                <span className="font-bold">{it.qty}</span><span className="text-black/35">×</span>
              </p>
              <div>
                <p className="text-sm font-semibold leading-tight">{it.name}</p>
                {it.note ? <p className="text-[11px] text-black/40 mt-0.5">{it.note}</p> : null}
              </div>
            </div>
          ))}
        </div>

        {/* bayar & total */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="bg-[#E7E5DF] rounded-2xl p-4">
            <p className="text-[9px] font-semibold tracking-[0.25em] text-black/45">BAYAR</p>
            <p className="font-serif text-2xl mt-2">{o.payment}</p>
          </div>
          <div className="bg-white border border-black/5 rounded-2xl p-4">
            <p className="text-[9px] font-semibold tracking-[0.25em] text-black/45">TOTAL</p>
            <p className="font-serif text-2xl mt-2">Rp{o.total.toLocaleString("id-ID")}</p>
          </div>
        </div>
      </div>

      {/* action bar bawah */}
      <div className="fixed bottom-0 inset-x-0 bg-[#F2F1EC]/95 backdrop-blur border-t border-black/5 p-4 z-40">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {NEXT[o.status] ? (
            <button onClick={() => setStatus(o.id, NEXT[o.status])}
              className="flex-1 bg-[#161513] text-white rounded-full py-4 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition">
              {ACTION_LABEL[o.status]} <IcArrowR />
            </button>
          ) : (
            <div className="flex-1 bg-black/5 text-black/40 rounded-full py-4 text-center text-sm font-semibold">
              Pesanan sudah selesai
            </div>
          )}
          <button onClick={() => window.print()} title="Cetak struk"
            className="w-[54px] h-[54px] rounded-full bg-white border border-black/10 flex items-center justify-center shrink-0">
            <IcPrint />
          </button>
        </div>
      </div>
    </div>
  )
}