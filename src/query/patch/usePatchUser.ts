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
            // 성공 시 쿼리 무효화 또는 업데이트
            queryClient.invalidateQueries({ queryKey: ['users-list'] });
            // 필요한 경우 다른 쿼리도 무효화
        },
        // 에러 핸들링 옵션
    });

    return { mutate };
}

export default usePatchUser;
