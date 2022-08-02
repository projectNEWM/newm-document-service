import express from "express";
import { ArtistAgreementController } from "./controllers";

const router = express.Router();

router.post("/artist-agreement", ArtistAgreementController.create);

export default router;
