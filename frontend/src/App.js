import { Component, useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ServiceSwitcher from "@/components/ServiceSwitcher";
import HowItWorks from "@/components/HowItWorks";
import Quiz from "@/components/Quiz";
import FaqContact from "@/components/FaqContact";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import ProjectShowcase from "@/components/ProjectShowcase";
import MagneticCursor from "@/components/MagneticCursor";
import { Toaster } from "@/components/ui/sonner";
import { scrollToId } from "@/utils/scroll";
import BrandIntro from "@/components/BrandIntro";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { err: null };
    }
    static getDerivedStateFromError(err) {
        return { err };
    }
    render() {
        if (this.state.err) {
            return (
                <div className="min-h-screen bg-navy text-white flex flex-col items-center justify-center gap-4 p-8 text-center">
                    <p className="font-display font-bold text-2xl">
                        Alguna cosa ha fallat en carregar la pàgina.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-xl bg-turquoise text-navy font-semibold px-6 py-3"
                    >
                        Recarrega
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

const Landing = () => {
    const [preselectedService, setPreselectedService] = useState("");

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        window.__lenis = lenis;
        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    const handleWant = (serviceId) => {
        setPreselectedService(serviceId);
        setTimeout(() => scrollToId("contacte"), 80);
    };

    return (
        <div className="bg-white text-ink font-sans antialiased overflow-x-clip">
            <BrandIntro />
            <MagneticCursor />
            <Navbar />
            <main>
                <Hero />
                <SocialProof />
                <ServiceSwitcher onWant={handleWant} />
                <ProjectShowcase />
                <Quiz onWant={handleWant} />
              <HowItWorks />
                <FaqContact preselectedService={preselectedService} />
            </main>
            <Footer />
            <WhatsAppFab />
            <Toaster position="bottom-left" richColors closeButton />
        </div>
    );
};

function App() {
    return (
        <ErrorBoundary>
            <Landing />
        </ErrorBoundary>
    );
}

export default App;
