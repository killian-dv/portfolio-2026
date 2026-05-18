import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "#/components/page-wrapper";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return <PageWrapper>tata</PageWrapper>;
}
