import sharp from "sharp";

export const convertToWebP = async (file: any) => {
  const imageBuffer = await sharp(file).webp().toBuffer();

  return {
    toBase64: () => `data:webp/png;base64,${imageBuffer.toString("base64")}`,
  };
};
