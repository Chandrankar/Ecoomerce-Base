import aws from 'aws-sdk';
import dotenv from 'dotenv'
import {generateUpLoadURL} from './s3';

const imageUpload = async (req, res) => {
  const url = await generateUpLoadURL()
  res.send({url})
}

export default imageUpload