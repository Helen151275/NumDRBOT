const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const { message } = require("telegraf/filters");
const text = require("./const");
// Подключаем модуль с функцией
const myFunctions = require("./myfunctions");
const myTexts = require("./Texts");

const bot = new Telegraf(process.env.bot_token);

bot.start(async (ctx) => {
  await ctx.reply(`Привет ${ctx.message.from.first_name}`);
  await ctx.reply(
    `Люди все чаще и чаще осознают, что они занимаются не своим делом. Выгорают. Теряют интерес к жизни. Извечный вопрос - Кто я? Зачем я? Чакральная диагностика может давать такие ответы. `
  );
  await ctx.reply(
    `Я помощник чакрального нумеролога. Я помогу получить вектор, знания, с помощью которых ты сможешь обрести себя, открыть новые горизонты! `
  );
  await ctx.reply(`Введи дату рождения в формате 31.12.1985`);
});

//получаем сообщение с датой рождения
// ...
bot.on("message", async (ctx) => {
  const message = ctx.message.text;
  const sum = myFunctions.сalculateBirthdateSum(message);
  console.log(`Сумма цифр даты рождения ${message}: ${sum}`);

  if (isNaN(sum) || sum < 0 || sum > 9) {
    await ctx.reply(
      "Что-то пошло не так. Пожалуйста, проверьте формат даты рождения. Должно быть так: 05.08.2002"
    );
  } else {
    try {
      await ctx.replyWithHTML(
        "<b>Что ты хочешь узнать?</b>",
        Markup.inlineKeyboard([
          [
            Markup.button.callback("Путь реализации", "btn_type"),
            Markup.button.callback("Потенциал", "btn_chak"),
          ],
        ])
      );

      // После получения fileContent в файле myTexts.readTextFromFile
      const filePath = String(sum) + " типология";
      const fileContent = await myTexts.readTextFromFile(filePath);
      console.log(`New File Content: ${fileContent}`);

      // Устанавливаем новое значение fileContent
      myFunctions.setFileContent(fileContent);

      // Вызываем addActionBot с актуальным fileContent
      await myFunctions.addActionBot(bot, "btn_type", false);
    } catch (e) {
      console.error(e);
    }
  }
});
// ...

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports.mes = message;
