import * as React from 'react';
import Templates from "./components/pages/Templates";
import About from "./components/pages/About";
import {Route, Routes} from 'react-router-dom';
import NavbarComponent from 'components/NavbarComponent';
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import TemplateView from "./components/pages/TemplateView";
import {ThemeProvider} from "@mui/material/styles";
import themes from './themes';
import ResumeCreation from 'components/pages/ResumeCreation';

function App() {
    return (
        <React.Fragment>
            <ThemeProvider theme={themes}>
                <NavbarComponent />
                <Routes>
                    <Route path="/"/>
                    <Route path="/About" element={<About/>}/>
                    <Route path="/Templates" element={<Templates/>}/>
                    <Route path="/Login" element={<LoginPage/>}/>
                    <Route path="/Register" element={<RegisterPage/>}/>
                    <Route path="/TemplateView" element={<TemplateView/>}/>
                    <Route path="/ResumeCreation" element={<ResumeCreation/>}/>
                </Routes>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default App;