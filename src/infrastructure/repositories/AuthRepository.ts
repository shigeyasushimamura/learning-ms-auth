import crypto from "crypto";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
export class AuthRepository implements IAuthRepository {
  generateState(): string {
    return crypto.randomBytes(8).toString("hex");
  }

  generateNonce(): string {
    return crypto.randomBytes(8).toString("hex");
  }
}
