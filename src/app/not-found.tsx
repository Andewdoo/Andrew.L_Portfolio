import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-7xl flex-col justify-center px-6">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">404</p>
      <h1 className="mt-5 text-4xl font-semibold text-zinc-50 md:text-6xl">Page not found.</h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit rounded-md border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-600"
      >
        Back home
      </Link>
    </section>
  );
}
