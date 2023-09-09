import express from 'express';
import adminRouter from './routes/admin.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
  }

  private config(): void {
    const acessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');

      this.app.get('/', (req, res) => {
        res.send('Olá, mundo!');
      });

      this.app.use(adminRouter);

      next();
    };

    this.app.use(express.json());
    this.app.use(acessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  }
}

export default App;

export const { app } = new App();
