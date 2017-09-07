const router = require("express").Router();

router.use("/home", require("./landingPage"));
router.use("/search", require("./search"));
router.use("/shopProfile", require("./shopProfile"));
router.use("/shopdashboard", require("./shopDash"));
router.use("/user", require("./user"));
router.use("/userProfile", require("./userProfile"));

module.exports = router;
