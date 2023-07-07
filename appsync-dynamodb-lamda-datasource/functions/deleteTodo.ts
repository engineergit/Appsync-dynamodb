import * as AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteTodo(todoId: string) {
    const params = {
        TableName: 'TodosTable',
        Key: {
            /** partition key id for unique identity 
             *  as in Schema: deleteTodo(todoId: String!): String
             *  partitionKey: {
                    name:'id',
                    type: cdk.aws_dynamodb.AttributeType.STRING,
                },
            */
            id: todoId,
        }
    }
    try {
        // delete entity
        await docClient.delete(params).promise();
        console.log('item delete: ',todoId)
        return todoId;
    } catch (error) {
        console.log('dynamodb deletetodo error: ', error);
        return null
    }
}

export default deleteTodo;