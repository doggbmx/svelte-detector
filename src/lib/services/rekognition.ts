import { 
	RekognitionClient, 
	type ListFacesCommandInput, 
	type RekognitionClientConfig, 
	ListFacesCommand, 
	type CompareFacesCommandInput, 
	CompareFacesCommand, 
} from "@aws-sdk/client-rekognition";
import { imageToBytes } from "./utils/imageToBytes";

let pathToImage: string = 'bagre_mayor.jpg'

const config: RekognitionClientConfig = {
	region: import.meta.env.VITE_AWS_REGION,
	credentials: {
		accessKeyId: import.meta.env.VITE_REKOGNITION_ACCESS_KEY_ID,
		secretAccessKey: import.meta.env.VITE_REKOGNITION_SECRET_KEY
	}
};

export const rekognitionClient = new RekognitionClient(config);


export async function checkUser(sourceImage: Uint8Array): Promise<boolean> {
	let bagreMayor: Uint8Array = await imageToBytes(pathToImage);
	console.log('asd');
	const params: CompareFacesCommandInput = {
		SourceImage: {
			Bytes: sourceImage
		},
		TargetImage: {
			Bytes: bagreMayor
		},
		SimilarityThreshold: 80
	};
	console.log('before send');
	const compareFaces = new CompareFacesCommand(params);
	const data = await rekognitionClient.send(compareFaces);
	console.log('after send');

	console.log(data);

	if (data['FaceMatches']?.length == 0) {
		return false;
	} else {
		return true;
	}
}

export async function getFaces() {
	try {
		const params: ListFacesCommandInput = {
			CollectionId: 'PenguTalksCollection'
		};

		const listFaces = new ListFacesCommand(params);

		const data = await rekognitionClient.send(listFaces);

		return data.Faces;
	} catch (e) {
		console.error('Error getting faces', e);
	}
}

