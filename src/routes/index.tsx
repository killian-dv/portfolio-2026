import { createFileRoute } from "@tanstack/react-router";
import { BoardViewport } from "#/components/board/board-viewport";
import { PageWrapper } from "#/components/page-wrapper";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<PageWrapper>
			<BoardViewport />
		</PageWrapper>
	);
}
