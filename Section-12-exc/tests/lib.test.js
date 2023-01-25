const lib = require('../lib');

describe('absolute', () => {
    it('should return positive if input positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return positive if input negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return 0 if input 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Stilko');
        expect(result).toMatch(/Stilko/);
        expect(result).toContain('Stilko');
    })
});

describe('getCurrencies',() => {
    it('Should return supported currencies', () => {
        const result = lib.getCurrencies();

        
    })
})