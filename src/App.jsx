import { useEffect, useState } from "react";
import MenuPage from "./pages/MenuPage";
import AllMenuPage from "./pages/AllMenuPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";
import OrdersPage from "./pages/OrdersPage";
import BantuanPage from "./pages/BantuanPage";

export default function App() {
  const [view, setView] = useState("menu");
  const [hasOrder, setHasOrder] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const go = (id) => {
    if (id === "pesanan") {
      setView(hasOrder ? "sukses" : "kosong");
      return;
    }
    if (id === "bantuan") {
      setView("bantuan");
      return;
    }
    setView(id);
  };

  const kirim = () => {
    setHasOrder(true);
    setView("sukses");
  };

  if (view === "semua") return <AllMenuPage go={go} />;
  if (view === "detail") return <DetailPage go={go} />;
  if (view === "cart") return <CartPage go={go} onKirim={kirim} />;
  if (view === "kosong") return <OrdersPage go={go} />;
  if (view === "sukses") return <SuccessPage go={go} />;
  if (view === "bantuan") return <BantuanPage go={go} />;
  return <MenuPage go={go} />;
}