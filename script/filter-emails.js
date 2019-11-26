const csvtojson = require('csvtojson');

// Const data
const csvFilePath = '../files/users-data.csv';

csvtojson().fromFile(csvFilePath).then(jsonData => {
    jsonData.forEach(row => {
        if(row.tel_email.indexOf('@') !== -1) {
            console.log(row.tel_email);
        }
    });
});