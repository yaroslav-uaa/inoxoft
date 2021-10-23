const S3 = require('aws-sdk/clients/s3');
const { v4: uuid } = require('uuid');
const path = require('path');

const {
    AWS_S3_ACCESS_KEY,
    AWS_S3_NAME,
    AWS_S3_REGION,
    AWS_S3_SECRET_KEY,
} = require('../config/configs');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY,
});

const _fileNameBuilder = (fileName, itemType, itemId) => {
    const fileExtension = fileName.split('.').pop();

    return path.join(itemType, itemId, ` ${uuid()}.${fileExtension}`);
};

const upload = (file, itemType, itemId) => {
    const { data, name } = file;
    const uploadPath = _fileNameBuilder(name, itemType, itemId.toString());

    return bucket
        .upload({
            Bucket: AWS_S3_NAME,
            Body: data,
            Key: uploadPath,
        })
        .promise();
};

module.exports = {
    upload,
};
