import decode from "jwt-decode";

export default async () => {
    try {
        const authToken = localStorage.getItem("authToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (!authToken || !refreshToken)
            return false;
        const token = decode(authToken)
        if (token.exp < new Date().getTime() / 1000) {
            // console.log('going to refresh token')
            const res = await fetch("/auth/token", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    token: refreshToken
                })
            });
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem("authToken", data.authToken)
                localStorage.setItem("refreshToken", data.refreshToken)
            }
            else {
                alert('your refresh token is expired, please log in again!');
            }            
        }   
        return `Bearer ${localStorage.getItem("authToken")}`
    } catch (error) {
        console.log(error)
        return false
    }
}