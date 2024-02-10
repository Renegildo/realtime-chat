import { useEffect, useState } from 'react';
import client, { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig';
import Message from '../components/Message';
import InputMessage from '../components/InputMessage';
import { Models, Query, RealtimeResponseEvent } from 'appwrite';
import Header from '../components/Header';

const Room = () => {
	const [messages, setMessages] = useState<Models.Document[]>([]);

	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
		getMessages(10);
	}, []);

	const getMessages = async (messagesToGet: number) => {
		const response = await databases.listDocuments(
			DATABASE_ID,
			COLLECTION_ID_MESSAGES,
			[
				Query.orderDesc("$createdAt"),
				Query.limit(messagesToGet),
			],
		);
		setMessages(response.documents);
	}

	const deleteMessage = async (id: string) => {
		const messageToBeDeleted = databases.getDocument(
			DATABASE_ID,
			COLLECTION_ID_MESSAGES,
			id,
		);

		databases.updateDocument(
			DATABASE_ID,
			COLLECTION_ID_MESSAGES,
			id,
			{
				...messageToBeDeleted,
				body: "Mensagem deletada",
				is_deleted: true,
			},
		);
	}

	client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, (res: RealtimeResponseEvent<Models.Document>) => {
		if (res.payload.body === "Mensagem deletada") {
			getMessages(messages.length + 1);
			return;
		}
		setMessages([res.payload, ...messages]);
	});

	return (
		<>
			<Header />
			<main className='bg-[#1e1e2e] min-h-[100vh]'>
				<div className='p-5 mb-14 flex flex-col-reverse h-[100vh] overflow-scroll'>
					{
						messages.map(message => (
							<Message key={message.$id} message={message} onDelete={() => deleteMessage(message.$id)} deleted={message.is_deleted} />
						))
					}
				</div>
				<InputMessage />
			</main>
		</>
	);
}

export default Room;