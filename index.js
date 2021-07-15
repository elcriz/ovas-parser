const fs = require('fs');
const prompt = require('prompt');
const convert = require('xml-js');
const validation = require('./validation');

const correctOrder = 'preKlant,periode,cursus,school,klas,specificatiePakket,ontvangstDatum,aflevergebouwCode,vakken';
const correctPreKlant = 'leerlingnummer,titulatuur,voorletters,tussenvoegsel,achternaam,roepnaam,straatnaam,huisnummer,toevoegingHuisnummer,nadereAanduidingAdres,postcode,woonplaats,landCode,telefoonNummer,emailAdres,emailAdresOuder,geboortedatum';

// /Users/christiaanhemerik/Downloads/1855_2021-2022-aangepast.xml

const onError = (error) => {
    console.error(`NOT OK`, error);
    return 1;
};

const isValidProperty = (preKlant, property) => {
    const value = preKlant[property]._text;
    if (validation.values[property]) {
        return validation.values[property](value);
    }
    return true;
};

const isValidPreKlant = (preKlant) => Object.keys(preKlant)
    .map((property) => !isValidProperty(preKlant, property))
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
        const getKeys = objectToCheck => Object.keys(objectToCheck).toString();
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

        preVerkoopOrders.forEach((order, orderIndex) => {
            console.log(`Order #${orderIndex + 1}: `);

            if (getKeys(order) !== validation.keys.order.toString()) {
                throw '\t Incorrect order elements found';
            }

            if (getKeys(order.preKlant) !== validation.keys.preKlant.toString()) {
                throw '\t Incorrect preKlantElements found';
            }

            console.log('\t', `Student #${order.preKlant.leerlingnummer._text}`);

            if (!isValidPreKlant(order.preKlant)) {
                throw '\t Incorrect preKlant values found';
            }

            console.log('\t', 'OK');
        });

    } catch(error) {
        return onError(error);
    }
});
