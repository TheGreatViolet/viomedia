import express, { Request, Response } from "express";
import next from "next";
import * as filereader from "../functions/files";
import nodeNotifier from "node-notifier";
import path from "path";
import nextconf from '../next.config';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: nextconf });
const handle = app.getRequestHandler();
const port = 3000;
const ip = require("ip").address();

(async () => {
    try {
        await app.prepare();
        const server = express();

        let mediaOptions: any = filereader.loadSettings();
        server.use('/media', express.static(mediaOptions["media-path"]))

        server.all("*", (req: Request, res: Response) => {
          return handle(req, res);
        });

        server.listen(port, '0.0.0.0', () => {
            console.log(`App listening on ${ip}:${port}`);
        });

        nodeNotifier.notify({
            title: 'Viomedia',
            message: `Server running on ${ip}:${port}`,
            sound: true
        });

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();