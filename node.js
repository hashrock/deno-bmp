// import { encode } from "./encoder.js";
const encode = require("./encoder")
const data = [0xFF, 0xFF, 0x00, 0x00]
const width = 1
const height = 1

var bmpData = {
    data, //Buffer
    width, //Number
    height //Number
};
var rawData = encode(bmpData); //defaults to no compression
console.log(rawData)
// await Deno.writeFile("./image.bmp", rawData);
