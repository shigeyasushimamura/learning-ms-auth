import { Request, Response } from "express";
import { AuthApplicationService } from "../../application/services/authApplicationService";

export class AuthController {
  constructor(
    private readonly authApplicationService: AuthApplicationService
  ) {}

  async getAuthorizeUri(req: Request, res: Response): Promise<void> {
    const clientId = req.query.clientId as string;
    const redirectUri = req.query.redirectUri as string;

    if (!clientId || !redirectUri) {
      res.status(400).send("Missing client_id or redirect_uri");
      return;
    }

    const uri = this.authApplicationService.getAuthorizeUri(
      clientId,
      redirectUri
    );

    res.status(200).send(uri);
  }
}
