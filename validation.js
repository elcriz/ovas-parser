module.exports = {
    preKlant: {
        huisnummer: (value) => value !== undefined
            && !isNaN(value),
    },
};


