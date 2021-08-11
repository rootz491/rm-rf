const { apiLogin, apiSignup, apiLogout, apiUpdateToken, apiGetUsers } = require("../Controllers/auth.controller");
const { isAuthenticated, isAuthorized } = require("../Services/verification.service");
const router = require("express").Router();

router.post("/login", apiLogin);
router.post("/signup", apiSignup);
router.post("/logout", apiLogout);
router.post("/token", apiUpdateToken);
router.get("/users", isAuthenticated, isAuthorized, apiGetUsers)

module.exports = router;