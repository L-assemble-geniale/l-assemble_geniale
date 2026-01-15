import appDataSource from "./data-source";
import { createApp } from "./app";

appDataSource.initialize().then(() => {
  const app = createApp();

  const port = process.env.PORT;
  app.listen(port, () => console.log(`API is running on port : ${port}`));
}).catch((err) => {
  console.log(`Une erreur s'est produite :`, err);
});
