import Arweave from "arweave";
import * as fs from "fs"; /* You need typescript and ts-node installed */
let json = require("./arweave-key-{key}.json");

async function main() {
  let buffer = fs.readFileSync("./DemoCar.json");
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });

  let transactionA = await arweave.createTransaction(
    {
      data: buffer,
    },
    json
  );
  transactionA.addTag("Content-Type", "text/json");
  await arweave.transactions.sign(transactionA, json);
  let uploader = await arweave.transactions.getUploader(transactionA);

  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
    );
  }
  let result = await arweave.transactions.getStatus(transactionA.id);
  console.log(`id: ${transactionA.id}`);
  console.log(result);
}
main();
