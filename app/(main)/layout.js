"use client";

import Offline from "@/components/errors/Offline";
import GetStarted from "@/components/layouts/getStarted/getstarted";
import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/navbar/navbar";
import SideNavbar from "@/components/modules/sidenavbar/SideNavbar";
import { TokenDetails } from "@/utils/tokendetails/tokeDetails";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [hasToken, setHasToken] = useState(Boolean);
  const [isOffline, checkIsOffline] = useState(Boolean);

  useEffect(() => {
    window.addEventListener("online", () => {
      checkIsOffline(false);
    });

    window.addEventListener("offline", () => {
      checkIsOffline(true);
    });
  }, [isOffline]);

  useEffect(() => {
    setHasToken(TokenDetails.hasToken());
  }, []);

  return isOffline ? (
    <Offline />
  ) : hasToken ? (
    <main className={`flex flex-col min-h-screen bg-[#eceff0]`}>
      <Navbar hasToken={hasToken} />
      <section className="flex flex-grow size-full">
        <div
          className={`lg:w-1/4 max-h-screen sticky top-0 ${
            hasToken ? "lg:block hidden" : "hidden"
          }`}
        >
          <SideNavbar hasToken={hasToken} />
        </div>
        <div className="flex-grow">{children}</div>
      </section>
      <Footer />
    </main>
  ) : (
    <GetStarted />
  );
}
