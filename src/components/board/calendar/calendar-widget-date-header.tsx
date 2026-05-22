import { CALENDAR_ACCENT_RED } from "#/components/board/calendar/calendar-widget-constants";

interface CalendarWidgetDateHeaderProps {
	day: number;
	month: string;
	weekday: string;
}

export const CalendarWidgetDateHeader = ({
	weekday,
	day,
	month,
}: CalendarWidgetDateHeaderProps) => (
	<header className="relative flex flex-col gap-0 px-4 pt-4">
		<p
			className="font-semibold text-[15px] uppercase leading-none tracking-[0.12em]"
			style={{ color: CALENDAR_ACCENT_RED }}
		>
			{weekday}
		</p>
		<p
			aria-hidden
			className="select-none text-[42px] text-foreground leading-[0.9] tracking-tighter"
		>
			{day}
		</p>
		<p className="font-medium text-[13px] text-muted-foreground tracking-[-0.01em]">
			{month}
		</p>
	</header>
);
