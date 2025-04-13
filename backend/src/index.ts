import { config } from 'dotenv';
import express from 'express';
import cors, { type CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';

import routes from './routes/routes';
import { startMongoDB } from './db/mongo.db';

config();

const init = async () => {
  try {
    const app = express();

    const port = process.env.PORT || 6500;

    await startMongoDB();

    const whitelist = [process.env.CLIENT_URL];

    const corsOptions: CorsOptions = {
      origin: (origin, callback) => {
        const isLocalhost =
          process.env.NODE_ENV === 'local' &&
          (origin?.startsWith('http://localhost') ||
            origin?.startsWith('http://127.0.0.1') ||
            !origin);

        if (isLocalhost || (origin && whitelist.includes(origin))) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    };

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors(corsOptions));

    app.use(routes.router);

    app.listen(port, () => {
      console.info(`server started on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

init();
