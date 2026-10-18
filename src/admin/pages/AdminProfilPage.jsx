function Back({ onBack }) {
  return (
    <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
    </button>
  )
}

const DETAIL = [
  { label: "Pemilik", value: "Fakih" },
  { label: "Alamat", value: "Jl. Melati No. 12, Bandung" },
  { label: "No. HP", value: "0812-3456-7890" },
  { label: "Deskripsi", value: "Warung nasi khas Sunda" },
]

export default function AdminProfilPage({ onBack }) {
  return (
    <div className="min-h-screen bg-[#F2F1EC] text-[#161513] px-5 pt-6 pb-10">
      <Back onBack={onBack} />

      <h1 className="text-[48px] font-serif text-gray-500 tracking-tight mt-4">
        <span className="font-serif font-normal text-black">Profil</span> <span className="italic">warung.</span>
      </h1>

      <div className="bg-white rounded-2xl p-4 mt-5 flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-[#E7E5DF] flex items-center justify-center font-serif text-2xl">B</div>
        <div>
          <div className="font-serif text-2xl leading-none">Bido</div>
          <div className="text-xs text-black/40 mt-1">Warung Nasi · Sejak 2019</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl px-4 mt-3 divide-y divide-black/5">
        {DETAIL.map((d) => (
          <div key={d.label} className="py-3.5 flex items-start justify-between gap-4">
            <span className="text-xs text-black/40 pt-0.5">{d.label}</span>
            <span className="text-sm font-medium text-right">{d.value}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => alert("Dummy: form edit profil muncul di sini")}
        className="mt-4 w-full bg-white border border-black/10 rounded-full py-3.5 text-sm"
      >
        Edit Profil
      </button>
      <button
        onClick={() => alert("Dummy: profil disimpan")}
        className="mt-3 w-full bg-[#161513] text-white rounded-full py-4 text-sm"
      >
        Simpan
      </button>
    </div>
  )
}