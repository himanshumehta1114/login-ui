import "./App.css";
import Header from "./components/header";
import Login from "./pages/login";
import Authenticated from "./pages/authenticated";
import { useAuth } from "./context/auth";

function App() {
  const { statusCode } = useAuth();
  return (
    <div className="App">
      <Header />
      <main>{statusCode === "success" ? <Authenticated /> : <Login />}</main>
    </div>
  );
}

export default App;
