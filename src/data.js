export const TAX = 0.1
export const SERVICE = 0.05

const img = (seed) => `https://picsum.photos/seed/${seed}/600/400`

const menus = [
  {
    id: "m1",
    name: "Nasi Goreng Raja",
    price: 35000,
    category: "Makanan",
    favorite: true,
    image: img("nasigoreng"),
    desc: "Nasi goreng spesial dengan ayam, telur, dan bumbu rahasia rumah.",
    options: [
      { id: "level", label: "Level Pedas", opts: [
        { id: "0", label: "Tidak Pedas", delta: 0 },
        { id: "1", label: "Pedas Sedang", delta: 0 },
        { id: "2", label: "Pedas Level 2", delta: 0 },
      ]},
      { id: "extra", label: "Tambahan", opts: [
        { id: "none", label: "Tanpa Tambahan", delta: 0 },
        { id: "telur", label: "Telur Ceplok", delta: 5000 },
        { id: "ayam", label: "Ayam Tambahan", delta: 8000 },
      ]},
    ],
  },
  {
    id: "m2",
    name: "Ayam Bakar Madu",
    price: 40000,
    category: "Makanan",
    favorite: false,
    image: img("ayambakar"),
    desc: "Ayam bakar bumbu madu, disajikan dengan nasi hangat dan lalapan.",
    options: [
      { id: "extra", label: "Tambahan", opts: [
        { id: "none", label: "Tanpa Tambahan", delta: 0 },
        { id: "nasi", label: "Nasi Putih", delta: 5000 },
      ]},
    ],
  },
  {
    id: "m3",
    name: "Es Kopi Panegar",
    price: 22000,
    category: "Minuman",
    favorite: true,
    image: img("eskopi"),
    desc: "Kopi susu gula aren andalan rumah, disajikan dingin.",
    options: [
      { id: "susu", label: "Jenis Susu", opts: [
        { id: "fullcream", label: "Full Cream", delta: 0 },
        { id: "oat", label: "Oat Milk", delta: 5000 },
      ]},
      { id: "gula", label: "Gula", opts: [
        { id: "normal", label: "Normal", delta: 0 },
        { id: "kurang", label: "Kurang", delta: 0 },
        { id: "tanpa", label: "Tanpa Gula", delta: 0 },
      ]},
    ],
  },
  {
    id: "m4",
    name: "Kopi Susu Gula Aren",
    price: 20000,
    category: "Minuman",
    favorite: true,
    image: img("kopisusu"),
    desc: "Perpaduan espresso, susu segar, dan gula aren asli.",
    options: [
      { id: "suhu", label: "Suhu", opts: [
        { id: "dingin", label: "Dingin", delta: 0 },
        { id: "panas", label: "Panas", delta: 0 },
      ]},
    ],
  },
  {
    id: "m5",
    name: "Pisang Keju",
    price: 18000,
    category: "Camilan",
    favorite: false,
    image: img("pisangkeju"),
    desc: "Pisang goreng crispy dengan topping keju parut dan susu.",
    options: [
      { id: "topping", label: "Topping", opts: [
        { id: "keju", label: "Keju", delta: 0 },
        { id: "cokelat", label: "Cokelat", delta: 0 },
        { id: "mix", label: "Mix", delta: 3000 },
      ]},
    ],
  },
  {
    id: "m6",
    name: "Roti Bakar Cokelat",
    price: 15000,
    category: "Camilan",
    favorite: false,
    image: img("rotibakar"),
    desc: "Roti bakar lembut dengan lelehan cokelat melimpah.",
    options: [
      { id: "extra", label: "Tambahan", opts: [
        { id: "none", label: "Tanpa Tambahan", delta: 0 },
        { id: "keju", label: "Keju", delta: 4000 },
      ]},
    ],
  },
]

export default menus

export function defaultChoices(menu) {
  const c = {}
  menu.options.forEach((o) => { c[o.id] = o.opts[0].id })
  return c
}

export function unitPrice(menu, choices) {
  let p = menu.price
  menu.options.forEach((o) => {
    const opt = o.opts.find((x) => x.id === choices[o.id])
    if (opt) p += opt.delta
  })
  return p
}

export function optionLabels(menu, choices) {
  const out = []
  menu.options.forEach((o) => {
    const opt = o.opts.find((x) => x.id === choices[o.id])
    if (opt) out.push(opt.label)
  })
  return out
}