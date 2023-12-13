import axios from 'axios';

export interface UserData {
    name: string;
    major: string;
    semester: number;
    part: string;
    email: string;
    role: string;
}

export const fetchDataFromApi = async (): Promise<UserData[]> => {
    try {
        const response = await axios.get(`/api/admin/v1/univAdmin/users`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching User Data:`, error);
        throw error;
    }
};
