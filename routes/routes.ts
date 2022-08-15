import { Router } from "express";
import { ArtistAgreementController } from "../controllers/index.js";

const router = Router();

router.post("/artist-agreement", ArtistAgreementController.create);

export default router;
