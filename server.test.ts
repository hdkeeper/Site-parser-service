import fs from 'fs';
import axios from 'axios';
import { exec } from 'child_process';
import { expect, test } from '@jest/globals';

import { listenPort } from './config';

const url = 'http://ibash.org.ru/';

const api = axios.create({
    baseURL: `http://localhost:${listenPort}`,
    validateStatus: code => code < 500,
});

test('Analyze URL', async () => {
    const res = await api.post('/analyze', { url }, { responseType: 'stream' });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('application/pdf');
    expect(res.headers['content-disposition']).toContain('filename');
    
    const filename = res.headers['content-disposition'].match(/filename="([^"]+)"/)[1];
    res.data.pipe(fs.createWriteStream(filename));
});
