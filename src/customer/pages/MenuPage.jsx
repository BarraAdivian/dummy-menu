import { useState } from "react";
import { rupiah } from "../components/ui";
import { featured, favorites } from "../data/menus";

const CATS = ["Semua", "Makanan", "Minuman", "Camilan"];

/* ── ikon lokal ── */
const IcSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-gray-400">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const IcPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-4 w-4">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const IcArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
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

/* ── kartu menu ── */
function KartuMenu({ m, fav, onClick }) {
  return (
    <button onClick={onClick} className="rounded-3xl border border-black/5 bg-white p-2.5 text-left transition active:scale-[0.97]">
      <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-[#E7E5DF]">
        {m.image ? (
          <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
        ) : (
          <span className="font-serif text-3xl italic text-black/25">{m.name.charAt(0)}</span>
        )}
        {fav && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#161513]" />}
      </div>
      <p className="mt-2.5 truncate px-1 text-sm font-medium text-[#161513]">{m.name}</p>
      <p className="mt-0.5 px-1 pb-1 font-serif text-lg text-[#161513]">{rupiah(m.price)}</p>
    </button>
  );
}

/* ── bar keranjang (di atas nav) ── */
function BarKeranjang({ count, total, onClick }) {
  if (count === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-20 z-50 px-4">
      <div className="mx-auto flex max-w-md items-center justify-between rounded-full border border-black/5 bg-white py-2.5 pl-5 pr-2 shadow-lg shadow-black/10">
        <p className="text-sm text-[#161513]">
          <span className="font-medium">{count} item</span>
          <span className="text-gray-400"> · {rupiah(total)}</span>
        </p>
        <button onClick={onClick} className="flex items-center gap-1.5 rounded-full bg-[#161513] px-4 py-2 text-sm font-medium text-white transition active:scale-95">
          Lihat <IcArrow />
        </button>
      </div>
    </div>
  );
}

/* ── nav bawah ── */
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
            page === key ? "bg-[#F2F1EC] text-[#161513]" : "text-white/40"
          }`}
        >
          <Icon />
          {page === key && <span className="font-medium">{label}</span>}
        </button>
      ))}
    </nav>
  );
}

export default function MenuPage({ go, openDetail, quickAdd, cartCount, cartTotal }) {
  const [cat, setCat] = useState("Semua");
  const [q, setQ] = useState("");

  const favIds = new Set(favorites.map((f) => f.id));
  const favs = favorites
    .filter((m) => cat === "Semua" || m.category === cat)
    .filter((m) => m.name.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <div className="min-h-screen bg-[#F2F1EC]">
      <div className="mx-auto max-w-md pb-40">
        {/* header: Resto kiri, meja kanan */}
        <header className="flex items-center justify-between px-4 pt-5">
          <p className="font-serif text-[26px] leading-none text-[#161513]">Resto</p>
          <span className="rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Meja 04
          </span>
        </header>

        {/* judul besar */}
        <h1 className="mt-6 px-4 text-[48px] font-serif leading-[1.05] tracking-tight text-gray-500">
          <span className="font-serif font-normal text-black">Mau makan</span>{" "}
          <span className="italic">apa hari ini?</span>
        </h1>

        {/* pencarian */}
        <div className="mt-5 px-4">
          <div className="flex items-center gap-3 rounded-full border border-black/5 bg-white px-4 py-3">
            <IcSearch />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari menu"
              className="w-full bg-transparent text-sm text-[#161513] outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* kategori */}
        <div className="mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none]">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition active:scale-95 ${
                cat === c ? "bg-[#161513] text-white" : "border border-black/5 bg-white text-gray-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* terlaris — kartu hitam + lingkaran dekorasi */}
        {cat === "Semua" && featured && (
          <div className="mt-6 px-4">
            <div className="relative overflow-hidden rounded-3xl bg-[#161513] p-5">
              <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/[0.06]" />
              <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full border border-white/10" />
              <span className="pointer-events-none absolute right-6 top-10 font-serif text-6xl italic text-white/15">
                {featured.name.charAt(0)}
              </span>

              <div className="relative flex items-start justify-between">
                <span className="inline-block rounded-full bg-[#F2F1EC] px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] text-[#161513]">
                  {featured.badge || "Terlaris"}
                </span>
                <button
                  onClick={() => quickAdd(featured)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F1EC] text-[#161513] shadow-lg transition active:scale-90"
                >
                  <IcPlus />
                </button>
              </div>

              <div className="relative mt-9 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-serif text-2xl leading-tight text-white">{featured.name}</p>
                  <p className="mt-1 truncate text-xs text-white/50">{featured.desc}</p>
                </div>
                <p className="shrink-0 font-serif text-xl text-white">{rupiah(featured.price)}</p>
              </div>
            </div>
          </div>
        )}

        {/* favorit */}
        <div className="mt-7 flex items-end justify-between px-4">
          <h2 className="font-serif text-2xl text-[#161513]">Favorit</h2>
          <button onClick={() => go("semua")} className="pb-1 text-xs font-medium text-gray-400 active:opacity-60">
            Lihat semua
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 px-4">
          {favs.map((m) => (
            <KartuMenu key={m.id} m={m} fav={favIds.has(m.id)} onClick={() => openDetail(m)} />
          ))}
        </div>

        {favs.length === 0 && (
          <p className="mt-10 text-center text-sm text-gray-400">Menu tidak ditemukan.</p>
        )}
      </div>

      <BarKeranjang count={cartCount} total={cartTotal} onClick={() => go("cart")} />
      <NavBawah page="menu" onNav={go} />
    </div>
  );
}