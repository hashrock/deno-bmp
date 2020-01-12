/**
 * @author shaozilee
 *
 * BMP format encoder,encode 24bit BMP
 * Not support quality compression
 *
 */

class BmpEncoder{
	constructor(imgData){
		this.buffer = imgData.data;
		this.width = imgData.width;
		this.height = imgData.height;
		this.extraBytes = this.width%4;
		this.rgbSize = this.height*(3*this.width+this.extraBytes);
		this.headerInfoSize = 40;
	
		this.data = [];
		/******************header***********************/
		this.flag = "BM";
		this.reserved = 0;
		this.offset = 54;
		this.fileSize = this.rgbSize+this.offset;
		this.planes = 1;
		this.bitPP = 24;
		this.compress = 0;
		this.hr = 0;
		this.vr = 0;
		this.colors = 0;
		this.importantColors = 0;
	}

	writeUInt32LE(){

	}
	writeInt32LE(){}

	encode(){
		const buf = new ArrayBuffer(this.offset+this.rgbSize)
		const dv = new DataView(buf)
		// var tempBuffer = new Buffer();
		this.pos = 0;

		// console.log(dv.setUint16)
		dv.setUint8(this.pos, 66); this.pos+=1;
		dv.setUint8(this.pos, 77); this.pos+=1;

		// tempBuffer.writeUInt32LE(this.fileSize,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.fileSize, true); this.pos+=4;

		// tempBuffer.writeUInt32LE(this.reserved,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.reserved, true); this.pos+=4;

		// tempBuffer.writeUInt32LE(this.offset,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.offset, true); this.pos+=4;

		// tempBuffer.writeUInt32LE(this.headerInfoSize,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.headerInfoSize, true); this.pos+=4;

		// tempBuffer.writeUInt32LE(this.width,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.width, true); this.pos+=4;

		// tempBuffer.writeInt32LE(-this.height,this.pos);this.pos+=4;
		dv.setInt32(this.pos, -this.height, true); this.pos+=4;

		// tempBuffer.writeUInt16LE(this.planes,this.pos);this.pos+=2;
		dv.setUint16(this.pos, this.planes, true); this.pos+=2;

		// tempBuffer.writeUInt16LE(this.bitPP,this.pos);this.pos+=2;
		dv.setUint16(this.pos, this.bitPP, true); this.pos+=2;

		// tempBuffer.writeUInt32LE(this.compress,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.compress, true); this.pos+=4;

		// tempBuffer.writeUInt32LE(this.rgbSize,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.rgbSize, true); this.pos+=4;

		// tempBuffer.writeUInt32LE(this.hr,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.hr, true); this.pos+=4;

		// tempBuffer.writeUInt32LE(this.vr,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.vr, true); this.pos+=4;

		// tempBuffer.writeUInt32LE(this.colors,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.colors, true); this.pos+=4;

		// tempBuffer.writeUInt32LE(this.importantColors,this.pos);this.pos+=4;
		dv.setUint32(this.pos, this.importantColors, true); this.pos+=4;
	
		var i=0;
		var rowBytes = 3*this.width+this.extraBytes;
	
		for (var y = 0; y <this.height; y++){
			for (var x = 0; x < this.width; x++){
				var p = this.pos+y*rowBytes+x*3;
				i++;//a
				dv.setUint8(p, this.buffer[i++])
				dv.setUint8(p+1, this.buffer[i++])
				dv.setUint8(p+2, this.buffer[i++])
				// tempBuffer[p]= this.buffer[i++];//b
				// tempBuffer[p+1] = this.buffer[i++];//g
				// tempBuffer[p+2]  = this.buffer[i++];//r
			}
			if(this.extraBytes>0){
				var fillOffset = this.pos+y*rowBytes+this.width*3;
				// tempBuffer.fill(0,fillOffset,fillOffset+this.extraBytes);
				for(let i; i < this.extraBytes; i++){
					dv.setUint8(fillOffset + i)
				}
			}
		}
	
		return buf;
	}
}

export function encode(imgData, quality){
  if (typeof quality === 'undefined') quality = 100;
 	var encoder = new BmpEncoder(imgData);
	var data = encoder.encode();
  return {
    data: data,
    width: imgData.width,
    height: imgData.height
  };
}
