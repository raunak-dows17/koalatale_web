import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/modules/navbar/navbar";
import SideNavbar from "@/components/modules/sidenavbar/SideNavbar";

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Koalatale",
  description: "Unfold Stories, create connections",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kumbh.className} bg-[#eceff0]`}>{children}</body>
    </html>
  );
}
