const getDimensions = (
	media?: HTMLImageElement | HTMLVideoElement,
): { width: number; height: number; aspectRatio: number } => {
	let width = 600;
	let height = 742;
	let aspectRatio = 600 / 742;

	if (media instanceof HTMLImageElement) {
		({ width, height } = media);
		aspectRatio = width / height;
	}

	if (media instanceof HTMLVideoElement) {
		width = media.videoWidth;
		height = media.videoHeight;
		aspectRatio = media.videoWidth / media.videoHeight;
	}

	return { width, height, aspectRatio };
};

const loadImage = async (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.addEventListener("error", reject);
		img.addEventListener("load", (): void => {
			resolve(img);
		});
		img.src = url;
	});

const loadVideo = async (url: string): Promise<HTMLVideoElement> =>
	new Promise((resolve, reject) => {
		const video = document.createElement("video");
		video.crossOrigin = "anonymous";
		video.autoplay = true;
		video.muted = true;
		video.loop = true;
		video.playsInline = true;
		video.addEventListener("error", reject);
		video.addEventListener("canplay", async (): Promise<void> => {
			await video.play();
			resolve(video);
		});
		video.src = url;
	});

export { getDimensions, loadImage, loadVideo };
