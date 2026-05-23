export const BoardingPassSurface = () => (
	<>
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 bg-linear-to-br from-background via-boarding-pass-surface to-boarding-pass-surface-end"
		/>
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0"
			style={{
				background: [
					"radial-gradient(ellipse 70% 55% at 8% 6%, color-mix(in srgb, var(--emirates-brand) 7%, transparent), transparent 68%)",
					"radial-gradient(ellipse 50% 40% at 96% 94%, color-mix(in srgb, var(--emirates-brand) 5%, transparent), transparent 62%)",
					"radial-gradient(ellipse 90% 50% at 50% -12%, color-mix(in srgb, var(--background) 85%, transparent), transparent 58%)",
				].join(", "),
			}}
		/>
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--background)_95%,transparent),inset_0_-1px_0_0_color-mix(in_srgb,var(--foreground)_6%,transparent)]"
		/>
	</>
);
