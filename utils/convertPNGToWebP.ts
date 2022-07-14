import sharp from "sharp";

export const convertPNGToWebP = async (file: any) => {
  const imageBuffer = await sharp(file).webp().toBuffer();

  return {
    toBase64: () => `data:image/png;base64,${imageBuffer.toString("base64")}`,
  };
};
