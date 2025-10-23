import fs from "fs";
import http2 from "http2";

const server = http2.createSecureServer(
    {
        key: fs.readFileSync("./keys/server.key"),
        cert: fs.readFileSync("./keys/server.crt"),
    },
    (req, res) => {
        console.log(req.url);

        if (req.url === "/") {
            const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
            res.writeHead(200, { "content-type": "text/html" });
            res.end(htmlFile);
            return;
        }

        // Determinar tipo de contenido
        let contentType = "text/plain";
        if (req.url?.endsWith(".js")) {
            contentType = "application/javascript";
        } else if (req.url?.endsWith(".css")) {
            contentType = "text/css";
        } else if (req.url?.endsWith(".json")) {
            contentType = "application/json";
        }

        try {
            const responseContent = fs.readFileSync(
                `./public${req.url}`,
                "utf-8"
            );
            res.writeHead(200, { "content-type": contentType });
            res.end(responseContent);
        } catch (err) {
            // Si el archivo no existe, devolvemos 404 en lugar de romper el servidor
            res.writeHead(404, { "content-type": "text/plain" });
            res.end("404 Not Found");
        }
    }
);

server.listen(8080, () => {
    console.log("Server running on port 8080");
});
