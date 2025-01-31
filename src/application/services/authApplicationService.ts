import { Auth } from "../../domain/models/Auth";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class AuthApplicationService {
  constructor(private authRepository: IAuthRepository) {}

  async getAuthorizeUri(
    clientId: string,
    redirectUri: string
  ): Promise<string> {
    const domain = process.env.AUTH_ENDPOINT ?? "dummy_endpoint";

    // 🔹 ここでリポジトリを使って state と nonce を取得
    const state = this.authRepository.generateState();
    const nonce = this.authRepository.generateNonce();

    // 🔹 Auth に state と nonce を渡して URL を生成
    const auth = new Auth(clientId, redirectUri);
    return auth.getAuthRequestUri(domain, state, nonce);
  }
}
