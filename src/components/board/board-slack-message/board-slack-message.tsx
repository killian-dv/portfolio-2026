import {
	BOARD_SLACK_MESSAGE_AVATAR_SIZE_PX,
	BOARD_SLACK_MESSAGE_WIDTH_PX,
} from "#/components/board/board-slack-message/board-slack-message-constants";
import { slackMessage } from "#/components/board/board-slack-message/slack-message.data";
import { cn } from "#/lib/utils";

interface BoardSlackMessageProps {
	className?: string;
}

export const BoardSlackMessage = ({ className }: BoardSlackMessageProps) => (
	<div
		aria-hidden
		className={cn(
			"pointer-events-none shrink-0 select-none font-sans drop-shadow-board-slack-message",
			className
		)}
		style={{ width: BOARD_SLACK_MESSAGE_WIDTH_PX }}
	>
		<div className="rounded-lg border border-board-slack-message-border bg-board-slack-message-surface p-3">
			<div className="flex gap-2">
				<div
					aria-hidden
					className="flex shrink-0 items-center justify-center rounded-full bg-board-slack-message-avatar font-semibold text-[0.72rem] text-white tracking-tight"
					style={{
						height: BOARD_SLACK_MESSAGE_AVATAR_SIZE_PX,
						width: BOARD_SLACK_MESSAGE_AVATAR_SIZE_PX,
					}}
				>
					{slackMessage.senderInitials}
				</div>

				<div className="min-w-0 flex-1 pt-px">
					<div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
						<span className="font-bold text-[0.9375rem] text-board-slack-message-foreground leading-tight">
							{slackMessage.senderName}
						</span>
						<time
							className="font-normal text-[0.75rem] text-board-slack-message-muted leading-none"
							dateTime="10:42"
						>
							{slackMessage.timestamp}
						</time>
					</div>
					<p className="m-0 mt-0.5 font-normal text-[0.875rem] text-board-slack-message-foreground leading-[1.45]">
						{slackMessage.body}
					</p>
				</div>
			</div>
		</div>
	</div>
);
