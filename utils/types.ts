import { ReactNode } from "react";

export interface TokenPayload {
  readonly exp: number;
  readonly name: string;
  readonly userId: number;
}

export interface TextProps {
  readonly children: ReactNode;
}

export interface GenerateArtistAgreementProps {
  readonly songName: string;
  readonly companyName: string;
  readonly artistName: string;
  readonly stageName: string;
}
