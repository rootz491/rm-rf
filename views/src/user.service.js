import decode from "jwt-decode"

export const reset = () => {
    localStorage.setItem('authToken', '')
    localStorage.setItem('refreshToken', '')
}

export const isAuthenticated = () => {
    const authToken = localStorage.getItem("authToken");
    const refreshToken = localStorage.getItem("refreshToken")
    if (!authToken || !refreshToken) return false
    try {
        const { exp } = decode(refreshToken)

        if (exp < new Date().getTime() / 1000) {
            reset();
            return false  
        } 
    } catch (error) {
        return false
    }
    return true
}

export const isAdmin = () => {
    try {
        if (isAuthenticated()) {
            const authToken = localStorage.getItem("authToken");
            const { role } = decode(authToken);
            return (role === 'admin') ? true : false;
        }
        else return false
    } catch (error) {
        return false;
    }
}

export const getBearer = async () => {
    try {
        const authToken = localStorage.getItem("authToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (!authToken || !refreshToken)
            return false;
        const token = decode(authToken)
        if (token.exp < new Date().getTime() / 1000) {
            console.log('going to refresh token')
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