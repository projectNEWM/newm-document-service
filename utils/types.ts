export interface TokenPayload {
  readonly exp: number;
  readonly accessTypes: string[];
  readonly name: string;
  readonly userId: number;
}
