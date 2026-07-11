import { HelmetProvider, Helmet } from "react-helmet-async";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollProgress from "../components/layout/ScrollProgress";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Achievements from "../components/sections/Achievements";
import Contact from "../components/sections/Contact";
import ScrollToTop from "../components/common/ScrollToTop";
import CustomCursor from "../components/common/CustomCursor";

export default function Home() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Diksha Jain | Full Stack Developer × Edge AI/CV × Designer</title>
                <meta name="description" content="Diksha Jain — Full Stack Developer, Edge AI/CV Engineer, and Visual Designer. B.Tech IT @ JEC. Building production-grade web apps, on-device AI pipelines, and brand systems." />
                <meta property="og:title" content="Diksha Jain | Full Stack Developer × Edge AI/CV × Designer" />
                <meta property="og:description" content="Portfolio of Diksha Jain — Full Stack Developer, Edge AI/CV Engineer, and Visual Designer." />
            </Helmet>

            <CustomCursor />
            <ScrollProgress />
            <Navbar />

            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Achievements />
                <Contact />
            </main>

            <Footer />
            <ScrollToTop />
        </HelmetProvider>
    );
}
