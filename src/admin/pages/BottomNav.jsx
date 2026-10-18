const IcReceipt = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6" /></svg>
)
const IcFork = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 2v20M4 2v6a3 3 0 006 0V2" /><path d="M17 2c-2 1.5-3 4-3 7h3v13" /></svg>
)
const IcChart = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20v-6M12 20V6M19 20v-10" /></svg>
)
const IcUser = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-5 8-5s6.5 1 8 5" /></svg>
)

export default function BottomNav({ active, go }) {
  return (
    <nav className="fixed bottom-4 inset-x-0 flex justify-center z-40 pointer-events-none">
      <div className="pointer-events-auto bg-[#161513] border border-white/10 shadow-xl shadow-black/20 rounded-full p-1.5 flex items-center gap-0.5">
        {active === "pesanan" ? (
          <span className="flex items-center gap-2 bg-[#F2F1EC] text-[#161513] rounded-full px-5 py-2.5 text-xs font-semibold">
            <IcReceipt /> Pesanan
          </span>
        ) : (
          <button onClick={() => go("pesanan")} className="w-10 h-10 flex items-center justify-center text-white/40">
            <IcReceipt />
          </button>
        )}
        {active === "menu" ? (
          <span className="flex items-center gap-2 bg-[#F2F1EC] text-[#161513] rounded-full px-5 py-2.5 text-xs font-semibold">
            <IcFork /> Menu
          </span>
        ) : (
          <button onClick={() => go("menu")} className="w-10 h-10 flex items-center justify-center text-white/40">
            <IcFork />
          </button>
        )}
        <span className="w-10 h-10 flex items-center justify-center text-white/40"><IcChart /></span>
        <span className="w-10 h-10 flex items-center justify-center text-white/40"><IcUser /></span>
      </div>
    </nav>
  )
}