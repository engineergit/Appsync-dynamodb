import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AppsyncDynamodbLamdaDatasourceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AppsyncDynamodbLamdaDatasourceQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const appSyncApi = new appsync.GraphqlApi(this, 'api', {
      name: "appsync-dynamodb-lamda-api",
      schema: appsync.SchemaFile.fromAsset('schema/schema.graphql')
    });

    const todosLambda = new cdk.aws_lambda.Function(this, 'appsyncTodoHandler', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
      code: cdk.aws_lambda.Code.fromAsset('functions'),
      handler: 'main.handler',
      memorySize: 1024
    })
    const lambdaDS = appSyncApi.addLambdaDataSource('lambdaDataSource', todosLambda);

    // dynamo table 
    const todosTable = new cdk.aws_dynamodb.Table(this, 'TodosTable', {
      partitionKey: {
        name: 'id',
        type: cdk.aws_dynamodb.AttributeType.STRING,
      },
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      tableName:'TodosTable'
    });
    lambdaDS.createResolver('QueryGetTodo', {
      typeName: 'Query',
      fieldName: 'getTodos'
    })

    lambdaDS.createResolver('QueryGetTodoById', {
      typeName: 'Query',
      fieldName: 'getTodoById'
    })

    lambdaDS.createResolver('mutationAddTodo', {
      typeName: 'Mutation',
      fieldName: 'addTodo'
    })

    // delete toodo
    lambdaDS.createResolver('MutationDeleteTodo', {
      typeName: 'Mutation',
      fieldName: 'deleteTodo'
    })

    lambdaDS.createResolver('MutationUpdateTodo', {
      typeName: 'Mutation',
      fieldName: 'updateTodo'
    })

    todosTable.grantFullAccess(todosLambda);
    todosLambda.addEnvironment('TODOS_TABLE', todosTable.tableName) 
  }
}
