import type { Metadata } from "next";
import QueryProvider from "@/components/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Train Journey",
  description: "What is your destination?",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/app/favicon.ico" />
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
