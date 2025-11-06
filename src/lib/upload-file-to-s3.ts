import axios from "axios";

export const uploadFileToS3 = async (file: File, listingId: string) => {
  if (!listingId) throw new Error("Missing listingId");

  const lambdaUrl = process.env.NEXT_PUBLIC_LAMBDA_UPLOAD_URL!;
  const { data: lambdaRes } = await axios.post(lambdaUrl, {
    listingId,
    fileName: file.name,
    fileType: file.type,
  });

  const { uploadUrl, imageUrl } = lambdaRes.data;

  if (!uploadUrl || !imageUrl) {
    throw new Error("Invalid response from Lambda");
  }

  await axios.put(uploadUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
    // onUploadProgress: (progressEvent) => {
    //   const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
    //   console.log(`Uploading: ${percent}%`);
    // },  display progress when run, use it with zustand
  });

  return imageUrl;
};
