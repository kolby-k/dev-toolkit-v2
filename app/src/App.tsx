import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./routes/Home";

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
