import { Kumbh_Sans } from "next/font/google";
import "./globals.css";

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Koalatale",
  description: "Unfold Stories, create connections",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kumbh.className}>{children}</body>
    </html>
  );
}
