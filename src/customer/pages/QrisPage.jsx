import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "../components/icons";

/* ───────── Ikon kecil ───────── */
const IcClock = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const IcDownload = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M4 21h16" />
  </svg>
);

/* ───────── QR dekoratif ala mockup ───────── */
function QRPalsu() {
  return (
    <svg viewBox="0 0 96 96" className="h-44 w-44">
      {/* finder kiri-atas */}
      <rect x="6" y="6" width="34" height="34" rx="11" fill="#161513" />
      <rect x="14.5" y="14.5" width="17" height="17" rx="5" fill="#ffffff" />
      <rect x="19" y="19" width="8" height="8" rx="2.5" fill="#161513" />
      {/* finder kanan-atas */}
      <rect x="56" y="6" width="34" height="34" rx="11" fill="#161513" />
      <rect x="64.5" y="14.5" width="17" height="17" rx="5" fill="#ffffff" />
      <rect x="69" y="19" width="8" height="8" rx="2.5" fill="#161513" />
      {/* kiri-tengah */}
      <rect x="6" y="50" width="28" height="28" rx="9" fill="#161513" />
      <rect x="13.5" y="57.5" width="13" height="13" rx="4" fill="#ffffff" />
      {/* kanan-tengah */}
      <rect x="58" y="50" width="12" height="28" rx="6" fill="#161513" />
      <rect x="76" y="50" width="14" height="12" rx="6" fill="#161513" />
      <rect x="78" y="66" width="12" height="12" rx="6" fill="#161513" />
      <rect x="40" y="64" width="12" height="12" rx="6" fill="#161513" />
      {/* bawah */}
      <rect x="6" y="84" width="12" height="12" rx="6" fill="#161513" />
      <rect x="24" y="84" width="12" height="12" rx="4" fill="#161513" />
      <rect x="58" y="84" width="32" height="12" rx="6" fill="#161513" />
    </svg>
  );
}

/* ───────── Halaman QRIS ───────── */
export default function QrisPage({ go, order, onBayarKasir }) {
  const [sisa, setSisa] = useState(599); // 09:59
  const [cek, setCek] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSisa((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(sisa / 60)).padStart(2, "0");
  const ss = String(sisa % 60).padStart(2, "0");

  const cekBayar = () => {
    if (cek) return;
    setCek(true);
    setTimeout(() => go("sukses"), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F2F1EC]">
      <div className="mx-auto max-w-md px-5 pb-10 pt-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            onClick={() => go("menu")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#161513] active:scale-90"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-[#161513]">
            <span className="h-1 w-1 rounded-full bg-[#161513]" />
            Meja 04
          </span>
        </header>

        {/* Judul */}
        <h1 className="mt-6 text-[48px] font-serif leading-none tracking-tight text-[#161513]">
          Scan &amp; <span className="italic">bayar.</span>
        </h1>

        {/* Kartu QRIS */}
        <div className="mt-6 rounded-3xl bg-[#161513] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-[0.18em] text-white">QRIS</span>
            <span className="text-[11px] text-white/60">Kopi Panagar</span>
          </div>

          <div className="mt-4 flex justify-center rounded-2xl bg-white p-6">
            <QRPalsu />
          </div>

          <div className="mt-4 flex items-end justify-between">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/50">Total</span>
            <span className="font-serif text-[28px] leading-none text-[#F2F1EC]">
              {order ? order.total.toLocaleString("id-ID") : 0}
            </span>
          </div>
        </div>

        {/* Timer */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-[#E7E5DF] px-4 py-3">
            <IcClock className="h-4 w-4 shrink-0 text-black/50" />
            <span className="text-sm text-black/55">Berlaku</span>
            <span className="text-sm font-medium text-[#161513]">
              {mm}:{ss}
            </span>
          </div>
          <button className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#161513] active:scale-90">
            <IcDownload className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-black/45">
          Scan pakai e-wallet atau m-banking apa saja.
        </p>

        {/* Cek pembayaran */}
        <button
          onClick={cekBayar}
          disabled={cek}
          className="mt-5 w-full rounded-full bg-[#161513] py-4 text-sm text-[#F2F1EC] disabled:opacity-70 active:scale-[0.98]"
        >
          {cek ? "Mengecek pembayaran…" : "Cek pembayaran"}
        </button>

        <button
          onClick={onBayarKasir}
          className="mx-auto mt-4 block text-sm text-black/60 underline underline-offset-4 active:opacity-60"
        >
          Bayar di kasir saja
        </button>
      </div>
    </div>
  );
}