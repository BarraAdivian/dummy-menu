import { Header, SearchBar, Cats, MenuCard, CartBar, BottomNav } from "../components/ui";

const FAVS = [
  ["Sate Lorem", "Rp 00.000"],
  ["Ayam Lorem", "Rp 00.000"],
  ["Es Teh Pandan", "Rp 00.000"],
  ["Pisang Lorem", "Rp 00.000"],
];

export default function MenuPage({ go }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-md pb-44">
        <Header onMeja={() => go("cart")} />

        <section className="px-4 pt-5">
          <p className="text-[11px] text-gray-400">Lorem ipsum dolor amet</p>
          <h1 className="mt-0.5 text-xl font-extrabold leading-tight text-gray-800">
            Lorem ipsum dolor amet
          </h1>
        </section>

        <div className="mt-4 px-4">
          <SearchBar />
        </div>
        <div className="mt-3 px-4">
          <Cats />
        </div>

        {/* Hero */}
        <div className="mx-4 mt-4 overflow-hidden rounded-3xl bg-gray-200">
          <div className="relative h-44 bg-gray-300">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-gray-600 shadow-sm">
              Badge
            </span>
            <button
              onClick={() => go("detail")}
              className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl leading-none text-gray-700 shadow active:scale-90"
            >
              +
            </button>
          </div>
          <div className="p-4">
            <p className="text-base font-extrabold text-gray-800">Lorem ipsum</p>
            <p className="mt-0.5 text-[11px] text-gray-400">Lorem ipsum sit dolor amet.</p>
            <p className="mt-2 text-base font-extrabold text-gray-800">Rp 000.000</p>
          </div>
        </div>

        {/* Favorit */}
        <div className="mt-6 flex items-center justify-between px-4">
          <h2 className="text-sm font-extrabold text-gray-800">Lorem Favorit</h2>
          <button
            onClick={() => go("semua")}
            className="text-xs font-bold text-gray-400 active:opacity-60"
          >
            Lihat semua
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 px-4">
          {FAVS.map(([n, p]) => (
            <MenuCard key={n} name={n} price={p} onClick={() => go("detail")} />
          ))}
        </div>
      </div>

      {/* Bar keranjang — sticky di atas bottom nav */}
      <CartBar onClick={() => go("cart")} />
      <BottomNav active="menu" go={go} />
    </div>
  );
}