import { Hono } from "hono";
import { handle } from "hono/service-worker";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
addEventListener("fetch", handle(app, { fetch: undefined }));

export default app;
