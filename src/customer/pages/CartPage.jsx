import { useState } from "react";
import { rupiah } from "../components/ui";
import { ArrowLeftIcon } from "../components/icons";
import { TAX, SERVICE } from "../data/menus";

const IcBanknote = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);
const IcQr = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM21 14v3M14 21h3M18 18h3v3" />
  </svg>
);
const IcBag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-400">
    <path d="M6 7h12l1 14H5L6 7Z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
);
const IcArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function StepperGelap({ qty, onChange }) {
  return (
    <div className="flex items-center gap-2.5">
      <button onClick={() => onChange(-1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#161513] text-sm text-white transition active:scale-90">−</button>
      <span className="w-4 text-center text-sm font-medium text-[#161513]">{qty}</span>
      <button onClick={() => onChange(1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#161513] text-sm text-white transition active:scale-90">+</button>
    </div>
  );
}

export default function CartPage({ go, cart, updateQty, onKirim }) {
  const [pay, setPay] = useState(0);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * TAX);
  const service = Math.round(subtotal * SERVICE);
  const total = subtotal + tax + service;

  // ===== Keranjang kosong =====
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F2F1EC]">
        <div className="mx-auto flex min-h-screen max-w-md flex-col">
          <header className="flex items-center justify-between px-4 pt-5">
            <button onClick={() => go("menu")} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-[#161513] transition active:scale-90">
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <span className="rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-[11px] uppercase tracking-[0.25em] text-gray-500">Meja 04</span>
          </header>
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 pb-20 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-black/5 bg-white">
              <IcBag />
            </span>
            <p className="mt-2 font-serif text-2xl text-[#161513]">Keranjang masih kosong</p>
            <p className="text-sm text-gray-400">Yuk pilih menu favoritmu dulu!</p>
            <button onClick={() => go("menu")} className="mt-4 rounded-full bg-[#161513] px-7 py-3 text-sm font-medium text-white transition active:scale-95">
              Lihat menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F1EC]">
      <div className="mx-auto max-w-md pb-36">
        <header className="flex items-center justify-between px-4 pt-5">
          <button onClick={() => go("menu")} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-[#161513] transition active:scale-90">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <span className="rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-[11px] uppercase tracking-[0.25em] text-gray-500">Meja 04</span>
        </header>

        <h1 className="mt-6 px-4 text-[48px] font-serif leading-[1.05] tracking-tight text-gray-500">
          <span className="font-serif font-normal text-black">Pesanan</span>{" "}
          <span className="italic">kamu.</span>
        </h1>

        {/* daftar item */}
        <div className="mt-6 space-y-5 px-4">
          {cart.map((it) => (
            <div key={it.key} className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#161513]">{it.name}</p>
                <p className="mt-1 font-serif text-lg text-[#161513]">{rupiah(it.price * it.qty)}</p>
                {it.options.length > 0 && (
                  <p className="mt-0.5 truncate text-xs text-gray-400">{it.options.join(" • ")}</p>
                )}
                {it.note && <p className="mt-0.5 truncate text-xs text-gray-400">📝 {it.note}</p>}
              </div>
              <StepperGelap qty={it.qty} onChange={(d) => updateQty(it.key, d)} />
            </div>
          ))}
        </div>

        <div className="mt-5 px-4">
          <button onClick={() => go("semua")} className="text-xs font-medium text-gray-400 active:opacity-60">
            + Tambah menu
          </button>
        </div>

        {/* pembayaran */}
        <div className="mx-4 mt-6 border-t border-black/10 pt-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">Pembayaran</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              ["Kasir", IcBanknote],
              ["QRIS", IcQr],
            ].map(([label, Icon], i) => (
              <button
                key={label}
                onClick={() => setPay(i)}
                className={`rounded-2xl p-4 text-left transition active:scale-[0.98] ${
                  pay === i ? "bg-[#161513] text-white" : "border border-black/5 bg-white text-[#161513]"
                }`}
              >
                <Icon />
                <span className="mt-3 block text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* rincian */}
        <div className="mx-4 mt-6 space-y-2 border-t border-black/10 pt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-medium text-[#161513]">{rupiah(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Pajak & layanan</span>
            <span className="font-medium text-[#161513]">{rupiah(tax + service)}</span>
          </div>
        </div>

        <div className="mx-4 mt-5 flex items-end justify-between">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">Total</p>
          <p className="font-serif text-3xl text-[#161513]">{rupiah(total)}</p>
        </div>
      </div>

      {/* tombol kirim */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-[#F2F1EC] px-4 pb-5 pt-3">
        <div className="mx-auto max-w-md">
          <button
            onClick={() => onKirim(pay === 1 ? "qris" : "kasir")}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#161513] py-4 text-sm font-medium text-white transition active:scale-[0.98]"
          >
            Kirim pesanan <IcArrow />
          </button>
        </div>
      </div>
    </div>
  );
}