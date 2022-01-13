## Arweave Uploader
### You need:
- DemoCar.json (example with NFT description/metadata)
-  arweave-key-{yourkey} (u can get it in https://faucet.arweave.net/)
-  show_maker.jpeg (example of my NFT image)


U can replace `show_maker.jpeg` or `DemoCar.json` with any another document. 

### Change the file type

Line 19 of index.ts
```javascript
transactionA.addTag("Content-Type", "text/json");
```

if u up a json file, -> text/json
if u up a image file -> image/png -> image/jpeg -> ...
