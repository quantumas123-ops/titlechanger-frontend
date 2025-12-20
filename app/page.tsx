export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: 100 }}>
      <h1>TitleChanger</h1>
      <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}>
        <button>Login with Google</button>
      </a>
    </main>
  );
}
