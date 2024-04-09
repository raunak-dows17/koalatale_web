"use client";

import Navbar from "@/components/modules/navbar/navbar";
import SideNavbar from "@/components/modules/sidenavbar/SideNavbar";
import { TokenDetails } from "@/utils/tokendetails/tokeDetails";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [hasToken, setHasToken] = useState(Boolean);

  useEffect(() => {
    setHasToken(TokenDetails.hasToken());
  }, []);

  return (
    <main className={`flex flex-col min-h-screen`}>
      <Navbar hasToken={hasToken} />
      <section className="flex flex-grow size-full">
        <div
          className={`lg:w-1/4 mt-16 ${
            hasToken ? "lg:block hidden" : "hidden"
          }`}
        >
          <SideNavbar hasToken={hasToken} />
        </div>
        <div className="flex-grow p-5 mt-16">{children}</div>
      </section>
    </main>
  );
}
