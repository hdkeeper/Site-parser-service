import { Response } from 'express';

export function notFound(res: Response) {
    res.status(404).send({ error: 'Not found' });
}

export function urlError(res: Response) {
    res.status(400).send({ error: 'Invalid url' });
};

export function internalError(res: Response, error: unknown) {
    console.error(error);
    res.status(500).send({ error: 'Internal error' });
};
