import { useMutation, useQueryClient } from '@tanstack/react-query';
import request from '../../utils/request';

export interface UserUpdateData {
    name: string;
    major: string;
    part: string;
    ordinal: number;
}

function usePatchUser(userId: number) {
    const queryClient = useQueryClient();

    const patchUser = async (userData: UserUpdateData) => {
        const response = await request({
            uri: `/api/admin/v1/univAdmin/users/${userId}`,
            method: 'PATCH',
        });

        return response;
    };

    const { mutate } = useMutation({
        mutationFn: patchUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users-list'] });
        },
    });

    return { mutate };
}

export default usePatchUser;
