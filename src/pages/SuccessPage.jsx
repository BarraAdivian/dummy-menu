import { ArrowLeftIcon } from "../components/icons";
import { BottomNav } from "../components/ui";

export default function SuccessPage({ go }) {
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
          <h1 className="text-base font-extrabold text-gray-800">Pesanan Terkirim</h1>
          <span className="rounded-full bg-gray-300 px-3.5 py-1.5 text-[10px] font-bold text-gray-600">
            Meja
          </span>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center px-8 pb-16 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-32 w-32 text-gray-700"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" strokeWidth="2" />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold leading-tight text-gray-800">
            Pemesanan
            <br />
            Berhasil
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Pesanan Anda sedang disiapkan, mohon ditunggu ya. Terima kasih!
          </p>
        </div>

        <BottomNav active="pesanan" go={go} />
      </div>
    </div>
  );
}