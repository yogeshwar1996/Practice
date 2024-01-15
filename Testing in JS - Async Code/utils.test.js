// jest.mock('./http.js');

const {loadTitle} = require('./utils');

test('should print an uppercase text', () => {
    loadTitle().then(title => {
        expect(title).toBe('DELECTUS AUT AUTEM');
    });
})
