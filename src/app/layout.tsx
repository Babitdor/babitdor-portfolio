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
