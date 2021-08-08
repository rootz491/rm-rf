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
        if (exp < new Date().getTime() / 1000) return false
    } catch (error) {
        
        return false
    }
    return true
}

export const getBearer = async () => {
    try {
        const authToken = localStorage.getItem("authToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (!authToken || !refreshToken)
            return false;
        const { exp } = decode(authToken)
        if (exp < new Date().getTime() / 1000) {
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
            if (data.success) localStorage.setItem("authToken", data.authToken)
        }
            
        return `bearer ${localStorage.getItem("authToken")}`
    } catch (error) {
        console.log(error)
        return false
    }
}