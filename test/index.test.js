describe('Prueba', () => {
    test('suma', () => {
        const suma = (a, b) => { return a + b; }
        expect(suma(5, 5)).toBe(10);
    });

    test('rest', () => {
        const resta = (a, b) => { return a - b }
        expect(resta(5, 5)).toBe(0);
    });
});