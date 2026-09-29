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
				lines.push({ text, type: "bullet" });
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
			{ text: "improve calendar widget interaction", type: "user" },
			{
				text: "analyzing component structure...",
				thinking: true,
				type: "ai",
			},
			{ text: "found unnecessary wrapper divs", type: "ai" },
			{ text: "simplifying hover logic", type: "ai" },
			{
				text: "keep the paper stack — just tone down the lift",
				type: "user",
			},
			{ text: "reducing hover translateY and spring stiffness", type: "ai" },
			{ text: "applying motion spring config", type: "ai" },
			{ text: "testing micro-interactions...", thinking: true, type: "ai" },
			{ text: "feels good, ship it", type: "user" },
			{ text: "done ✓", type: "ai" },
			{
				items: [
					"reduced layout shift",
					"improved hover responsiveness",
					"smoother animations",
				],
				type: "ai-bullets",
			},
		],
	},
	{
		id: "github-card",
		lines: [
			{ text: "polish github contributions card", type: "user" },
			{
				text: "reading grid density and tooltip timing...",
				thinking: true,
				type: "ai",
			},
			{ text: "tuning cell hover spring", type: "ai" },
			{ text: "tooltip enter feels a touch slow", type: "user" },
			{ text: "shortening enter delay and easing", type: "ai" },
			{ text: "aligning footer stats with chart rhythm", type: "ai" },
			{ text: "softening radial highlight falloff", type: "ai" },
			{ text: "perfect, merge it", type: "user" },
			{ text: "shipped ✓", type: "ai" },
			{
				items: [
					"crisper hover feedback",
					"cleaner tooltip enter",
					"more consistent glow",
				],
				type: "ai-bullets",
			},
		],
	},
	{
		id: "project-stack",
		lines: [
			{ text: "refine project cards stacking on the board", type: "user" },
			{
				text: "mapping z-index and drag constraints...",
				thinking: true,
				type: "ai",
			},
			{ text: "adjusting shadow layers per depth", type: "ai" },
			{ text: "back cards feel too heavy on shadow", type: "user" },
			{ text: "dialing down blur on depth 2–3", type: "ai" },
			{ text: "syncing lift animation with pan lock", type: "ai" },
			{ text: "tightening overflow bleed on g42", thinking: true, type: "ai" },
			{ text: "yes — that's the stack I wanted", type: "user" },
			{ text: "done ✓", type: "ai" },
			{
				items: [
					"clearer depth hierarchy",
					"safer board pan handoff",
					"smoother card pick-up",
				],
				type: "ai-bullets",
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
