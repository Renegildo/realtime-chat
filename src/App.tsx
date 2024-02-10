import { useEffect, useState } from "react";
import { account } from "./appwriteConfig";
import Room from "./pages/Room";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";
import { UserContext } from "./UserContext";

const App = () => {
	const [user, setUser] = useState<Models.User<Models.Preferences>>();
	const navigate = useNavigate();

	useEffect(() => {
		const getUser = async () => {
			const res = await account.get()
			setUser(res);
		}

		getUser();
	}, []);

	useEffect(() => {
		const verifyIsLogged = async () => {
			try {
				console.log(user);
				if (!user) {
					navigate('/sign-up');
					return;
				}
			} catch (error) {
				console.log('error fetching user: ' + error);
				navigate('/sign-up');
			}
		}

		if (user !== undefined) verifyIsLogged();
	}, [navigate, user])



	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Room />
		</UserContext.Provider>
	);
}

export default App;