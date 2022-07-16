import Fastify from "fastify";
import { convertToWebP } from "./utils/convertToWebP";
import "dotenv/config";

const fastify = Fastify({
  logger: true,
});

fastify.register(import("@fastify/multipart"));
fastify.register(import("@fastify/cors"), {
  origin: "*",
});

fastify.post("/convert", async function (req, res) {
  const data = await req.file();

  const stream = await data.toBuffer();

  const image = await convertToWebP(stream);

  res.send({ base64: image.toBase64() });
});

fastify.listen(
  { port: Number(process.env.PORT) || 3000, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);
