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
import LoginForm from "./pages/login-form.tsx";
import AccountDetails from "./pages/account-details.tsx";
import ShopCartProvider from "./providers/shop-cart-provider.tsx";
import Checkout from "./pages/checkout.tsx";

const App: React.FC = () => {
    return (
            <BrowserRouter>
                <AuthProvider>
                <ThemeProvider>
                <ShopCartProvider>
                <NavbarOverlay>
                <Routes>
                    <Route path="/" element={<ProductList></ProductList>} />
                    <Route path="/editProduct/:id" element={<CreateProductForm />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/error/unautenticated" element={<Unautenticated />} />
                    <Route path="/error/unauthorized" element={<Unauthorized />} />
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/test/unauth" element={<CreateProductForm/>}/>
                        <Route path="/account" element={<AccountDetails/>}/>
                    </Route>
                    <Route element={<UnauthenticatedOnlyRoute/>}>
                        <Route path="/auth/login" element={<LoginForm/>}/>
                    </Route>
                    {/*<Route path="/about" element={<About />} />*/}
                    {/*<Route path="*" element={<NotFound />} />*/}
                </Routes>
                </NavbarOverlay>
                </ShopCartProvider>
                </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        
    );
}

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default App