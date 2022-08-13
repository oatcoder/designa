import * as express from 'express';

import { CardController } from "../controllers/cardController";
import { HoleController } from "../controllers/holeController";
import { PlayerController } from "../controllers/playerController";
import { CourseController } from '../controllers/courseController';

var cardControoler = new CardController();
var holeController = new HoleController();
var playerController = new PlayerController();
var courseController = new CourseController();

var router: express.Router = express.Router();

// cards
router.get("/cards", cardControoler.getCard);
router.put("/cards", cardControoler.putCard);
router.post("/cards", cardControoler.postCard);
router.delete("/cards", cardControoler.deleteCard);

// holes
router.get("/cards/:cardId/holes", holeController.getCardHoles);
router.put("/holes", holeController.putHoles);
router.post("/cards/:cardId/holes", holeController.postHoles);
router.delete("/holes", holeController.deleteHoles);

// players
router.get("/players", playerController.getPlayer);
router.get("/cards/:cardId/players", playerController.getCardPlayers);
router.put("/players", playerController.putPlayer);
router.post("/players", playerController.postPlayer);
router.delete("/players", playerController.deletePlayer);

// course
router.get("/courses", courseController.getCourse);

module.exports = router;