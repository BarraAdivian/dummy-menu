import { useEffect, useState } from "react";
import { rupiah } from "../components/ui";

const IcUtensils = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);
const IcReceipt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <path d="M8 7h8" />
    <path d="M8 11h8" />
    <path d="M8 15h5" />
  </svg>
);
const IcHelp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);
const IcBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
const IcChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="m9 6 6 6-6 6" />
  </svg>
);

/* nav bawah — aktif: pill putih transparan sesuai mockup */
function NavBawah({ page, onNav }) {
  const items = [
    { key: "menu", label: "Menu", Icon: IcUtensils },
    { key: "pesanan", label: "Pesanan", Icon: IcReceipt },
    { key: "bantuan", label: "Bantuan", Icon: IcHelp },
  ];
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-[#161513] p-1.5 shadow-xl shadow-black/25">
      {items.map(({ key, label, Icon }) => (
        <button
          key={key}
          onClick={() => onNav(key)}
          className={`flex h-10 items-center gap-2 rounded-full px-4 text-xs transition active:scale-95 ${
            page === key ? "bg-white/10 text-white" : "text-white/40"
          }`}
        >
          <Icon />
          {page === key && <span className="font-medium">{label}</span>}
        </button>
      ))}
    </nav>
  );
}

/* langkah status + label chip-nya */
const STEPS = [
  { key: "Diterima", label: "Diterima dapur" },
  { key: "Dimasak", label: "Sedang dimasak" },
  { key: "Diantar", label: "Sedang diantar" },
];

export default function OrdersPage({ go, order }) {
  const [step, setStep] = useState("Dimasak");
  const [buka, setBuka] = useState(false);
  const [, setTick] = useState(0);

  // biar angka menit ikut turun
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 15000);
    return () => clearInterval(t);
  }, []);

  // ===== Belum ada pesanan =====
  if (!order) {
    return (
      <div className="min-h-screen bg-[#F2F1EC]">
        <div className="mx-auto max-w-md pb-40">
          <header className="flex items-center justify-between px-4 pt-5">
            <p className="font-serif text-[26px] leading-none text-[#161513]">Resto</p>
            <span className="rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-[11px] uppercase tracking-[0.25em] text-gray-500">
              Meja 04
            </span>
          </header>
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-black/5 bg-white">
              <IcReceipt />
            </span>
            <p className="mt-2 font-serif text-2xl text-[#161513]">Belum ada pesanan</p>
            <p className="text-sm text-gray-400">Kamu belum mengirim pesanan ke dapur.</p>
            <button onClick={() => go("menu")} className="mt-4 rounded-full bg-[#161513] px-7 py-3 text-sm font-medium text-white transition active:scale-95">
              Lihat menu
            </button>
          </div>
        </div>
        <NavBawah page="pesanan" onNav={go} />
      </div>
    );
  }

  // ===== Ada pesanan — halaman status =====
  const sisa = Math.max(0, Math.ceil((order.readyAt - Date.now()) / 60000));
  const jumlahItem = order.items.reduce((s, i) => s + i.qty, 0);
  const statusLabel = STEPS.find((s) => s.key === step)?.label ?? "";

  return (
    <div className="min-h-screen bg-[#F2F1EC]">
      <div className="mx-auto max-w-md pb-44">
        <header className="flex items-center justify-between px-4 pt-5">
          <p className="font-serif text-[26px] leading-none text-[#161513]">Resto</p>
          <span className="rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Meja 04
          </span>
        </header>

        {/* kartu status gelap */}
        <div className="relative mx-4 mt-5 overflow-hidden rounded-3xl bg-[#161513] p-5">
          <div className="pointer-events-none absolute -right-12 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#F2F1EC]/50" />
          <div className="relative flex items-center justify-between">
            <p className="text-sm font-medium text-white">#{order.code}</p>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">Siap dalam</p>
          </div>
          <p className="relative mt-5 flex items-end font-serif leading-none text-white">
            <span className="text-[88px]">{sisa}</span>
            <span className="ml-2 pb-2 text-2xl italic text-white/70">mnt</span>
          </p>
          <div className="relative mt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              {statusLabel}
            </span>
          </div>
        </div>

        {/* langkah status */}
        <div className="mt-5 grid grid-cols-3 gap-2 px-4">
          {STEPS.map((s) => {
            const aktif = step === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setStep(s.key)}
                className="flex flex-col items-center gap-2 transition active:scale-[0.97]"
              >
                <span className={`h-0.5 w-full rounded-full ${aktif ? "bg-[#161513]" : "bg-black/10"}`} />
                <span className={`text-xs ${aktif ? "font-medium text-[#161513]" : "text-gray-400"}`}>
                  {s.key}
                </span>
              </button>
            );
          })}
        </div>

        {/* total + bayar */}
        <div className="mt-4 grid grid-cols-2 gap-3 px-4">
          <div className="rounded-2xl bg-[#E7E5DF] p-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-black/50">Total</p>
            <p className="mt-2 font-serif text-xl text-[#161513]">{rupiah(order.total)}</p>
          </div>
          <div className="rounded-2xl bg-[#E7E5DF] p-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-black/50">Bayar</p>
            <p className="mt-2 font-serif text-xl text-[#161513]">{order.payment === "qris" ? "QRIS" : "di kasir"}</p>
          </div>
        </div>

        {/* daftar item (bisa dibuka) */}
        <div className="mx-4 mt-3 rounded-2xl border border-black/5 bg-white">
          <button onClick={() => setBuka(!buka)} className="flex w-full items-center justify-between p-4">
            <span className="flex items-center">
              <span className="flex -space-x-3">
                <span className="h-8 w-8 rounded-full border-2 border-white bg-[#E7E5DF]" />
                <span className="h-8 w-8 rounded-full border-2 border-white bg-[#DBD8D0]" />
              </span>
              <span className="ml-3 text-sm font-medium text-[#161513]">{jumlahItem} item</span>
            </span>
            <span className={`text-gray-400 transition-transform ${buka ? "rotate-90" : ""}`}>
              <IcChevron />
            </span>
          </button>
          {buka && (
            <div className="border-t border-black/5 px-4 pb-2">
              {order.items.map((it) => (
                <div key={it.key} className="flex items-start justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-[#161513]">{it.qty}× {it.name}</p>
                    {it.options.length > 0 && (
                      <p className="truncate text-[11px] text-gray-400">{it.options.join(" • ")}</p>
                    )}
                  </div>
                  <p className="shrink-0 text-sm font-medium text-[#161513]">{rupiah(it.price * it.qty)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* aksi bawah */}
      <div className="fixed inset-x-0 bottom-20 z-50 px-4">
        <div className="mx-auto flex max-w-md items-center gap-2">
          <button onClick={() => go("menu")} className="flex-1 rounded-full bg-[#161513] py-4 text-sm font-medium text-white transition active:scale-[0.98]">
            Pesan lagi
          </button>
          <button
            onClick={() => go("bantuan")}
            className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#161513] transition active:scale-90"
          >
            <IcBell />
          </button>
        </div>
      </div>

      <NavBawah page="pesanan" onNav={go} />
    </div>
  );
}