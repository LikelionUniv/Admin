import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from './Sidebar';
import Notice from './Notice';

const Admin: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<string>('전체 게시글');
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <>
            <Container>
                <SideBar
                    onItemSelect={setSelectedItem}
                    onSearch={(query: string) => setSearchQuery(query)}
                />
                <Notice selectedItem={selectedItem} searchQuery={searchQuery} />
            </Container>
        </>
    );
};

export default Admin;

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
`;
