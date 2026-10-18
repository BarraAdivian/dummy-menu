import { useEffect, useState } from "react"
import { getMenus, saveMenu, deleteMenu } from "../data/menuStore"

const KATEGORI = ["Makanan utama", "Minuman", "Dessert"]

function Switch({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${value ? "bg-[#161513]" : "bg-black/15"}`}
    >
      <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`}></span>
    </button>
  )
}

function IcLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  )
}

function IcTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  )
}

function IcUpload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m17 8-5-5-5 5" />
      <path d="M12 3v12" />
    </svg>
  )
}

function IcImage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="9" cy="9" r="1.8" />
      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  )
}

export default function AdminMenuFormPage({ id, onBack }) {
  const isEdit = Boolean(id)

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState(null)
  const [available, setAvailable] = useState(true)
  const [favorite, setFavorite] = useState(false)
  const [options, setOptions] = useState([])
  const [err, setErr] = useState("")

  useEffect(() => {
    if (!id) return
    const m = getMenus().find((x) => x.id === id)
    if (!m) return
    setName(m.name || "")
    setCategory(m.category || "")
    setPrice(m.price ? m.price.toLocaleString("id-ID") : "")
    setImage(m.image || null)
    setAvailable(Boolean(m.available))
    setFavorite(Boolean(m.favorite))
    setOptions((m.options || []).map((o) => ({
      label: o.label || "",
      valuesText: (o.values || []).join(", "),
      selected: o.selected || (o.values || [])[0] || "",
    })))
  }, [id])

  const pickImage = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  const onPrice = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 9)
    setPrice(digits ? Number(digits).toLocaleString("id-ID") : "")
  }

  const addOption = () => setOptions((o) => [...o, { label: "", valuesText: "", selected: "" }])
  const setOption = (i, patch) => setOptions((o) => o.map((x, idx) => (idx === i ? { ...x, ...patch } : x)))
  const removeOption = (i) => setOptions((o) => o.filter((_, idx) => idx !== i))

  const simpan = () => {
    if (!name.trim()) { setErr("Nama menu belum diisi."); return }
    if (!category) { setErr("Kategori belum dipilih."); return }
    saveMenu({
      ...(isEdit ? { id } : {}),
      name: name.trim(),
      category,
      price: Number(String(price).replace(/\D/g, "")) || 0,
      image,
      available,
      favorite,
      options: options
        .filter((o) => o.label.trim() && o.valuesText.trim())
        .map((o) => ({
          label: o.label.trim(),
          values: o.valuesText.split(",").map((s) => s.trim()).filter(Boolean),
          selected: o.selected,
        })),
    })
    onBack()
  }

  const hapus = () => {
    if (window.confirm("Hapus menu ini?")) {
      deleteMenu(id)
      onBack()
    }
  }

  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6 pb-10">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center">
          <IcLeft />
        </button>
        {isEdit && (
          <button onClick={hapus} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-black/50">
            <IcTrash />
          </button>
        )}
      </div>

      {/* judul */}
      <h1 className="text-[48px] font-serif text-gray-500 tracking-tight mt-4">
        <span className="font-serif font-normal text-black">{isEdit ? "Edit" : "Menu"}</span>{" "}
        <span className="italic">{isEdit ? "menu." : "baru."}</span>
      </h1>

      {/* upload gambar */}
      {image ? (
        <div className="relative mt-5 h-44 rounded-2xl bg-[#E7E5DF] overflow-hidden">
          <img src={image} alt="Foto menu" className="w-full h-full object-cover" />
          <label className="absolute bottom-3 right-3 bg-white rounded-full px-3.5 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm">
            <input type="file" accept="image/*" className="hidden" onChange={pickImage} />
            <IcImage />
            Ganti
          </label>
        </div>
      ) : (
        <label className="block mt-5 cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={pickImage} />
          <div className="h-44 rounded-2xl border-2 border-dashed border-black/15 flex flex-col items-center justify-center gap-2.5">
            <span className="w-10 h-10 rounded-full bg-[#161513] text-white flex items-center justify-center">
              <IcUpload />
            </span>
            <span className="text-xs text-black/40">Upload Gambar</span>
          </div>
        </label>
      )}

      {/* nama */}
      <label className="block text-[9px] uppercase tracking-[0.25em] text-black/40 mt-6">Nama</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Contoh: Nasi Goreng GEL007"
        className="mt-1.5 w-full bg-transparent border-b border-black/15 focus:border-black/60 pb-2.5 text-sm outline-none placeholder:text-black/25 transition-colors"
      />

      {/* kategori */}
      <label className="block text-[9px] uppercase tracking-[0.25em] text-black/40 mt-6">Kategori</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mt-1.5 w-full bg-transparent border-b border-black/15 focus:border-black/60 pb-2.5 text-sm outline-none transition-colors"
      >
        <option value="">Pilih</option>
        {KATEGORI.map((k) => (
          <option key={k} value={k}>{k}</option>
        ))}
      </select>

      {/* harga */}
      <label className="block text-[9px] uppercase tracking-[0.25em] text-black/40 mt-6">Harga</label>
      <input
        value={price}
        onChange={(e) => onPrice(e.target.value)}
        inputMode="numeric"
        placeholder="0"
        className="mt-1.5 w-full bg-transparent border-b border-black/15 focus:border-black/60 pb-2 font-serif text-2xl outline-none placeholder:text-black/20 transition-colors"
      />

      {/* tambah pilihan */}
      <button
        type="button"
        onClick={addOption}
        className="mt-6 w-full border border-black/10 rounded-full py-3 text-xs text-black/50 flex items-center justify-center gap-1.5"
      >
        + Tambah pilihan
      </button>

      {options.map((op, i) => {
        const values = op.valuesText.split(",").map((s) => s.trim()).filter(Boolean)
        return (
          <div key={i} className="mt-5">
            <div className="flex items-center justify-between">
              <input
                value={op.label}
                onChange={(e) => setOption(i, { label: e.target.value })}
                placeholder="NAMA PILIHAN (CONTOH: PEDAS)"
                className="flex-1 bg-transparent text-[9px] uppercase tracking-[0.25em] outline-none placeholder:text-black/25 text-black/60"
              />
              <button type="button" onClick={() => removeOption(i)} className="text-[10px] text-black/30 hover:text-red-500">Hapus</button>
            </div>
            <input
              value={op.valuesText}
              onChange={(e) => setOption(i, { valuesText: e.target.value })}
              placeholder="Isi pilihan, pisah koma (Tidak, Sedang, Ekstra)"
              className="mt-1.5 w-full bg-transparent border-b border-black/15 focus:border-black/60 pb-2 text-xs outline-none placeholder:text-black/25 transition-colors"
            />
            {values.length > 0 && (
              <div className="mt-3 bg-[#E7E5DF] rounded-full p-1 flex flex-wrap gap-1 w-fit">
                {values.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setOption(i, { selected: v })}
                    className={`px-4 py-2 rounded-full text-xs transition ${op.selected === v ? "bg-[#161513] text-white" : "text-black/50"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* toggle */}
      <div className="mt-5 space-y-2.5">
        <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center justify-between">
          <span className="text-sm">Tersedia</span>
          <Switch value={available} onChange={setAvailable} />
        </div>
        <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center justify-between">
          <span className="text-sm">Favorit</span>
          <Switch value={favorite} onChange={setFavorite} />
        </div>
      </div>

      {err && <p className="mt-4 text-xs text-red-500">{err}</p>}

      <div className={`mt-6 grid gap-3 ${isEdit ? "grid-cols-2" : "grid-cols-1"}`}>
        {isEdit && (
          <button onClick={onBack} className="bg-white border border-black/10 rounded-full py-4 text-sm">Batal</button>
        )}
        <button onClick={simpan} className="bg-[#161513] text-white rounded-full py-4 text-sm">Simpan</button>
      </div>
    </div>
  )
}