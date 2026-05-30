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
			"board-slack-message pointer-events-none shrink-0 select-none font-sans",
			className
		)}
		style={{ width: BOARD_SLACK_MESSAGE_WIDTH_PX }}
	>
		<div className="board-slack-message__surface px-3 py-3">
			<div className="flex gap-2">
				<div
					aria-hidden
					className="board-slack-message__avatar flex shrink-0 items-center justify-center rounded-full font-semibold text-[0.72rem] text-white tracking-tight"
					style={{
						height: BOARD_SLACK_MESSAGE_AVATAR_SIZE_PX,
						width: BOARD_SLACK_MESSAGE_AVATAR_SIZE_PX,
					}}
				>
					{slackMessage.senderInitials}
				</div>

				<div className="min-w-0 flex-1 pt-px">
					<div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
						<span className="board-slack-message__sender font-bold text-[0.9375rem] leading-tight">
							{slackMessage.senderName}
						</span>
						<time
							className="board-slack-message__timestamp text-[0.75rem] leading-none"
							dateTime="10:42"
						>
							{slackMessage.timestamp}
						</time>
					</div>
					<p className="board-slack-message__body m-0 mt-0.5 text-[0.875rem] leading-[1.45]">
						{slackMessage.body}
					</p>
				</div>
			</div>
		</div>
	</div>
);
