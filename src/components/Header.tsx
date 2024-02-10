import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { UserContext } from "../UserContext";
import { account } from "../appwriteConfig";

const Header = () => {
	const [username, setUsername] = useState<string>('');
	const user = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		const getUser = async () => {
			if (user.user) setUsername(user.user.name);
		}
	
		getUser();
	}, [user.user])

	const handleLogout = async () => {
		await account.deleteSessions();
		navigate('/sign-in');
	}

	return (
		<header className="fixed bg-[#020617] w-full text-white flex justify-between p-3 z-10 top-0">
			<p className="font-bold max-w-64">{username}</p>
			<button onClick={handleLogout}>
				<BiLogOut size={28} color="#f38ba8" />
			</button>
		</header>
	);
}

export default Header;