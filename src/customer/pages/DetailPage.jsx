import { useRef, useState } from "react";
import { rupiah } from "../components/ui";
import { ArrowLeftIcon } from "../components/icons";
import { defaultChoices, unitPrice } from "../data/menus";

export default function DetailPage({ menu, go, onAdd }) {
  const [sel, setSel] = useState(() => defaultChoices(menu));
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [ok, setOk] = useState(false);
  const tRef = useRef(null);

  const unit = unitPrice(menu, sel);
  const total = unit * qty;

  const tambah = () => {
    onAdd(menu, sel, qty, note);
    setQty(1);
    setNote("");
    setOk(true);
    clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setOk(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F2F1EC]">
      <div className="mx-auto max-w-md pb-36">
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

        {/* foto */}
        <div className="mt-5 px-4">
          <div className="flex h-56 w-full items-center justify-center overflow-hidden rounded-3xl bg-[#E7E5DF]">
            {menu.image ? (
              <img src={menu.image} alt={menu.name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-serif text-7xl italic text-black/20">{menu.name.charAt(0)}</span>
            )}
          </div>
        </div>

        {/* nama + harga */}
        <div className="mt-5 flex items-start justify-between gap-4 px-4">
          <h1 className="font-serif text-4xl leading-tight text-[#161513]">{menu.name}</h1>
          <p className="shrink-0 pt-2 font-serif text-xl text-[#161513]">{rupiah(menu.price)}</p>
        </div>
        <p className="mt-1.5 px-4 text-sm leading-relaxed text-gray-400">{menu.desc}</p>

        {/* opsi */}
        <div className="mt-7 space-y-6 px-4">
          {(menu.options || []).map((g) => (
            <section key={g.id}>
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">{g.label}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {g.opts.map((o) => {
                  const aktif = sel[g.id] === o.id;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setSel({ ...sel, [g.id]: o.id })}
                      className={`rounded-full px-4 py-2.5 text-sm transition active:scale-95 ${
                        aktif ? "bg-[#161513] text-white" : "border border-black/5 bg-white text-gray-500"
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* catatan */}
        <section className="mt-7 px-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">Catatan</p>
            <span className="text-[11px] text-gray-400">Opsional</span>
          </div>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Contoh: tanpa daun bawang"
            className="mt-2.5 w-full resize-none rounded-2xl border border-black/5 bg-white p-4 text-sm text-[#161513] outline-none placeholder:text-gray-400"
          />
        </section>
      </div>

      {/* notif tambah */}
      {ok && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#161513] px-5 py-2.5 text-xs text-white shadow-xl shadow-black/20">
          Masuk keranjang ✓
        </div>
      )}

      {/* bar bawah */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-[#161513]">
        <div className="mx-auto flex max-w-md items-center gap-3 p-4">
          <div className="flex items-center gap-3.5 rounded-full bg-white/10 py-1.5 pl-4 pr-1.5 text-white">
            <button onClick={() => setQty((v) => Math.max(1, v - 1))} className="text-base leading-none active:scale-90">
              −
            </button>
            <span className="min-w-4 text-center text-sm font-medium">{qty}</span>
            <button
              onClick={() => setQty((v) => v + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2F1EC] text-[#161513] transition active:scale-90"
            >
              +
            </button>
          </div>
          <button
            onClick={tambah}
            className="flex-1 rounded-full bg-[#F2F1EC] py-3.5 text-sm font-medium text-[#161513] transition active:scale-[0.98]"
          >
            Tambah · {rupiah(total)}
          </button>
        </div>
      </div>
    </div>
  );
}