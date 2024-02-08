import { useState } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Header = () => {
	const [username, setUsername] = useState('');

	const navigate = useNavigate();

	const getUser = async () => {
		const res = await account.get();
		setUsername(res.name);
	}

	getUser();

	const handleLogout = async () => {
		await account.deleteSessions();
		navigate('/sign-in');
	}

	return (
		<header className="fixed bg-[#020617] w-full text-white flex justify-between p-3 z-10">
			<p className="font-bold max-w-64">{username}</p>
			<button onClick={handleLogout}>
				<BiLogOut size={28} color="#f38ba8" />
			</button>
		</header>
	);
}

export default Header;