const router = require("express").Router();

const mahasiswaController = require("../controllers/mahasiswaController");

router.get("/", mahasiswaController.viewMahasiswa);
router.post("/", mahasiswaController.addMahasiswa);

module.exports = router;
