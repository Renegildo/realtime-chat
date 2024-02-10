import { Models } from "appwrite";
import { createContext } from "react";
import { account } from "./appwriteConfig";

const getUser = async () => {
	return await account.get();
}

export const UserContext = createContext<{ user: Models.User<Models.Preferences> | undefined; setUser: React.Dispatch<React.SetStateAction<Models.User<Models.Preferences> | undefined>>; }>({
	user: await getUser(),
	setUser: () => { },
});
