async function imageToUint8Array(imageUrl: string): Promise<Uint8Array> {
	const response = await fetch(imageUrl);
	const blob = await response.blob();
	const buffer = await blob.arrayBuffer();
	const uint8Array = new Uint8Array(buffer);
	return uint8Array;
  }