import connectDB from '../configs/db.js';
import ConnectUsers from '../models/user.model.js';
import corsHeaders from '../utils/corsHeaders.js';

export const handler = async (event) => {
    try {
        await connectDB();

        const body = JSON.parse(event.body || '{}');

        const {
            agentARN,
            userName,
            firstName,
            lastName,
            routingProfile,
            permissions
        } = body;

        if (!agentARN || !userName) {
            return {
                statusCode: 400,
                headers:corsHeaders,
                body: JSON.stringify({
                    success: false,
                    message: 'agentARN and userName are required'
                })
            };
        }

        let user = await ConnectUsers.findOne({ userName });

        if (!user) {
            user = await ConnectUsers.create({
                agentARN,
                userName,
                firstName,
                lastName,
                routingProfile,
                permissions
            });

            return {
                statusCode: 201,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    message: 'User created successfully',
                    data: user
                })
            };
        }

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                success: true,
                message: 'User already exists',
                data: user
            })
        };

    } catch (error) {
        console.error('[addUser]', error);

        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                success: false,
                message: 'Internal Server Error',
            })
        };
    }
};