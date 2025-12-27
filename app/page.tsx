export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>YouTube Bulk Title Changer</h1>
      <p>Login with Google and update your YouTube titles.</p>

      <a
        href="https://titlechanger-backend.onrender.com/auth/google"
      >
        <button>Sign in with Google</button>
      </a>
    </main>
  );
}

