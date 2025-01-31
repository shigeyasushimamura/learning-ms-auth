export class Auth {
  constructor(private clientId: string, private redirectUri: string) {}

  getAuthRequestUri(domain: string, state: string, nonce: string): string {
    return `${domain}/oauth2/default/v1/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&response_mode=query&scope=openid offline_access profile&state=${state}&nonce=${nonce}`;
  }
}
