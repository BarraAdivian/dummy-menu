export const menus = [
  {
    id: 1,
    name: "Lorem ipsum",
    price: 42000,
    category: "Makanan",
    desc: "Lorem ipsum dolor sit amet consectetur risus aliquet amet negeri",
    badge: "Lorem minggu ini",
    featured: true,
    favorite: true,
    options: [
      {
        id: "level",
        label: "Level lorem",
        opts: [
          { id: "tdk", label: "Tidak pedas", delta: 0 },
          { id: "sedang", label: "Sedang", delta: 0 },
          { id: "pedas", label: "Pedas", delta: 2000 },
        ],
      },
      {
        id: "telur",
        label: "Lorem",
        opts: [
          { id: "setengah", label: "Setengah lorem", delta: 0 },
          { id: "matang", label: "Lorem", delta: 0 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Sate Lorem",
    price: 38000,
    category: "Makanan",
    desc: "Lorem ipsum dolor sit amet",
    favorite: true,
    options: [],
  },
  {
    id: 3,
    name: "Ayam Lorem",
    price: 45000,
    category: "Makanan",
    desc: "Lorem ipsum dolor sit amet",
    favorite: true,
    options: [],
  },
  {
    id: 4,
    name: "Es Teh Pandan",
    price: 12000,
    category: "Minuman",
    desc: "Lorem ipsum dolor sit amet",
    favorite: true,
    options: [
      {
        id: "manis",
        label: "Kemanisan",
        opts: [
          { id: "normal", label: "Manis", delta: 0 },
          { id: "less", label: "Sedikit gula", delta: 0 },
          { id: "tanpa", label: "Tanpa gula", delta: 0 },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Pisang Lorem",
    price: 22000,
    category: "Camilan",
    desc: "Lorem ipsum dolor sit amet",
    favorite: true,
    options: [],
  },
];

export const featured = menus.find((m) => m.featured);
export const favorites = menus.filter((m) => m.favorite);

export const TAX = 0.1;
export const SERVICE = 0.05;

export function defaultChoices(menu) {
  const sel = {};
  (menu.options ?? []).forEach((g) => (sel[g.id] = g.opts[0].id));
  return sel;
}

export function unitPrice(menu, sel) {
  let p = menu.price;
  (menu.options ?? []).forEach((g) => {
    const o = g.opts.find((x) => x.id === sel[g.id]);
    if (o) p += o.delta;
  });
  return p;
}

export function optionLabels(menu, sel) {
  const out = [];
  (menu.options ?? []).forEach((g) => {
    const o = g.opts.find((x) => x.id === sel[g.id]);
    if (o) out.push(o.label);
  });
  return out;
}