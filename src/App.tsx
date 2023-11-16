import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Nav from "./components/Nav";
import "./scss/style.scss"

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Nav></Nav>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/signup" element={<Home></Home>}></Route>
                    <Route path="/login" element={<Home></Home>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
