import React, { FunctionComponent } from "react";
import crypto from "crypto";
import fs from "fs";
import ReactPDF, { Page, Text, View, Link, Document, StyleSheet } from "@react-pdf/renderer";
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
  },
  underline: {
    textDecoration: "underline"
  }
});

const Strong: FunctionComponent<TextProps> = ({ children }) => <Text style={styles.bold}>{children}</Text>;
const Underline: FunctionComponent<TextProps> = ({ children }) => <Text style={styles.underline}>{children}</Text>;

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
            (a) <Underline>Additional Terms:</Underline> The use of the NEWM Platform and the NEWM Website are subject
            to the terms and conditions set forth on the NEWM Website. These terms and conditions include (i) NEWM
            Website \Terms &amp; Conditions (ii) the NEWM Website Privacy Policy and the (iii) NEWM Platform Risk
            Disclosure.
          </Text>

          <Text style={styles.paragraph}>
            (b) <Underline>Changes to the terms of this Agreement.</Underline> NEWM or Artist may revise the terms of
            this agreement if there is a change of circumstances that could impede NEWM or Artist's purpose for entering
            into this agreement.
          </Text>

          <View style={styles.section}>
            <Text>
              <Strong>2. Token Ownership and Royalty Rights.</Strong>
            </Text>
          </View>

          <Text style={styles.paragraph}>
            (a) A Purchaser has a personal property right in each purchased Song Token. A Purchaser of a Song Token does
            not obtain any rights to use or exploit, the intellectual property rights in, among other things, the
            Artist's sound recording entitled 'NAME OF SONG' or Artist's name or likeness.
          </Text>

          <Text style={styles.paragraph}>
            (b) Purchaser's rights to the <Strong>Streaming Royalty Share</Strong> (as defined below) will not be
            effective unless and until, in the case of a Purchaser of Song Token(s) in a Primary Transaction (a{" "}
            <Strong>"Primary Purchaser"</Strong>), such Primary Purchaser receives the Song Token in a cryptocurrency
            wallet compatible with Song Token(s) (the<Strong>"Wallet"</Strong>), in compliance with NEWM's Website
            Terms.
          </Text>

          <Text style={styles.paragraph}>
            (c) The Streaming Royalty Share can be requested in the form of Djed, ADA or NEWM token. The Streaming
            Royalty Share shall be requestable in a reasonable time period after the receipt of Streaming Royalties from
            distributors whereby the distributors will be selected in Artist's sole discretion. Artist's obligation to
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
          Any Streaming Royalty Share left unrequested after eighteen (18) months will revert to NEWM, in NEWM's sole
          discretion. As a condition precedent to receiving the Streaming Royalty Share, you may need to follow any
          Streaming Royalty Share claiming procedures provided on the NEWM Website from time to time.
        </Text>

        <Text style={styles.paragraph}>
          If a Streaming Royalty Share is not requested, the Purchaser is aware that under applicable law, property
          which is presumed abandoned may under certain circumstances escheat to the applicable governmental entity.
          Artist or NEWM shall have no liability to Purchaser, or Purchaser's respective heirs, legal representatives,
          successors and assigns, or any other party, should any or all of the Streaming Royalty Share escheat by
          operation of law.
        </Text>

        <Text style={styles.paragraph}>
          <Strong>4. Reservation of Rights.</Strong> All rights in and to the Recording and Streaming Royalties not
          expressly provided for in this Agreement are hereby reserved by Artist. Each Purchaser acknowledges and agrees
          that (a) this Agreement does not convey any rights in the underlying musical composition embodied in the
          Recording, (the so called <Strong>“Publishing Rights”</Strong>) or any other rights, interests, revenues or
          royalties earned from the commercial exploitation of the Recording (specifically including, but not limited
          to, mechanical royalties or monies earned from synchronizations, as such terms are commonly used in the music
          industry) other than the Streaming Royalty Share of the Streaming Royalties, (b) this Agreement consists of
          assignment of a revenue stream only and does not convey any ownership interest or other rights in or to the
          copyright in the Recording or Artist's name or likeness, which is fully reserved and retained by Artist, (c)
          such Purchaser has not received and will not request an advance, loan or other payment from any third party
          that may be derived or otherwise obtained from amounts payable under this Agreement; and (d) this Agreement
          does not convey to any Purchaser any right to use the name, image or likeness of the Artist; provided that
          Purchaser may use Artist's name as necessary to accurately describe the Token in the case of any potential
          Secondary Transaction.
        </Text>

        <Text style={styles.paragraph}>5. Payment and Fees.</Text>

        <View style={styles.indented}>
          <Text style={styles.paragraph}>
            <Strong>(a)</Strong> Purchase and Sale. Purchaser hereby agrees to purchase the Song Token at the published
            price set forth on the NEWM Website (the <Strong>“Purchase Price”</Strong>). Without limiting any other
            clause of this agreement,, the execution of this Agreement and the delivery of the Song Token, is
            conditioned upon the following terms being met: (i) Purchaser’s payment and Artist’s receipt of the payment
            in an amount equal to the Purchase Price, (ii) Purchaser’s providing the Artist, facilitating the NEWM
            Website, of a compatible network Wallet address to which the Purchaser’s Song Token will be delivered; and
            (iii) Purchaser’s successfully completing any applicable anti-money laundering (AML), Know Your Customer
            (KYC), sanctions and other processes as requested by NEWM or Artist in their sole descretion. Failure by
            Purchaser to fulfill any of the conditions required by this Agreement may result in Artist suspending
            delivery of the purchased Song Token or, if such conditions have not been fulfilled within the ten (10)
            calendar days following the receipt of the payment for the Song Token, terminate the transaction.
          </Text>

          <View style={styles.indented}>
            <Text style={styles.paragraph}>
              <Strong>(i.)</Strong> In addition to any other conditions required by this Agreement, a Primary Purchaser
              is responsible for completing all applicable due diligence, including without limitation any Know Your
              Customer (KYC), Anti-Money Laundering (AML), sanctions, or other processes as requested by NEWM and/or
              Artist. If a Purchaser fails to meet any of the applicable conditions above, Artist and/or NEWM may
              suspend the delivery of a Song Token or any Streaming Royalty Share, to such Primary Purchaser.
            </Text>
          </View>

          <Text style={styles.paragraph}>
            <Strong>(b)</Strong> Purchaser Qualification. Purchaser represents and warrants that it (i) is not located
            in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S.
            Government as a terrorist-supporting country; and (ii) is not listed on any U.S. Government list of
            prohibited or restricted parties.
          </Text>

          <Text style={styles.paragraph}>
            <Strong>(c)</Strong> Form of Payment. Artist agrees to accept payment via fiat currency or cryptocurrency as
            denoted on the NEWM Website. Any applicable currency exchange rates that apply shall be set forth on the
            NEWM website either explicitly or implicitly (e.g., by reference to a known published rate table). Artist
            may accept other methods or forms of payment in its sole discretion. The exchange rate for any other forms
            of payment shall be determined solely by the Artist or its assignee or agent in accordance with reasonable
            and accepted market practices and additional transaction fees may apply.
          </Text>

          <Text style={styles.paragraph}>
            <Strong>(d)</Strong> Blockchain Fees. If you buy or sell a Song Token on the NEWM Website or any other
            platform, you agree to pay all applicable fees and authorize Artist to deduct fees (including any
            transaction fees, or Blockchain Fees) directly from Purchaser’s payments. “Blockchain Fees” fund the network
            of computers that run a decentralized blockchain network, meaning that Purchaser will need to pay a
            Blockchain Fee for each transaction that occurs via a decentralized blockchain network. NEWM or Artist has
            no control of any Blockchain Fees. Newm or Artist will have no liability for any claims or damages that may
            arise as a result of any transactions of the Song Tokens.
          </Text>

          <Text style={styles.paragraph}>
            <Strong>(e)</Strong> Transfers: All subsequent transactions of the Song Tokens are subject to the following
            terms and conditions: (i) the Song Token transferee (the <Strong>“Transferee”</Strong>) shall, by
            purchasing, accepting, accessing or otherwise using the Song Token or receiving Streaming Royalty Shares, be
            deemed to accept all of the terms of this Agreement as a “Purchaser” hereof (other than with respect to
            Sections 5(a) and 5(c)); (ii) the Song Token transferor (the <Strong>“Transferor”</Strong>) shall provide
            notice to the Transferee of this Agreement, including a link or other method by which the terms of this
            Agreement can be accessible by the Transferee; and (iii) Artist may be entitled to receive a percentage of
            the amount paid by the Transferee for each Song Token (the <Strong>“Artist Royalty”</Strong>); and (iv) NEWM
            shall be entitled to receive a percentage of the amount paid by the Transferee for each Song Token(the{" "}
            <Strong>“NEWM Royalty”</Strong>) (the Artist Royalty and the NEWM Royalty, collectively, the{" "}
            <Strong>“Royalty Payment”</Strong>). The terms and conditions associated with this Royalty Payment shall be
            set forth in and governed by the NEWM Website Terms of Service. Artist and NEWM shall be paid on the same
            terms and at the same time as Transferor is paid by the Transferee. You acknowledge and agree that the
            amounts payable to Artist and NEWM under this Section herein does not include, and is not intended to cover
            any additional fees, including Gas Fees imposed or required by the transferring platform through which you
            transfer the Song Token.
          </Text>

          <View style={styles.indented}>
            <Text style={styles.paragraph}>
              <Strong>i.</Strong> Purchaser further acknowledges and agrees that all subsequent transactions of the Song
              Token will be effected on the blockchain network governing the Song Token, and Purchaser will be required
              to make or receive payments exclusively through its Wallet.
            </Text>

            <Text style={styles.paragraph}>
              <Strong>ii.</Strong> NEWM or Artist may terminate the Streaming Royalty Share if it has a reasonable basis
              for believing that You have engaged in an off-chain transaction of the Song Token without making the
              applicable Royalty Payment. You, and all subsequent Transferees, shall be responsible for paying the
              Royalty Payment associated with the Secondary Transaction purchase price, regardless of whether such
              purchase price is fulfilled on-chain, off-chain, or in a combination of the foregoing. This cluse shall
              not limit any other termination rights of NEWM or Artist.
            </Text>
          </View>

          <Text style={styles.paragraph}>
            <Strong>6. NEWM’s Rights and Obligations to the Streaming Royalties and Song Tokens.</Strong> NEWM is not
            responsible for servicing, sustaining, supporting, replacing, restoring, or maintaining the website hosting
            the listing and/or display of Song Tokens. NEWM will not be obligated to maintain any connection or link
            between a Song Token and the corresponding Streaming Royalty Share.
          </Text>

          <Text style={styles.paragraph}>
            <Strong>7.</Strong> Warranty Disclaimers and Assumption of Risk. Purchaser represents and warrants that it
            (a) is the age of majority in Purchaser’s place of residence (which is typically 18 years of age in most
            U.S. states) and has the legal capacity to enter into this Agreement, (b) that Purchaser will use and
            interact with the Song Tokens and Streaming Royalties only for lawful purposes and in accordance with this
            Agreement, and (c) that Purchaser will not use the Song Tokens or Streaming Royalties to violate any law,
            regulation or ordinance or any right of Artist, its licensors or any third party, including without
            limitation, any right of privacy, publicity, copyright, trademark, or patent. Purchaser further agrees that
            it will comply with all applicable law.
          </Text>

          <Text style={styles.paragraph}>
            Each Purchaser warrants and represents that neither Royal nor Artist (a) has made any promise or
            representation relating to the subject matter of this Agreement other than as expressly stated in this
            Agreement including, by way of example only with without limitation, any promises or representations about
            the potential commercial success of the Recording or the amount of Streaming Royalties, (b) guarantees that
            any particular amount of Streaming Royalties will be distributed via the Streaming Royalty Share, (c)
            guarantees that Streaming Royalties will be distributed or made available via the Streaming Royalty Share
            with any particular frequency; or (d) guarantees that a market does or will exist for any Secondary
            Transactions. Each Purchaser expressly acknowledges that the Streaming Royalty Share may consist of little
            or no Streaming Royalties, that there may not be a market for any Secondary Transactions, and to the extent
            there is a market for any Secondary Transaction, the Song Token may or may not have any material value in
            that market.
          </Text>

          <Text style={styles.paragraph}>
            THE SONG TOKENS ARE PROVIDED “AS IS,” WITHOUT WARRANTY OF ANY KIND. WITHOUT LIMITING THE FOREGOING, ARTIST
            EXPLICITLY DISCLAIMS ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE (OTHER THAN
            THE SPECIFIC UTILITY AS DESCRIBED HEREIN, NAMELY, THE ATTRIBUTION OF THE STREAMING ROYALTY REVENUE SHARE),
            QUIET ENJOYMENT AND NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.
            ARTIST MAKES NO WARRANTY THAT THE SONG TOKENS WILL MEET PURCHASER’S REQUIREMENTS OR BE AVAILABLE ON AN
            UNINTERRUPTED, SECURE, OR ERROR-FREE BASIS. ARTIST MAKES NO WARRANTY REGARDING THE QUALITY, ACCURACY,
            TIMELINESS, TRUTHFULNESS, COMPLETENESS OR RELIABILITY OF ANY INFORMATION OR CONTENT ON THE SONG TOKENS.
          </Text>

          <Text style={styles.paragraph}>
            NEWM AND ARTIST WILL NOT BE RESPONSIBLE OR LIABLE TO PURCHASER FOR ANY LOSS AND TAKES NO RESPONSIBILITY FOR,
            AND WILL NOT BE LIABLE TO YOU FOR, ANY USE OF THE SONG TOKEN, INCLUDING BUT NOT LIMITED TO ANY LOSSES,
            DAMAGES OR CLAIMS ARISING FROM: (I) USER ERROR SUCH AS FORGOTTEN PASSWORDS, INCORRECTLY CONSTRUCTED
            TRANSACTIONS, OR MISTYPED WALLET ADDRESSES; (II) SERVER FAILURE OR DATA LOSS; (III) CORRUPTED CRYPTOCURRENCY
            WALLET FILES; (IV) UNAUTHORIZED ACCESS TO SONG TOKEN; OR (V) ANY UNAUTHORIZED THIRD PARTY ACTIVITIES,
            INCLUDING WITHOUT LIMITATION THE USE OF VIRUSES, PHISHING, BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST
            BLOCKCHAIN NETWORK UNDERLYING THE SONG TOKENS.
          </Text>

          <Text style={styles.paragraph}>
            THE SONG TOKENS ARE INTANGIBLE DIGITAL ASSETS. THEY EXIST ONLY BY VIRTUE OF THE OWNERSHIP RECORD MAINTAINED
            IN THE APPLICABLE BLOCKCHAIN NETWORK. ANY TRANSFER OF TITLE THAT MIGHT OCCUR IN ANY UNIQUE DIGITAL ASSET
            OCCURS ON THE DECENTRALIZED LEDGER WITHIN SUCH BLOCKCHAIN NETWORK, WHICH ROYAL AND ARTIST DO NOT CONTROL.
            ROYAL AND ARTIST DO NOT GUARANTEE THAT ARTIST OR ANY ARTIST PARTY CAN EFFECT THE TRANSFER OF TITLE OR RIGHT
            IN ANY SONG TOKEN. PURCHASER BEARS FULL RESPONSIBILITY FOR VERIFYING THE IDENTITY, LEGITIMACY, AND
            AUTHENTICITY OF ASSETS PURCHASER PURCHASES THROUGH THE ROYAL WEBSITE. NOTWITHSTANDING INDICATORS AND
            MESSAGES THAT SUGGEST VERIFICATION, ARTIST MAKES NO CLAIMS ABOUT THE IDENTITY, LEGITIMACY, OR AUTHENTICITY
            OF ASSETS ON THE ROYAL WEBSITE OR ANY PURPORTED SUBSEQUENT TRANSACTIONS.
          </Text>

          <Text style={styles.paragraph}>
            NEWM AND ARTIST ARE NOT RESPONSIBLE ANY KIND OF FAILURE, ABNORMAL BEHAVIOR OF SOFTWARE (E.G., WALLET, SMART
            CONTRACT), BLOCKCHAINS OR ANY OTHER FEATURES OF THE SONG TOKENS. ROYAL AND ARTIST IS NOT RESPONSIBLE FOR
            CASUALTIES DUE TO LATE REPORT BY DEVELOPERS OR REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES WITH THE
            BLOCKCHAIN SUPPORTING THE SONG TOKENS, INCLUDING FORKS, TECHNICAL NODE ISSUES OR ANY OTHER ISSUES HAVING
            FUND LOSSES AS A RESULT.
          </Text>

          <Text style={styles.paragraph}>
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES IN CONTRACTS WITH CONSUMERS, SO THE
            ABOVE EXCLUSION MAY NOT APPLY TO YOU.
          </Text>

          <Text style={styles.paragraph}>
            <Strong>8. Links to Third Party Websites or Resources.</Strong> Use and interaction of the Song Tokens and
            Streaming Royalties may allow Purchaser to access third-party websites (including websites that host the
            Streaming Royalties) or other resources. Artist provides access only as a convenience and is not responsible
            for the content, products or services on or available from those resources or links displayed on such
            websites. Purchaser acknowledges sole responsibility for and assumes all risk arising from Purchaser’s use
            of any third-party resources. Under no circumstances shall Purchaser’s inability to view its Streaming
            Royalties on a third-party website serve as grounds for a claim against Royal or Artist.
          </Text>

          <Text style={styles.paragraph}>
            <Strong>9. Termination of License to Streaming Royalties.</Strong> Purchaser’s license to the Streaming
            Royalties shall automatically terminate and all rights shall revert to Artist and NEWM, if and as
            applicable, including all the fees up until the point of breach that were not paid to the Purchaser, if at
            any time: (i) Purchaser breaches any portion of this Agreement or (ii) Purchaser engages in any unlawful
            activity related to the Song Token (including transferring the Song Token to a Prohibited Transferee). Upon
            any termination, discontinuation or cancellation of Purchaser’s license to Streaming Royalties, Artist may
            disable Purchaser’s access to the Streaming Royalties. Upon any termination, discontinuation or cancellation
            of the license in this Agreement, the following Sections will survive: 2, 4 through 14.
          </Text>
          <Text style={styles.paragraph}>
            <Strong>9. Termination of License to Streaming Royalties.</Strong> Purchaser’s license to the Streaming
            Royalties shall automatically terminate and all rights shall revert to Artist and NEWM, if and as
            applicable, including all the fees up until the point of breach that were not paid to the Purchaser, if at
            any time: (i) Purchaser breaches any portion of this Agreement or (ii) Purchaser engages in any unlawful
            activity related to the Song Token (including transferring the Song Token to a Prohibited Transferee). Upon
            any termination, discontinuation or cancellation of Purchaser’s license to Streaming Royalties, Artist may
            disable Purchaser’s access to the Streaming Royalties. Upon any termination, discontinuation or cancellation
            of the license in this Agreement, the following Sections will survive: 2, 4 through 14.
          </Text>

          <Text style={styles.paragraph}>
            <Strong>10. Indemnity.</Strong> Purchaser shall defend, indemnify, and hold the Artist and NEWM harmless
            from and against any and all claims, damages, losses, costs, investigations, liabilities, judgments, fines,
            penalties, settlements, interest, and expenses (including attorneys’ fees) that directly or indirectly arise
            from or are related to any claim, suit, action, demand, or proceeding made or brought by a third party
            (including any person who accesses or transacts using the Song Tokens whether or not such person personally
            purchased the Song Tokens) against any Artist Party, or on account of the investigation, defense, or
            settlement thereof, arising out of or in connection with (a) your access to or use of the Royal Website or
            (b) your breach of this Agreement.
          </Text>

          <Text style={styles.paragraph}>
            <Strong>11. Limitation of Liability.</Strong>
          </Text>

          <View style={styles.indented}>
            <Text style={styles.paragraph}>
              <Strong>(a)</Strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER ARTIST NOR ITS SERVICE PROVIDERS,
              INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE SONG TOKENS, INCLUDING ROYAL, WILL BE LIABLE FOR ANY
              INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST PROFITS, LOST REVENUES, LOST
              SAVINGS, LOST BUSINESS OPPORTUNITY, LOSS OF DATA OR GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE OR
              SYSTEM FAILURE OR THE COST OF SUBSTITUTE SONG TOKENS OF ANY KIND ARISING OUT OF OR IN CONNECTION WITH
              THESE TERMS OR FROM THE USE OF OR INABILITY TO USE OR INTERACT WITH THE SONG TOKENS OR ACCESS THE
              STREAMING ROYALTIES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY
              OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT ARTIST OR ITS SERVICE PROVIDERS HAS BEEN INFORMED OF THE
              POSSIBILITY OF SUCH DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS
              ESSENTIAL PURPOSE.
            </Text>

            <Text style={styles.paragraph}>
              <Strong>(b)</Strong> TO THE MAXIMUM EXTENT PERMITTED BY THE LAW OF THE APPLICABLE JURISDICTION, IN NO
              EVENT WILL ARTIST’S OR ROYAL’S TOTAL LIABILITY ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE USE
              OF OR INABILITY TO USE OR INTERACT WITH THE SONG TOKENS OR ACCESS THE STREAMING ROYALTIES OR ASSIGNED
              SHARE EXCEED THE PURCHASE PRICE.
            </Text>

            <Text style={styles.paragraph}>
              <Strong>(c)</Strong> THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF
              THE BASIS OF THE BARGAIN BETWEEN ARTIST AND PURCHASER.
            </Text>
          </View>

          <Text style={styles.paragraph}>
            <Strong>12. Governing Law and Forum Choice.</Strong> This Agreement and any action related thereto will be
            governed by the Federal Arbitration Act, federal arbitration law, and the laws of the State of Delaware,
            without regard to its conflict of laws provisions. Except as otherwise expressly set forth in Section 13
            “Dispute Resolution,” the exclusive jurisdiction for all Disputes (defined below) that Purchaser and Artist
            are not required to arbitrate will be the state and federal courts located in Delaware, and Purchaser and
            Artist each waive any objection to jurisdiction and venue in such courts.
          </Text>

          <Text style={styles.paragraph}>
            <Strong>13. Dispute Resolution.</Strong>
          </Text>

          <View style={styles.indented}>
            <Text style={styles.paragraph}>
              (a) <Underline>Mandatory Arbitration of Disputes.</Underline> The Parties each agree that any dispute,
              claim or controversy arising out of or relating to these Terms or the breach, termination, enforcement,
              interpretation or validity thereof of the Song Tokens transaction (collectively, “Disputes”) will be
              resolved solely by binding, individual arbitration and not in a class, representative or consolidated
              action or proceeding. You and Artist agree that the U.S. Federal Arbitration Act governs the
              interpretation and enforcement of these Terms, and that you and Artist are each waiving the right to a
              trial by jury or to participate in a class action. This arbitration provision shall survive termination of
              these Terms.
            </Text>

            <Text style={styles.paragraph}>
              (b) <Underline>Exceptions.</Underline> As limited exceptions to Section 13(a) above: (i) both Parties may
              seek to resolve a Dispute in small claims court if it qualifies; and (ii) Artist retains the right to seek
              injunctive or other equitable relief from a court to prevent (or enjoin) the infringement or
              misappropriation of Artist’s intellectual property rights.
            </Text>

            <Text style={styles.paragraph}>
              (c) <Underline>Conducting Arbitration and Arbitration Rules.</Underline> The arbitration will be conducted
              by the American Arbitration Association (“AAA”) under its Consumer Arbitration Rules (the “AAA Rules”)
              then in effect, except as modified by these Terms. The AAA Rules are available at www.adr.org or by
              calling 1-800- 778-7879. A party who wishes to start arbitration must submit a written Demand for
              Arbitration to AAA and give notice to the other party as specified in the AAA Rules. The AAA provides a
              form Demand for Arbitration at www.adr.org.
            </Text>

            <Text style={styles.paragraph}>
              Any arbitration hearings will take place in the county (or parish) where you live, unless we both agree to
              a different location. The Parties agree that the arbitrator shall have exclusive authority to decide all
              issues relating to the interpretation, applicability, enforceability and scope of this arbitration
              agreement.
            </Text>

            <Text style={styles.paragraph}>
              (d) <Underline>Arbitration Costs.</Underline> Payment of all filing, administration and arbitrator fees
              will be governed by the AAA Rules, and Artist won’t seek to recover the administration and arbitrator fees
              Artist is responsible for paying, unless the arbitrator finds your Dispute frivolous. If Artist prevails
              in arbitration Artist will pay for all of its attorneys’ fees and costs and won’t seek to recover them
              from you. If you prevail in arbitration you will be entitled to an award of attorneys’ fees and expenses
              to the extent provided under applicable law.
            </Text>

            <Text style={styles.paragraph}>
              (e) <Underline>Injunctive and Declaratory Relief.</Underline> Except as provided in Section 13(b) above,
              the arbitrator shall determine all issues of liability on the merits of any claim asserted by either party
              and may award declaratory or injunctive relief only in favor of the individual party seeking relief and
              only to the extent necessary to provide relief warranted by that party’s individual claim. To the extent
              that you or Artist prevail on a claim and seek public injunctive relief (that is, injunctive relief that
              has the primary purpose and effect of prohibiting unlawful acts that threaten future injury to the
              public), the entitlement to and extent of such relief must be litigated in a civil court of competent
              jurisdiction and not in arbitration. The parties agree that litigation of any issues of public injunctive
              relief shall be stayed pending the outcome of the merits of any individual claims in arbitration.
            </Text>

            <Text style={styles.paragraph}>
              (f) <Underline>Class Action Waiver.</Underline>{" "}
              <Strong>
                YOU AND ARTIST AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL
                CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
              </Strong>{" "}
              Further, if the parties’ Dispute is resolved through arbitration, the arbitrator may not consolidate
              another person’s claims with your claims, and may not otherwise preside over any form of a representative
              or class proceeding. If this specific provision is found to be unenforceable, then the entirety of this
              Dispute Resolution section shall be null and void.
            </Text>
          </View>

          <Text style={styles.paragraph}>
            <Strong>14. Severability.</Strong> With the exception of any of the provisions in Section 13(f) of this
            Agreement (“Class Action Waiver”), if an arbitrator or court of competent jurisdiction decides that any part
            of this Agreement is invalid or unenforceable, the other parts of the terms of this Agreement will still
            apply.
          </Text>

          <Text style={styles.paragraph}>
            <Strong>15. General Terms.</Strong> This Agreement will transfer and be binding upon and will inure to the
            benefit of the parties and their permitted successors and assigns, in particular any Transferee. This
            Agreement constitutes the entire agreement, and supersedes any and all prior or contemporaneous
            representations, understandings and agreements, between the Parties with respect to the subject matter of
            this Agreement, all of which are hereby merged into this Agreement. Without limitation, the terms of any
            other document, course of dealing, or course of trade will not modify this Agreement, except as expressly
            provided in this Agreement or as the Parties may agree in writing. No amendment to this Agreement or waiver
            of any provision hereof will be valid or binding unless reduced to writing and duly executed by the Party or
            Parties to be bound thereby. Failure to promptly enforce a provision of this Agreement will not be construed
            as a waiver of such provision. Nothing contained in this Agreement will be deemed to create, or be construed
            as creating, a joint venture or partnership between the parties. Neither Party is, by virtue of this
            Agreement or otherwise, authorized as an agent or legal representative of the other Party. Neither Party to
            this Agreement is granted any right or authority to assume or to create any obligation or responsibility,
            express or implied, on behalf or in the name of the other party, or to bind such other Party in any manner.
            Except as set forth in Section 5(e) of this Agreement with regards to Royal, nothing contained in this
            Agreement will be deemed to create any third-party beneficiary right upon any third party whatsoever. Each
            of the Parties acknowledges that it has had the opportunity to have this Agreement reviewed or not by
            independent legal counsel of its choice. If any one or more of the provisions of this Agreement should be
            ruled wholly or partly invalid or unenforceable, then the provisions held invalid or unenforceable will be
            deemed amended, and the court or other government body is authorized to reform the provision(s) to the
            minimum extent necessary to render them valid and enforceable in conformity with the parties’ intent as
            manifested herein. The headings to Sections of this Agreement are for convenience or reference only and do
            not form a part of this Agreement and will not in any way affect its interpretation. Neither Party will be
            afforded or denied preference in the construction of this Agreement, whether by virtue of being the drafter
            or otherwise. For purposes of this Agreement, the words and phrases “include,” “includes”, “including” and
            “such as” are deemed to be followed by the words “without limitation”. Any notices or other communications
            provided by Artist under this Agreement shall be given by contacting the Purchaser at the contact
            information provided on the Royal Website. Purchaser may give notice to Artist by contacting the Artist at
            the contact information provided on the Royal Website. Notice is effective upon receipt. The Parties have
            agreed to contract electronically, and accordingly, electronic signatures will be given the same effect and
            weight as originals.
          </Text>
        </View>
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
