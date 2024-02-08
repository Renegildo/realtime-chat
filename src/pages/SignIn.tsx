import { account } from "../appwriteConfig";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiWarning } from "react-icons/ci";

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [notValidLogin, setNotValidLogin] = useState(false);

	const submitRef = useRef<HTMLButtonElement>(null);

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (submitRef.current) submitRef.current.innerText = "Carregando...";
			await account.createEmailSession(
				email,
				password,
			);
			navigate("/");
		} catch (error) {
			setNotValidLogin(true);
		}
		if (submitRef.current) submitRef.current.innerText = "Entrar";
	}

	return (
		<main className="h-[100vh] bg-[#1e1e2e] flex items-center justify-center">
			<svg className="absolute top-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#313244" fillOpacity="1" d="M0,192L60,202.7C120,213,240,235,360,208C480,181,600,107,720,74.7C840,43,960,53,1080,80C1200,107,1320,149,1380,170.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
			<form className="flex flex-col gap-5 mx-5 w-full z-10 max-w-[500px]" onSubmit={handleSubmit}>
				<h2 className="text-white font-bold text-xl text-center">Bem vindo de volta!</h2>
				<div>
					<label className="siginLabel">Email: </label> <br />
					<input onChange={(e) => setEmail(e.target.value)} type="email" className="siginInput" maxLength={500} required /> <br />
				</div>
				<div>
					<label className="siginLabel">Senha: </label> <br />
					<input onChange={(e) => setPassword(e.target.value)} type="password" className="siginInput" maxLength={500} required /> <br />
				</div>
				<p
					className={`text-[#f38ba8] flex gap-3 items-center
				${notValidLogin ? "block" : "hidden"}`}><CiWarning /> Um erro ocorreu. Verifique o email e a senha</p>
				<button className="from-[#74c7ec] to-[#89dceb] bg-gradient-to-tr text-[#111] py-3 rounded-lg mt-3 font-bold shadow-lg" type="submit" ref={submitRef}>Entrar</button>
				<Link to="/sign-up" className="text-center text-white underline">Nao tem uma conta?</Link>
			</form>
			<svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#313244" fillOpacity="1" d="M0,192L60,202.7C120,213,240,235,360,208C480,181,600,107,720,74.7C840,43,960,53,1080,80C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
		</main>
	)
}

export default SignIn;