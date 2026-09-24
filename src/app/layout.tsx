import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/SmoothScrollProvider";
import AsciiBackdrop from "@/components/AsciiBackdrop";
import TuiFrame from "@/components/TuiFrame";
import TuiStatusBar from "@/components/TuiStatusBar";
import TuiPromptBar from "@/components/TuiPromptBar";
import BootSequence from "@/components/BootSequence";
import CommandPalette from "@/components/CommandPalette";
import CopyToast from "@/components/CopyToast";
import Footer from "@/components/Footer";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "babit@portfolio:~$",
  description:
    "Babitdor Kayang Khonglah — AI/ML engineer working on LLM orchestration, RAG architectures and multi-agent systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        {/*
          Server-rendered boot guard.

          Fixes a content flash. The page markup is server-rendered and paints
          immediately, but `BootSequence` cannot mount until React has hydrated.
          Measured on a cold load before this existed: content became visible at
          105ms while the overlay did not appear until 838ms, so ~86 frames of the
          real page showed before the boot animation covered it.

          Two constraints decided the shape of this:

          1. It must be in the server HTML, or it cannot cover the first paint.
          2. It must be part of the React tree, because appending it from a script
             makes React find an unexpected child in <body> and throw a hydration
             mismatch.

          So it is rendered normally here, and it is never REMOVED, only hidden.
          Removing it puts React and the DOM out of sync; if the tree later
          re-renders, React re-inserts the missing node and the guard comes back
          (measured: removed at 265ms, re-added at 793ms, blank screen on every
          repeat visit). `display: none` is invisible to React because no `style`
          prop is rendered for it, so setting it imperatively is safe.

          It hides itself when either a real interaction happens, its backstop
          timeout fires, or `BootSequence` reports the overlay is up. Under reduced
          motion, or on a repeat visit, the timeout is 0, so it is hidden before
          the first paint of the content below.
        */}
        <div
          id="tuiBootGuard"
          className="tuiBootGuard"
          aria-hidden="true"
          /*
            The inline script below sets `style.display` before hydration (that is
            the entire point: it has to act before React is ready). React would
            then find an attribute in the DOM that its server HTML did not have and
            report an attribute hydration mismatch, which it cannot patch up.
            Suppressing is the documented fix for an element whose attributes are
            intentionally driven outside React. It is safe here because the element
            has no children and no other attribute is ever touched.
          */
          suppressHydrationWarning
        >
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var s=document.getElementById('tuiBootGuard');if(!s){return;}var q=location.search;var forced=q.indexOf('boot')>=0;var nomotion=q.indexOf('nomotion')>=0;var reduce=nomotion||window.matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=false;try{seen=sessionStorage.getItem('tui-booted')==='1';}catch(e){}var willPlay=forced||(!reduce&&!seen);var ms=willPlay?2000:0;function off(){s.style.display='none';}window.setTimeout(off,ms);window.addEventListener('pointerdown',off,{once:true});window.addEventListener('keydown',off,{once:true});})();`,
            }}
          />
        </div>
        <SmoothScrollProvider>
          <AsciiBackdrop />

          <TuiFrame>
            <TuiStatusBar />

            <main className="tuiMain">{children}</main>

            <Footer />

            <TuiPromptBar />
            <BootSequence />
            <CommandPalette />
            <CopyToast />
          </TuiFrame>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
