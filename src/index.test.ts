import app from "./index";

describe("GET /", () => {
	test("should return 200", async () => {
		const response = await app.request("/");
		expect(response.status).toBe(200);
	});
});
