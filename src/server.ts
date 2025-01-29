import app from "./serverx";

const port = process.env.SERVER_PORT ?? 3001;

const server = app.listen(port, () => {
  console.log(`app is listening at PORT:${port}`);
});

const GRACE_MSEC = 30 * 1000;

const gracefulShutdown = () => {
  server.close(() => {
    setTimeout(() => {
      process.exit();
    }, GRACE_MSEC);
  });
};

process.on("SIGTERM", gracefulShutdown);
