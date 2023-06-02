const { Router } = require("express");
const CandidateController = require("../controller/CandidateController");

const router = Router();

router.get("/candidatos", CandidateController.listAllCandidates);
router.post("/candidatos", CandidateController.insertOrUpdateCandidates)

module.exports = router;
