import { useState } from "react";

export const rupiah = (n) => `Rp ${Number(n).toLocaleString("id-ID")}`;

export function BottomNav({ active, go }) {
  const tabs = [
    ["menu", "Menu", <svg key="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>],
    ["pesanan", "Pesanan", <svg key="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>],
    ["bantuan", "Bantuan", <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.3-1 .9-1 1.7M12 17h.01" /></svg>],
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-md justify-around py-2">
        {tabs.map(([id, label, icon]) => (
          <button
            key={id}
            onClick={() => go(id)}
            className={`flex flex-col items-center gap-0.5 px-6 py-1 text-[11px] font-semibold ${
              active === id ? "text-gray-800" : "text-gray-400"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function Header({ onMeja }) {
  return (
    <header className="flex items-center justify-between px-4 pt-4">
      <div className="flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-400 text-lg text-white">☰</span>
        <div>
          <p className="text-sm font-extrabold leading-tight text-gray-800">Lorem</p>
          <p className="text-[10px] text-gray-400">Lorem ipsum dolor amet</p>
        </div>
      </div>
      <button
        onClick={onMeja}
        className="rounded-full bg-gray-300 px-3.5 py-1.5 text-[10px] font-bold text-gray-600"
      >
        Meja
      </button>
    </header>
  );
}

export function SearchBar() {
  return (
    <div className="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-3">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-gray-400">
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" strokeLinecap="round" />
      </svg>
      <input
        placeholder="Lorem ipsum sit dolor amet"
        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
      />
    </div>
  );
}

export function Cats({ cats, value, onChange }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto">
      {cats.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${
            value === c ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export function MenuCard({ name, price, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-2xl bg-gray-200 transition active:scale-[0.98]"
    >
      <div className="h-28 bg-gray-300" />
      <div className="p-2.5">
        <p className="truncate text-sm font-bold text-gray-700">{name}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-700">{rupiah(price)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 text-lg leading-none text-white active:scale-90"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export function CartBar({ count, total, onClick }) {
  if (count === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-[60px] z-40 px-4">
      <div className="mx-auto max-w-md">
        <button
          onClick={onClick}
          className="flex w-full items-center gap-3 rounded-full bg-gray-700 px-5 py-3.5 text-left shadow-xl transition active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-white">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="text-sm font-bold text-white">
            {count} item • {total}
          </span>
          <span className="ml-auto text-xs font-semibold text-white/80">Lihat pesanan</span>
        </button>
      </div>
    </div>
  );
}

export function Stepper({ qty, setQty, small }) {
  const cls = small ? "h-7 w-7 text-sm" : "h-8 w-8 text-base";
  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        onClick={() => setQty(qty - 1)}
        className={`flex ${cls} items-center justify-center rounded-full border-2 font-bold active:scale-90 ${
          qty > 1 ? "border-gray-500 text-gray-600" : "border-gray-200 text-gray-300"
        }`}
      >
        −
      </button>
      <span className={`w-4 text-center font-bold text-gray-700 ${small ? "text-xs" : "text-sm"}`}>
        {qty}
      </span>
      <button
        onClick={() => setQty(qty + 1)}
        className={`flex ${cls} items-center justify-center rounded-full bg-gray-500 font-bold text-white active:scale-90`}
      >
        +
      </button>
    </div>
  );
}

export function PillGroup({ label, options, value, onChange }) {
  return (
    <section className="px-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-700">{label}</h3>
        <span className="text-[11px] text-gray-400">Pilih 1</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              value === o.id ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {o.label}
            {o.delta > 0 && (
              <span className={value === o.id ? "text-white/70" : "text-gray-400"}>
                {" "}
                +{rupiah(o.delta)}
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}