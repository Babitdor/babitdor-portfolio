import type { Metadata, Viewport } from "next";
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
import { identity, education } from "@/content/profile";
import { site, siteUrl } from "@/lib/site";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: "#070a08",
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: site.title,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  applicationName: "babit-os",
  authors: [{ name: site.name, url: identity.github }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "babit-os",
    title: site.title,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "babit-os, the portfolio of Babitdor Kayang Khonglah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  jobTitle: identity.role,
  url: siteUrl.href,
  email: `mailto:${identity.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Erlangen", addressCountry: "DE" },
  sameAs: [identity.github, identity.linkedin, identity.huggingface, identity.ollama, identity.orcid],
  alumniOf: education.map((item) => ({
    "@type": "CollegeOrUniversity",
    name: item.school,
  })),
  knowsAbout: [
    "AI agents",
    "LangGraph",
    "retrieval augmented generation",
    "Model-Based Systems Engineering",
    "SysML v2",
    "large language model fine-tuning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <body>
        {/*
          The shell must not be a blank screen when JavaScript is unavailable.
          The server-rendered boot guard covers the page until a script hides it,
          so hide the guard and the controls that cannot work without hydration.
          The hero art is generated on the client; without it, give the text the
          full column instead of leaving an empty pane.
        */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>#tuiBootGuard{display:none!important}.tuiTheme,.tuiMenuBtn,.tuiContact__copy,.tuiFilters,.tuiHeroArt{display:none!important}.tuiHeroGrid{grid-template-columns:minmax(0,1fr)!important}</style>`,
          }}
        />

        {/*
          Theme guard, before any content is parsed. Dark is the default; a saved
          light choice is applied to the root before the first paint so the page
          never flashes the wrong palette.
        */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('tui-theme')==='light'){var r=document.documentElement;r.dataset.theme='light';r.style.colorScheme='light';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#f2efe4');}}catch(e){}})();`,
          }}
        />
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

          The boot only plays on the home page. A visitor who lands on a case file
          from a search result should get the case file, not a two-second logo.
        */}
        <div
          id="tuiBootGuard"
          className="tuiBootGuard"
          aria-hidden="true"
          suppressHydrationWarning
        >
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var s=document.getElementById('tuiBootGuard');if(!s){return;}var q=location.search;var forced=q.indexOf('boot')>=0;var nomotion=q.indexOf('nomotion')>=0;var reduce=nomotion||window.matchMedia('(prefers-reduced-motion: reduce)').matches;var home=location.pathname==='/'||location.pathname==='';var seen=false;try{seen=sessionStorage.getItem('tui-booted')==='1';}catch(e){}var willPlay=forced||((home&&!reduce)&&!seen);var ms=willPlay?2600:0;function off(){s.style.display='none';}window.setTimeout(off,ms);window.addEventListener('pointerdown',off,{once:true});window.addEventListener('keydown',off,{once:true});})();`,
            }}
          />
        </div>

        <a className="tuiSkip" href="#main">
          Skip to content
        </a>

        <SmoothScrollProvider>
          <AsciiBackdrop />

          <TuiFrame>
            <TuiStatusBar />

            <main className="tuiMain" id="main" tabIndex={-1}>
              {children}
            </main>

            <TuiPromptBar />
            <BootSequence />
            <CommandPalette />
            <CopyToast />
          </TuiFrame>
        </SmoothScrollProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
