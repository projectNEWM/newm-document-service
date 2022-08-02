import express from "express";
import { ArtistAgreementController } from "./controllers/index.js";

const router = express.Router();

router.post("/artist-agreement", ArtistAgreementController.create);

export default router;
