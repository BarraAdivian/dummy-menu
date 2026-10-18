import { useState } from "react";
import { ArrowLeftIcon } from "../components/icons";
import { SearchBar, Cats, MenuCard, CartBar, BottomNav, rupiah } from "../components/ui";
import { menus } from "../data/menus";

const CATS = ["Semua", "Makanan", "Minuman", "Camilan"];

export default function AllMenuPage({ go, openDetail, cart }) {
  const [cat, setCat] = useState("Semua");

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const list = menus.filter((m) => cat === "Semua" || m.category === cat);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-md pb-44">
        <header className="flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => go("menu")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 active:scale-90"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-base font-extrabold text-gray-800">Semua menu</h1>
          <span className="rounded-full bg-gray-300 px-3 py-1.5 text-[10px] font-bold text-gray-600">
            Meja
          </span>
        </header>

        <div className="mt-4 px-4">
          <SearchBar />
        </div>
        <div className="mt-3 px-4">
          <Cats cats={CATS} value={cat} onChange={setCat} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 px-4">
          {list.map((m) => (
            <MenuCard key={m.id} name={m.name} price={m.price} onClick={() => openDetail(m)} />
          ))}
        </div>
      </div>

      <CartBar count={cartCount} total={rupiah(cartTotal)} onClick={() => go("cart")} />
      <BottomNav active="menu" go={go} />
    </div>
  );
}