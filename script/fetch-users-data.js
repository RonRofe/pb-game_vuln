const json2csv = require('json2csv');
const request = require('request');
const syncRequest = require('request-promise');
const fs = require('fs');
const querystring = require('query-string');

// Const data
const token = 'EDC5F8F18073C65EF2CF60F274782DC9';
const start_from_id = 1;
const stop_on_id = 2000;
const estimated_max_user_id = 1280;

const userInfoEndpoint = 'https://www.pb-game.com/admin.php/Home/Member/getUserInfo?token=' + token + '&uid=';
const userProfileInfoEndpoint = 'https://www.pb-game.com/admin.php/Home/User/getUserProfileInfo';

const data = [];

const fetch = async () => {
    let lastUid = 0;
    for(let uid = start_from_id; ((lastUid !== undefined || uid < estimated_max_user_id) && uid < stop_on_id); uid++) {
        let row = {};

        // First API endpoint
        const finalUrl = userInfoEndpoint + uid;
        try {
            const body = await syncRequest({ url: finalUrl, json: true });
            if(body === undefined || body.data === undefined) {
                lastUid = undefined;
                row = {
                    uid: 'NULL',
                    nickname: 'NULL',
                    accounts: 'NULL',
                    portrait: 'NULL',
                    balance: 'NULL',
                    tel_email: 'NULL',
                    money: 'NULL',
                    zcz: 'NULL',
                    ztx: 'NULL'
                };
            } else {
                lastUid = body.data.uid;
                row = {
                    uid: body.data.uid || 'NULL',
                    nickname: body.data.nickname || 'NULL',
                    accounts: body.data.accounts || 'NULL',
                    portrait: body.data.portrait || 'NULL',
                    balance: body.data.balance || 'NULL',
                    tel_email: body.data.tel_email || 'NULL',
                    money: body.data.money || 'NULL',
                    zcz: body.data.zcz || 'NULL',
                    ztx: body.data.ztx || 'NULL'
                };
            }
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
            if(body === undefined || body.data === undefined) {
                row.id_card = 'NULL';
                row.banknumber = 'NULL';
                row.bankname = 'NULL';
                row.busername = 'NULL';
                row.branch = 'NULL';
            } else {
                row.id_card = body.data.id_card || 'NULL';
                row.banknumber = body.data.banknumber || 'NULL';
                row.bankname = body.data.bankname || 'NULL';
                row.busername = body.data.busername || 'NULL';
                row.branch = body.data.branch || 'NULL';
            }
        } catch(e) {
            console.log(e);
        }

        data.push(row);
    }
}

fetch().then(() => {
    const csv = json2csv.parse(data, { fields: [
        'uid', 'nickname', 'accounts', 'portrait', 'balance', 'tel_email', 'money', 'zcz', 
        'ztx', 'id_card', 'banknumber', 'bankname', 'busername', 'branch'
    ]});
    fs.writeFileSync('../files/users-data.csv', csv);
});