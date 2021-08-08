const { apiLogin, apiSignup, apiLogout, apiUpdateToken } = require("../Controllers/auth.controller");
const router = require("express").Router();

router.post("/login", apiLogin);
router.post("/signup", apiSignup);
router.post("/logout", apiLogout);
router.post("/token", apiUpdateToken);

module.exports = router;