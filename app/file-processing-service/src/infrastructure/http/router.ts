import { Router, Express } from 'express';
import { uploadHandler, uploadController, streamFileHandler } from './upload.controller.js';

export function registerRoutes(app: Express) {
  const router = Router();

  router.post('/upload', uploadController, uploadHandler);

  router.post('/stream-file', uploadController, streamFileHandler);

  app.use(router);
}
