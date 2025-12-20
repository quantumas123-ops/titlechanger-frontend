<h1 style={{color: "red"}}>DEPLOY TEST</h1>

import Image from "next/image";


export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
        background: "#fafafa",
        padding: "24px",
      }}
    >
      {/* Logo */}
      <Image
        src="/logo.png"
        alt="YouTube Title Changer"
        width={90}
        height={90}
        priority
      />

      {/* Title */}
      <h1
        style={{
          marginTop: "16px",
          fontSize: "32px",
          fontWeight: 800,
          color: "#111",
          textAlign: "center",
        }}
      >
        YouTube Bulk Title Changer
      </h1>

      {/* Subtitle */}
      <p
        style={{
          marginTop: "12px",
          fontSize: "16px",
          color: "#555",
          maxWidth: "520px",
          textAlign: "center",
        }}
      >
        Login with Google and update your latest YouTube video titles in one
        click. Fast, safe, and compliant with YouTube API rules.
      </p>

      {/* Login Button */}
      <a
        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}
        style={{
          marginTop: "24px",
          padding: "12px 22px",
          background: "#000",
          color: "#fff",
          borderRadius: "6px",
          fontSize: "15px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Sign in with Google
      </a>

      {/* Footer */}
      <footer
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "16px",
          fontSize: "14px",
        }}
      >
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </footer>
    </main>
  );
}
