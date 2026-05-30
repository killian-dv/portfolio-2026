import { BoardFigmaCursor } from "#/components/board/hero/board-figma-cursor";

import "./board-hero-cursors.css";

type BoardHeroCursorDrift =
	| "drift-1"
	| "drift-2"
	| "drift-3"
	| "drift-4"
	| "drift-5";

interface BoardFigmaCursorConfig {
	color: string;
	drift: BoardHeroCursorDrift;
	name: string;
	positionClassName: string;
}

const boardFigmaCursors: BoardFigmaCursorConfig[] = [
	{
		name: "Lea",
		color: "#18A0FB",
		drift: "drift-1",
		positionClassName:
			"absolute top-[9%] left-full ml-10 translate-y-0.5 md:top-[19%] md:ml-24",
	},
	{
		name: "Hugo",
		color: "#1BC47D",
		drift: "drift-2",
		positionClassName:
			"absolute top-[33%] right-full mr-8 md:top-[7%] md:mr-10 md:-translate-y-1",
	},
	{
		name: "Mila",
		color: "#F49505",
		drift: "drift-3",
		positionClassName:
			"absolute top-[51%] left-full ml-6 md:top-auto md:bottom-[13%] md:ml-12",
	},
	{
		name: "Theo",
		color: "#FF24BD",
		drift: "drift-4",
		positionClassName:
			"absolute right-full bottom-[17%] mr-10 md:top-[44%] md:bottom-auto md:mr-24",
	},
	{
		name: "Ines",
		color: "#6D00F5",
		drift: "drift-5",
		positionClassName:
			"absolute bottom-full left-[36%] mb-6 md:left-[52%] md:mb-11",
	},
];

export const BoardFigmaCursors = () => (
	<>
		{boardFigmaCursors.map((cursor) => (
			<BoardFigmaCursor
				className={cursor.positionClassName}
				color={cursor.color}
				drift={cursor.drift}
				key={cursor.name}
				name={cursor.name}
			/>
		))}
	</>
);
