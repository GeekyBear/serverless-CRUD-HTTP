const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { title, description } = JSON.parse(event.body);
    const createdAt = new Date().toUTCString();
    const id = v4();

    const newTask = {
        id,
        title,
        description,
        createdAt,
    };

    try {
        await dynamodb.put({
            TableName: 'TaskTable',
            Item: newTask
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(newTask)
        };
    } catch (error) {
        return {
            statusCode: 500,
            error,
            body: JSON.stringify(newTask)
        };
    }

}

module.exports = {
    addTask
}