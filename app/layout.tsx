import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
          <header
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "16px 24px",
      borderBottom: "1px solid #eee",
      fontFamily: "Arial, sans-serif"
    }}
  >
    <img
      src="/logo.png"
      alt="YouTube Title Changer"
      style={{ height: 45 }}
    />

    <h1
      style={{
        fontSize: "20px",
        fontWeight: "700",
        color: "#111",
        margin: 0
      }}
    >
      YouTube Title Changer
    </h1>
  </header>

  <main>{children}</main>

        {/* FOOTER – ADSENSE REQUIRED */}
        <footer className="border-t mt-12 py-6 text-center text-sm text-gray-600">
          <Link href="/privacy" className="mx-3 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="mx-3 hover:underline">
            Terms
          </Link>
          <Link href="/contact" className="mx-3 hover:underline">
            Contact
          </Link>
        </footer>
      </body>
    </html>
  );
}
