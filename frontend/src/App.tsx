import ProductList from "./pages/ProductList.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProductForm from "./pages/EditProductForm.tsx";
import Unautenticated from "./pages/Unauthenticated.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import AuthProvider from "./providers/authProvider.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

const App: React.FC = () => {
    return (
            <BrowserRouter>
                <AuthProvider>
                <Routes>
                    <Route path="/" element={<ProductList></ProductList>} />
                    <Route path="/editProduct/:id" element={<CreateProductForm />} />
                   
                    <Route path="/error/unautenticated" element={<Unautenticated />} />
                    <Route path="/error/unauthorized" element={<Unauthorized />} />
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/test/unauth" element={<CreateProductForm/>}/>
                    </Route>
                    {/*<Route path="/about" element={<About />} />*/}
                    {/*<Route path="*" element={<NotFound />} />*/}
                </Routes>
                </AuthProvider>
            </BrowserRouter>
        
    );
}

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default App