const { parse } = require('node-html-parser');
const { checkTransport } = require('./mvsService');
const args = require('minimist')(process.argv.slice(2));

const uaToEnKeysMap = {
    'Регіон (орган внутрішніх справ)': 'region',
    'Державний знак': 'plateNumber',
    'МОДЕЛЬ': 'model',
    'Номер шасі': 'chassisNumber',
    'Номер кузова': 'bodyNumber',
    'Колір': 'color',
};

checkTransport(args['number'])
    .then((response) => {
        const root = parse(response.data);
        const resultBlock = root.querySelector('.result');
        if (!resultBlock) {
            console.log('Nothing found!');
            return;
        }
        const rawResults = resultBlock.rawText.trim();
        const parsedResults = rawResults
            .split('\n')
            .map(row => {
                const keyValueArray = row.trim().split(':');
                return { [uaToEnKeysMap[keyValueArray[0]]]: keyValueArray[1] };
            });
        console.log('parsedResults', parsedResults);
    })
    .catch(e => console.log('e', e));
