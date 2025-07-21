import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WalletConnect from "./components/WalletConnect";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import TransferPage from "./pages/TransferPage";
import StatusPage from "./pages/StatusPage";
import ViewPage from "./pages/ViewPage";
import RoleAdmin from "./pages/RoleAdmin";
import BatchBrowser from "./components/BatchBrowser";
import BatchViewer from "./components/BatchViewer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <h2 className="text-2xl font-semibold text-center py-6">💊 PharmaTraceSecure</h2>
        <WalletConnect />
        <Navbar />
        <div className="p-6 max-w-3xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/transfer" element={<TransferPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/viewer/:batchId" element={<ViewPage />} />
            <Route path="/admin" element={<RoleAdmin />} />
            <Route path="/browser" element={<BatchBrowser />} />

            <Route path="/viewer/:batchId" element={<BatchViewer />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
