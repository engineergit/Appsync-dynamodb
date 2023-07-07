import * as AWS from 'aws-sdk';
import Todo from './Todo';

const docClient = new AWS.DynamoDB.DocumentClient();
async function addTodo(todo: Todo) {
    const params = {
        TableName: 'TodosTable',
        Item: todo
    }
    try {
        await docClient.put(params).promise();
        console.log('item add: ',todo)
        return todo;
    } catch (error) {
        console.log('dynamodb add error: ', error);
        return null
    }
}

export default addTodo;