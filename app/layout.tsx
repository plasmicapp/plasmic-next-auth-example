import "@/styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "Plasmic Next.js App",
  icons: {
    icon: "/favicon.ico",
  },
};
