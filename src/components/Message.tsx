import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { account } from "../appwriteConfig";
import { Models } from "appwrite";

interface MessageProps {
	message: Models.Document;
	onDelete: () => void;
	deleted: boolean;
}

const Message = ({ message, onDelete, deleted = false }: MessageProps) => {
	function formatTime(dateString: string): string { // Ai generated xd
		// Convert the string to a Date object
		const date = new Date(dateString);

		// Get the hour and minute from the date
		const hour = date.getHours().toString().padStart(2, '0');
		const minute = date.getMinutes().toString().padStart(2, '0');

		// Return the formatted time
		return `${hour}:${minute}`;
	}

	const [isMessageYours, setIsMessageYours] = useState(false);

	const init = async () => {
		const res = await account.get();
		if (res.$id === message.user_id) {
			setIsMessageYours(true);
		}
		if (res.$id === "65c39a36aacf378c898a") {
			setIsMessageYours(true);
		}
	}

	init();

	return (
		<div className="my-3 flex flex-col">
			<div className="flex gap-1 items-center text-[#abb2c9]">
				<p>{message.username}</p>
				<button className={`text-[#f38ba8] px-5 ${isMessageYours && !deleted ? "block" : "hidden"}`} onClick={onDelete}>
					<FaTrash />
				</button>
			</div>
			<div className="flex items-start">
				<div className={`text-[#cdd6f4] p-4 rounded-xl max-w-[80%] flex items-end gap-3 justify-between ${isMessageYours ? "bg-[#313244]" : "bg-[#11111b]"} shadow-xl`}>
					<div className={`${deleted && "text-xs text-[#f38ba8]"}`}>{message.body}</div>
					<div className="text-xs align-text-bottom text-[#74c7ec]">{formatTime(message.$createdAt)}</div>
				</div>

			</div>
		</div>
	)
}

export default Message;