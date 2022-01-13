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
  console.log(`id: ${transactionA.id}`);
  do {
    let result = await arweave.transactions.getStatus(transactionA.id);
    if (result.status === 200) {
      console.log("Transaction confirmed");
      break;
    } else if (result.status === 202){
      console.log("Transaction pending");
      await new Promise(r => setTimeout(r, 4000))
    } else {
      console.log("Transaction failed:", result.status);
      break;
    }
  } while (true);
}
main();
