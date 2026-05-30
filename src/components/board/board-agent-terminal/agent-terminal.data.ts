export type AgentTerminalLine =
	| { type: "user"; text: string }
	| { type: "ai"; text: string; thinking?: boolean }
	| { type: "ai-bullets"; items: readonly string[] };

export interface AgentTerminalSession {
	readonly id: string;
	readonly lines: readonly AgentTerminalLine[];
}

export type AgentTerminalDisplayLine =
	| { type: "user"; text: string }
	| { type: "ai"; text: string; thinking?: boolean }
	| { type: "bullet"; text: string };

export const flattenAgentTerminalSession = (
	session: readonly AgentTerminalLine[]
): AgentTerminalDisplayLine[] => {
	const lines: AgentTerminalDisplayLine[] = [];

	for (const line of session) {
		if (line.type === "ai-bullets") {
			for (const text of line.items) {
				lines.push({ type: "bullet", text });
			}
			continue;
		}

		lines.push(line);
	}

	return lines;
};

export const agentTerminalSessions = [
	{
		id: "calendar",
		lines: [
			{ type: "user", text: "improve calendar widget interaction" },
			{
				type: "ai",
				text: "analyzing component structure...",
				thinking: true,
			},
			{ type: "ai", text: "found unnecessary wrapper divs" },
			{ type: "ai", text: "simplifying hover logic" },
			{
				type: "user",
				text: "keep the paper stack — just tone down the lift",
			},
			{ type: "ai", text: "reducing hover translateY and spring stiffness" },
			{ type: "ai", text: "applying motion spring config" },
			{ type: "ai", text: "testing micro-interactions...", thinking: true },
			{ type: "user", text: "feels good, ship it" },
			{ type: "ai", text: "done ✓" },
			{
				type: "ai-bullets",
				items: [
					"reduced layout shift",
					"improved hover responsiveness",
					"smoother animations",
				],
			},
		],
	},
	{
		id: "github-card",
		lines: [
			{ type: "user", text: "polish github contributions card" },
			{
				type: "ai",
				text: "reading grid density and tooltip timing...",
				thinking: true,
			},
			{ type: "ai", text: "tuning cell hover spring" },
			{ type: "user", text: "tooltip enter feels a touch slow" },
			{ type: "ai", text: "shortening enter delay and easing" },
			{ type: "ai", text: "aligning footer stats with chart rhythm" },
			{ type: "ai", text: "softening radial highlight falloff" },
			{ type: "user", text: "perfect, merge it" },
			{ type: "ai", text: "shipped ✓" },
			{
				type: "ai-bullets",
				items: [
					"crisper hover feedback",
					"cleaner tooltip enter",
					"more consistent glow",
				],
			},
		],
	},
	{
		id: "project-stack",
		lines: [
			{ type: "user", text: "refine project cards stacking on the board" },
			{
				type: "ai",
				text: "mapping z-index and drag constraints...",
				thinking: true,
			},
			{ type: "ai", text: "adjusting shadow layers per depth" },
			{ type: "user", text: "back cards feel too heavy on shadow" },
			{ type: "ai", text: "dialing down blur on depth 2–3" },
			{ type: "ai", text: "syncing lift animation with pan lock" },
			{ type: "ai", text: "tightening overflow bleed on g42", thinking: true },
			{ type: "user", text: "yes — that's the stack I wanted" },
			{ type: "ai", text: "done ✓" },
			{
				type: "ai-bullets",
				items: [
					"clearer depth hierarchy",
					"safer board pan handoff",
					"smoother card pick-up",
				],
			},
		],
	},
] as const satisfies readonly AgentTerminalSession[];

/** Flattened once — used by the reveal loop. */
export const agentTerminalSessionsDisplay = agentTerminalSessions.map(
	(session) => ({
		id: session.id,
		lines: flattenAgentTerminalSession(session.lines),
	})
);
