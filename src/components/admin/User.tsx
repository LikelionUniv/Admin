import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>(
                    '/api/v1/univAdmin/users',
                );
                setUsers(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
};

const User: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <div className="TitleUniversity">
                <Title>회원정보</Title>
                <UniversityName>홍익대학교</UniversityName>
            </div>

            <div style={{ display: 'flex' }}>
                <UserList />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 74.5%;

    .TitleUniversity {
        display: flex;
        align-items: baseline;
    }
`;

const Title = styled.div`
    font-size: 40px;
    font-weight: 700;
    color: var(--Grey-900, #212224);
    line-height: 150%;
`;

const UniversityName = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: var(--orange-600, #ff7710);

    border-radius: 42px;
    padding: 6px 12px 6px 12px;
    margin: 12px;
    background: #fff2e8;
`;

const SubTitle = styled.div`
    color: var(--Grey-700, #868c94);
    font-size: 18px;
    font-weight: 500;
`;

const Divider = styled.div`
    height: 3px;
    background-color: var(--Grey-900, #212224);
    width: 100%;
    margin-top: 26px;
    margin-bottom: 4px;
`;

export { User, UserList };
