import { Layout } from "antd";
import Content from "../content/Content";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function Main() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content />
      <Footer />
    </Layout>
  );
}

export default Main;
