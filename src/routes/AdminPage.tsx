import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyle';
import { useState } from 'react';
import SideBar from '../components/admin/Sidebar';

const AdminPage = () => {
    const [selectedItem, setSelectedItem] = useState<string>('회원정보');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();

    return (
        <>
            <GlobalStyles />
            <Container>
                <SideBar
                    onItemSelect={setSelectedItem}
                    onSearch={(query: string) => setSearchQuery(query)}
                />
                <Outlet />
            </Container>
        </>
    );
};

export default AdminPage;

const Container = styled.div`
    max-width: 1200px;
    padding: 0 40px;
    min-width: 768px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-family: Pretendard;
    height: auto;
    margin-top: 100px;
    margin-bottom: 100px;
`;
