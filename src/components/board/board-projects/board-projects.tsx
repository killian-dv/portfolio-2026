import { type MouseEvent, useCallback } from "react";

import { BoardHandwrittenLabel } from "#/components/board/board-handwritten-label";
import { BoardProjectCard } from "#/components/board/board-projects/board-project-card";
import { PROJECTS } from "#/components/board/board-projects/projects.data";
import { cn } from "#/lib/utils";

interface BoardProjectsProps {
	className?: string;
}

export const BoardProjects = ({ className }: BoardProjectsProps) => {
	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	return (
		<section
			aria-label="Board projects"
			className={cn(
				"pointer-events-auto flex w-max max-w-none flex-col gap-4 overflow-visible p-6",
				className
			)}
		>
			<BoardHandwrittenLabel
				as="h2"
				className="shrink-0 text-[2.5rem]"
				style={{ transform: "rotate(-2.6deg)" }}
			>
				Projects
			</BoardHandwrittenLabel>

			<ul className="m-0 grid w-max list-none grid-cols-[repeat(2,max-content)] gap-x-6 gap-y-6 p-0">
				{PROJECTS.map((project) => (
					<li className="m-0 w-max p-0" key={project.id}>
						<BoardProjectCard onMouseDown={stopBoardPan} project={project} />
					</li>
				))}
			</ul>
		</section>
	);
};
