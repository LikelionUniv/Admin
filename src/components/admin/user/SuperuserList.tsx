import React, { useState } from 'react';

import EditModal from './EditModal';
import EmailModal from './EmailModal';
import Pagination from '../../mypage/Pagination';
import styled from 'styled-components';
import search from '../../../img/admin/search.svg';
import useServerSidePagination from '../../../query/get/useServerSidePagination';
import { IUser } from '../User';

export interface TableRow {
    name: string;
    major: string;
    ordinal: number;
    part: string;
    role: string;
    email: string;
    university: string;
}

const ITEMS_PER_PAGE = 10;

const SuperuserList: React.FC = () => {
    // const [data, setData] = useState<TableRow[]>([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [pageNumber, setPageNumber] = useState(1);
    // const [hasMore, setHasMore] = useState(true);
    // const [editIndex, setEditIndex] = useState<number | null>(null);
    // const [editModalData, setEditModalData] = useState<Partial<TableRow>>({});
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [selectedRole, setSelectedRole] = useState('전체 회원');

    const {curPageItem: data, renderPaginationBtn} = useServerSidePagination<IUser>({
        uri: '/api/admin/v1/univAdmin/users',
        size: 2,
    }); 

    // const fetchMoreData = async () => {
    //     setIsLoading(true);

    //     const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    //     const endIndex = startIndex + ITEMS_PER_PAGE;

    //     const dummyData: TableRow[] = Array.from(
    //         { length: ITEMS_PER_PAGE },
    //         (_, i) => ({
    //             name: `이름${startIndex + i + 1}`,
    //             university: `대학${startIndex + i + 1}`,
    //             major: `전공${startIndex + i + 1}`,
    //             semester: startIndex + i + 1,
    //             part: `파트${startIndex + i + 1}`,
    //             email: `email${startIndex + i + 1}@example.com`,
    //             role: `역할${startIndex + i + 1}`,
    //         }),
    //     );
    //     if (pageNumber < 4) {
    //         setData(dummyData); // 페이지당 10개만 보이도록 수정
    //         setPageNumber(pageNumber);
    //     } else {
    //         setHasMore(false);
    //     }

    //     setIsLoading(false);
    // };

    // const onSearch = useCallback(() => {
    //     // 검색 로직: 대학명과 역할을 기준으로 검색
    //     let filteredData = data.filter(item =>
    //         item.university.includes(searchInput),
    //     );
    //     if (selectedRole !== '전체') {
    //         filteredData = filteredData.filter(
    //             item => item.role === selectedRole,
    //         );
    //     }
    //     setData(filteredData);
    //     setPageNumber(1); // 페이지 번호를 1로 리셋
    // }, [data, searchInput, selectedRole]);

    // const handleScroll = () => {
    //     if (!isLoading && hasMore) {
    //         const table = document.getElementById('infinite-scroll-table');
    //         if (
    //             table &&
    //             table.scrollTop + table.clientHeight >= table.scrollHeight - 100
    //         ) {
    //             fetchMoreData();
    //         }
    //     }
    // };

    // const handleDelete = (index: number) => {
    //     const shouldDelete = window.confirm('선택한 행을 삭제하시겠습니까?');

    //     if (shouldDelete) {
    //         const newData = [...data];
    //         newData.splice(index, 1);
    //         setData(newData);
    //     }
    // };

    // const handleEdit = (index: number) => {
    //     setEditIndex(index);
    //     setEditModalData(data[index]);
    // };

    // const handleModalSave = (updatedData: Partial<TableRow>) => {
    //     const newData = [...data];
    //     newData[editIndex as number] = {
    //         ...data[editIndex as number],
    //         ...updatedData,
    //     };
    //     setData(newData);
    //     setEditIndex(null);
    // };

    // const handleModalCancel = () => {
    //     setEditIndex(null);
    // };

    const handleCheckboxChange = (index: number) => {
        const isSelected = selectedRows.includes(index);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(i => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const handleAllSelectChange = () => {
        setSelectAll(!selectAll);
        setSelectedRows(selectAll ? [] : data.map((_, index) => index));
    };

    // const handleDeleteSelected = () => {
    //     const shouldDelete = window.confirm('선택한 행을 삭제하시겠습니까?');

    //     if (shouldDelete) {
    //         const newData = data.filter(
    //             (_, index) => !selectedRows.includes(index),
    //         );
    //         setData(newData);
    //         setSelectedRows([]);
    //     }
    // };

    const handleEmailModalOpen = () => {
        if (selectedRows.length > 0) {
            setShowEmailModal(true);
        } else {
            console.log(
                'No rows selected. Please select at least one row to send an email.',
            );
        }
    };

    const handleEmailModalClose = () => {
        setShowEmailModal(false);
    };

    // useEffect(() => {
    //     fetchMoreData();
    //     const table = document.getElementById('infinite-scroll-table');
    //     if (table) {
    //         table.addEventListener('scroll', handleScroll);
    //     }

    //     return () => {
    //         if (table) {
    //             table.removeEventListener('scroll', handleScroll);
    //         }
    //     };
    // }, []);

    const handleEdit = (index: number) => {};
    const handleDelete = (index: number) => {};
    const handleDeleteSelected = () => {};

    return (
        <div id="infinite-scroll-table">
            <FlexContainer>
                <DropDown style={{ width: '120px' }}>
                    <select
                        className="DropdownList"
                        value={selectedRole}
                        onChange={e => setSelectedRole(e.target.value)}
                    >
                        <option value="전체">전체</option>
                        <option value="대표">대표</option>
                        <option value="운영진">운영진</option>
                        <option value="아기사자">아기사자</option>
                    </select>
                </DropDown>
                {/* <TextInput
                    borderColor={searchInput !== '' ? '#FF7710' : '#D1D4D8'}
                >
                    <input
                        style={{
                            width: '100%',
                            outline: 'none',
                            border: 'none',
                        }}
                        type="text"
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder="대학 이름 검색"
                    />
                    <img
                        style={{ marginLeft: '8px' }}
                        src={search}
                        onClick={onSearch}
                        alt="검색"
                    />
                </TextInput> */}
            </FlexContainer>
            <Wrapper>
                <HeadTable>
                    <Table className="check">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleAllSelectChange}
                        />
                    </Table>
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
                            <Table className="check">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(index)}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </Table>
                            <Table className="name">{item.name}</Table>
                            <Table className="major">{item.major}</Table>
                            <Table className="generation">
                                {item.ordinal}기
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

            <SelectedActions>
                <div>선택한 회원</div>
                <Button onClick={handleDeleteSelected}>삭제하기</Button>
                <Button
                    style={{ color: '#4D5359' }}
                    onClick={handleEmailModalOpen}
                    disabled={selectedRows.length === 0}
                >
                    이메일 보내기
                </Button>
            </SelectedActions>

            <PageWrapper>
                {renderPaginationBtn()}
            </PageWrapper>

            {/* {editIndex !== null && (
                <EditModal
                    initialData={editModalData}
                    onSave={handleModalSave}
                    onCancel={handleModalCancel}
                />
            )}

            {showEmailModal && (
                <EmailModal
                    onCancel={handleEmailModalClose}
                    selectedRows={selectedRows}
                    data={data}
                />
            )} */}
        </div>
    );
};

