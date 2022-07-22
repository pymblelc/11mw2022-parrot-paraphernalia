const PIXABAY_URL = "https://pixabay.com/api/?key=9054397-010427f0eb2adc019d523491f";
const ACS_URL = "https://sddcognitiveservices.cognitiveservices.azure.com";
const ACS_KEY = "6cdde304144f4e21ac9495a8847dd44e";

const ImageAPI = {
    /**
     * Search for photos on Pixabay
     * @param {string} query - The search string you're looking for (eg. a dog on the beach)
     * @param {CallableFunction} callback - The function that will run when receiving the data
     * @returns {any} data
     */
    async searchPhotos(query, callback) {
        const url = `${PIXABAY_URL}&q=${encodeURIComponent(query)}&image_type=photo&per_page=10&safesearch=true`;
        const response = await fetch(url);
        const data = await response.json();
        if (callback) {
            callback(data);
        };

        return data;
    },

    /**
     * 
     * @param {string} imageUrl - The url to an image online
     * @param {CallableFunction} callback - The function that will run when receiving the data
     * @returns {any} data
     */
    async analyseImage(imageUrl, callback) {
        const url = `${ACS_URL}/vision/v3.2/analyze?visualFeatures=Categories,Description&details=Landmarks`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": ACS_KEY
            },
            body: JSON.stringify({
                url: imageUrl
            }),
        });
        const data = await response.json();
        if (callback) {
            callback(data);
        }

        return data;
    },

    /**
     * 
     * @param {Blob} blob - A binary blob of an image you want to analyse
     * @param {CallableFunction} callback - The function that will run when receiving the data
     * @returns {any} data
     */
    async analyseImageBlob(blob, callback) {
        const url = `${ACS_URL}/vision/v3.2/analyze?visualFeatures=Categories,Description&details=Landmarks`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Ocp-Apim-Subscription-Key": ACS_KEY
            },
            body: blob,
        });
        const data = await response.json();
        if (callback) {
            callback(data);
        }

        return data;
    },

    /**
     * 
     * @param {string} imageUrl - The url to an image online
     * @param {CallableFunction} callback - The function that will run when receiving the data
     * @returns {any} data
     */
    async analyseFaces(imageUrl, callback) {
        const url = `${ACS_URL}/face/v1.0/detect?returnFaceAttributes=blur,exposure,noise,age,gender,facialhair,glasses,hair,makeup,accessories,occlusion,headpose,emotion,smile&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_01&faceIdTimeToLive=86400`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": ACS_KEY
            },
            body: JSON.stringify({
                url: imageUrl
            }),
        });
        const data = await response.json();
        if (callback) {
            callback(data);
        }

        return data;
    },

    /**
     * 
     * @param {Blob} blob - A binary blob of an image you want to analyse
     * @param {CallableFunction} callback - The function that will run when receiving the data
     * @returns {any} data
     */
    async analyseFacesBlob(blob, callback) {
        const url = `${ACS_URL}/face/v1.0/detect?returnFaceAttributes=blur,exposure,noise,age,gender,facialhair,glasses,hair,makeup,accessories,occlusion,headpose,emotion,smile&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_01&faceIdTimeToLive=86400`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Ocp-Apim-Subscription-Key": ACS_KEY
            },
            body: blob,
        });
        const data = await response.json();
        if (callback) {
            callback(data);
        }

        return data;
    },
};

globalThis.ImageAPI = ImageAPI;