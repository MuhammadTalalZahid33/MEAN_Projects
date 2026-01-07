import connectDB from '../configs/db.js';
import ConnectUsers from '../models/user.model.js';
import corsHeaders from '../utils/corsHeaders.js';

export const handler = async (event) => {
    try {
        await connectDB();

        const userName = event.queryStringParameters?.userName;

        if (!userName) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: false,
                    message: 'userName is required'
                })
            };
        }

        const user = await ConnectUsers.findOne({ userName });

        if (!user) {
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: false,
                    message: 'User not found'
                })
            };
        }

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                success: true,
                data: user
            })
        };

    } catch (error) {
        console.error('[getUser]', error);

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