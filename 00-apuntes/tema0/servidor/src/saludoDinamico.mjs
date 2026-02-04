export const requestListener = function (req, res) {
    const url = new URL(`http://localhost:8080${req.url}`);
    const params = url.searchParams;
    const numParam = params.get("num") || 0;
    const num = parseInt(numParam);
    let saludo = "";
    for (let i = 0; i < num; i++) {
        saludo += `<p>${i} - ¡Hola Mundo!</p>`;
    }
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.writeHead(200);
    res.end(`<!DOCTYPE html>
<html>
    <head><title>Hola NodeJS</title></head>
    <body>
    <h1>¿No te ha quedado claro el saludo?</h1>
    ${saludo}
    </body>
</html>`);
};