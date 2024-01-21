import React from 'react';
import * as D from './DeleteUser.Style';
import { useNavigate } from 'react-router-dom';

import useDeleteUser from '../../../query/delete/useDeleteUser';

interface DeleteUserProps {
    id: number;
}

function DeleteUser({ id }: DeleteUserProps) {
    const { mutate } = useDeleteUser({
        userId: id,
    });

    const deleteProject = () => {
        if (window.confirm('선택한 사용자를 삭제하시겠습니까?')) {
            mutate();
        }
    };

    return (
        <A.Container>
            <A.Btn onClick={goUpdate}>수정하기</A.Btn>
            <A.Btn onClick={deleteProject}>삭제하기</A.Btn>
        </A.Container>
    );
}

export default DeleteUser;
