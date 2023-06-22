const AWS = require('aws-sdk');

const updateVisitor = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;

    const { firstname, lastname } = JSON.parse(event.body);

    try {
        const result = await dynamodb.update({
            TableName: 'VisitTable',
            Key: { id },
            UpdateExpression: 'set firstname = :firstname, lastname = :lastname',
            ExpressionAttributeValues: {
                ':firstname': firstname,
                ':lastname': lastname,
            },
            ReturnValues: 'ALL_NEW'
        }).promise();

        if (!result) return { status: 404, body: JSON.stringify({ message: 'Visit not found' }) }

        return {
            status: 200,
            body: JSON.stringify({ message: 'Task updated successfully' })
        };
    } catch (error) {
        return {
            status: 500,
            error
        };
    }
};

module.exports = {
    updateVisitor
}