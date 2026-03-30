"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useRevealWords(selector: string) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = containerRef.current;
      if (!el) return;

      el.querySelectorAll(selector).forEach((heading) => {
        const text = heading.textContent || "";
        heading.textContent = "";
        const words = text.split(/\s+/).filter(Boolean);

        words.forEach((word, i) => {
          const wrapper = document.createElement("span");
          wrapper.style.display = "inline-block";
          wrapper.style.overflow = "hidden";
          wrapper.style.verticalAlign = "top";

          const inner = document.createElement("span");
          inner.style.display = "inline-block";
          inner.textContent = word;
          wrapper.appendChild(inner);

          if (i < words.length - 1) {
            const space = document.createTextNode("\u00A0");
            wrapper.appendChild(space);
          }
          heading.appendChild(wrapper);
        });

        const inners = heading.querySelectorAll("span > span");
        gsap.set(inners, { yPercent: 110 });

        ScrollTrigger.create({
          trigger: heading,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(inners, {
              yPercent: 0,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.08,
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector]);

  return containerRef;
}

export function useRevealCards() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = containerRef.current;
      if (!el) return;

      const cards = el.querySelectorAll("[data-reveal-card]");
      gsap.set(cards, { opacity: 0, y: 60 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
