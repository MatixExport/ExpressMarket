import ProductList from "./ProductList.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProductForm from "./EditProductForm.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductList></ProductList>} />
                <Route path="/editProduct/:id" element={<CreateProductForm />} />
                {/*<Route path="/about" element={<About />} />*/}
                {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
        </BrowserRouter>
    );
}

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default App