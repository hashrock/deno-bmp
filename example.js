import { encode } from "./encoder.js";

const data = []

const width = 300
const height = 300

for(let y = 0; y < height; y++){
  for(let x = 0; x < width; x++){
    let color = x / 300 * 0xff
    let pixel = [
      0xFF, Math.ceil(color), 0x00, 0x00
    ]
    data.push(...pixel)
  }
}

const bmpData = {
    data, //Buffer
    width, //Number
    height //Number
};
const rawData = encode(bmpData); //defaults to no compression
await Deno.writeFile("./image.bmp", new Uint8Array(rawData.data));
