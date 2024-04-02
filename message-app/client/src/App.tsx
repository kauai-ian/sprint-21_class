import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import AuthRoute from "./components/AuthRoute";
import Layout from "./components/Layout";
import Callback from "./pages/Callback";
import Home from "./pages/Home";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
