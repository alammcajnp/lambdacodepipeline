import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";

export class MyFirstCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketName = new cdk.CfnParameter(this, "bucketName", {
      type: "String",
      default: "",
      description: "The name of the bucket"
    });

    const bucketKey = new cdk.CfnParameter(this, "bucketKey", {
      type: "String",
      default: "",
      description: "The name of the bucket key"
    });

    const bucket = s3.Bucket.fromBucketName(
      this,
      "pipeline-bucket",
      bucketName.valueAsString
    );

    new lambda.Function(this, "lambdaFunction", {
      functionName: "first-cdk-lambda",
      code: lambda.Code.fromBucket(bucket, bucketKey.valueAsString),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 128
    });
  }
}
