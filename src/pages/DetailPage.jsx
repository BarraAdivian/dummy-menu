import { useState } from "react";
import { ArrowLeftIcon } from "../components/icons";
import { Stepper, PillGroup, rupiah } from "../components/ui";
import { defaultChoices, unitPrice } from "../data/menus";

export default function DetailPage({ menu, go, onAdd }) {
  const [sel, setSel] = useState(() => defaultChoices(menu));
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  const unit = unitPrice(menu, sel);
  const total = unit * qty;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-md pb-32">
        <header className="flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => go("menu")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 active:scale-90"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-base font-extrabold text-gray-800">Detail Menu</h1>
          <span className="rounded-full bg-gray-300 px-3 py-1.5 text-[10px] font-bold text-gray-600">
            Meja
          </span>
        </header>

        <div className="mt-4 px-4">
          <div className="h-56 w-full rounded-3xl bg-gray-300" />
        </div>

        <div className="mt-4 flex items-start justify-between gap-3 px-4">
          <h2 className="text-xl font-extrabold leading-snug text-gray-800">{menu.name}</h2>
          <span className="shrink-0 text-xl font-extrabold text-gray-700">
            {rupiah(menu.price)}
          </span>
        </div>
        <p className="mt-1.5 px-4 text-sm leading-relaxed text-gray-400">{menu.desc}</p>

        <div className="mt-5 space-y-5">
          {menu.options.map((g) => (
            <PillGroup
              key={g.id}
              label={g.label}
              options={g.opts}
              value={sel[g.id]}
              onChange={(id) => setSel({ ...sel, [g.id]: id })}
            />
          ))}
        </div>

        <section className="mt-6 px-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-700">Catatan</h3>
            <span className="text-[11px] text-gray-400">Opsional</span>
          </div>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Contoh: tanpa daun bawang"
            className="mt-2 w-full resize-none rounded-2xl bg-gray-200 p-3.5 text-sm outline-none placeholder:text-gray-400"
          />
        </section>
      </div>

      {/* Bar bawah */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-md items-center gap-4 p-4">
          <Stepper qty={qty} setQty={(q) => setQty(Math.max(1, q))} />
          <button
            onClick={() => onAdd(menu, sel, qty, note)}
            className="flex-1 rounded-full bg-gray-700 py-3.5 text-sm font-bold text-white active:scale-[0.98]"
          >
            Tambah • {rupiah(total)}
          </button>
        </div>
      </div>
    </div>
  );
}