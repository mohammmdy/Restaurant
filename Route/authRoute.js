const express = require("express");
const passport = require("../utils/google-strategy");
const { googleAuth, signUp, signIn } = require("../servieces/authservice");

const router = express.Router();

router.get(
  "/google-auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/auth",
  passport.authenticate("google", {
    successRedirect: "/restaurant/auth/google-auth-jwt",
    failureRedirect: "/restaurant",
  })
);
router.get("/google-auth-jwt", googleAuth);


router.post("/signUp", signUp);

router.post("/signIn", signIn);




module.exports = router;
