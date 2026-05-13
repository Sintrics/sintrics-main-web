import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Manifesto from "@/components/Manifesto";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)" }}>
      <Navigation />
      <div className="pt-16">
        <Hero />
        <Ticker />
        <Services />
        <Stats />
        <Manifesto />
        <Testimonials />
        <Team />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
