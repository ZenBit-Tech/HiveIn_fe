import { Layout } from "antd";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar />
        <Content />
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
