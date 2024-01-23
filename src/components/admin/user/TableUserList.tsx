import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditModal from './ModifyUser';
import { User } from './UserList';
import useDeleteUsers from '../../../query/delete/useDeleteUser';
import usePatchUser from '../../../query/patch/usePatchUser';
import { useSelectedUsers } from './SelectedUserContext';
import useDeleteUser from '../../../query/delete/useDeleteUser';
import DeleteUser from './DeleteUser';
import EmailModal from './EmailModal';
import ModifyUser from './ModifyUser';

interface TableUserListProps {
    users: User[];
    id: number;
}

export interface UserType {
    name: string;
    major: string;
    part: string;
    ordinal: number;
}

function TableUserList({ users, id }: TableUserListProps) {
    const {
        selectedUserIds,
        setSelectedUserIds,
        selectedUserEmails,
        setSelectedUserEmails,
        selectAll,
    } = useSelectedUsers();
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const selectedEmails = users
        .filter(user => selectedUserIds.includes(user.id))
        .map(user => user.email);

    const handleCheckboxChange = (
        userId: number,
        userEmail: string,
        isChecked: boolean,
    ) => {
        setSelectedUserIds(prev =>
            isChecked ? [...prev, userId] : prev.filter(id => id !== userId),
        );
        setSelectedUserEmails(prev =>
            isChecked
                ? [...prev, userEmail]
                : prev.filter(email => email !== userEmail),
        );
    };

    const handleEdit = (user: User) => {
        setEditingUserId(user.id);
        setEditingUser(user);
    };

    useEffect(() => {
        if (selectAll) {
            const allUserIds = users.map(user => user.id);
            setSelectedUserIds(allUserIds);
        } else {
            setSelectedUserIds([]);
        }
    }, [selectAll, users]);

    return (
        <>
            <Wrapper>
                <BodyTable>
                    {users.map(user => (
                        <TableBody key={user.id}>
                            <Table className="check">
                                <input
                                    type="checkbox"
                                    checked={selectedUserIds.includes(user.id)}
                                    onChange={e =>
                                        handleCheckboxChange(
                                            user.id,
                                            user.email,
                                            e.target.checked,
                                        )
                                    }
                                />
                            </Table>
                            <Table className="name">{user.name}</Table>
                            <Table className="major">{user.major}</Table>
                            <Table className="ordinal">{user.ordinal}기</Table>
                            <Table className="part">{user.part}</Table>
                            <Table className="role">{user.role}</Table>
                            <Table className="email">{user.email}</Table>
                            <Table className="edit">
                                <button onClick={() => handleEdit(user)}>
                                    수정
                                </button>
                            </Table>
                            <Table>
                                <DeleteUser id={user.id} userName={user.name} />
                            </Table>
                        </TableBody>
                    ))}
                </BodyTable>
            </Wrapper>
            {editingUserId && editingUser && (
                <ModifyUser
                    userId={editingUserId}
                    user={editingUser}
                    onClose={() => {
                        setEditingUserId(null);
                        setEditingUser(null);
                    }}
                />
            )}
        </>
    );
}

export default TableUserList;

const Wrapper = styled.div`
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    max-height: 1660px;

    .check {
        margin: 0 10px 0 0;
        height: 24px;
        accent-color: #ff7710;
        color: #ffffff;
    }

    .name {
        width: 93px;
        height: 24px;
    }

    .major {
        width: 156px;
        height: 24px;
    }

    .ordinal {
        width: 48px;
        height: 24px;
    }

    .part {
        width: 75px;
        height: 24px;
    }

    .email {
        width: 311px;
        height: 24px;
    }

    .role {
        width: 62px;
        height: 24px;
    }
`;
const HeadTable = styled.div`
    text-align: left;
    display: flex;

    font-weight: 700;
`;
const BodyTable = styled.div`
    button {
        width: 57px;
        height: 32px;
        padding: 5.5px, 16px, 5.5px, 16px;
        border-radius: 6px;

        padding: 4px 8px;
        background: #eaecee;

        font-weight: 700;
        color: #212224;

        border: none;
        cursor: pointer;

        &:hover {
            background-color: #ff7710;
            color: #ffffff;
        }
    }
`;

const TableBody = styled.div`
    display: flex;
    border-bottom: 1px solid #dcdfe3;
`;

const Table = styled.div`
    padding: 16px 4px;
`;

const Divider = styled.div`
    height: 3px;
    background-color: var(--Grey-900, #212224);
    width: 100%;
    margin-top: 15px;
`;
