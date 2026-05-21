interface StockChartReferenceLineProps {
	chartWidth: number;
	referenceY: number;
}

export const StockChartReferenceLine = ({
	chartWidth,
	referenceY,
}: StockChartReferenceLineProps) => (
	<line
		stroke="rgba(255,255,255,0.22)"
		strokeDasharray="4 6"
		strokeLinecap="round"
		strokeWidth={1}
		x1={0}
		x2={chartWidth}
		y1={referenceY}
		y2={referenceY}
	/>
);
