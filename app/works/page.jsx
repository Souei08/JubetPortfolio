import { WorksContent } from "@/utils/WorksContent";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { WorksList } from "@/components/WorksList";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Link from "next/link";

export const metadata = {
  title: "Works",
  description:
    "Selected web projects by Jubet Aceberos — SaaS platforms, commerce, and brand experiences.",
  alternates: {
    canonical: "/works",
  },
  openGraph: {
    title: "Works | Jubet Aceberos",
    description:
      "Selected web projects by Jubet Aceberos — SaaS platforms, commerce, and brand experiences.",
    url: "/works",
  },
};

export default function WorksPage() {
  return (
    <main>
      <Navigation />

      <section className="section section-works pt-28 md:pt-32">
        <div className="section-shell">
          <div className="section-intro mx-auto max-w-2xl text-center">
            <p className="section-label">Work</p>
            <h1 className="section-title mb-4">All projects</h1>
            <p className="body-copy mx-auto max-w-lg">
              A full look at products and sites I&apos;ve helped design and build —
              from SaaS platforms to commerce and brand experiences.
            </p>
            <p className="mt-4 font-body text-xs uppercase tracking-section text-muted">
              {String(WorksContent.length).padStart(2, "0")} projects
            </p>
          </div>

          <WorksList projects={WorksContent} />

          <div className="hero-actions mt-20 md:mt-28">
            <Link href="/" className="CustomButton CustomButton--text">
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTopButton />
    </main>
  );
}
