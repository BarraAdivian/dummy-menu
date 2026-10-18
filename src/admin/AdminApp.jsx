import { useState } from "react"
import AdminPesananPage from "./pages/AdminPesananPage"
import AdminOrderDetailPage from "./pages/AdminOrderDetailPage"
import AdminMenuPage from "./pages/AdminMenuPage"
import AdminMenuFormPage from "./pages/AdminMenuFormPage"
import AdminLaporanPage from "./pages/AdminLaporanPage"
import AdminAkunPage from "./pages/AdminAkunPage"
import AdminProfilPage from "./pages/AdminProfilPage"
import AdminJamBukaPage from "./pages/AdminJamBukaPage"
import AdminMejaPage from "./pages/AdminMejaPage"
import AdminPembayaranPage from "./pages/AdminPembayaranPage"
import AdminStafPage from "./pages/AdminStafPage"
import AdminPrinterPage from "./pages/AdminPrinterPage"
import AdminNav from "./components/AdminNav"

export default function AdminApp() {
  const [page, setPage] = useState("pesanan")     // "pesanan" | "menu" | "laporan" | "akun"
  const [detailId, setDetailId] = useState(null)
  const [menuView, setMenuView] = useState({ name: "list", id: null })
  const [akunView, setAkunView] = useState(null)  // null | "profil" | "jambuka" | "meja" | "pembayaran" | "staf" | "printer"

  let content
  if (page === "pesanan") {
    content =
      detailId === null ? (
        <AdminPesananPage onOpen={(id) => setDetailId(id)} />
      ) : (
        <AdminOrderDetailPage id={detailId} onBack={() => setDetailId(null)} />
      )
  } else if (page === "menu") {
    content =
      menuView.name === "list" ? (
        <AdminMenuPage
          onNew={() => setMenuView({ name: "form", id: null })}
          onEdit={(id) => setMenuView({ name: "form", id })}
        />
      ) : (
        <AdminMenuFormPage id={menuView.id} onBack={() => setMenuView({ name: "list", id: null })} />
      )
  } else if (page === "laporan") {
    content = <AdminLaporanPage />
  } else if (page === "akun") {
    if (akunView === "profil") content = <AdminProfilPage onBack={() => setAkunView(null)} />
    else if (akunView === "jambuka") content = <AdminJamBukaPage onBack={() => setAkunView(null)} />
    else if (akunView === "meja") content = <AdminMejaPage onBack={() => setAkunView(null)} />
    else if (akunView === "pembayaran") content = <AdminPembayaranPage onBack={() => setAkunView(null)} />
    else if (akunView === "staf") content = <AdminStafPage onBack={() => setAkunView(null)} />
    else if (akunView === "printer") content = <AdminPrinterPage onBack={() => setAkunView(null)} />
    else content = <AdminAkunPage onOpen={(k) => setAkunView(k)} />
  }

  const showNav =
    page === "pesanan" ? detailId === null
    : page === "akun" ? akunView === null
    : true

  return (
    <div className="min-h-screen bg-[#F2F1EC]">
      {content}
      {showNav && (
        <AdminNav
          page={page}
          onNav={(p) => {
            setPage(p)
            setDetailId(null)
            setMenuView({ name: "list", id: null })
            setAkunView(null)
          }}
        />
      )}
    </div>
  )
}