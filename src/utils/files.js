const fs = require('fs');
const path = require('path');

async function clearDirectory(dir) {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
            fs.unlinkSync(path.join(dir, file));
        });
    } else {
        fs.mkdirSync(dir, { recursive: true });
    }
}

async function saveResponseToFileDetailed(responseData, fileName, diretorio) {
    const now = new Date();
    const options = { timeZone: 'America/Sao_Paulo' };
    const localDate = new Date(now.toLocaleString('en-US', options));
    const formattedDate = `${String(localDate.getDate()).padStart(2, '0')}${String(localDate.getMonth() + 1).padStart(2, '0')}${localDate.getFullYear()}_${String(localDate.getHours()).padStart(2, '0')}${String(localDate.getMinutes()).padStart(2, '0')}`;
    const fullPath = path.join(diretorio, `${fileName}_${formattedDate}.json`);

    if (!fs.existsSync(diretorio)) {
        fs.mkdirSync(diretorio, { recursive: true });
    }
    fs.writeFileSync(fullPath, JSON.stringify(responseData, null, 2), 'utf-8');
}

async function saveResponseToFile(responseData, folderPath) {
    const filePath = path.join(process.cwd(), 'logs', folderPath);
    const pathParts = folderPath.split('/');

    let method = "UNKNOWN", resource = "resource", status = "status";
    const httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    for (const part of pathParts) {
        if (httpMethods.includes(part)) { method = part; break; }
    }
    for (let i = pathParts.length - 1; i >= 0; i--) {
        if (/^\d+$/.test(pathParts[i])) { status = pathParts[i]; break; }
    }
    const statusIndex = pathParts.indexOf(status);
    resource = statusIndex > 0 ? pathParts[statusIndex - 1] : (pathParts[pathParts.length - 2] || "resource");

    const fileName = `${resource}_${method}_${status}`;
    await clearDirectory(filePath);
    await saveResponseToFileDetailed(responseData, fileName, filePath);
}

function loadJsonFixture(relativePath) {
    const jsonFilePath = path.join(__dirname, '../..', relativePath);
    return JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
}

function loadExpectedData(folderPath, filename) {
    if (!filename) throw new Error('O parâmetro filename é obrigatório para loadExpectedData');
    const jsonPath = path.join(process.cwd(), 'resources/fixtures', folderPath, filename);
    return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

module.exports = { clearDirectory, saveResponseToFileDetailed, saveResponseToFile, loadJsonFixture, loadExpectedData };
