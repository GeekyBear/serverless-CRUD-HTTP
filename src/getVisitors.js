const AWS = require('aws-sdk');

const getVisitors = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const result = await dynamodb
            .scan({
                TableName: 'VisitTable'
            })
            .promise();

        const visitors = result.Items;

        return {
            status: 200,
            body: {
                visitors
            }
        };
    } catch (error) {
        return {
            status: 500,
            error
        };
    }
};

module.exports = {
    getVisitors
}