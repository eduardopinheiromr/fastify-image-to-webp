import Fastify from "fastify";
import { convertToWebP } from "./utils/convertToWebP";
import "dotenv/config";

// import os from "os";
// import cluster from "cluster";

// const clusterWorkerSize = os.cpus().length;

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

const start = async () => {
  try {
    fastify.listen(
      { port: Number(process.env.PORT) || 3000, host: "0.0.0.0" },
      function (err, address) {
        if (err) {
          fastify.log.error(err);
          process.exit(1);
        }
      }
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

// if (clusterWorkerSize > 1) {
//   if (cluster.isPrimary) {
//     for (let i = 0; i < clusterWorkerSize; i++) {
//       cluster.fork();
//     }

//     cluster.on("exit", function (worker, code, signal) {
//       console.log("Worker", worker.id, "has exited with signal", signal);
//       if (code !== 0 && !worker.exitedAfterDisconnect) {
//         cluster.fork();
//       }
//     });
//   } else {
//     start();
//   }
// } else {
//   start();
// }
