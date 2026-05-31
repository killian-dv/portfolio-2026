import { motion } from "motion/react";
import {
	CALENDAR_CARD_SPRING,
	CALENDAR_WIDGET_SIZE_PX,
} from "#/components/board/calendar/calendar-widget-constants";
import { CalendarWidgetDateHeader } from "#/components/board/calendar/calendar-widget-date-header";
import { CalendarWidgetMeetingBlock } from "#/components/board/calendar/calendar-widget-meeting-block";
import { calendarCardVariants } from "#/components/board/calendar/calendar-widget-motion";
import { CalendarWidgetPaperSheets } from "#/components/board/calendar/calendar-widget-paper-sheets";
import { CalendarWidgetRadialHighlight } from "#/components/board/calendar/calendar-widget-radial-highlight";
import { useCalendarWidgetInteraction } from "#/components/board/calendar/use-calendar-widget-interaction";
import { cn } from "#/lib/utils";

export const BoardCalendarWidgetCard = () => {
	const interaction = useCalendarWidgetInteraction();

	return (
		<motion.div
			animate={interaction.motionState}
			className="relative shrink-0 cursor-default"
			onMouseDown={interaction.stopBoardPan}
			onMouseEnter={interaction.handlePointerEnter}
			onMouseLeave={interaction.handlePointerLeave}
			onMouseMove={interaction.updatePointer}
			ref={interaction.cardRef}
			style={{
				height: CALENDAR_WIDGET_SIZE_PX,
				width: CALENDAR_WIDGET_SIZE_PX,
			}}
			transition={CALENDAR_CARD_SPRING}
			variants={calendarCardVariants}
		>
			<CalendarWidgetPaperSheets
				isHovered={interaction.isHovered}
				prefersReducedMotion={interaction.prefersReducedMotion}
			/>

			<motion.article
				className={cn(
					"absolute inset-0 z-10 flex flex-col overflow-hidden rounded-[22px]",
					"border border-board-widget-border bg-white",
					"shadow-board-calendar-idle"
				)}
				style={{
					boxShadow: interaction.isHovered
						? "var(--board-calendar-shadow-hover)"
						: undefined,
				}}
			>
				<CalendarWidgetRadialHighlight
					glowOpacity={interaction.glowOpacity}
					pointerX={interaction.springX}
					pointerY={interaction.springY}
				/>

				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(ellipse_90%_50%_at_50%_-10%,rgba(0,0,0,0.03),transparent_55%)]"
				/>

				<CalendarWidgetDateHeader
					day={interaction.dateParts.day}
					month={interaction.dateParts.month}
					weekday={interaction.dateParts.weekday}
				/>
				<CalendarWidgetMeetingBlock />
			</motion.article>
		</motion.div>
	);
};
