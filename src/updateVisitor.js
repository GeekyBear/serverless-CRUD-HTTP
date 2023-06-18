const AWS = require('aws-sdk');

const updateVisitor = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;

    const { firstname, lastname } = JSON.parse(event.body);

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


    return {
        status: 200,
        body: JSON.stringify({ message: 'Task updated successfully' })
    };
};

module.exports = {
    updateVisitor
}