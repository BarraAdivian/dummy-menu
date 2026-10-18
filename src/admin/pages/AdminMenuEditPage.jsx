import { useState } from "react"
import { useMenus, updateMenu, removeMenu, rupiah } from "../data/menuStore"

const CATS = ["Makanan", "Minuman", "Snack"]
const LEVEL_PEDAS = ["tidak", "sedang", "ekstra"]
const LABEL_PEDAS = { tidak: "Tidak", sedang: "Sedang", ekstra: "Ekstra" }

const IcBack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
)
const IcTrash = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 11v6M14 11v6" /></svg>
)
const IcImage = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5-8 8" /></svg>
)
const IcChevD = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
)

function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick}
      className={"w-11 h-6 rounded-full p-0.5 transition shrink-0 " + (on ? "bg-[#161513]" : "bg-black/15")}>
      <span className={"block w-5 h-5 rounded-full bg-white shadow transition-transform duration-150 " + (on ? "translate-x-5" : "translate-x-0")} />
    </button>
  )
}

export default function AdminMenuEditPage({ id, onBack }) {
  const menus = useMenus()
  const m = menus.find(x => x.id === id)

  const [nama, setNama] = useState(m ? m.name : "")
  const [cat, setCat] = useState(m ? m.cat : "Makanan")
  const [harga, setHarga] = useState(m ? m.price : 0)
  const [pedas, setPedas] = useState(m ? m.pedas : "tidak")
  const [tersedia, setTersedia] = useState(m ? m.tersedia : true)
  const [favorit, setFavorit] = useState(m ? m.favorit : false)
  const [img, setImg] = useState(m ? m.img : "")

  if (!m) {
    return (
      <div className="min-h-screen bg-[#F2F1EC] text-[#161513] flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-black/50">Menu tidak ditemukan.</p>
        <button onClick={onBack} className="bg-[#161513] text-white rounded-full px-6 py-3 text-sm font-semibold">Kembali</button>
      </div>
    )
  }

  const simpan = () => {
    updateMenu(id, {
      name: nama.trim() || m.name,
      cat, price: harga, pedas, tersedia, favorit, img,
    })
    onBack()
  }

  const hapus = () => {
    if (window.confirm(`Hapus menu "${m.name}"?`)) {
      removeMenu(id)
      onBack()
    }
  }

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513]">
      <div className="max-w-md mx-auto px-5 pt-6 pb-10">

        {/* bar atas */}
        <div className="flex items-center justify-between">
          <button onClick={onBack}
            className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center">
            <IcBack />
          </button>
          <button onClick={hapus} title="Hapus menu"
            className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-black/50">
            <IcTrash />
          </button>
        </div>

        {/* judul */}
        <h1 className="text-[48px] font-serif tracking-tight mt-4">
          Edit <span className="italic font-normal text-gray-500">menu.</span>
        </h1>

        {/* foto */}
        <div className="relative mt-4">
          {img
            ? <img src={img} alt="" className="w-full h-44 object-cover rounded-2xl" />
            : <div className="w-full h-44 bg-[#E7E5DF] rounded-2xl"></div>}
          <button onClick={() => setImg("https://picsum.photos/seed/menu" + id + "-" + Date.now() + "/600/400")}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-full px-3 py-2 text-[11px] font-semibold shadow">
            <IcImage /> Ganti
          </button>
        </div>

        {/* nama */}
        <p className="text-[9px] font-semibold tracking-[0.25em] text-black/45 mt-6">NAMA</p>
        <input value={nama} onChange={e => setNama(e.target.value)}
          className="w-full bg-transparent border-b border-black/15 focus:border-black/50 outline-none text-sm font-semibold py-2.5 mt-1 transition" />

        {/* kategori */}
        <p className="text-[9px] font-semibold tracking-[0.25em] text-black/45 mt-5">KATEGORI</p>
        <div className="relative mt-1">
          <select value={cat} onChange={e => setCat(e.target.value)}
            className="w-full appearance-none bg-transparent border-b border-black/15 focus:border-black/50 outline-none text-sm font-semibold py-2.5 transition">
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"><IcChevD /></span>
        </div>

        {/* harga */}
        <p className="text-[9px] font-semibold tracking-[0.25em] text-black/45 mt-5">HARGA</p>
        <input value={rupiah(harga)} inputMode="numeric"
          onChange={e => setHarga(Number(e.target.value.replace(/\D/g, "")) || 0)}
          className="w-full bg-transparent border-b border-black/15 focus:border-black/50 outline-none font-serif text-2xl py-2 mt-1 transition" />

        {/* pedas */}
        <p className="text-[9px] font-semibold tracking-[0.25em] text-black/45 mt-5">PEDAS</p>
        <div className="flex gap-2 mt-2">
          {LEVEL_PEDAS.map(l => (
            <button key={l} onClick={() => setPedas(l)}
              className={"px-5 py-2.5 rounded-full text-xs font-semibold border transition " +
                (pedas === l ? "bg-[#161513] text-white border-[#161513]" : "bg-white border-black/10 text-black/60")}>
              {LABEL_PEDAS[l]}
            </button>
          ))}
        </div>

        {/* sakelar */}
        <div className="mt-6 divide-y divide-black/5">
          <div className="py-3.5 flex items-center justify-between">
            <p className="text-sm font-semibold">Tersedia</p>
            <Toggle on={tersedia} onClick={() => setTersedia(v => !v)} />
          </div>
          <div className="py-3.5 flex items-center justify-between">
            <p className="text-sm font-semibold">Favorit</p>
            <Toggle on={favorit} onClick={() => setFavorit(v => !v)} />
          </div>
        </div>

        {/* tombol aksi */}
        <div className="flex gap-3 mt-8">
          <button onClick={onBack}
            className="flex-1 bg-white border border-black/10 rounded-full py-4 text-sm font-semibold">
            Batal
          </button>
          <button onClick={simpan}
            className="flex-1 bg-[#161513] text-white rounded-full py-4 text-sm font-semibold active:scale-[0.99] transition">
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}