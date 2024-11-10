import AWS from 'aws-sdk';

const accessKeyId = 'YCAJE8Fs58mxUsnOZxPyzioAA';
const secretAccessKey = 'YCPOXxR5jUMRCCnEof4cEcRdopaFyzXsJn2rNdoV';
const region = 'yc-ru-central1';
const endpoint = 'https://storage.yandexcloud.net';

AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region
});

export const s3 = new AWS.S3({
    endpoint
});
