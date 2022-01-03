import express from 'express';
import config from 'config';
import connectDB from './utils/connectDB';
import cors from 'cors'
import log from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import requestLogger from './middleware/requestLogger';

const port = config.get<number>('port');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.use(requestLogger);

app.use(cors({credentials: true, origin: ["http://localhost:8080", "http://localhost:8081"]}));

app.listen(port, () => {
  log.info(`Listening on port ${port}`);
  routes(app);
});
