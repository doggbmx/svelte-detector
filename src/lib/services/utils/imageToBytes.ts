export async function imageToBytes(filename: string): Promise<Uint8Array> {
	const response = await fetch(filename);
	const blob = await response.blob();
	return new Promise<Uint8Array>((resolve, reject) => {
	  const reader = new FileReader();
  
	  reader.onload = () => {
		// El resultado es un ArrayBuffer que contiene los bytes de la imagen.
		const buffer = reader.result as ArrayBuffer;
  
		// Convierte el ArrayBuffer en una matriz de bytes Uint8Array.
		const bytes = new Uint8Array(buffer);
  
		// Resuelve la promesa con la matriz de bytes.
		resolve(bytes);
	  };
  
	  reader.onerror = () => {
		// Si hay un error, rechaza la promesa con el error.
		reject(reader.error);
	  };
  
	  // Inicia la lectura de la imagen como un ArrayBuffer.
	  reader.readAsArrayBuffer(blob);
	});
  }
  