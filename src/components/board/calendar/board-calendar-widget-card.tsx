import { motion } from "motion/react";

import { CALENDAR_WIDGET_SIZE_PX } from "#/components/board/calendar/calendar-widget-constants";
import { CalendarWidgetDateHeader } from "#/components/board/calendar/calendar-widget-date-header";
import { CalendarWidgetMeetingBlock } from "#/components/board/calendar/calendar-widget-meeting-block";
import {
	calendarCardTransition,
	calendarCardVariants,
} from "#/components/board/calendar/calendar-widget-motion";
import { CalendarWidgetPaperSheets } from "#/components/board/calendar/calendar-widget-paper-sheets";
import { CalendarWidgetRadialHighlight } from "#/components/board/calendar/calendar-widget-radial-highlight";
import { useCalendarWidgetInteraction } from "#/components/board/calendar/use-calendar-widget-interaction";
import { cn } from "#/lib/utils";

export const BoardCalendarWidgetCard = () => {
	const interaction = useCalendarWidgetInteraction();

	return (
		<motion.div
			animate={interaction.motionState}
			className="relative shrink-0"
			onMouseDown={interaction.stopBoardPan}
			onMouseEnter={interaction.handlePointerEnter}
			onMouseLeave={interaction.handlePointerLeave}
			onMouseMove={interaction.updatePointer}
			ref={interaction.cardRef}
			style={{
				height: CALENDAR_WIDGET_SIZE_PX,
				width: CALENDAR_WIDGET_SIZE_PX,
			}}
			transition={calendarCardTransition}
			variants={calendarCardVariants}
		>
			<CalendarWidgetPaperSheets
				isHovered={interaction.isHovered}
				prefersReducedMotion={interaction.prefersReducedMotion}
			/>

			<motion.article
				className={cn(
					"absolute inset-0 z-10 flex flex-col overflow-hidden rounded-[22px]",
					"border border-black/[0.06] bg-white",
					"shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset,0_16px_32px_-20px_rgba(0,0,0,0.2)]"
				)}
				style={{
					boxShadow: interaction.isHovered
						? "0 1px 0 0 rgba(255,255,255,0.85) inset, 0 22px 44px -22px rgba(0,0,0,0.16)"
						: "0 1px 0 0 rgba(255,255,255,0.8) inset, 0 16px 32px -20px rgba(0,0,0,0.2)",
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
