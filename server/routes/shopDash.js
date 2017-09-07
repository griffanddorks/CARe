const router = require("express").Router();
const controller = require("../controllers/shopDashCtrl");

router.get("/getShopId", controller.getShopId);
router.get("/getCalendar", controller.getCalendar);
router.post("/createCalendar", controller.createCalendar);
router.delete("/deleteCalendar", controller.deleteCalendar);

module.exports = router;
