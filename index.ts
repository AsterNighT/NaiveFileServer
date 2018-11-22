import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import { extname } from 'path';

const port: number = 12448;
const path: string = `${__dirname}/file`;

const requestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === undefined) return;
    if (!req.method || req.method.toLocaleLowerCase() !== 'get') {
        res.statusCode = 405;
        res.statusMessage = 'Method Not Allowed';
        res.end();
        return;
    }
    const urlInfo = url.parse(req.url);
    if (urlInfo.path === undefined) {
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.end();
        return;
    }
    const urlPath = decodeURI(urlInfo.path);
    const filePath = `${path}${urlPath}`;
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.end();
        return;
    }
    const pathInfo = fs.statSync(filePath);
    res.statusCode = 200;
    res.statusMessage = 'OK';
    console.log(pathInfo);
    console.log(pathInfo.isDirectory());
    if (pathInfo.isDirectory()) {
        res.setHeader('Content-Type', 'text/html');
        const files = fs.readdirSync(filePath, { withFileTypes: true });
        console.log(files);
        const returnHtml = `
        <!DOCTYPE html>
	    <html lang="en">
	        <head>
		        <meta charset="UTF-8">
		        <title>很好看的前端</title>
	        </head>
            <body>
                <h1>前后端分离？没听说过的孩子呢。</h1>
                <h2>当前目录：${urlPath}</h2>
                <ul>
                    <li>
                        <a href="${urlPath.slice(0, urlPath.lastIndexOf('/')) === '' ? '/' : urlPath.slice(0, urlPath.lastIndexOf('/'))}">上级目录</a>
                    </li>
                </ul>
                ${files.map((file) => {
                return `
                    <ul>
                        <li>
                            <a href="${urlPath === '/' ? '' : urlPath}/${file.name}">${file.name}</a>
                        </li>
                    </ul>
                `;
            }).reduce((previous, current) => {
                return `${previous}\n${current}`;
            })}
            </body>
	    </html>
        `;
        res.write(returnHtml);
        res.end();
    } else {
        const extName = extname(filePath);
        console.log(extName);
        let type: string;
        if (extName === null) {
            type = 'application/octet-stream';
        } else {
            switch (extName) {
                case '.htm': type = 'text/html'; break;
                case '.html': type = 'text/html'; break;
                case '.css': type = 'text/css'; break;
                default: type = 'application/octet-stream';
            }
        }
        console.log(type);
        res.setHeader('Content-Type', type);
        res.write(fs.readFileSync(filePath));
        res.end();
    }
};

const server = http.createServer(requestHandler);

server.listen(port, (err: any) => {
    if (err) {
        console.log('Error occurs while starting server:', err);
    } else {
        console.log(`Server is listening on ${port}`);
    }
});
