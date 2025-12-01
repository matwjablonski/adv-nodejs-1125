import multer from 'multer';
import { Request, Response } from 'express';
import { ProcessFileUseCase } from '../../application/usecases/process-file.usecase.js';
import { InMemoryFileRepository } from '../repo/file-repo.memory.js';
import { WorkerFactory } from '../workers/worker-factory.js';
import { isUploadFileDto } from '../../application/dto/upload-file.dto.js';

const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } });
const repo = new InMemoryFileRepository();
const wf = new WorkerFactory();
const usecase = new ProcessFileUseCase(repo, wf);

export const uploadController = upload.single('file');

export async function uploadHandler(req: Request, res: Response) {
  if (!req.file) return res.status(400).send('No file');

  if (!isUploadFileDto(req.file)) {
    return res.status(400).send('Invalid file upload DTO');
  }

  const result = await usecase.execute({
    fileBuffer: req.file.buffer,
    fileName: req.file.originalname,
  });

  res.json(result);
}

export async function streamFileHandler(req: Request, res: Response) {
  if (!req.file) return res.status(400).send('No file');

  if (!isUploadFileDto(req.file)) {
    return res.status(400).send('Invalid file upload DTO');
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  const worker = wf.create();

  worker.on('message', (data) => {
    if (data.error) {
      console.error('Worker error:', data.error);
      if (!res.headersSent) {
        res.status(500).send('Processing error');
      }
      worker.terminate();
      return;
    }

    if (data.buffer) {
      res.send(data.buffer.toString());
      worker.terminate();
    }
  });

  worker.on('error', (error) => {
    console.error('Worker error:', error);
    if (!res.headersSent) {
      res.status(500).send('Worker error');
    }
    worker.terminate();
  });

  worker.postMessage({ buffer: req.file.buffer });

  req.on('close', () => {
    worker.terminate();
  });
}


//

function wrapperFunction() {
  let storage = [];

  function addToStorage(item: any) {
    storage.push(item);
  }

  function getStorage() {
    return storage;
  }

  return {
    addToStorage,
    getStorage
  }
}

const storageWrapper = wrapperFunction();

storageWrapper.addToStorage('Sample Item');
console.log(storageWrapper.getStorage());