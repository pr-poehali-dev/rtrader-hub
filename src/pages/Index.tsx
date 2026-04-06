import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IndexHero from "@/components/index/IndexHero";
import IndexContent from "@/components/index/IndexContent";
import IndexFooter from "@/components/index/IndexFooter";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const routerNavigate = useNavigate();
  const navTo = (href: string, isRoute?: boolean) => {
    setMenuOpen(false);
    if (isRoute) {
      routerNavigate(href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="neon-grid-bg min-h-screen text-white font-montserrat">
      <IndexHero
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navTo={navTo}
      />
      <IndexContent
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
      />
      <IndexFooter navTo={navTo} />
    </div>
  );
}
