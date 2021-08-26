import decode from "jwt-decode";
import useAuth from "./useAuth";

export default () => {
    const auth = useAuth();
    try {
        if (auth) {
            const authToken = localStorage.getItem("authToken");
            const { id } = decode(authToken);
            return id;
        }
        else return false
    } catch (error) {
        return false;
    }
}