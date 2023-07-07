import * as AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();
type Params = {
    TableName: string,
    Key: {},
    ExpressionAttributeNames: any,
    ExpressionAttributeValues: any,
    UpdateExpression: string,
    ReturnValues: string
}

async function updateTodo(todo: any) {
    let params: Params = {
        TableName: 'TodosTable',
        Key: {
            id: todo.id
        },
        UpdateExpression: "",
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {},
        ReturnValues: 'ALL_NEW' // ONLY UPDATED: MEAN jo update huy sirf wo aayen 
    }
    let attributes = Object.keys(todo);
    let prefix = "set ";
    for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        if (attribute !== 'id') {
            params['UpdateExpression'] += prefix + '#' + attribute + "= :" + attribute; // Update expression: set #title = : title, #done = : done , ....
            params['ExpressionAttributeNames']['#' + attribute] = attribute;
            params['ExpressionAttributeValues'][':' + attribute] = todo[attribute];
            prefix += ', ';
        }
    }
    try {
        const updateTodo = await docClient.update(params).promise();
        console.log('todod update fun: ✨',updateTodo)
        return updateTodo.Attributes
    } catch (error) {
        console.log('update todo error:', error);

        return null
    }
}

export default updateTodo;