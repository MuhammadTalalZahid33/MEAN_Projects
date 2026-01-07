import connectDB from '../configs/db.js';
import User from '../models/user.model.js';

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
                body: JSON.stringify({
                    success: false,
                    message: 'agentARN and userName are required'
                })
            };
        }

        let user = await User.findOne({ agentARN });

        if (!user) {
            user = await User.create({
                agentARN,
                userName,
                firstName,
                lastName,
                routingProfile,
                permissions
            });

            return {
                statusCode: 201,
                body: JSON.stringify({
                    success: true,
                    message: 'User created successfully',
                    data: user
                })
            };
        }

        return {
            statusCode: 200,
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
            body: JSON.stringify({
                success: false,
                message: 'Internal Server Error',
            })
        };
    }
};