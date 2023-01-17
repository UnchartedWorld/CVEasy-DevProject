import * as React from 'react';
import {NavbarComponent} from "./components/NavbarComponent"
import {Route, Routes} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";

function App() {
    return (
        <div>
            <NavbarComponent/>
            <Routes>
                <Route path="/Login" element={<LoginPage />} />
            </Routes>
        </div>
    )
}

export default App;
