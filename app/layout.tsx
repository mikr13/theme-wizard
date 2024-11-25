import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ColorsProvider } from "@/theme/useColor";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { ClickDetector } from "@/components/click-detector";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Theme Wizard",
  description: "",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ColorsProvider>
      <TooltipProvider>
        <html lang="en">
          <body className={cn(inter.className, "apply-font-body w-full")}>
            <div className="hidden xl:block">
              <Navbar />
              <ClickDetector>
                <div className=" relative -mt-[5.75rem] overflow-hidden pb-16 pt-[5.75rem]">
                  <div className="relative mx-auto mt-16 w-full max-w-[85rem] px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-32 apply-font-body">
                    {children}
                  </div>
                </div>
              </ClickDetector>
              <div className="container flex items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built by{" "}
                  <a
                    href="https://github.com/fozuzip"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    George Pittas
                  </a>
                  . The source code is available on{" "}
                  <a
                    href="https://github.com/fozuzip/theme-wizard"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    GitHub
                  </a>
                  .
                </p>
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Inspired by{" "}
                  <a
                    href="https://www.realtimecolors.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Realtime Colors
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="flex xl:hidden flex-col items-center justify-center h-screen w-screen">
              <Logo />
              <h1 className="text-xl text-muted-foreground p-8">
                This app does not currently support mobile devices.
                <br />
                For the best experience, please access it from a desktop or
                tablet.
              </h1>
            </div>
          </body>
        </html>
      </TooltipProvider>
    </ColorsProvider>
  );
}
