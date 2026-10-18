import { useEffect, useState } from "react"

const KEY = "resto_admin_menus_v1"

const DEMO = [
  { id: "m1", code: "GEL001", name: "Nasi Goreng Raja", category: "Makanan utama", price: 42000, image: null, available: true, favorite: true,
    options: [{ label: "Pedas", values: ["Tidak", "Sedang", "Ekstra"], selected: "Sedang" }] },
  { id: "m2", code: "GEL002", name: "Ayam Bakar Madu", category: "Makanan utama", price: 45000, image: null, available: true, favorite: false,
    options: [{ label: "Pedas", values: ["Tidak", "Sedang", "Ekstra"], selected: "Tidak" }] },
  { id: "m3", code: "GEL003", name: "Dimsum Ayam", category: "Makanan utama", price: 22000, image: null, available: false, favorite: false, options: [] },
  { id: "m4", code: "GEL004", name: "Es Kopi Panegar", category: "Minuman", price: 25000, image: null, available: true, favorite: true,
    options: [{ label: "Gula", values: ["Normal", "Less sugar"], selected: "Normal" }] },
  { id: "m5", code: "GEL005", name: "Es Teh Manis", category: "Minuman", price: 8000, image: null, available: true, favorite: false, options: [] },
  { id: "m6", code: "GEL006", name: "Pisang Keju", category: "Dessert", price: 18000, image: null, available: true, favorite: false, options: [] },
]

const listeners = new Set()

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  return DEMO
}

function emit(list) {
  listeners.forEach((fn) => fn(list))
}

function commit(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
  emit(list)
}

export function getMenus() {
  return read()
}

export function saveMenu(data) {
  const list = read()
  let next
  if (data.id) {
    next = list.map((m) => (m.id === data.id ? { ...m, ...data } : m))
  } else {
    const maxNum = list.reduce((max, m) => {
      const n = parseInt(String(m.code || "").replace("GEL", ""), 10)
      return Number.isNaN(n) ? max : Math.max(max, n)
    }, 0)
    const code = "GEL" + String(maxNum + 1).padStart(3, "0")
    next = [...list, { ...data, id: "m" + Date.now(), code }]
  }
  commit(next)
}

export function deleteMenu(id) {
  commit(read().filter((m) => m.id !== id))
}

export function useMenus() {
  const [menus, setMenus] = useState(read)
  useEffect(() => {
    const fn = (list) => setMenus(list)
    listeners.add(fn)
    fn(read())
    const onStorage = () => fn(read())
    window.addEventListener("storage", onStorage)
    return () => {
      listeners.delete(fn)
      window.removeEventListener("storage", onStorage)
    }
  }, [])
  return menus
}