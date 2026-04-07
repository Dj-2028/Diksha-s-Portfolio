import { HelmetProvider, Helmet } from "react-helmet-async";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollProgress from "../components/layout/ScrollProgress";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import ScrollToTop from "../components/common/ScrollToTop";
import CustomCursor from "../components/common/CustomCursor";

export default function Home() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Diksha Jain | MERN Stack Developer</title>
                <meta name="description" content="Diksha Jain — Full Stack MERN Developer. Building fast, scalable web apps with React, Node.js, Express, and MongoDB." />
                <meta property="og:title" content="Diksha Jain | MERN Stack Developer" />
                <meta property="og:description" content="Portfolio of Diksha Jain — Full Stack MERN Developer" />
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
                <Contact />
            </main>

            <Footer />
            <ScrollToTop />
        </HelmetProvider>
    );
}
