

module.exports = {
    username: localStorage.getItem("username"),
    authToken: `bearer ${localStorage.getItem("authToken")}`,
    refreshToken: localStorage.getItem("refreshToken")
}
