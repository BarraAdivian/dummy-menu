import { BottomNav } from "../components/ui";

export default function OrdersPage({ go }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <header className="flex items-center justify-between px-4 pt-4">
          <h1 className="text-base font-extrabold text-gray-800">Pesanan</h1>
          <span className="rounded-full bg-gray-300 px-3 py-1.5 text-[10px] font-bold text-gray-600">
            Meja
          </span>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 pb-20 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-3xl">
            🧾
          </span>
          <p className="mt-2 text-base font-extrabold text-gray-800">Belum ada pesanan</p>
          <p className="text-sm text-gray-400">Kamu belum mengirim pesanan ke dapur.</p>
          <button
            onClick={() => go("menu")}
            className="mt-3 rounded-full bg-gray-700 px-7 py-3 text-sm font-bold text-white active:scale-95"
          >
            Lihat menu
          </button>
        </div>

        <BottomNav active="pesanan" go={go} />
      </div>
    </div>
  );
}