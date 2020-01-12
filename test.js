import { encode } from "./encoder.js";

const data = [0x00, 0x00, 0x00, 0x00]
const width = 1
const height = 1

var bmpData = {
    data, //Buffer
    width, //Number
    height //Number
};
var rawData = encode(bmpData); //defaults to no compression
await Deno.writeFile("./image.bmp", rawData);
