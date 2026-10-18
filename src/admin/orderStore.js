import { useEffect, useState } from "react"

const KEY = "resto_admin_orders_v1"

export const STATUS_LABEL = {
  baru: "Baru",
  dimasak: "Dimasak",
  siap: "Siap",
  selesai: "Selesai",
}

export const NEXT = { baru: "dimasak", dimasak: "siap", siap: "selesai" }

export const ACTION_LABEL = {
  baru: "Mulai masak",
  dimasak: "Tandai siap",
  siap: "Selesaikan",
}

const DEMO = [
  {
    id: "o1", code: "0096", table: "05", guests: 2, time: "10:42", min: 2,
    payment: "QRIS", status: "baru", total: 110000,
    items: [
      { name: "Nasi Goreng Raja", qty: 2, note: "Pedas sedang" },
      { name: "Es Kopi Panegar", qty: 1, note: "Less sugar" },
      { name: "Pisang Keju", qty: 1, note: "" },
    ],
  },
  {
    id: "o2", code: "1042", table: "04", guests: 2, time: "10:35", min: 2,
    payment: "Tunai", status: "baru", total: 95000,
    items: [
      { name: "Ayam Bakar Madu", qty: 1, note: "" },
      { name: "Kopi Susu Gula Aren", qty: 2, note: "Panas" },
      { name: "Roti Bakar Cokelat", qty: 1, note: "" },
    ],
  },
  {
    id: "o3", code: "1038", table: "09", guests: 4, time: "10:21", min: 8,
    payment: "QRIS", status: "dimasak", total: 150000,
    items: [
      { name: "Nasi Goreng Raja", qty: 2, note: "" },
      { name: "Ayam Bakar Madu", qty: 2, note: "Sambal terpisah" },
    ],
  },
  {
    id: "o4", code: "1039", table: "02", guests: 3, time: "10:12", min: 6,
    payment: "Tunai", status: "siap", total: 80000,
    items: [
      { name: "Pisang Keju", qty: 2, note: "Keju + cokelat" },
      { name: "Es Kopi Panegar", qty: 2, note: "" },
    ],
  },
]

const listeners = new Set()

export function getOrders() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(DEMO))
      return DEMO
    }
    return JSON.parse(raw)
  } catch {
    return DEMO
  }
}

function save(orders) {
  localStorage.setItem(KEY, JSON.stringify(orders))
  listeners.forEach(fn => fn(orders))
}

export function setStatus(id, status) {
  save(getOrders().map(o => (o.id === id ? { ...o, status } : o)))
}

export function advance(id) {
  const o = getOrders().find(o => o.id === id)
  if (o && NEXT[o.status]) setStatus(id, NEXT[o.status])
}

export function useOrders() {
  const [orders, setOrders] = useState(getOrders)
  useEffect(() => {
    const fn = (o) => setOrders([...o])
    listeners.add(fn)
    const onStorage = () => setOrders(getOrders())
    window.addEventListener("storage", onStorage)
    return () => {
      listeners.delete(fn)
      window.removeEventListener("storage", onStorage)
    }
  }, [])
  return orders
}