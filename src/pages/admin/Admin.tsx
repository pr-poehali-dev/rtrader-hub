import { Routes, Route } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminReviews from "./AdminReviews";
import AdminContent from "./AdminContent";

export default function Admin() {
  const { isAuthed, login, logout, loading, error } = useAdminAuth();

  if (!isAuthed) {
    return <AdminLogin onLogin={login} loading={loading} error={error} />;
  }

  return (
    <AdminLayout onLogout={logout}>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="content" element={<AdminContent />} />
      </Routes>
    </AdminLayout>
  );
}
