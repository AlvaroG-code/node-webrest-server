import express, { Router } from "express";
import path from "path";
import { text } from "stream/consumers";

interface Options {
    router: Router;
    port: number;
    public_path?: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly router: Router;

    constructor(options: Options) {
        const { port, router, public_path = "public" } = options;
        this.port = port;
        this.publicPath = public_path;
        this.router = router;
    }

    async start() {
        //Middlewares//

        // Public Folder//
        this.app.use(express.static(this.publicPath));

        // Routes //
        this.app.use(express.static(this.publicPath));

        // fallback SPA
        this.app.use((req, res) => {
            const indexPath = path.join(
                __dirname,
                `../../../${this.publicPath}/index.html`
            );
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on por ${3000}`);
        });
    }
}
