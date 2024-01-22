import { useMutation, useQueryClient } from '@tanstack/react-query';
import request from '../../utils/request';

function useDeleteUser() {
    const queryClient = useQueryClient();

    const deleteUser = async (userId: number) => {
        await request<null, null, null>({
            uri: `/api/admin/v1/univAdmin/users`,
            method: 'DELETE',
        });
    };

    const { mutate } = useMutation({
        mutationKey: ['user-delete'],
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    'get-pagiable',
                    { uri: '/api/admin/v1/univAdmin/users/' },
                ],
            });
            queryClient.invalidateQueries({
                queryKey: ['get-users'],
            });

            alert(`사용자가 삭제되었습니다.`);
        },
    });

    return {
        mutate,
    };
}

export default useDeleteUser;
