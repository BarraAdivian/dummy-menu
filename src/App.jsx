import CustomerApp from "./customer/CustomerApp"
import AdminApp from "./admin/AdminApp"

export default function App() {
  const isAdmin = window.location.pathname.startsWith("/admin")
  return isAdmin ? <AdminApp /> : <CustomerApp />
}