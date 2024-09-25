import { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users/Users";
import EditUsers from "./pages/EditUsers/EditUsers";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/editUsers" element={<EditUsers />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
