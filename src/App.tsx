import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import { AppLayout } from "./ui/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders";
import { Customers } from "./pages/Customers";
import { Employees } from "./pages/Employees";
import { Account } from "./pages/Account";
import { Login } from "./pages/Login";
import { PageNotFound } from "./pages/PageNotFound";
import { Products } from "./pages/Products";
import { ThemeProvider } from "./context/DarkModeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="employees" element={<Employees />} />
            <Route path="settings" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
