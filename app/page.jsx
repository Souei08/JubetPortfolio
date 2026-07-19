// Components
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Projects } from "@/components/Project";
import { Skills } from "@/components/Skills";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Header />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTopButton />
    </main>
  );
}
