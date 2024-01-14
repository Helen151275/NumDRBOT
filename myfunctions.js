let sum; // объявляем sum глобально
let currentFileContent; // добавляем переменную для хранения текущего значения fileContent

//считаем дату рождения
function сalculateBirthdateSum(birthdate) {
  // Удаляем точки из даты рождения и преобразуем в массив цифр
  const digits = birthdate.replace(/[./]/g, "").split("").map(Number);

  // Суммируем все цифры
  sum = digits.reduce((acc, digit) => acc + digit, 0);

  // Если сумма больше 9, доводим до однозначного числа
  while (sum > 9) {
    sum = sum
      .toString()
      .split("")
      .map(Number)
      .reduce((acc, digit) => acc + digit, 0);
  }

  return sum;
}

// добавляем функцию для обнуления sum
function resetSum() {
  sum = null;
}

// добавляем геттер для sum
function getSum() {
  return sum;
}

// добавляем сеттер для fileContent
function setFileContent(content) {
  currentFileContent = content;
}

// добавляем геттер для fileContent
function getFileContent() {
  return currentFileContent;
}

//кнопки
async function addActionBot(bot, name, src) {
  bot.action(name, async (ctx) => {
    try {
      await ctx.answerCbQuery();
      if (src !== false) {
        await ctx.replyWithPhoto({
          source: src,
        });
      }

      // Получаем fileContent через геттер
      const currentFileContent = getFileContent();

      console.log(`Current File Content: ${currentFileContent}`);
      await ctx.replyWithHTML(currentFileContent, {
        disable_web_page_preview: true,
      });

      // Обнуляем sum после использования
      resetSum();
    } catch (e) {
      console.error(e);
    }
  });
}

//экспорт
module.exports = {
  сalculateBirthdateSum,
  addActionBot,
  resetSum,
  getSum,
  setFileContent,
  getFileContent,
};
