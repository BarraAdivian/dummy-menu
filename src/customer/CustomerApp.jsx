import { useEffect, useState } from "react";
import MenuPage from "./pages/MenuPage";
import AllMenuPage from "./pages/AllMenuPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";
import QrisPage from "./pages/QrisPage";
import OrdersPage from "./pages/OrdersPage";
import BantuanPage from "./pages/BantuanPage";
import { menus, defaultChoices, unitPrice, optionLabels, TAX, SERVICE } from "./data/menus";

export default function App() {
  const [view, setView] = useState("menu");
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedMenuId]);

  // 🛒 Masukkan item — kombinasi opsi sama = nambah qty, beda = baris baru
  const pushItem = (menu, choices, qty, note) => {
    const labels = optionLabels(menu, choices);
    const key = `${menu.id}|${Object.values(choices).join("-")}`;
    const price = unitPrice(menu, choices);

    setCart((prev) => {
      const ada = prev.find((i) => i.key === key);
      if (ada) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, id: menu.id, name: menu.name, price, qty, note, options: labels }];
    });
  };

  const quickAdd = (menu) => pushItem(menu, defaultChoices(menu), 1, "");

  const openDetail = (menu) => {
    setSelectedMenuId(menu.id);
    setView("detail");
  };

  const updateQty = (key, delta) =>
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );

  const removeItem = (key) => setCart((prev) => prev.filter((i) => i.key !== key));

  // 🧾 Kirim → hitung pajak & layanan beneran
  // QRIS → lewat halaman Scan & Bayar dulu, kasir → langsung sukses
  const kirim = (payment) => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const tax = Math.round(subtotal * TAX);
    const service = Math.round(subtotal * SERVICE);
    setOrder({
      code: String(Math.floor(Math.random() * 9000) + 1000),
      items: cart,
      subtotal,
      tax,
      service,
      total: subtotal + tax + service,
      payment,
    });
    setCart([]);
    setView(payment === "qris" ? "qris" : "sukses");
  };

  // Ganti metode ke kasir dari halaman QRIS
  const bayarKasir = () => {
    setOrder((o) => (o ? { ...o, payment: "kasir" } : o));
    setView("sukses");
  };

  const go = (id) => {
    // Tab "Pesanan" SELALU buka halaman status baru
    if (id === "pesanan") {
      setView("status");
      return;
    }
    setView(id);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const detailMenu = selectedMenuId ? menus.find((m) => m.id === selectedMenuId) : null;

  if (view === "semua")
    return <AllMenuPage go={go} openDetail={openDetail} cart={cart} />;
  if (view === "detail" && detailMenu)
    return <DetailPage menu={detailMenu} go={go} onAdd={pushItem} />;
  if (view === "cart")
    return (
      <CartPage
        go={go}
        cart={cart}
        updateQty={updateQty}
        removeItem={removeItem}
        onKirim={kirim}
      />
    );
  // Halaman Scan & Bayar (QRIS)
  if (view === "qris")
    return <QrisPage go={go} order={order} onBayarKasir={bayarKasir} />;
  // Halaman status pesanan baru (kosong / ada pesanan — dua-duanya di OrdersPage)
  if (view === "status" || view === "kosong")
    return <OrdersPage go={go} order={order} />;
  if (view === "sukses") return <SuccessPage go={go} order={order} />;
  if (view === "bantuan") return <BantuanPage go={go} />;
  return (
    <MenuPage
      go={go}
      openDetail={openDetail}
      quickAdd={quickAdd}
      cartCount={cartCount}
      cartTotal={cartTotal}
    />
  );
}