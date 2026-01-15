import request from "supertest";
import { createApp } from "../app";

describe("GET /health", () => {
    it("returns 200 and { status: 'ok' }", async () => {
        const app = createApp();

        const res = await request(app).get("/health");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: "ok" });
    });
    it("returns 404 on unknown route", async () => {
        const app = createApp();
        await request(app).get("/nope").expect(404);
    });
});
