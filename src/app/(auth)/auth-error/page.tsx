export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b-[0.5px] border-black h-16 flex items-center px-6 md:px-12">
        <a href="/" className="text-xl font-black tracking-[-0.05em]">SINTRICS</a>
      </nav>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-sm text-center">
          <p className="text-[11px] font-black uppercase tracking-widest text-secondary mb-4">Auth Error</p>
          <h1 className="text-5xl font-black tracking-[-0.04em] uppercase mb-6">Link expired.</h1>
          <p className="text-sm text-secondary mb-8">
            This sign-in link is invalid or has already been used. Please request a new one.
          </p>
          <a
            href="/login"
            className="inline-block bg-black text-white text-[11px] font-black uppercase tracking-widest px-8 py-4 hover:bg-black/80 transition-colors"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
