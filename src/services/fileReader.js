export function readFileAsText(file: File) {
	readFile("text", file);
}

export function readFileAsBinary(file: File) {
	readFile("binary", file);
}

export function readFileAsDataURL(file: File) {
	readFile("dataURL", file);
}

function readFile(type: String, file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = () => reject(new Error(`load file ${file.name} error!`));
		reader.onabort = () => reject(new Error(`load file ${file.name} aborted!!!`));
		
		switch(type) {
			case "text": 
				reader.readAsText(file);
				break;
			case "binary":
				reader.readAsArrayBuffer(file);
				break;
			case "dataURL":
				reader.readAsDataURL(file);
				break;
			default:
				break;
		}
	})
}