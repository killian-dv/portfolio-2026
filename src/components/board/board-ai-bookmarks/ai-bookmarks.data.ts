export interface AiBookmarkLayout {
	clipPath: string;
	left: number;
	top: number;
}

export interface AiBookmark {
	id: string;
	layout: AiBookmarkLayout;
	note: string;
	rotation: number;
	title: string;
	url: string;
}

export const aiBookmarks = [
	{
		id: "react-doctor",
		title: "React Doctor",
		url: "https://react.doctor",
		note: "catches issues early",
		rotation: -2.8,
		layout: {
			left: 4,
			top: 10,
			clipPath:
				"polygon(2% 6%, 9% 1%, 17% 5%, 26% 0%, 38% 4%, 48% 1%, 58% 5%, 70% 2%, 82% 6%, 91% 2%, 98% 7%, 100% 16%, 97% 26%, 100% 38%, 96% 48%, 100% 58%, 97% 70%, 100% 80%, 96% 90%, 99% 97%, 90% 100%, 78% 96%, 66% 100%, 54% 97%, 42% 100%, 30% 96%, 18% 100%, 8% 97%, 1% 90%, 3% 78%, 0% 66%, 4% 54%, 0% 42%, 3% 30%, 0% 18%)",
		},
	},
	{
		id: "react-scan",
		title: "React Scan",
		url: "https://react-scan.com",
		note: "performance detective",
		rotation: 3.4,
		layout: {
			left: 158,
			top: 0,
			clipPath:
				"polygon(0% 4%, 7% 0%, 15% 3%, 24% 1%, 34% 5%, 44% 0%, 55% 4%, 65% 1%, 76% 5%, 86% 2%, 95% 6%, 100% 14%, 98% 24%, 100% 34%, 97% 44%, 100% 56%, 98% 66%, 100% 76%, 97% 86%, 100% 96%, 92% 100%, 80% 97%, 68% 100%, 56% 96%, 44% 100%, 32% 97%, 20% 100%, 10% 96%, 2% 92%, 0% 82%, 3% 70%, 0% 58%, 4% 46%, 0% 34%, 3% 22%, 0% 12%)",
		},
	},
	{
		id: "impeccable",
		title: "Impeccable",
		url: "https://impeccable.style",
		note: "instant code reviews",
		rotation: -4.2,
		layout: {
			left: 164,
			top: 138,
			clipPath:
				"polygon(3% 5%, 11% 1%, 20% 4%, 29% 0%, 40% 3%, 51% 0%, 62% 4%, 73% 1%, 84% 5%, 94% 2%, 100% 8%, 98% 18%, 100% 28%, 96% 40%, 100% 50%, 97% 62%, 100% 72%, 96% 84%, 99% 94%, 91% 100%, 79% 96%, 67% 100%, 55% 97%, 43% 100%, 31% 96%, 19% 100%, 9% 96%, 1% 88%, 4% 76%, 0% 64%, 3% 52%, 0% 40%, 4% 28%, 0% 16%)",
		},
	},
	{
		id: "agentation",
		title: "Agentation",
		url: "https://www.agentation.com",
		note: "next level workflows",
		rotation: 2.6,
		layout: {
			left: 312,
			top: 14,
			clipPath:
				"polygon(1% 7%, 8% 2%, 16% 6%, 25% 1%, 36% 5%, 47% 0%, 58% 4%, 69% 1%, 80% 5%, 90% 2%, 99% 8%, 100% 20%, 97% 32%, 100% 44%, 96% 56%, 100% 68%, 97% 80%, 100% 92%, 93% 100%, 81% 96%, 69% 100%, 57% 97%, 45% 100%, 33% 96%, 21% 100%, 11% 96%, 2% 90%, 0% 78%, 3% 66%, 0% 54%, 4% 42%, 0% 30%, 3% 18%)",
		},
	},
	{
		id: "cursor-team-kit",
		title: "Cursor Team Kit",
		url: "https://cursor.com/marketplace/cursor/cursor-team-kit",
		note: "better AI collaboration",
		rotation: 4.8,
		layout: {
			left: 6,
			top: 132,
			clipPath:
				"polygon(2% 4%, 10% 0%, 19% 3%, 28% 1%, 39% 5%, 50% 0%, 61% 4%, 72% 1%, 83% 5%, 93% 2%, 100% 9%, 98% 19%, 100% 31%, 96% 41%, 100% 53%, 97% 63%, 100% 75%, 96% 85%, 99% 95%, 89% 100%, 77% 96%, 65% 100%, 53% 97%, 41% 100%, 29% 96%, 17% 100%, 7% 96%, 0% 88%, 3% 76%, 0% 64%, 4% 52%, 0% 40%, 3% 28%, 0% 14%)",
		},
	},
	{
		id: "emil-design-eng",
		title: "Emile Design Eng",
		url: "https://emilkowal.ski/skill",
		note: "UI gold mine",
		rotation: -3.5,
		layout: {
			left: 318,
			top: 128,
			clipPath:
				"polygon(0% 6%, 6% 1%, 14% 5%, 23% 0%, 33% 4%, 43% 1%, 54% 5%, 64% 0%, 75% 4%, 85% 1%, 94% 6%, 100% 15%, 97% 27%, 100% 39%, 96% 51%, 100% 63%, 97% 75%, 100% 87%, 94% 100%, 82% 96%, 70% 100%, 58% 97%, 46% 100%, 34% 96%, 22% 100%, 12% 96%, 3% 90%, 1% 78%, 4% 66%, 0% 54%, 3% 42%, 0% 30%, 4% 18%)",
		},
	},
] as const satisfies readonly AiBookmark[];
