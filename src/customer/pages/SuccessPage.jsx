import { rupiah } from "../components/ui";

const IcCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14 text-white">
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);
const IcArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function SuccessPage({ go, order }) {
  const d = order ? new Date(order.readyAt) : null;
  const siap = d
    ? `${String(d.getHours()).padStart(2, "0")}.${String(d.getMinutes()).padStart(2, "0")}`
    : "-";

  return (
    <div className="min-h-screen bg-[#161513]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-8">
        <header className="flex items-center justify-between pt-5">
          <p className="font-serif text-[26px] leading-none text-white">Resto</p>
          <span className="rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/70">
            Meja 04
          </span>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <span className="flex h-32 w-32 items-center justify-center rounded-full border border-white/15">
            <IcCheck />
          </span>
          <h1 className="mt-9 text-[48px] font-serif leading-[1.05] tracking-tight text-white/50">
            <span className="font-serif font-normal text-white">Pesanan</span>{" "}
            <span className="italic">terkirim.</span>
          </h1>
          <p className="mt-3 text-sm text-white/40">#{order?.code ?? "-"} masuk ke dapur.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/[0.06] p-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">Siap</p>
            <p className="mt-1.5 font-serif text-xl text-white">{siap}</p>
          </div>
          <div className="rounded-2xl bg-white/[0.06] p-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">Total</p>
            <p className="mt-1.5 font-serif text-xl text-white">{order ? rupiah(order.total) : "-"}</p>
          </div>
        </div>

        <button
          onClick={() => go("pesanan")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#F2F1EC] py-4 text-sm font-medium text-[#161513] transition active:scale-[0.98]"
        >
          Lihat status <IcArrow />
        </button>
        <button
          onClick={() => go("menu")}
          className="mt-2.5 w-full rounded-full border border-white/15 py-4 text-sm font-medium text-white transition active:scale-[0.98]"
        >
          Pesan lagi
        </button>
      </div>
    </div>
  );
}