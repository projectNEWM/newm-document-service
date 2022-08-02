import React from "react";
import crypto from "crypto";
import fs from "fs";
import ReactPDF, { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { fileToBase64 } from "./file.js";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    fontFamily: "Helvetica",
    fontSize: 12,
    paddingVertical: 72,
    paddingHorizontal: 72,
  },
  section: {
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
  },
  heading: {
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
});

const Strong = (children) => <Text style={styles.bold}>{children}</Text>;

/**
 * @returns a genarated artist PDF agreement as a React component.
 */
const generateArtistAgreement = ({ songName, companyName, artistName, stageName }) => {
  const ArtistAgreement = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>NEWM Song Token Purchase and Assignment of Streaming Royalties Agreement</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.paragraph}>
            <Text>
              This {songName} Song Token Purchase and Assignment of Streaming Royalties Agreement (this “
              <Strong>Agreement</Strong>”) is a legally binding agreement by and between
              {companyName} (“<Strong>Artist Entity</Strong>”), f/s/o {artistName} p/k/a {stageName}
              (together with Artist Entity, “<Strong>Artist</Strong>”) and any purchaser of the Song Token whether it is
              an initial purchaser or a subsequent purchaser (“<Text style={styles.bold}>you</Text>” or “
              <Strong>Purchaser</Strong>”). Artist and each Purchaser may be referred to throughout this Agreement
              collectively as the “<Strong>Parties</Strong>” or individually as a “<Strong>Party</Strong>”.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return ArtistAgreement;
};

/**
 * @returns a React PDF component to a base64 string.
 */
export const generateEncodedArtistAgreement = ({ songName, companyName, artistName, stageName }) => {
  // generate PDF
  const pdf = generateArtistAgreement({ songName, companyName, artistName, stageName });

  // save PDF as temporary file and covert to base64
  const hash = crypto.randomBytes(20).toString("hex");
  const filePath = `${__dirname}/temp-artist-agreement-${hash}.pdf`;
  ReactPDF.render(pdf, filePath);
  const encodedPDF = fileToBase64(filePath);

  // delete temporary PDF file
  fs.unlinkSync(filePath);

  return encodedPDF;
};
