import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserList from './user/UserList';
import OrderDropDown from './user/OrderDropDown';
import SearchBar from './Search/SearchBar';
import { useUserProfile } from '../../api/mypage/useUserProfile';

function User() {
    const [users, setUsers] = useState<string | undefined>();
    const [order, setOrder] = useState<string | undefined>();
    const [searchQuery, setSearchQuery] = useState<string | undefined>();
    const userProfile = useUserProfile();
    const universityName = userProfile.universityName;

    return (
        <Wrapper>
            <div className="TitleUniversity">
                <Title>회원정보</Title>
                <UniversityName>{universityName}</UniversityName>
            </div>
            <Nav>
                <OrderDropDown />
                <SearchBar setSearchQuery={setSearchQuery} />
            </Nav>
            <Suspense fallback={<div>loading...</div>}>
                <UserList order={order} searchQuery={searchQuery} />
            </Suspense>
        </Wrapper>
    );
}

export default User;

const Wrapper = styled.div`
    width: 74.5%;

    .TitleUniversity {
        display: flex;
        align-items: baseline;
    }
`;

const Nav = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0 10px 0;
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
