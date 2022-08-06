import React, { Suspense } from "react";

const Main = React.lazy(() => import("./components/main/Main"));

function App() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Main />
      </Suspense>
    </div>
  );
}

export default App;
