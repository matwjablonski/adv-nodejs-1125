import { Router, Express } from 'express';
import { uploadHandler, uploadController } from './upload.controller.js';

export function registerRoutes(app: Express) {
  const router = Router();

  router.post('/upload', uploadController, uploadHandler);
  app.use(router);
}
