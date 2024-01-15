import { useSuspenseQuery } from '@tanstack/react-query';
import request from '../../utils/request';

interface User {
    id: number;
    name: string;
    email: string;
    major: string;
    part: string;
    ordinal: number;
    role: string;
}

interface UserResponse {
    data: User[];
    totalPage: number;
    totalElements: number;
    currentPage: number;
}

interface UseGetUsersProps {
    page: number;
    size: number;
    sort: string;
}

function useGetAdminUsers({ page, size, sort }: UseGetUsersProps) {
    const fetchUsers = async (): Promise<UserResponse> => {
        const response = await request<null, UserResponse, null>({
            uri: `/api/admin/v1/univAdmin/univ/users?page=${page}&size=${size}&sort=${sort}`,
            method: 'get',
        });

        return response.data;
    };

    const {
        data: usersData,
        isFetching,
        isError,
        error,
    } = useSuspenseQuery({
        queryKey: ['get-users', page, size, sort],
        queryFn: fetchUsers,
    });

    return {
        usersData,
        isFetching,
        isError,
        error,
    };
}

export default useGetAdminUsers;
