import { Request, Response } from "express";
import { generateEncodedArtistAgreement } from "../utils/index.js";

const ArtistAgreementController = {
  /**
   * Generate and return a base64 encoded PDF
   */
  create: async (req: Request, res: Response) => {
    const { songName, companyName, artistName, stageName } = req.body;

    const encodedPDF = await generateEncodedArtistAgreement({
      songName,
      companyName,
      artistName,
      stageName
    });

    res.json({
      pdf: encodedPDF
    });
  }
};

export default ArtistAgreementController;
