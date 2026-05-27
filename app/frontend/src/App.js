import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";

const Portfolio = () => {
  useEffect(() => {
    document.title = "Mohammed Ayyan | Cinematic Frontend Developer";
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(
      "section:not(#hero) h2, section:not(#hero) h3, section:not(#hero) p, section:not(#hero) article, section:not(#hero) form, section:not(#hero) .grid > div, section:not(#hero) .project-card, section:not(#hero) .skill-orbit, section:not(#hero) .marquee"
    );

    targets.forEach((target, index) => {
      target.classList.add("scroll-reveal");
      target.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <SmoothScroll>
      <div className="App relative" data-testid="portfolio-root">
        <Cursor />
        <GrainOverlay />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
    </SmoothScroll>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1a1a1f",
            color: "#e8e8e3",
            border: "1px solid rgba(232,232,227,0.08)",
            borderRadius: 0,
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
