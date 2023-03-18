import * as React from "react";
import Templates from "./components/pages/Templates";
import About from "./components/pages/About";
import { Route, Routes } from "react-router-dom";
import NavbarComponent from "components/NavbarComponent";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import TemplateView from "./components/pages/TemplateView";
import Landing from "components/pages/Landing";
import { ThemeProvider } from "@mui/material/styles";
import themes from "./themes";
import ResumeCreation from "components/pages/ResumeCreation";
import { CssBaseline } from "@mui/material";
import AccountDetails from "components/pages/AccountDetails";
import NotFoundPage from "components/pages/NotFoundPage";

function App() {
  const ReactDOM = require("react-dom");

  if (process.env.NODE_ENV !== "production") {
    const axe = require("@axe-core/react");
    axe(React, ReactDOM, 1000);
  }
  return (
    <React.Fragment>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <NavbarComponent />
        <Routes>
          {/* This handles the scenarios whereby a page isn't found. Handy for users, handy for me. */}
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Landing />} />
          <Route path="/Home" element={<Landing />} />
          <Route path="/About" element={<About />} />
          <Route path="/Templates" element={<Templates />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/TemplateView" element={<TemplateView />} />
          <Route path="/ResumeCreation" element={<ResumeCreation />} />
          <Route path="/Account" element={<AccountDetails />} />
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
