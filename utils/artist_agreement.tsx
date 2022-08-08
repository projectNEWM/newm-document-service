import React, { FunctionComponent } from "react";
import crypto from "crypto";
import fs from "fs";
import ReactPDF, { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { fileToBase64, getCurrentDirectory } from "./file.js";
import { GenerateArtistAgreementProps, TextProps } from "./types.js";
import path from "path";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    fontFamily: "Helvetica",
    fontSize: 12,
    paddingVertical: 72,
    paddingHorizontal: 72
  },
  section: {
    marginBottom: 12
  },
  paragraph: {
    marginBottom: 12
  },
  indented: {
    paddingLeft: 24
  },
  heading: {
    fontFamily: "Helvetica-Bold",
    textAlign: "center"
  },
  bold: {
    fontFamily: "Helvetica-Bold"
  }
});

const Strong: FunctionComponent<TextProps> = ({ children }) => <Text style={styles.bold}>{children}</Text>;

/**
 * @returns a genarated artist PDF agreement as a React component.
 */
const generateArtistAgreement = ({ songName, companyName, artistName, stageName }: GenerateArtistAgreementProps) => {
  const ArtistAgreement = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>NEWM Song Token Purchase and Assignment of Streaming Royalties Agreement</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            This {songName} Song Token Purchase and Assignment of Streaming Royalties Agreement (this “
            <Strong>Agreement</Strong>”) is a legally binding agreement by and between {companyName} (“
            <Strong>Artist Entity</Strong>”), f/s/o {artistName} p/k/a {stageName} (together with Artist Entity, “
            <Strong>Artist</Strong>”) and any purchaser of the Song Token whether it is an initial purchaser or a
            subsequent purchaser (“<Strong>you</Strong>” or “<Strong>Purchaser</Strong>”). Artist and each Purchaser may
            be referred to throughout this Agreement collectively as the “<Strong>Parties</Strong>” or individually as a
            “<Strong>Party</Strong>”.
          </Text>
        </View>

        <Text style={styles.paragraph}>
          <Strong>1. Agreement to terms.</Strong> When purchasing a Song Token, you acknowledge that you have carefully
          read and agree to the terms of this Agreement. for purposes of this agreement, a <Strong>"Song Token"</Strong>{" "}
          means a controllable digital record minted on a blockchain as a Fungible Token (FT) which NFT is linked to the
          Artist's percentage of he Streaming Royalties.
          <Strong>"Streaming Royalties"</Strong> are royalties derived from the licensing or other commercialization of
          the original sound recording embodying the master recording of the song entitled '{songName}' (the
          <Strong>"Recording"</Strong>) on digital service prividers (<Strong>"DSPs"</Strong> (as such term is commonly
          used in the music industry)). The Streaming Royalties do not include any royalties derived from any
          non-digital assets which include but are not limited to ay asset that is physical in nature.
        </Text>

        <Text style={styles.paragraph}>
          This Agreement governs your participation in the transactions on the NEWM Platform as well as any subsequent
          transactions between any Song Token transferors and transferees. NEWM is not a party to any transaction
          between any Artist and/or Purchaser.
        </Text>

        <View style={styles.indented}>
          <Text style={styles.paragraph}>
            (a) Additional Terms: The use of the NEWM Platform and the NEWM Website are subject to the terms and
            conditions set forth on the NEWM Website. These terms and conditions include (i) NEWM Website \Terms &amp;
            Conditions (ii) the NEWM Website Privacy Policy and the (iii) NEWM Platform Risk Disclosure.
          </Text>

          <Text style={styles.paragraph}>
            (b) Changes to the terms of this Agreement. NEWM or Artist may revise the terms of this agreement if there
            is a change of circumstances that could impede NEWM or Artist’s purpose for entering into this agreement.
          </Text>

          <View style={styles.section}>
            <Text>
              <Strong>2. Token Ownership and Royalty Rights.</Strong>
            </Text>
          </View>

          <Text style={styles.paragraph}>
            (a) A Purchaser has a personal property right in each purchased Song Token. A Purchaser of a Song Token does
            not obtain any rights to use or exploit, the intellectual property rights in, among other things, the
            Artist’s sound recording entitled ‘NAME OF SONG’ or Artist’s name or likeness.
          </Text>

          <Text style={styles.paragraph}>
            (b) Purchaser’s rights to the <Strong>Streaming Royalty Share</Strong> (as defined below) will not be
            effective unless and until, in the case of a Purchaser of Song Token(s) in a Primary Transaction (a{" "}
            <Strong>"Primary Purchaser"</Strong>), such Primary Purchaser receives the Song Token in a cryptocurrency
            wallet compatible with Song Token(s) (the<Strong>"Wallet"</Strong>), in compliance with NEWM’s Website
            Terms.
          </Text>

          <Text style={styles.paragraph}>
            (c) The Streaming Royalty Share can be requested in the form of Djed, ADA or NEWM token. The Streaming
            Royalty Share shall be requestable in a reasonable time period after the receipt of Streaming Royalties from
            distributors whereby the distributors will be selected in Artist’s sole discretion. Artist’s obligation to
            distribute Streaming Royalty Shares shall be extinguished once Artist or his representatives has initiated a
            transfer to the Wallet or otherwise has made the Streaming Royalty Share available to the Purchaser.
            Purchaser hereby waives any audit rights against Artist with respect to the accounting of the Streaming
            Royalties and/or Streaming Royalty Shares.
          </Text>

          <Text style={styles.paragraph}>
            (d) Artist represents and warrants that (i) it has all requisite power and authority to grant the rights
            described in this Agreement; (ii) Artist shall not sell, assign or otherwise transfer its percentage of the
            Streaming Royalties such that your Streaming Royalty Share (defined below) would be affected, and any such
            transfer absent your prior written approval shall be void; (iii) no third-party consents are required to
            grant any rights as described in this Agreement; (iv) the Recording does not contain any materials that
            would violate your rights as described herein or the rights of any party.
          </Text>

          <Text style={styles.paragraph}>
            (e) Purchaser represents and warrants that it will not transfer or knowingly permit the transfer of a Song
            Token in any subsequent transaction (whether a Primary Transaction or a Secondary Transaction (as such terms
            are defined herein below)) to a Transferee that is (i) located in a country that is subject to a U.S.
            Government embargo, or that has been designated by the U.S. Government as a terrorist-supporting country; or
            is (ii) listed on any U.S. Government list of prohibited or restricted parties (
            <Strong>"Prohibited Transferees"</Strong>). A <Strong>Secondary Transaction"</Strong> means any transaction
            in which a Song Token is sold by one owner to another owner or is otherwise transferred in any manner that
            is not a Primary Transaction; and <Strong>"Primary Transaction"</Strong> means a transaction facilitated
            through the NEWM Website in which a Song Token is first sold.
          </Text>
        </View>

        <Text style={styles.paragraph}>
          <Strong>3. Rights to Streaming Royalties.</Strong> Subject to the terms of this Agreement, starting on the
          later of (i) RELEVANT DATE or (ii) the date and time that the Song Token is held in your Wallet (as recorded
          on the relevant blockchain), Artist hereby grants to you a non-exclusive right, for so long as the Song Token
          remains in your Wallet, to receive a portion of the Streaming Royalties whereby your portion is defined as the
          number of number of Song Tokens you own divided by the total outstanding Song Tokens (the "
          <Strong>Streaming Royalty Share"</Strong>). For the avoidance of doubt, any of the Streaming Royalty Shares
          requested by you as a result of your purchase of the Song Token shall not accrue and/or account to you until
          after such purchase and transfer of ownership (as recorded on the relevant blockchain) has taken place. You
          will only maintain rights to the Streaming Royalty Share if (i) the Song Token is currently held in your
          Wallet; and (ii) you have maintained compliance with this Agreement. Your rights to the Streaming Royalty
          Share are transferable only in connection with a valid transfer of a Song Token as set forth in this
          Agreement.
        </Text>

        <Text style={styles.paragraph}>
          Any Streaming Royalty Share left unrequested after eighteen (18) months will revert to NEWM, in NEWM’s sole
          discretion. As a condition precedent to receiving the Streaming Royalty Share, you may need to follow any
          Streaming Royalty Share claiming procedures provided on the NEWM Website from time to time.
        </Text>

        <Text style={styles.paragraph}>
          If a Streaming Royalty Share is not requested, the Purchaser is aware that under applicable law, property
          which is presumed abandoned may under certain circumstances escheat to the applicable governmental entity.
          Artist or NEWM shall have no liability to Purchaser, or Purchaser’s respective heirs, legal representatives,
          successors and assigns, or any other party, should any or all of the Streaming Royalty Share escheat by
          operation of law.
        </Text>
      </Page>
    </Document>
  );

  return <ArtistAgreement />;
};

/**
 * @returns a base64 encoded version of a generated artist agreement PDF
 */
export const generateEncodedArtistAgreement = async ({
  songName,
  companyName,
  artistName,
  stageName
}: GenerateArtistAgreementProps) => {
  // generate PDF
  const pdf = generateArtistAgreement({ songName, companyName, artistName, stageName });

  // save PDF as temporary file
  const __dirname = getCurrentDirectory();
  const hash = crypto.randomBytes(20).toString("hex");
  const filename = `artist-agreement-${hash}.pdf`;
  const filePath = path.resolve(__dirname, `../temp/${filename}`);
  await ReactPDF.render(pdf, filePath);

  // get base64 encoded version of file
  const encodedPDF = fileToBase64(filePath);

  // delete temporary file
  fs.unlinkSync(filePath);

  return encodedPDF;
};
