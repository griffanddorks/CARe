const router = require("express").Router();
const controller = require("../controllers/shopProfilePageCtrl");

router.post("/postHistoryEntry", controller.postHistoryEntry);
router.post("/postReviewEntry", controller.postReview);
router.post("/favorite", controller.postFavorite);
router.delete("/favorite", controller.deleteFavorite);
module.exports = router;
