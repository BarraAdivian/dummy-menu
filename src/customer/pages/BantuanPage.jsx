import { useState } from "react";

/* ───────── Ikon ───────── */
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

const IcBell = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const IcArrow = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const IcWifi = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <path d="M12 20h.01" />
  </svg>
);

const IcChat = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
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
    q: "Cara bayar?",
    a: "Bayar di kasir setelah selesai makan, bisa tunai, debit, atau QRIS.",
  },
  {
    q: "Ubah pesanan?",
    a: "Bisa, selama pesanan belum diproses dapur. Panggil pelayan untuk perubahan.",
  },
  {
    q: "Berapa lama?",
    a: "Rata-rata 15-20 menit, tergantung antrian dapur.",
  },
];

export default function BantuanPage({ go }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="min-h-screen bg-[#F2F1EC]">
      <div className="mx-auto max-w-md px-5 pb-36 pt-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <span className="font-serif text-[26px] leading-none text-[#161513]">Resto</span>
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-[#161513]">
            <span className="h-1 w-1 rounded-full bg-[#161513]" />
            Meja 04
          </span>
        </header>

        {/* Judul */}
        <h1 className="mt-7 text-[48px] font-serif leading-[1.05] tracking-tight text-[#161513]">
          Ada yang
          <br />
          <span className="italic">bisa dibantu?</span>
        </h1>

        {/* Panggil pelayan */}
        <button className="mt-6 flex h-48 w-full flex-col rounded-3xl bg-[#E7E5DF] p-5 text-left active:scale-[0.99]">
          <div className="flex items-start justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#161513] text-[#F2F1EC]">
              <IcBell className="h-5 w-5" />
            </span>
            <span className="pt-2 text-[11px] uppercase tracking-[0.25em] text-black/40">1 tap</span>
          </div>
          <div className="mt-auto flex items-end justify-between">
            <p className="font-serif text-[30px] leading-[1.1] text-[#161513]">
              Panggil
              <br />
              pelayan
            </p>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#161513] text-[#F2F1EC]">
              <IcArrow className="h-5 w-5" />
            </span>
          </div>
        </button>

        {/* Permintaan cepat */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            ["tagihan", "Tagihan", <IcDoc className="h-5 w-5" />],
            ["alat", "Alat makan", <IcMenu className="h-5 w-5" />],
            ["wifi", "Wi-Fi", <IcWifi className="h-5 w-5" />],
            ["lain", "Lainnya", <IcChat className="h-5 w-5" />],
          ].map(([id, t, icon]) => (
            <button
              key={id}
              className="flex h-24 flex-col justify-between rounded-2xl bg-[#E7E5DF] p-4 text-left active:scale-[0.98]"
            >
              <span className="text-[#161513]">{icon}</span>
              <span className="font-serif text-[19px] leading-none text-[#161513]">{t}</span>
            </button>
          ))}
        </div>

        {/* FAQ */}
        <p className="mt-8 text-[11px] uppercase tracking-[0.25em] text-black/40">Tanya jawab</p>
        <div className="mt-1 divide-y divide-black/10 border-y border-black/10">
          {FAQS.map((f, i) => {
            const aktif = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(aktif ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-[15px] text-[#161513]">{f.q}</span>
                  <span className="text-xl font-light leading-none text-black/35">
                    {aktif ? "−" : "+"}
                  </span>
                </button>
                {aktif && (
                  <p className="-mt-1 pb-4 text-sm leading-relaxed text-black/45">{f.a}</p>
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