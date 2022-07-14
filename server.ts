import Fastify from "fastify";
import { convertPNGToWebP } from "./utils/convertPNGToWebP";
import "dotenv/config";

const fastify = Fastify({
  logger: true,
});

fastify.register(import("@fastify/multipart"));
fastify.register(import("@fastify/cors"), {
  // put your options here
  origin: "*",
});
fastify.post("/convert", async function (req, res) {
  const data = await req.file();

  const stream = await data.toBuffer();

  const image = await convertPNGToWebP(stream);

  res.send({ base64: image.toBase64() });
});

fastify.listen({ port: Number(process.env.PORT) }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
