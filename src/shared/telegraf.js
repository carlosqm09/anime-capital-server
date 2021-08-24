import { Telegraf, Markup, Scenes, session } from 'telegraf';
import { TioanimeScraper } from '@daos/Scrapers/tioanime';
import { File } from 'megajs';

const tioanime = new TioanimeScraper();

const viewAnime = new Scenes.WizardScene(
    'VIEW_ANIME',

    async (ctx) => {
        ctx.reply('Espera un momento...')
        const list = await tioanime.recentEmitted();
        ctx.session.list = [...list];
        const buttons = list.map((anime, index) => {
            const button = {
                text: anime.name,
                callback_data: `ep-${index}`
            };
            bot.action(`ep-${index}`, async (ctx) => {

                ctx.reply('Recuperando video');
                const i = ctx.update.callback_query.data.split('-')[1];
                // ctx.reply(ctx.session.list[i].name)
                const url = await tioanime.download(ctx.session.list[i].url);
                const file = File.fromURL(url);
                file.loadAttributes((err, file) => {
                    const name = file.name

                    file.download((err, data) => {
                        if (err) throw err;

                        const buffer = Buffer.from(data.toString());
                        ctx.replyWithVideo({source: buffer, filename: name});
                    })
                })
            });
            return button;
        });

        ctx.reply('Selecciona uno', Markup.inlineKeyboard(buttons, { columns: 1 }));
        return ctx.scene.leave();
    }
);



const bot = new Telegraf(process.env.BOT_TOKEN);

const stages = new Scenes.Stage([viewAnime]);

bot.use(session(), stages.middleware());

bot.command('iniciar', ctx => ctx.scene.enter('VIEW_ANIME'));

bot.launch();
