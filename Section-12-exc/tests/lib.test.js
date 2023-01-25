const lib = require("../lib");

describe("absolute", () => {
    it("should return positive if input positive", () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it("should return positive if input negative", () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it("should return 0 if input 0", () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe("greet", () => {
    it("should return the greeting message", () => {
        const result = lib.greet("Stilko");
        expect(result).toMatch(/Stilko/);
        expect(result).toContain("Stilko");
    });
});

describe("getCurrencies", () => {
    it("Should return supported currencies", () => {
        const result = lib.getCurrencies();

        expect(result).toContain("USD");
        expect(result).toContain("AUD");
        expect(result).toContain("EUR");

        expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
    });
});

describe("getProduct", () => {
    it("should return the product with the given id", () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1, price: 10 });
    });
});

describe("registerUser", () => {
    it("should throw if username is falsy", () => {
        const args = [null, undefined, NaN, "", 0, false];
        args.forEach((a) => {
            expect(() => {
                lib.registerUser(null);
            }).toThrow();
        });
    });
    it('Should return a user object if username is valid', () => {        
        const result = lib.registerUser('mosh');
        expect(result).toMatchObject({username:'mosh'});
        expect(result.id).toBeGreaterThan(0);
    })
});
