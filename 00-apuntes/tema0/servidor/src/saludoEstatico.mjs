export const requestListener = function (req, res) {
    let saludo = "";
    for (let i = 0; i < 50; i++) {
        saludo += `<p>${i} - ¡Hola Mundo!</p>`;
    }
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Hola NodeJS</title>
    </head>
    <body>
        <h1>¿No te ha quedado claro el saludo?</h1>
        ${saludo}
    </body>
</html>`);
}