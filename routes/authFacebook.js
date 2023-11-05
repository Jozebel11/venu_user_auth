const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const authController = require("../controllers/auth");

router.get("/auth/facebook", authController.postLogin);
router.get('/auth/facebook/callback', authController.postLoginCb);
router.get("/logout", authController.logout);

module.exports = router;
