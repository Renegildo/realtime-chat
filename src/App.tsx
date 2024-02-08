import { account } from "./appwriteConfig";
import Room from "./pages/Room";
import { useNavigate } from "react-router-dom";

const App = () => {
	const navigate = useNavigate();

	const verifyIsLogged = async () => {
		try {
			const res = await account.get();
			if (!res) {
				navigate('/sign-up');
				return;
			}
		} catch (error) {
			navigate('/sign-up');
		}
	}

	verifyIsLogged();

	return (
		<>
			<Room />
		</>
	);
}

export default App;