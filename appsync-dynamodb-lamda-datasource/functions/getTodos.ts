import * as AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

async function getTodos() {
    const params = {
        TableName: 'TodosTable'
    }
    try {
        const data = await docClient.scan(params).promise();
        console.log('data.Items: ',data.Items)
        return data.Items;
    } catch (error) {
        console.log('dynamodb gettodos error: ' , error);
        return null
    }
}

export default getTodos;