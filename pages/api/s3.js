import dotenv from 'dotenv';
import aws from 'aws-sdk';
import crypto from 'crypto'
import {promisify} from "util"

const region = "ap-south-1"
const bucketName= "chsproduct"
const accessKeyId = process.env.MY_AWS_ACCESS_KEY
const secretAccessKey = process.env.MY_AWS_SECRET_KEY
const randomBytes = promisify(crypto.randomBytes)
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUpLoadURL(){
    const rawBytes = await randomBytes(16)
    const imageName= rawBytes.toString('hex');
    const params=({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })
    const uploadURL = await s3.getSignedUrlPromise('putObject',params)
    return uploadURL;
}

export default generateUpLoadURL