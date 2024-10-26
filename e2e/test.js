import assert from "node:assert";
import { after, before, describe, it } from "node:test";

import { ComputeApplication } from "@fastly/compute-testing";

describe("e2e", () => {
	const app = new ComputeApplication();

	before(async () => {
		await app.start({
			appRoot: ".",
		});
	});

	it("Response status code is 200", async () => {
		const response = await app.fetch("/");
		assert.equal(response.status, 200);
	});

	it("Response headers include Content-Type: text/html", async () => {
		const response = await app.fetch("/");
		const contentTypeHeaders = (response.headers.get("content-type") ?? "")
			.split(",")
			.map((value) => value.trim().split(";")[0]);
		assert.ok(
			contentTypeHeaders.includes("text/plain"),
			`Content-Type headers: ${contentTypeHeaders}`,
		);
	});

	it("Response body contains Hello Hono!", async () => {
		const response = await app.fetch("/");
		const text = await response.text();
		assert.ok(text.includes("Hello Hono!"), `Response body: ${text}`);
	});

	after(async () => {
		await app.shutdown();
	});
});
