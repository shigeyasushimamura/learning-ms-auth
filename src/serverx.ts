import express from "express";
import winston from "winston";
import expressWinston from "express-winston";
import helmet from "helmet";
import { AuthRouter } from "./interface/routes/authRoutes";
import { AuthController } from "./interface/controllers/authController";
import { AuthApplicationService } from "./application/services/authApplicationService";
import { AuthRepository } from "./infrastructure/repositories/AuthRepository";

const app = express();
export const allowOrigin =
  process.env.ACCESS_CONTROL_ALLOW_ORIGIN ?? "https://localhost:3000";

// ログ例
// {
//     "message": "HTTP GET /users",
//     "level": "info",
//     "meta": {
//       "req": {
//         "url": "/users",
//         "method": "GET",
//         "httpVersion": "1.1",
//         "headers": { "host": "localhost:3000" }
//       },
//       "res": {
//         "statusCode": 200
//       }
//     }
//   }
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()], // 📌 ログの出力先（コンソール）
    format: winston.format.combine(winston.format.json()), // 📌 ログのフォーマット（JSON形式）
    meta: true, // 📌 リクエストの詳細情報をログに含める
    msg: "HTTP {{req.method}} {{req.url}}", // 📌 出力するログのメッセージ
    expressFormat: true, // 📌 Expressのデフォルトフォーマットを適用
    colorize: false, // 📌 ログのカラー出力を無効化
    ignoredRoutes: ["/healthcheck"], // 📌 指定したルートのリクエストをログに記録しない
    ignoreRoute() {
      return false; // 📌 全てのリクエストをログに記録する（`true` にするとログに記録しない）
    },
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Apikey"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH, OPTIONS"
  );
  res.header("Cache-Control", "no-cache");
  next();
});

app.use(helmet());
app.use(express.json());

// リポジトリとサービスの初期化
const authRepository = new AuthRepository();
const authApplicationService = new AuthApplicationService(authRepository);

// コントローラの初期化
const authController = new AuthController(authApplicationService);

// ルータの設定
app.use("/auth", AuthRouter(authController));

// エラーハンドラー

export default app;
