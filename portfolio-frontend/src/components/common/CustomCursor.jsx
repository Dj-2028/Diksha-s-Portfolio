import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [dot, setDot] = useState({ x: 0, y: 0 });
    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        // Only on desktop
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const move = (e) => setPos({ x: e.clientX, y: e.clientY });
        const moveDot = (e) => setDot({ x: e.clientX, y: e.clientY });

        const down = () => setClicking(true);
        const up = () => setClicking(false);

        const enterLinks = () => setHovering(true);
        const leaveLinks = () => setHovering(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("mousemove", moveDot);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);

        const addHoverListeners = () => {
            document.querySelectorAll("a, button, [data-cursor='pointer']").forEach((el) => {
                el.addEventListener("mouseenter", enterLinks);
                el.addEventListener("mouseleave", leaveLinks);
            });
        };
        addHoverListeners();

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousemove", moveDot);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
        };
    }, []);

    return (
        <>
            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-primary/60"
                animate={{
                    x: pos.x - (hovering ? 20 : 16),
                    y: pos.y - (hovering ? 20 : 16),
                    width: hovering ? 40 : 32,
                    height: hovering ? 40 : 32,
                    scale: clicking ? 0.8 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
            />
            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ x: dot.x - 3, y: dot.y - 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </>
    );
}
