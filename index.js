const fs = require('fs');
const prompt = require('prompt');
const convert = require('xml-js');
const validation = require('./validation');

const onError = (error) => {
    console.error(`NOT OK`, error);
    return 1;
};

const isValidProperty = (source, item, property) => {
    const value = item[property]._text;
    if (validation[source][property]) {
        return validation[source][property](value);
    }
    return true;
};

const isValidPreKlant = (preKlant) => Object.keys(preKlant)
    .map((property) => !isValidProperty('preKlant', preKlant, property))
    .filter(Boolean)
    .length === 0;

prompt.start();
prompt.get(['file'], (error, result) => {
    if (error) {
        return onError(error);
    }

    if (!result.file) {
        return onError('No correct file (path) given');
    }

    try {
        const data = fs.readFileSync(result.file, 'utf-8');
        const json = JSON.parse(
            convert.xml2json(data, {
                compact: true,
                spaces: 2,
            })
        );
    
        const preVerkoopOrders = json['ns1:bericht']
            .preVerkoopOrders
            .preVerkoopOrder;

        console.log(`Found ${preVerkoopOrders.length} entries`);

        preVerkoopOrders.forEach((order) => {
            const studentNumber = order.preKlant.leerlingnummer._text;
            if (!isValidPreKlant(order.preKlant)) {
                throw `\t #${studentNumber}: Incorrect preKlant values found`;
            }
        });

        console.log(`All ${preVerkoopOrders.length} OK`);

    } catch(error) {
        return onError(error);
    }
});
