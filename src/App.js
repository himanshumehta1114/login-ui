import React from "react";
import "./App.css";
import Header from "./components/header";
import { FullPageSpinner } from "./components/button";

// import Login from "./pages/login";
// import Authenticated from "./pages/authenticated";
import { useAuth } from "./context/auth";

// prefetching heavy component chunks to improve performance
// not adding much value here due to simple/light components
const Authenticated = React.lazy(() =>
  import(/* webpackPrefetch: true */ "./pages/authenticated")
);
const Login = React.lazy(() => import(/* webpackPrefetch: true */ "./pages/login"));

function App() {
  const { statusCode } = useAuth();
  return (
    <div className="App">
      <Header />
      <React.Suspense fallback={<FullPageSpinner />}>
        <main>{statusCode === "success" ? <Authenticated /> : <Login />}</main>
      </React.Suspense>
    </div>
  );
}

export default App;
