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
			try {
				const res = await account.get()
				setUser(res);
			} catch (err) {
				console.log(err);
				navigate('/sign-up');
			}
		}

		getUser();
	}, [navigate]);

	const verifyIsLogged = async () => {
		try {
			if (!user) {
				navigate('/sign-up');
				return;
			}
		} catch (error) {
			console.log('error fetching user: ' + error);
			navigate('/sign-up');
		}
	}

	verifyIsLogged();

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Room />
		</UserContext.Provider>
	);
}

export default App;