interface GithubContributionsFooterProps {
	isLoading: boolean;
	trailingYearTotal: number;
}

const formatContributions = (count: number) =>
	new Intl.NumberFormat("en-US").format(count);

export const GithubContributionsFooter = ({
	isLoading,
	trailingYearTotal,
}: GithubContributionsFooterProps) => (
	<footer className="relative z-10">
		<p className="m-0 font-normal text-[#6b7470] text-[12px] tracking-[-0.01em]">
			{isLoading ? (
				<span className="inline-block h-3.5 w-48 animate-pulse rounded bg-[#e8ecea]" />
			) : (
				<>
					<span className="text-[#3d4843] tabular-nums">
						{formatContributions(trailingYearTotal)}
					</span>{" "}
					contributions over the past year
				</>
			)}
		</p>
	</footer>
);
