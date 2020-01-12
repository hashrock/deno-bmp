# deno-bmp

Let's create Bitmap!

fork of:

https://github.com/shaozilee/bmp-js

# Run Example

```sh
deno run https://denopkg.com/hashrock/deno-bmp/example.js --allow-write
```

![スクリーンショット 2020-01-12 17 20 10](https://user-images.githubusercontent.com/3132889/72216145-8e5fd880-3560-11ea-94a8-8686bada0ea5.png)

# Usage

```
import { encode } from "https://denopkg.com/hashrock/deno-bmp/encoder.js";

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

```

