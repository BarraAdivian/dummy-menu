import { useState } from "react";
import { rupiah } from "../components/ui";
import { ArrowLeftIcon } from "../components/icons";
import { menus, favorites } from "../data/menus";

const CATS = ["Semua", "Makanan", "Minuman", "Camilan"];

const IcSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-gray-400">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const IcArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

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

function BarKeranjang({ count, total, onClick }) {
  if (count === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4">
      <div className="mx-auto flex max-w-md items-center justify-between rounded-full bg-[#161513] py-2.5 pl-5 pr-2.5 shadow-xl shadow-black/25">
        <p className="text-sm text-white">
          <span className="font-medium">{count} item</span>
          <span className="text-white/50"> · {rupiah(total)}</span>
        </p>
        <button onClick={onClick} className="flex items-center gap-1.5 rounded-full bg-[#F2F1EC] px-4 py-2 text-sm font-medium text-[#161513] transition active:scale-95">
          Lihat <IcArrow />
        </button>
      </div>
    </div>
  );
}

export default function AllMenuPage({ go, openDetail, cart }) {
  const [cat, setCat] = useState("Semua");
  const [q, setQ] = useState("");

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const favIds = new Set(favorites.map((f) => f.id));

  const list = menus.filter(
    (m) =>
      (cat === "Semua" || m.category === cat) &&
      m.name.toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2F1EC]">
      <div className="mx-auto max-w-md pb-40">
        <header className="flex items-center justify-between px-4 pt-5">
          <button
            onClick={() => go("menu")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-[#161513] transition active:scale-90"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <p className="font-serif text-[26px] text-[#161513]">Resto</p>
          <span className="h-10 w-10" />
        </header>

        <h1 className="mt-6 px-4 text-[48px] font-serif leading-[1.05] tracking-tight text-gray-500">
          <span className="font-serif font-normal text-black">Semua</span>{" "}
          <span className="italic">menu.</span>
        </h1>

        {/* pencarian */}
        <div className="mt-5 px-4">
          <div className="flex items-center gap-3 rounded-full border border-black/5 bg-white px-4 py-3">
            <IcSearch />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari menu..."
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

        <p className="mt-6 px-4 text-[11px] uppercase tracking-[0.25em] text-gray-400">
          {list.length} menu tersedia
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3 px-4">
          {list.map((m) => (
            <KartuMenu key={m.id} m={m} fav={favIds.has(m.id)} onClick={() => openDetail(m)} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-10 text-center text-sm text-gray-400">Menu tidak ditemukan.</p>
        )}
      </div>

      <BarKeranjang count={cartCount} total={cartTotal} onClick={() => go("cart")} />
    </div>
  );
}