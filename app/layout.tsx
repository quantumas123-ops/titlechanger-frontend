import "./globals.css";

export const metadata = {
  title: "YouTube Title Changer",
  description: "Bulk update YouTube video titles",
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
