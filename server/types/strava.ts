export interface ITokenResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
}

export interface IStravaUser {
  id: number;
  username: string;
  firtname: string;
  lastname: string;
  fullName: string;
}
