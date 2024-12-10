import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../components/schemas";

const auth = new Hono().post("/login", zValidator("json", loginSchema), (c) => {
  return c.json({ status: "ok" });
});

export default auth
