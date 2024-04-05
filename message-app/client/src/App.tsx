import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import AuthRoute from "./components/AuthRoute";
import Layout from "./components/Layout";
import Callback from "./pages/Callback";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import useSocket from "./hooks/useSocket";

function App() {
  useSocket();

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
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Layout>
  );
}

export default App;
