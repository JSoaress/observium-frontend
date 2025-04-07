// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const fs = require("node:fs");

const path = "./package.json";

// Função para obter a data atual no formato ISO (yyyy-mm-dd)
const currentDate = new Date().toISOString().split("T")[0];

// Ler o arquivo package.json
fs.readFile(path, "utf8", (err, data) => {
    if (err) {
        console.error("Erro ao ler o arquivo:", err);
        return;
    }

    // Parse o conteúdo do arquivo JSON
    const jsonData = JSON.parse(data);

    // Atualize a data
    jsonData.date = currentDate;

    // Escreva as alterações de volta no package.json
    fs.writeFile(path, JSON.stringify(jsonData, null, 4), "utf8", (err) => {
        if (err) {
            console.error("Erro ao escrever no arquivo:", err);
        } else {
            console.log(`Data atualizada para ${currentDate}`);
        }
    });
});
