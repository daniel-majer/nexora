import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import { AppLayout } from "./ui/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import { PageNotFound } from "./pages/PageNotFound";
import { Products } from "./pages/Products";
import { ThemeProvider } from "./context/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OrderDetail } from "./pages/OrderDetail";
import { ProtectedRoute } from "./features/login/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { Users } from "./pages/Users";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <ThemeProvider>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderDetail />} />
              <Route path="products" element={<Products />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
