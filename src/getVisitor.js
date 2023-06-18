const AWS = require('aws-sdk');

const getVisitor = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;
    try {
        const result = await dynamodb.get({
            TableName: 'VisitTable',
            Key: {
                id,
            }
        }).promise();

        const visitor = result.Item;

        return {
            status: 200,
            body: visitor
        }
    } catch (error) {
        return {
            status: 500,
            error
        };
    }

};

module.exports = {
    getVisitor
}