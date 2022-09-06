import useGoogleAuth from "hooks/useGoogleAuth";

function Home() {
  useGoogleAuth();

  return <div>Home</div>;
}

export default Home;
