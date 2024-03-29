const json2csv = require('json2csv');
const request = require('request');
const syncRequest = require('request-promise');
const fs = require('fs');
const querystring = require('query-string');

// Const data
const uri = 'https://www.pb-game.com/admin.php/Home/User/editUserProfileInfo';
// const uid = 1280;
// const token = 'EDC5F8F18073C65EF2CF60F274782DC9';

const editUser = async (uid, token = token, { nickname, id_card, banknumber, bankname, busername }) => {
    const form = {
        uid,
        token,
        nickname,
        id_card,
        banknumber,
        bankname,
        busername
    };
    const formData = querystring.stringify(form);
    const contentLength = formData.length;

    try{
        const res = await syncRequest({
            method: 'POST',
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri,
            body: formData,
            json: true
        });
        console.log({ ...res, uid });
    } catch(e) {
        console.log(e);
    }
}

// editUser(uid, token, {
//     nickname: 'Test Nicknamessss',
//     id_card: 123456789,
//     banknumber: 123456789,
//     bankname: 'Test Bankname',
//     busername: 'Bank Username'
// });

module.exports = { editUser };