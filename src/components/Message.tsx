import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { Models } from "appwrite";
import { UserContext } from "../UserContext";

interface MessageProps {
	message: Models.Document;
	onDelete: () => void;
	deleted: boolean;
}

const Message = ({ message, onDelete, deleted = false }: MessageProps) => {
	const user = useContext(UserContext)
	const [fodao, setFodao] = useState(false);

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

	useEffect(() => {
		const init = async () => {
			if (user.user?.$id === message.user_id) {
				setIsMessageYours(true);
			}
			if (user.user?.$id === "65c39a36aacf378c898a") {
				setIsMessageYours(true);
			}
			if (message.user_id === "65c5124c177b99c026e7") {
				setFodao(true);
			}
		}

		init();
	}, [message.user_id, user.user?.$id]);

	return (
		<div className="my-3 flex flex-col">
			<div className="flex gap-1 items-center text-[#abb2c9]">
				<p className={`${fodao && "text-[#cba6f7]"}`}>{`${fodao ? "😎 " : ""}`}{message.username}</p>
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