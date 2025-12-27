import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navigation } from "./components/organisms/Navigation";
import HomePage from "./pages/HomePage";
import PlannerPage from "./pages/PlannerPage";
import LegalPage from "./pages/LegalPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import ResourcesPage from "./pages/ResourcesPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PlannerPage />} />

        {/* New Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Legal Routes */}
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms-of-service" element={<LegalPage />} />
        <Route path="/cookie-policy" element={<LegalPage />} />

        {/* Dynamic Features */}
        <Route path="/workouts/:category" element={<WorkoutsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:type" element={<ResourcesPage />} />
        <Route path="/resources/:type/:id" element={<ResourcesPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
