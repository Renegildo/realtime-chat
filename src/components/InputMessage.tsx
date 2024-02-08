import { FaPaperPlane } from "react-icons/fa6";

import { COLLECTION_ID_MESSAGES, DATABASE_ID, account, databases } from '../appwriteConfig'
import { ID } from "appwrite";
import { useRef, useState } from "react";

const InputMessage = () => {
	const carlinhosCopypasta = "Eu dou a bunda pra vários homens, chupo um monte de pinto, dou a bunda pros caras, eu vou bater o recorde mundial em dar a bunda. Eu sou um estuprado, eu sou um arrombado, eu dou a bunda para 2050 homens diferentes. Os cavalos comeram minha bunda, eu dei a bunda pros cavalos, os cavalos gozaram dentro da minha bunda. Eu dei a bunda para 2050 homens diferentes, 2050 homens diferentes comeram minha bunda e gozaram dentro. Eu dei a bunda para 2050 homens diferentes. Eu dei a bunda para 15 cavalos diferentes, 15 cavalos diferentes comeram minha bunda e gozaram dentro, 15 cavalos diferentes comeram minha bunda e gozaram dentro. Eu dei a bunda para 15 cavalos diferentes, 15 cavalos diferentes comeram minha bunda e gozaram dentro. Eu sou um arrombado, eu sou o cara mais arrombado do mundo, eu tenho a bunda arrombada de tanto dada, estou com a bunda comida. Eu tenho a bunda violentada, tenho a bunda rasgada, eu tenho a bunda comida por 2050 homens diferentes. Eu dou a bunda no meio da rua, dou a bunda no matagal, eu dou a bunda para vários homens no matagal, no matagal eu dou a bunda para 2050 homens diferentes, eu bati o recorde mundial em dar o CU. Eu sou um estuprado, eu gosto de ser estuprado, eu amo ser estuprado, eu AMO ser estuprado. Eu sou um estuprado, eu tenho a bunda arrombada, eu sou um estuprado. Eu estou oferecendo minha bunda para vários homens. Homens, vêm comer minha bunda, eu estou oferecendo minha bunda para vocês, homens. Homens, comam bastante minha bunda; gozem dentro de mim, homens. Homens, venham gozar dentro de mim, gozem a vontade dentro da minha bunda que eu gosto. Gozem dentro de mim, homens. Homens, venham gozar dentro da minha bunda, encham meu cu de esperma, homens. Homens, tô pedindo para vocês, venham comer minha bunda e gozar dentro. Fiquem à vontade, comam minha bunda e gozem bastante dentro. Homens. Homens comendo minha bunda e gozando dentro(3x). Eu dou a bunda. Eu dou a bunda para 2050 homens diferentes comerem e gozarem dentro. Eu bato recorde mundial em dar a bunda. Eu sou o cara que mais dá a bunda no mundo. Eu bato o recorde mundial em dar a bunda. Eu tenho a bunda comida, eu tenho a bunda deleitada, eu sou um arrombado. Eu dou o cu. Eu dou o cu no matagal. Eu dou o cu para um monte de homens, os homens comem à vontade meu cu e gozam dentro. Esperma dentro do meu cu. Cavalos comendo meu cu e gozando dentro, eu dou a bunda para os cavalos, eu dou a bunda para os cavalos. Os cavalos gozam dentro do meu cu. Os cavalos comem o meu cu e gozam dentro, os cavalos comem o meu cu e gozam dentro. Os homens comem o meu cu e gozam dentro. Eu dou a bunda, eu dou a bunda no meio do matagal, eu dou a bunda no meio do matagal para um monte de homens. Eu gosto de dar a bunda no meio do matagal, eu dou a bunda no meio do matagal para vários homens, eu tiro as calças no meio do matagal e dou a bunda para um monte de homens.";

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