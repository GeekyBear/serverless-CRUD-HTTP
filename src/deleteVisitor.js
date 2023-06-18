const AWS = require('aws-sdk');

const deleteVisitor = async (event) => {
    const { id } = event.pathParameters;

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    try {
        const result = await dynamodb.delete({
            TableName: 'VisitTable',
            Key: { id }
        }).promise();

        return {
            status: 200,
            body: {
                message: 'Task deleted successfully'
            }
        }
    } catch (error) {
        return {
            status: 500,
            error
        };
    }
};

module.exports = {
    deleteVisitor
};