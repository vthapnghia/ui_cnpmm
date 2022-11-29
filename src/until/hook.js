import { useSelector } from "react-redux";
import { getJsonObject } from "./common";
import { KEY_STORAGE } from "./global";

const useAuth = () => {
  const { user } = useSelector((state) => state.auth);
  let userAuth = null;
  if (!user) {
    const localUser = getJsonObject(KEY_STORAGE.CP_USER);
    userAuth = localUser || null;
  } else {
    userAuth = userAuth || null;
  }
  return { userAuth };
};

export { useAuth };