import Header from "./components/Header";
import Hero from "./components/Hero";
import Systems from "./components/Systems";
import Leadership from "./components/Leadership";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Systems />
        <Leadership />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
