// src/domain/IAuthRepository.ts
export interface IAuthRepository {
  generateState(): string;
  generateNonce(): string;
}
