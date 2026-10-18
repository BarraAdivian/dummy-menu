import { useState } from "react";

/* ───────── Ikon nav ───────── */
const IcMenu = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const IcDoc = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h4" />
  </svg>
);

const IcHelp = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.3-1 .9-1 1.7M12 17h.01" />
  </svg>
);

/* ───────── Nav bawah gelap ───────── */
function NavBawah({ page, go }) {
  const tabs = [
    ["menu", "Menu", <IcMenu key="a" className="h-[18px] w-[18px]" />],
    ["pesanan", "Pesanan", <IcDoc key="b" className="h-[18px] w-[18px]" />],
    ["bantuan", "Bantuan", <IcHelp key="c" className="h-[18px] w-[18px]" />],
  ];

  return (
    <nav className="fixed inset-x-0 bottom-4 z-50 px-4">
      <div className="mx-auto flex max-w-md justify-between rounded-full bg-[#161513] p-1.5 shadow-xl shadow-black/20">
        {tabs.map(([id, label, icon]) => {
          const aktif = page === id;
          return (
            <button
              key={id}
              onClick={() => go(id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-[11px] font-medium transition ${
                aktif ? "bg-[#F2F1EC] text-[#161513]" : "text-white/60"
              }`}
            >
              {icon}
              {aktif && <span>{label}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

const FAQS = [
  {
    q: "Bagaimana cara bayar?",
    a: "Bayar di kasir setelah selesai makan, bisa tunai, debit, atau QRIS.",
  },
  {
    q: "Bisa ubah pesanan yang sudah dikirim?",
    a: "Bisa, selama pesanan belum diproses dapur. Panggil pelayan untuk perubahan.",
  },
  {
    q: "Berapa lama pesanan siap?",
    a: "Rata-rata 15-20 menit, tergantung antrian dapur.",
  },
];

export default function BantuanPage({ go }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-md pb-28">
        <header className="flex items-center justify-between px-4 pt-4">
          <h1 className="text-base font-extrabold text-gray-800">Bantuan</h1>
          <span className="rounded-full bg-gray-300 px-3 py-1.5 text-[10px] font-bold text-gray-600">
            Meja
          </span>
        </header>

        {/* Hero */}
        <section className="mx-4 mt-4 rounded-3xl bg-gray-700 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-lg">
              🔔
            </span>
            <div>
              <p className="text-base font-extrabold text-white">Butuh sesuatu?</p>
              <p className="text-[11px] text-white/60">Pelayan akan datang ke mejamu</p>
            </div>
          </div>
          <button className="mt-4 w-full rounded-full bg-gray-300 py-3 text-sm font-extrabold text-gray-700 active:scale-[0.98]">
            Panggil pelayan
          </button>
        </section>

        {/* Permintaan cepat */}
        <p className="mt-5 px-4 text-sm font-extrabold text-gray-800">Permintaan cepat</p>
        <div className="mt-2.5 grid grid-cols-2 gap-3 px-4">
          {[
            ["🧾", "Minta tagihan", "Bayar di meja"],
            ["🍴", "Alat makan", "Sendok, garpu, tisu"],
            ["📶", "Info Wi-Fi", "Nama & kata sandi"],
            ["💬", "Lainnya", "Tulis permintaan"],
          ].map(([icon, t, d]) => (
            <button key={t} className="rounded-2xl bg-white p-4 text-left active:scale-[0.97]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200 text-base">
                {icon}
              </span>
              <p className="mt-3 text-sm font-bold text-gray-700">{t}</p>
              <p className="mt-0.5 text-[11px] text-gray-400">{d}</p>
            </button>
          ))}
        </div>

        {/* FAQ */}
        <p className="mt-5 px-4 text-sm font-extrabold text-gray-800">Pertanyaan umum</p>
        <div className="mx-4 mt-2.5 rounded-3xl bg-white px-4">
          {FAQS.map((f, i) => {
            const aktif = open === i;
            return (
              <div key={f.q} className={i !== 0 ? "border-t border-gray-100" : ""}>
                <button
                  onClick={() => setOpen(aktif ? null : i)}
                  className="flex w-full items-center justify-between gap-3 py-4 text-left"
                >
                  <span className="text-sm font-bold text-gray-700">{f.q}</span>
                  <span className={`text-gray-300 transition-transform ${aktif ? "rotate-180" : ""}`}>
                    ⌄
                  </span>
                </button>
                {aktif && (
                  <p className="-mt-1 pb-4 text-xs leading-relaxed text-gray-400">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <NavBawah page="bantuan" go={go} />
    </div>
  );
}