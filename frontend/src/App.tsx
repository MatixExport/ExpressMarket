import ProductList from "./pages/product-list.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProductForm from "./pages/edit-product-form.tsx";
import AuthProvider from "./providers/auth-Provider.tsx";
import ProtectedRoute from "./routes/protected-route.tsx";
import ThemeProvider from "./components/theme-provider.tsx";
import NavbarOverlay from "./components/navbar-overlay.tsx";
import Unautenticated from "./pages/Unauthenticated.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import UnauthenticatedOnlyRoute from "./routes/unauthenticated-only-route.tsx";
import AccountDetails from "./pages/account-details.tsx";
import ShopCartProvider from "./providers/shop-cart-provider.tsx";
import Checkout from "./pages/checkout.tsx";
import ClientOrderList from "./pages/client-order-list.tsx";
import RestrictedNavbarOverlay from "./components/restricted-navbar-overlay.tsx";
import LoginPage from "./pages/login-page.tsx";
import RegisterPage from "./pages/register-page.tsx";
import InitData from "./pages/init-data.tsx";
import { UserRole } from "./types/user-type.ts";
import AdminOrderList from "./pages/admin-order-list.tsx";

const App: React.FC = () => {
    return (
            <BrowserRouter>
                <AuthProvider>
                <ThemeProvider>
                <ShopCartProvider>
                <RestrictedNavbarOverlay>
                <Routes>
                    <Route path="/" element={<ProductList></ProductList>} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/error/unautenticated" element={<Unautenticated />} />
                    <Route path="/error/unauthorized" element={<Unauthorized />} />
                    <Route element={<ProtectedRoute allowedRoles={[UserRole.EMPLOYEE]} />}>
                        <Route path="/products/init" element={<InitData />} />
                        <Route path="/editProduct/:id" element={<CreateProductForm />} />
                        <Route path="/orders/admin" element={<AdminOrderList />} />
                    </Route>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/orders/user" element={<ClientOrderList />} />
                        <Route path="/test/unauth" element={<CreateProductForm/>}/>
                        <Route path="/account" element={<AccountDetails/>}/>
                    </Route>
                    <Route element={<UnauthenticatedOnlyRoute/>}>
                        <Route path="/auth/login" element={<LoginPage/>}/>
                        <Route path="/auth/register" element={<RegisterPage/>}/>
                    </Route>
                    {/*<Route path="/about" element={<About />} />*/}
                    {/*<Route path="*" element={<NotFound />} />*/}
                </Routes>
                </RestrictedNavbarOverlay>
                </ShopCartProvider>
                </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
    );
}

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default App