'use server'
import axios from 'axios'

const FB_PROFILE_API = process.env.LINE_GET_PROFILE_API
const FB_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN

export async function getLineProfile(userId) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: LINE_PROFILE_API + userId,
        headers: {
            'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
        }
    };
    const response = await axios.request(config)
    return response.data
}