export default SuperuserList;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 10px;
`;

const DropDown = styled.div`
    .DropdownName {
        margin-bottom: 10px;
        font-weight: 700;
    }

    .DropdownList {
        padding-left: 20px;
        width: auto;
        height: 40px;
        border-color: #d1d4d8;
        border-radius: 6px;
    }
`;

const TextInput = styled.div<{ borderColor: string }>`
    height: 40px;
    border-radius: 6px;
    border: 1px solid ${props => props.borderColor};
    align-items: center;
    display: inline-flex;
    //justify-content: space-between;
    //    margin: 16px 0 10px 0;
    padding: 0 8px;
`;

const SearchWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
    align-items: center;

    input {
        width: 200px; // 검색창 너비
        padding: 8px; // 패딩
        border: 1px solid #dcdfe3; // 테두리
        border-radius: 6px; // 테두리 둥글기
    }
`;

const Wrapper = styled.div`
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    max-height: 1660px;

    .check {
        width: 33px;
        height: 24px;
        accent-color: #ff7710;
        color: #ffffff;
    }

    .name {
        width: 93px;
        height: 24px;
    }
    .university {
        width: 156px;
        height: 24px;
    }
    .major {
        width: 156px;
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

        font-weight: 700;
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

const SelectedActions = styled.div`
    display: flex;
    margin-top: 20px;

    div {
        font-weight: bold;
        margin-top: 5px;
        margin-right: 10px;
    }
`;

const Button = styled.button`
    margin-right: 10px;
    padding: 8px 16px;
    background-color: #f2f4f6;
    color: #ff7710;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    border: 1px solid #dcdfe3;

    &:hover {
        background-color: #d45a07;
    }
`;

const PageWrapper = styled.div`
    margin: 64px 0 100px 0;
    align-items: center;
    display: flex;
`;
