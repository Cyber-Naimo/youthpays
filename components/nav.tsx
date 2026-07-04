"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/config/brand";
import { Logo } from "@/components/ui/logo";
import { ArrowRight } from "@/components/ui/icons";

const links = [
  { href: "#solution", id: "solution", label: "Solution" },
  { href: "#how", id: "how", label: "Steps" },
  { href: "#parents", id: "parents", label: "Who" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className="sticky top-0 z-[100] transition-colors duration-200"
      style={{
        background: scrolled ? "var(--color-cream)" : "transparent",
        borderBottom: `2px solid ${scrolled ? "var(--color-navy)" : "transparent"}`,
      }}
    >
      <div className="wrap flex h-[64px] items-center justify-between gap-3">
        <a href="#top" aria-label={`${brand.name} home`}>
          <Logo />
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => {
            const on = active === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-full px-3.5 py-2 text-[14.5px] font-semibold transition-colors"
                style={{ color: on ? "var(--color-red)" : "var(--color-ink2)" }}
              >
                {on && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: "var(--color-primarysoft)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </a>
            );
          })}
        </nav>

        <a href="#waitlist" className="btn btn-primary hidden !py-2.5 !pl-5 !pr-4 md:inline-flex">
          Join free <ArrowRight />
        </a>

        <button
          className="grid h-11 w-11 place-items-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-[5px]">
            <span className="h-0.5 w-[22px] rounded bg-navy transition" style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span className="h-0.5 w-[22px] rounded bg-navy transition" style={{ opacity: open ? 0 : 1 }} />
            <span className="h-0.5 w-[22px] rounded bg-navy transition" style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mb-2 flex flex-col gap-1 rounded-[16px] border-2 border-navy bg-surface p-3 hard-navy md:hidden"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-[10px] px-4 py-3 font-bold text-navy transition-colors hover:bg-primarysoft hover:text-red">
                {l.label}
              </a>
            ))}
            <a href="#waitlist" onClick={() => setOpen(false)} className="btn btn-primary mt-1">
              Join free <ArrowRight />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
