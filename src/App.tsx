import { Layout } from "antd";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";
import { store, userPersistor } from "store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import FallBackSpin from "components/UI/spinners/FallbackSpin";

const Content = React.lazy(() => import("./components/content/Content"));

function App() {
  return (
    <>
      <Suspense fallback={<FallBackSpin />}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={userPersistor}>
            <Layout style={{ minHeight: "100vh" }}>
              <Navbar />
              <Content />
              <Footer />
            </Layout>
          </PersistGate>
        </Provider>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
