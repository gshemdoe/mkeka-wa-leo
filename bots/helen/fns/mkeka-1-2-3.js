const tg_slips = require('../database/tg_slips')
const mkekaMega = require('../database/mkeka-mega')
const waombajiModel = require('../database/waombaji')

const sendMkeka1 = async (ctx, delay, bot, imp) => {
    try {
        let td = new Date().toLocaleDateString('en-GB', { timeZone: 'Africa/Nairobi' })
        let tzHrs = new Date().getUTCHours() + 3
        if(tzHrs > 23) {tzHrs = tzHrs - 24}
        let mk = await tg_slips.findOne({ siku: td, brand: 'gsb' })
        await waombajiModel.findOneAndUpdate({ pid: 'shemdoe' }, { $inc: { mk1: 1 } })
        console.log(tzHrs)
        if (mk && (tzHrs >= 0 && tzHrs < 22)) {
            await ctx.sendChatAction('upload_photo')
            await delay(500)
            await bot.telegram.copyMessage(ctx.chat.id, imp.mikekaDB, mk.mid)
        } else if (mk && (tzHrs >= 22)) {
            await ctx.sendChatAction('typing')
            await delay(1000)
            await ctx.reply('Mikeka ya leo tayari tumeweka na kwa leo tumefunga hesabu. \n\nTafadhali rudi tena hapa baadae kupata mikeka ya kesho.')
        }
        else {
            await ctx.sendChatAction('typing')
            await delay(1000)
            await ctx.reply('Mkeka namba 1 bado haujaandaliwa, jaribu mkeka namba 3 /mkeka3')
        }
    } catch (error) {
        console.log(error.message, error)
    }
}

const sendMkeka2 = async (ctx, delay, bot, imp) => {
    try {
        let td = new Date().toLocaleDateString('en-GB', { timeZone: 'Africa/Nairobi' })
        let tzHrs = new Date().getUTCHours() + 3
        if(tzHrs > 23) {tzHrs = tzHrs - 24}
        let mk = await tg_slips.findOne({ siku: td, brand: 'betway' })
        await waombajiModel.findOneAndUpdate({ pid: 'shemdoe' }, { $inc: { mk2: 1 } })
        if (mk && (tzHrs >= 0 && tzHrs < 22)) {
            await ctx.sendChatAction('upload_photo')
            await delay(500)
            await bot.telegram.copyMessage(ctx.chat.id, imp.mikekaDB, mk.mid)
        } else if (mk && (tzHrs >= 22)) {
            await ctx.sendChatAction('typing')
            await delay(1000)
            await ctx.reply('Mikeka ya leo tayari tumeweka na kwa leo tumefunga hesabu. Tafadhali rudi tena hapa baadae kupata mikeka ya kesho.')
        } else {
            await ctx.sendChatAction('typing')
            await delay(1000)
            await ctx.reply('Mkeka namba 2 bado haujaandaliwa, jaribu:\n\n▷ Mkeka namba 1 👉 /mkeka1\n\n▷ Mkeka namba 3 👉 /mkeka3')
        }
    } catch (error) {
        console.log(error.message, error)
    }
}

const sendMkeka3 = async (ctx, delay, bot, imp) => {
    try {
        await ctx.sendChatAction('typing')
        await delay(1000)
        let nairobi = new Date().toLocaleDateString('en-GB', { timeZone: 'Africa/Nairobi' })
        let tzHrs = new Date().getUTCHours() + 3
        if(tzHrs > 23) {tzHrs = tzHrs - 24}
        let keka = await mkekaMega.find({ date: nairobi })
        await waombajiModel.findOneAndUpdate({ pid: 'shemdoe' }, { $inc: { mk3: 1 } })
        let txt = `<b><u>🔥 Mkeka wa Leo [ ${nairobi} ]</u></b>\n\n\n`
        let odds = 1
        if (keka.length > 0 && (tzHrs >= 0 && tzHrs < 22)) {
            for (let m of keka) {
                txt = txt + `<u><i>${m.date},  ${m.time}</i></u>\n⚽️ ${m.match}\n<b>✅ ${m.bet}</b>\n<i>💰 Odds: ${m.odds}</i> \n\n\n`
                odds = (odds * m.odds).toFixed(2)
            }

            let bwTZ = `http://mkekawaleo.com/betway-tz/register`
            let gsb = 'http://mkekawaleo.com/gsb-tz/register'
            let pm = `http://pmaff.com/?serial=61291818&creative_id=1788`
            let ke = `http://bet-link.top/22bet/register`
            let ug = `http://bet-link.top/22bet/register`
            let prm = `http://mkekawaleo.com/premierbet/register`
            let tz_888 = `http://mkekawaleo.com/888bet/register`

            let finaText = txt + `<b>🔥 Total Odds: ${odds.toLocaleString('en-US')}</b>\n\n▬▬▬▬▬▬▬▬▬▬▬▬\n\nMkeka huu umeandaliwa <b><a href="${bwTZ}">BetWay</a></b>\n\n<i>» Jisajili na upokee Tsh. 3,000 bure pamoja na bonus ya 150% kwa deposit ya kwanza</i> \n\n\n<b>✓ Jisajili Sasa</b> \n\n<b>👤 (Tanzania 🇹🇿)</b>\n<b><a href="${bwTZ}">https://betway.co.tz/register\nhttps://betway.co.tz/register</a></b>\n\n<b>👤 (Kenya 🇰🇪)</b>\n<b><a href="${ke}">https://22bet.co.ke/register</a></b>\n\n<b>👤 (Uganda 🇺🇬)</b>\n<b><a href="${ug}">https://22bet.co.ug/register</a></b>\n\n\n©MkekaWaLeo`

            await ctx.reply(finaText, { parse_mode: 'HTML', disable_web_page_preview: true })
        } else if (keka.length > 0 && (tzHrs >= 22)) {
            await ctx.sendChatAction('typing')
            await delay(1000)
            await ctx.reply('Mikeka ya leo tayari tumeweka na kwa leo tumefunga hesabu. Tafadhali rudi tena hapa baadae kupata mikeka ya kesho.')
        }
        else {
            await ctx.sendChatAction('typing')
            setTimeout(() => {
                ctx.reply('Mkeka wa leo bado sijauandaa... ndio niko kwenye maandalizi hadi baadae kidogo utakuwa tayari.')
                    .catch(e => console.log(e.message))
            }, 1000)
        }
    } catch (error) {
        console.log(error.message, error)
    }
}

const supatips = async (ctx, bot, delay, imp) => {
    try {
        let url = `http://mkekawaleo.com/#supa-za-leo`
        await bot.telegram.copyMessage(ctx.chat.id, imp.mikekaDB, 255, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '⭐⭐⭐ Fungua SupaTips ⭐⭐⭐', url }
                    ]
                ]
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    sendMkeka1, sendMkeka2, sendMkeka3, supatips
}