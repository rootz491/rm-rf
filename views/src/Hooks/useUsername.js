import decode from "jwt-decode";
import useAuth from "./useAuth";

export default () => {
    const auth = useAuth();
    try {
        if (auth) {
            const authToken = localStorage.getItem("authToken");
            const { username } = decode(authToken);
            return username;
        }
        else return "anonymous user"
    } catch (error) {
        return "anonymous user";
    }
}