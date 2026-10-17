import { ArrowLeftIcon } from "../components/icons";
import { Header, SearchBar, Cats, MenuCard, CartBar, BottomNav } from "../components/ui";

const NAMES = ["Sate Lorem", "Ayam Lorem", "Es Teh Pandan", "Pisang Lorem"];

export default function AllMenuPage({ go }) {
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
          <Cats />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 px-4">
          {[...NAMES, ...NAMES].map((n, i) => (
            <MenuCard key={`${n}-${i}`} name={n} price="Rp 00.000" onClick={() => go("detail")} />
          ))}
        </div>
      </div>

      <CartBar onClick={() => go("cart")} />
      <BottomNav active="menu" go={go} />
    </div>
  );
}