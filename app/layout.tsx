import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carpentry Contact Form",
  description: "Send us your carpentry issues.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
