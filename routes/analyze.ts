import Router from 'express';

import { download, parse } from '../lib/parser';
import { createReport } from '../lib/report';
import { internalError } from '../lib/error';


const router = Router();

router.post('/', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).send({ error: 'Missing url' });
        }
        if (typeof url != 'string') {
            return res.status(400).send({ error: 'Invalid url' });
        }
        
        const stats = parse(await download(url));
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', 'attachment; filename="report.pdf"');
        createReport(res, url, stats);
    }
    catch (ex) {
        return internalError(res, ex);
    }
});

export default router;
