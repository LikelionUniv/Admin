import React, { useState, useEffect, useCallback } from 'react';

import { UserData, fetchDataFromApi } from './user/UserList';
import styled from 'styled-components';

export interface TableRow {
    isChecked: boolean;
    number: string;
    email: string;
    date: string;
}

interface UserListProps {
    setSelectedItems: React.Dispatch<React.SetStateAction<TableRow[]>>;
}

const AlertList: React.FC<UserListProps> = ({ setSelectedItems }) => {
    const [data, setData] = useState<TableRow[]>([]);
    //const [data, setData] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectAll, setSelectAll] = useState(false);

    const fetchMoreData = async () => {
        setIsLoading(true);

        const dummyData: TableRow[] = Array.from({ length: 100 }, (_, i) => ({
            isChecked: false,
            number: `010-1234-567${i + 1}`,
            email: `email${i + 1}@example.com`,
            date: `YYYY.MM.DD`,
        }));

        if (pageNumber < 4) {
            setData(prevData => [...prevData, ...dummyData]);
            setPageNumber(pageNumber + 1);
        } else {
            setHasMore(false);
        }

        setIsLoading(false);
    };

    const handleScroll = () => {
        if (!isLoading && hasMore) {
            const table = document.getElementById('infinite-scroll-table');
            if (
                table &&
                table.scrollTop + table.clientHeight >= table.scrollHeight - 100
            ) {
                fetchMoreData();
            }
        }
    };

    const handleCheckboxChange = (index: number) => {
        const newData = [...data];
        newData[index].isChecked = !newData[index].isChecked;
        setData(newData);
        setSelectedItems(newData.filter(item => item.isChecked));
    };

    const handleSelectAll = () => {
        const newData = data.map(item => ({ ...item, isChecked: !selectAll }));
        setData(newData);
        setSelectAll(!selectAll);
        setSelectedItems(newData.filter(item => item.isChecked));
    };

    const handleSendNotification = () => {
        const selectedItems = data.filter(item => item.isChecked);
        console.log('Selected Items:', selectedItems);
    };

    useEffect(() => {
        fetchMoreData();
        const table = document.getElementById('infinite-scroll-table');
        if (table) {
            table.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (table) {
                table.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div id="infinite-scroll-table">
            <Wrapper>
                <HeadTable>
                    <Table className="check">
                        <input type="checkbox" onClick={handleSelectAll} />
                    </Table>
                    <Table className="number">휴대폰 번호</Table>
                    <Table className="email">이메일</Table>
                    <Table className="date">알림 신청 날짜</Table>
                </HeadTable>
                <Divider />
                <BodyTable>
                    {data.map((item, index) => (
                        <TableBody key={index}>
                            <Table className="check">
                                <input
                                    type="checkbox"
                                    checked={item.isChecked}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </Table>
                            <Table className="number">{item.number}</Table>
                            <Table className="email">{item.email}</Table>
                            <Table className="date">{item.date}</Table>
                            <Table className="delete"></Table>
                        </TableBody>
                    ))}
                </BodyTable>
            </Wrapper>

            {isLoading && <div>로딩 중...</div>}
        </div>
    );
};

export default AlertList;

const Button = styled.div``;

const Wrapper = styled.div`
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: left;
    align-items: center;
    justify-content: space-between;

    max-height: 1660px;

    .check {
        width: 83px;
        height: 24px;
        accent-color: #ff7710;
        color: #ffffff;
    }

    .number {
        width: 166px;
        height: 24px;
    }

    .email {
        width: 520px;
        height: 24px;
    }

    .date {
        width: 130px;
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
    padding: 16px 16px;
    margin-bottom: 20px;
`;

const Divider = styled.div`
    height: 3px;
    background-color: var(--Grey-900, #212224);
    width: 100%;
`;
