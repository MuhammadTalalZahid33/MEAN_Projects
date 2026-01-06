import connectDB from '../configs/db.js';
import User from '../models/user.model.js';

export const handler = async (event) => {
    try {
        await connectDB();

        const agentId = event.queryStringParameters?.agentId;

        if (!agentId) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    message: 'agentId is required'
                })
            };
        }

        const user = await User.findOne({ agentId });

        if (!user) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    success: false,
                    message: 'User not found'
                })
            };
        }

        return {
            statusCode: 200,
            success: true,
            body: JSON.stringify(user)
        };

    } catch (error) {
        console.error('[getUser]', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Internal Server Error'
            })
        };
    }
};
