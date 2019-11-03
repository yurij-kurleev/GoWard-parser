const axios = require('axios');
const FormData = require('form-data');

const MVS_REQUEST_URL = 'https://wanted.mvs.gov.ua/searchtransport/result/';
const SESTOKEN = 't3nf665mifkf0j098ghc934m03';
const NSH = '';

const checkTransport = async (plateNumber) => {
    const formattedNumber = plateNumber
        .toUpperCase()
        .replace(/ /g, '');
    const form = new FormData();
    form.append('sestoken', SESTOKEN);
    form.append('NOM', formattedNumber);
    form.append('NSH', NSH);
    try {
        return axios.post(MVS_REQUEST_URL, form, {
            headers: {
                ...form.getHeaders(),
                Cookie: `PHPSESSID=${SESTOKEN}`
            },
        });
    } catch (error) {
        console.log('error', error)
    }
};

module.exports = {
    checkTransport,
};
