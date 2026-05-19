import { BoardGrid } from "#/components/board/board-grid";
import { BOARD_HEIGHT_PX, BOARD_WIDTH_PX } from "#/lib/board-grid-config";

export const BoardCanvas = () => (
	<div className="relative h-full w-full scale-[82%] md:scale-100">
		<div
			className="absolute top-0 left-0 bg-grid-pattern"
			style={{
				width: BOARD_WIDTH_PX,
				height: BOARD_HEIGHT_PX,
				left: "50%",
				top: "50%",
				marginLeft: -BOARD_WIDTH_PX / 2,
				marginTop: -BOARD_HEIGHT_PX / 2,
			}}
		>
			<div className="relative flex h-full w-full items-center justify-center">
				<BoardGrid />
			</div>
		</div>
	</div>
);
