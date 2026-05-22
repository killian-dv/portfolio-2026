import { CALENDAR_MEETING } from "#/components/board/calendar/calendar-widget-constants";

export const CalendarWidgetMeetingBlock = () => (
	<div className="mx-4 mt-4 flex gap-2">
		<span
			aria-hidden
			className="w-[4px] shrink-0 self-stretch rounded-full bg-[#ff4d8d]"
		/>

		<div className="min-w-0 text-sm">
			<p className="font-semibold text-foreground">{CALENDAR_MEETING.title}</p>
			<p className="mt-0.5 font-medium text-muted-foreground uppercase">
				{CALENDAR_MEETING.timeStart}
				<span className="mx-1">—</span>
				{CALENDAR_MEETING.timeEnd}
			</p>
		</div>
	</div>
);
