const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addVisitor = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { firstname, lastname } = JSON.parse(event.body);
    const createdAt = new Date().toUTCString();
    const id = v4();

    const newVisitor = {
        id,
        firstname,
        lastname,
        createdAt,
        done: false,
    };

    try {
        await dynamodb.put({
            TableName: 'VisitTable',
            Item: newVisitor
        }).promise();

        return {
            status: 200,
            body: JSON.stringify(newVisitor)
        };

    } catch (error) {
        return {
            status: 500,
            error
        };
    }

}

module.exports = {
    addVisitor
}