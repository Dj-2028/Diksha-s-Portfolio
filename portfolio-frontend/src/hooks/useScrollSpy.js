import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds) {
    const [active, setActive] = useState(sectionIds[0]);

    useEffect(() => {
        const observers = sectionIds.map((id) => {
            const el = document.getElementById(id);
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActive(id);
                },
                { threshold: 0.4, rootMargin: "-80px 0px -40% 0px" }
            );
            if (el) obs.observe(el);
            return obs;
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [sectionIds]);

    return active;
}
