import { Layout } from "antd";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";
import { store, userPersistor } from "store/store";

const Content = React.lazy(() => import("./components/content/Content"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
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
  );
}

export default App;
