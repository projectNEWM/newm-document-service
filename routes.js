import express from "express";

const router = express.Router();

router.post("/artist-agreement", (req, res) => {
  res.json(req.body);
});

export default router;
