const { apiLogin, apiSignup, apiLogout, apiUpdateToken } = require("../Controllers/auth.controller");
const { isAuthenticated } = require("../Services/verification.service");
const router = require("express").Router();

router.post("/login", apiLogin);
router.post("/signup", apiSignup);
router.post("/logout", isAuthenticated, apiLogout);
router.post("/token", isAuthenticated, apiUpdateToken);

module.exports = router;