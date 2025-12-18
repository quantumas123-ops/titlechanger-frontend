"use client";

export default function Home() {
  const loginWithGoogle = () => {
    window.location.href = "https://titlechanger-backend.onrender.com/auth/google";
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          YouTube Bulk Title Changer
        </h1>

        <p className="text-gray-400 max-w-md">
          Login with Google and update all your YouTube video titles in one click.
        </p>

        <button
          onClick={loginWithGoogle}
          className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}

