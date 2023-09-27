import "./globals.css";

import { Rubik } from "next/font/google";
import { ReactNode } from "react";

const font = Rubik({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      </head>
      <body className={font.className}>{children}</body>
    </html>
  );
}
