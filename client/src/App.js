import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Auth from "./components/Auth";
import ScrollToTop from "./ScrollToTop";
import Dashboard from "./components/Dashboard";
import Navbar from "./essentials/Navbar";

function AppContent() {
  const location = useLocation();
  //const showNavbar = location.pathname !== "/";

  return (
    <>
      <div className="main">
        <ScrollToTop />
        {/* {showNavbar && <Navbar />} */}
        {/* <Navbar /> */}
        <Routes>
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  // document.addEventListener("keydown", function (event) {
  //   if (event.ctrlKey) {
  //     event.preventDefault();
  //   }
  //   if (event.keyCode === 123) {
  //     event.preventDefault();
  //   }
  // });
  // document.addEventListener("contextmenu", (event) => event.preventDefault());

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
