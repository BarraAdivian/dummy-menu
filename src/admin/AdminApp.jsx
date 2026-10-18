import { useState } from "react"
import AdminPesananPage from "./pages/AdminPesananPage"
import AdminOrderDetailPage from "./pages/AdminOrderDetailPage"
import AdminMenuPage from "./pages/AdminMenuPage"
import AdminMenuFormPage from "./pages/AdminMenuFormPage"
import AdminNav from "./components/AdminNav"

export default function AdminApp() {
  const [page, setPage] = useState("pesanan")     // "pesanan" | "menu"
  const [detailId, setDetailId] = useState(null)  // detail pesanan
  const [menuView, setMenuView] = useState({ name: "list", id: null }) // list | form

  let content
  if (page === "pesanan") {
    content =
      detailId === null ? (
        <AdminPesananPage onOpen={(id) => setDetailId(id)} />
      ) : (
        <AdminOrderDetailPage id={detailId} onBack={() => setDetailId(null)} />
      )
  } else {
    content =
      menuView.name === "list" ? (
        <AdminMenuPage
          onNew={() => setMenuView({ name: "form", id: null })}
          onEdit={(id) => setMenuView({ name: "form", id })}
        />
      ) : (
        <AdminMenuFormPage id={menuView.id} onBack={() => setMenuView({ name: "list", id: null })} />
      )
  }

  const showNav = page === "pesanan" ? detailId === null : menuView.name === "list"

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
          }}
        />
      )}
    </div>
  )
}