module.exports = {
    keys: {
        order: [
            'preKlant',
            'periode',
            'cursus',
            'school',
            'klas',
            'specificatiePakket',
            'ontvangstDatum',
            'aflevergebouwCode',
            'vakken',
        ],
        preKlant: [
            'leerlingnummer',
            'titulatuur',
            'voorletters',
            'tussenvoegsel',
            'achternaam',
            'roepnaam',
            'straatnaam',
            'huisnummer',
            'toevoegingHuisnummer',
            'nadereAanduidingAdres',
            'postcode',
            'woonplaats',
            'landCode',
            'telefoonNummer',
            'emailAdres',
            'emailAdresOuder',
            'geboortedatum',
        ],
    },
    values: {
        preKlant: {
            huisnummer: (value) => !!value,
        },
    },
};


