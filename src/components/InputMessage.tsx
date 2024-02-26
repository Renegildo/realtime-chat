import { FaPaperPlane } from "react-icons/fa6";

import { COLLECTION_ID_MESSAGES, DATABASE_ID, account, databases } from '../appwriteConfig'
import { ID } from "appwrite";
import { useRef, useState } from "react";

import { carlinhosCopypasta } from "../utils";

const InputMessage = () => {
	const [messageBody, setMessageBody] = useState("");
	const messageInput = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (messageInput.current) messageInput.current.value = "";

		const user = await account.get();

		if (messageBody === "") return;
		databases.createDocument(
			DATABASE_ID,
			COLLECTION_ID_MESSAGES,
			ID.unique(),
			{
				body: (messageBody !== "carlinhos") ? messageBody : carlinhosCopypasta,
				user_id: user.$id,
				username: user.name,
			},
		);
		setMessageBody("");
	}

	return (
		<div className='fixed bottom-0 py-2 px-3 bg-slate-950 w-full'>
			<form className='flex justify-between' onSubmit={(e) => handleSubmit(e)}>
				<textarea className='bg-slate-900 rounded-md text-[#cdd6f4] w-full mr-10 p-2 resize-none focus:outline-none' onChange={(e) => setMessageBody(e.target.value)} ref={messageInput} placeholder="Sua mensagem aqui..." />
				<button type="submit" className='text-[#74c7ec]'><FaPaperPlane /></button>
			</form>
		</div>
	);
}

export default InputMessage;