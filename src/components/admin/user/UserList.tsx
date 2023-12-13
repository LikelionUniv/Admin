import React, { useState, useEffect, useCallback } from 'react';

import EditModal from './EditModal';
import { UserData, fetchDataFromApi } from './UserData';
import styled from 'styled-components';

export interface TableRow {
    name: string;
    major: string;
    semester: number;
    part: string;
    email: string;
    role: string;
}

const UserList: React.FC = () => {
    const [data, setData] = useState<TableRow[]>([]);
    //const [data, setData] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const [editModalData, setEditModalData] = useState<Partial<TableRow>>({});

    const fetchMoreData = async () => {
        setIsLoading(true);

        /* try {
            const apiData: UserData[] = await fetchDataFromApi();
            if (apiData.length > 0) {
                setData(prevData => [...prevData, ...apiData]);
                setPageNumber(pageNumber + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }

        setIsLoading(false);
    }; */
        // 더미 데이터를 사용
        const dummyData: TableRow[] = Array.from({ length: 100 }, (_, i) => ({
            name: `이름${i + 1}`,
            major: `전공${i + 1}`,
            semester: i + 1,
            part: `파트${i + 1}`,
            email: `email${i + 1}@example.com`,
            role: `역할${i + 1}`,
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

    const handleDelete = (index: number) => {
        const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

        if (shouldDelete) {
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData);
        }
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditModalData(data[index]);
    };

    const handleModalSave = (updatedData: Partial<TableRow>) => {
        const newData = [...data];
        newData[editIndex as number] = {
            ...data[editIndex as number],
            ...updatedData,
        };
        setData(newData);
        setEditIndex(null);
    };

    const handleModalCancel = () => {
        setEditIndex(null);
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
                    <Table className="name">이름</Table>
                    <Table className="major">전공</Table>
                    <Table className="generation">기수</Table>
                    <Table className="part">파트</Table>
                    <Table className="role">역할</Table>
                    <Table className="email">이메일</Table>
                </HeadTable>
                <Divider />
                <BodyTable>
                    {data.map((item, index) => (
                        <TableBody key={index}>
                            <Table className="name">{item.name}</Table>
                            <Table className="major">{item.major}</Table>
                            <Table className="generation">
                                {item.semester}
                            </Table>
                            <Table className="part">{item.part}</Table>
                            <Table className="role">{item.role}</Table>
                            <Table className="email">{item.email}</Table>
                            <Table className="delete">
                                <button onClick={() => handleEdit(index)}>
                                    수정
                                </button>
                            </Table>
                            <Table>
                                <button onClick={() => handleDelete(index)}>
                                    삭제
                                </button>
                            </Table>
                        </TableBody>
                    ))}
                </BodyTable>
            </Wrapper>

            {isLoading && <div>로딩 중...</div>}

            {editIndex !== null && (
                <EditModal
                    initialData={editModalData}
                    onSave={handleModalSave}
                    onCancel={handleModalCancel}
                />
            )}
        </div>
    );
};

export default UserList;

const Wrapper = styled.div`
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: left;
    align-items: center;
    justify-content: space-between;

    max-height: 1660px;

    .name {
        width: 83px;
        height: 24px;
    }

    .major {
        width: 166px;
        height: 24px;
    }

    .generation {
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
