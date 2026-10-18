import { useState } from "react";
import { ArrowLeftIcon } from "../components/icons";
import { Stepper, rupiah } from "../components/ui";
import { TAX, SERVICE } from "../data/menus";

export default function CartPage({ go, cart, updateQty, removeItem, onKirim }) {
  const [pay, setPay] = useState(0);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * TAX);
  const service = Math.round(subtotal * SERVICE);
  const total = subtotal + tax + service;
  const count = cart.reduce((s, i) => s + i.qty, 0);

  // ===== Empty state =====
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto flex min-h-screen max-w-md flex-col">
          <header className="flex items-center justify-between px-4 pt-4">
            <button
              onClick={() => go("menu")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 active:scale-90"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-base font-extrabold text-gray-800">
              Keranjang &amp; Checkout
            </h1>
            <span className="rounded-full bg-gray-300 px-3.5 py-1.5 text-[10px] font-bold text-gray-600">
              Meja
            </span>
          </header>

          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 pb-20 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-3xl">
              🛒
            </span>
            <p className="mt-2 text-base font-extrabold text-gray-800">Keranjang masih kosong</p>
            <p className="text-sm text-gray-400">Yuk pilih menu favoritmu dulu!</p>
            <button
              onClick={() => go("menu")}
              className="mt-3 rounded-full bg-gray-700 px-7 py-3 text-sm font-bold text-white active:scale-95"
            >
              Lihat menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-md pb-36">
        <header className="flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => go("menu")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 active:scale-90"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-base font-extrabold text-gray-800">
            Keranjang &amp; Checkout
          </h1>
          <span className="rounded-full bg-gray-300 px-3.5 py-1.5 text-[10px] font-bold text-gray-600">
            Meja
          </span>
        </header>

        <div className="mt-4 flex items-center justify-between px-4">
          <h2 className="text-sm font-extrabold text-gray-800">{count} menu dipesan</h2>
          <button
            onClick={() => go("semua")}
            className="text-xs font-bold text-gray-400 active:opacity-60"
          >
            + Tambah menu
          </button>
        </div>

        {/* Items */}
        <div className="mx-4 mt-3 rounded-3xl bg-white p-4">
          {cart.map((it, i) => (
            <div
              key={it.key}
              className={`flex items-center gap-3 py-3 ${i !== 0 ? "border-t border-gray-100" : ""}`}
            >
              <span className="h-12 w-12 shrink-0 rounded-xl bg-gray-300" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-gray-700">{it.name}</p>
                {it.options.length > 0 && (
                  <p className="truncate text-[11px] text-gray-400">
                    {it.options.join(" • ")}
                  </p>
                )}
                {it.note && <p className="truncate text-[11px] text-gray-400">📝 {it.note}</p>}
                <p className="mt-0.5 text-sm font-bold text-gray-700">
                  {rupiah(it.price * it.qty)}
                </p>
              </div>
              <Stepper qty={it.qty} setQty={(q) => updateQty(it.key, q - it.qty)} small />
              <button
                onClick={() => removeItem(it.key)}
                className="text-xs text-gray-300 active:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Cara bayar */}
        <section className="mt-5 px-4">
          <h3 className="text-sm font-extrabold text-gray-800">Cara bayar</h3>
          <div className="mt-2.5 space-y-2.5">
            {[
              ["Bayar di kasir", "Tunai atau debit setelah makan"],
              ["QRIS", "Scan kode QR dari HP kamu"],
            ].map(([t, d], i) => (
              <button
                key={t}
                onClick={() => setPay(i)}
                className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition ${
                  pay === i ? "border-gray-700 bg-gray-100" : "border-gray-200 bg-white"
                }`}
              >
                <span className="h-8 w-8 shrink-0 rounded-lg bg-gray-300" />
                <span className="flex-1">
                  <span className="block text-sm font-bold text-gray-700">{t}</span>
                  <span className="block text-[11px] text-gray-400">{d}</span>
                </span>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    pay === i ? "border-gray-700 bg-gray-700" : "border-gray-300"
                  }`}
                >
                  {pay === i && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Rincian */}
        <section className="mx-4 mt-5 rounded-3xl bg-white p-4">
          <div className="flex justify-between py-1.5 text-xs">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-semibold text-gray-700">{rupiah(subtotal)}</span>
          </div>
          <div className="flex justify-between py-1.5 text-xs">
            <span className="text-gray-400">Pajak PB1 (10%)</span>
            <span className="font-semibold text-gray-700">{rupiah(tax)}</span>
          </div>
          <div className="flex justify-between py-1.5 text-xs">
            <span className="text-gray-400">Biaya layanan (5%)</span>
            <span className="font-semibold text-gray-700">{rupiah(service)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-sm font-extrabold text-gray-800">Total</span>
            <span className="text-lg font-extrabold text-gray-800">{rupiah(total)}</span>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white p-4">
        <button
          onClick={() => onKirim(pay === 1 ? "qris" : "kasir")}
          disabled={cart.length === 0}
          className="w-full rounded-full bg-gray-700 py-4 text-sm font-bold text-white disabled:bg-gray-300 active:scale-[0.98]"
        >
          Kirim pesanan • {rupiah(total)}
        </button>
      </div>
    </div>
  );
}