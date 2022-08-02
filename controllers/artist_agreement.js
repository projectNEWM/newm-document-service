import { generateEncodedArtistAgreement } from "../utils/index.js";

const ArtistAgreementController = {
  create: (req, res) => {
    const { songName, companyName, artistName, stageName } = req.body;

    const encodedPDF = generateEncodedArtistAgreement({
      songName,
      companyName,
      artistName,
      stageName,
    });

    res.json({
      pdf: encodedPDF,
    });
  },
};

export default ArtistAgreementController;
