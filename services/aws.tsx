import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: "Asia Pacific (Seoul) ap-northeast-2",
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
});
const rekognition = new AWS.Rekognition({
  region: "Asia Pacific (Seoul) ap-northeast-2",
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
});

export default async function detectObjects(imageFile: File) {
  const reader = new FileReader();

  const fileLoaded = new Promise((resolve) => {
    reader.onload = () => {
      resolve(reader.result);
    };
  });

  reader.readAsArrayBuffer(imageFile);

  const fileContents = await fileLoaded;
  const s3Params = {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Key: `images/${imageFile.name}`,
    Body: fileContents,
  };
  const s3Response = await s3.upload(s3Params as any).promise();

  const rekognitionParams = {
    Image: {
      S3Object: {
        Bucket: `${process.env.AWS_BUCKET_NAME}`,
        Name: s3Response.Key,
      },
    },
  };
  const rekognitionResponse = await rekognition
    .detectLabels(rekognitionParams)
    .promise();

  return rekognitionResponse.Labels?.map((label) => label.Name);
}
