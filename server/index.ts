import { Elysia } from "elysia";
import index from "~/index.html";

const app = new Elysia().get("/", index);

app.listen(3191);

console.log(`Server is running on ${app.server?.url}`);
