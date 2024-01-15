import React, { useState } from 'react';
import styled from 'styled-components';
import TableUserList from './TableUserList';
import TableHead from './TableHead';
import TableBottom from './TableBottom';
import useGetAdminUsers from '../../../query/get/useGetAdminUsers';
import useServerSidePagination from '../../../query/get/useServerSidePagination';
import { SelectedUsersProvider } from './SelectedUserContext';

export interface UnivAdminUsers {
    id: number;
    name: string;
    email: string;
    major: string;
    part: string;
    ordinal: number;
    role: string;
}

function UserList({ order = 'createdDate,DESC' }) {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const { usersData, isFetching, isError, error } = useGetAdminUsers({
        page,
        size,
        sort: order,
    });

    if (isFetching) return <div>Loading...</div>;

    if (isError) return <div>Error: {error?.message}</div>;

    const users = Array.isArray(usersData?.data) ? usersData.data : [];

    return (
        <SelectedUsersProvider>
            <Wrapper>
                <TableHead />
                {users.map(user => (
                    <TableUserList key={user.id} users={[user]} />
                ))}
                <TableBottom />
            </Wrapper>
        </SelectedUsersProvider>
    );
}

export default UserList;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
