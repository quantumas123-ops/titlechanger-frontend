export default function Home() {
  return (
    <main style={{ padding: 40, maxWidth: 700, margin: "auto" }}>
      <h1>YouTube Bulk Title Changer</h1>

      <p>
        Login with Google and update all your YouTube video titles in one click.
      </p>

      <a
        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}
      >
        <button style={{ padding: "10px 20px", cursor: "pointer" }}>
          Sign in with Google
        </button>
      </a>

      <div style={{ marginTop: 20 }}>
        <a href="/privacy">Privacy Policy</a>{" "}
        <a href="/terms">Terms</a>{" "}
        <a href="/contact">Contact</a>
      </div>
    </main>
  );
}
