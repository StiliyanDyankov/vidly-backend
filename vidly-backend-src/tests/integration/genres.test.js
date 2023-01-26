const request = require("supertest");
const Genres = require("../../src/db/genresDb").Genres;

let server;

describe("/api/genres", () => {
    beforeEach(() => {
        server = require("../../src/index");
    });
    afterEach(async () => {
        server.close();
        await Genres.remove({});
    });

    describe("GET /", () => {
        it("should return all genres", async () => {
            await Genres.collection.insertMany([
                { name: "genre1" },
                { name: "genre2" },
            ]);
            const res = await request(server).get("/api/genres");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
            expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
        });
    });

    describe("GET /:id", () => {
        it("should return all genres", async () => {
            const res = await request(server).get("/api/genres/20");
            expect(res.status).toBe(404);
        });
    });

    describe("POST /", () => {
        it("should return 401 if client is not logged in", async () => {
            const res = await request(server)
                .post("/api/genres")
                .send({ name: "genre1" });
            expect(res.status).toBe(401);
        });
    });
});
