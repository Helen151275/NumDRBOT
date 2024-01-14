//текстовый файл
const fs = require("fs");

function readTextFromFile(filePath) {
  try {
    //console.log(filePath);
    const pfilePath = "./texts/" + filePath + ".txt";
    // Считываем содержимое файла синхронно
    const text = fs.readFileSync(pfilePath, "utf-8");
    return text;
  } catch (error) {
    console.error(`Ошибка при чтении файла: ${error.message}`);
    return null;
  }
}

//
module.exports = { readTextFromFile };
