import { useMemo, useState } from "react";
import { useMenus, saveMenu } from "../../customer/data/menuStore";

const CATS = ["Semua", "Makanan utama", "Minuman", "Dessert"];

function Switch({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${value ? "bg-[#161513]" : "bg-black/15"}`}
    >
      <span
        className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`}
      ></span>
    </button>
  );
}

export default function AdminMenuPage({ onNew, onEdit }) {
  const menus = useMenus();
  const [cat, setCat] = useState("Semua");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      menus.filter(
        (m) =>
          (cat === "Semua" || m.category === cat) &&
          m.name.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [menus, cat, q],
  );

  const tersedia = menus.filter((m) => m.available).length;
  const habis = menus.length - tersedia;

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-[26px]">Resto</span>
          <span className="text-[11px] uppercase tracking-[0.25em] border border-black/15 rounded-full px-2.5 py-1 text-black/50">
            Admin
          </span>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#161513] text-white flex items-center justify-center text-[10px] tracking-widest">
          FK
        </div>
      </header>

      {/* judul */}
      <h1 className="text-[48px] font-serif text-gray-500 tracking-tight mt-5">
        <span className="font-serif font-normal text-black">Kelola</span>{" "}
        <span className="italic">Menu.</span>
      </h1>

      {/* pencarian */}
      <div className="mt-4 bg-white border border-black/5 rounded-full px-4 py-3 flex items-center gap-2.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="w-4 h-4 text-black/30"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari menu"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-black/30"
        />
      </div>

      {/* statistik */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-[#161513] text-white rounded-2xl p-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">
            Tersedia
          </span>
          <div className="font-serif text-4xl mt-2">{tersedia}</div>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-black/40">
            Habis
          </span>
          <div className="font-serif text-4xl mt-2">{habis}</div>
        </div>
      </div>

      {/* kategori */}
      <div className="flex items-center gap-4 mt-5 overflow-x-auto">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="relative pb-1.5 shrink-0"
          >
            <span
              className={`text-sm whitespace-nowrap ${cat === c ? "text-[#161513]" : "text-black/40"}`}
            >
              {c}
            </span>
            {cat === c && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#161513]"></span>
            )}
          </button>
        ))}
      </div>

      {/* daftar menu */}
      <div className="mt-4 space-y-2.5 pb-36">
        {list.map((m) => (
          <div
            key={m.id}
            onClick={() => onEdit(m.id)}
            className={`bg-white rounded-2xl p-3 flex items-center gap-3 cursor-pointer transition active:scale-[0.99] ${m.available ? "" : "opacity-50"}`}
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#E7E5DF] flex items-center justify-center shrink-0">
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-serif text-xl text-black/40">
                  {m.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{m.name}</div>
              <div className="text-[10px] text-black/35">{m.code}</div>
              <div className="font-serif text-lg leading-tight mt-0.5">
                {m.price.toLocaleString("id-ID")}
              </div>
            </div>
            <Switch
              value={m.available}
              onChange={() => saveMenu({ ...m, available: !m.available })}
            />
          </div>
        ))}
        {list.length === 0 && (
          <p className="text-sm text-black/40 text-center mt-10">
            Tidak ada menu yang cocok.
          </p>
        )}
      </div>

      {/* tombol tambah */}
      <button
        onClick={onNew}
        className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-[#161513] text-white shadow-xl shadow-black/25 flex items-center justify-center"
        title="Tambah menu"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="w-6 h-6"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
