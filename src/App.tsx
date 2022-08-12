import { Layout } from "antd";
import React, { Suspense } from "react";
import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Content = React.lazy(() => import("./components/content/Content"));

function App() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Layout style={{ minHeight: "100vh" }}>
          <Navbar />
          <Content />
          <Footer />
        </Layout>
      </Suspense>
      <ToastContainer />
    </div>
  );
}

export default App;
