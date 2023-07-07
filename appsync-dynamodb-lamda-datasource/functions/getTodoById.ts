import * as AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

async function getTodoById(todoId: string) {
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
    console.log(todoId, 'todooid name ');
    try {
        const { Item } = await docClient.get(params).promise();
        console.log('item: ',Item);
        return Item;
    } catch (error) {
        console.log('dynamodb gettodobyid error: ', error);
        return null
    }
}

export default getTodoById;