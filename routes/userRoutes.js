const express = require("express");
const router = express.Router();
const BirthdayController = require("../controllers/BirthdayController");

router.post("/salvar", BirthdayController.BirthdaySave);

router.get("/api/clients", BirthdayController.BirthdayList);

router.get("/home", BirthdayController.SendHomePage);

router.post("/deletar", BirthdayController.BirthdayDelete);

router.post("/editar", BirthdayController.BirthdayUpdate);

module.exports = router;
