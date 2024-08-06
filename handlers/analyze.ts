import Router from 'express';

import { download, parse } from '../lib/parser';
import { createReport } from '../lib/report';
import { urlError } from '../lib/error';


const router = Router();

router.post('/', async (req, res) => {
    const { url } = req.body;
    if (typeof url !== 'string' || !/^https?:\/\//.test(url)) {
        return urlError(res);
    }

    const stats = parse(await download(url));
    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', 'attachment; filename="report.pdf"');
    createReport(url, stats).pipe(res);
});

export default router;
