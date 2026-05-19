import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<main className="mx-auto w-full max-w-3xl px-4 py-12">
			<section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
				<p className="mb-2 font-bold text-neutral-500 text-xs uppercase tracking-widest">
					About
				</p>
				<h1 className="mb-3 font-bold text-4xl sm:text-5xl">
					A small starter with room to grow.
				</h1>
				<p className="m-0 text-base text-neutral-600 leading-8">
					TanStack Start gives you type-safe routing, server functions, and
					modern SSR defaults. Use this as a clean foundation, then layer in
					your own routes, styling, and add-ons.
				</p>
			</section>
		</main>
	);
}
