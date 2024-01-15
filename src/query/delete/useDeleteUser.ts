import { useMutation, useQueryClient } from '@tanstack/react-query';
import request from '../../utils/request';

// 사용자를 삭제하는 함수

// useDeleteUser 훅 수정
function useDeleteUser() {
    const queryClient = useQueryClient();

    const deleteUser = async (userIds: number[]) => {
        for (const userId of userIds) {
            await request({
                uri: `/api/admin/v1/univAdmin/users/${userId}`,
                method: 'DELETE',
            });
        }
    };

    const { mutate } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users-list'] });
        },
    });

    return { mutate };
}

export default useDeleteUser;
