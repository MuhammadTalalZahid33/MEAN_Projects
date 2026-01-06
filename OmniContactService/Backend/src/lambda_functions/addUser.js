import connectDB from '../configs/db.js';
import User from '../models/user.model.js';

export const handler = async (event) => {
    try {
        await connectDB();

        const body = JSON.parse(event.body || '{}');

        const {
            agentId,
            username,
            firstName,
            lastName,
            routingProfile,
            queues
        } = body;

        if (!agentId || !username) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    message: 'agentId and username are required'
                })
            };
        }

        let user = await User.findOne({ agentId });

        if (!user) {
            user = await User.create({
                agentId,
                username,
                firstName,
                lastName,
                routingProfile,
                queues
            });
        }

        return {
            statusCode: 200,
            success: true,
            body: JSON.stringify(user)
        };

    } catch (error) {
        console.error('[addUser]', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Internal Server Error'
            })
        };
    }
};
