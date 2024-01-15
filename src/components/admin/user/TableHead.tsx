import React from 'react';
import styled from 'styled-components';

function TableHead() {
    return (
        <>
            <Wrapper>
                <HeadTable>
                    <Table className="check">
                        <input type="checkbox" />
                    </Table>

                    <Table className="name">이름</Table>
                    <Table className="major">전공</Table>
                    <Table className="ordinal">기수</Table>
                    <Table className="part">파트</Table>
                    <Table className="role">역할</Table>
                    <Table className="email">이메일</Table>
                </HeadTable>
                <Divider />
            </Wrapper>
        </>
    );
}

export default TableHead;

/* export interface TableRow {
    name: string;
    major: string;
    semester: number;
    part: string;
    email: string;
    role: string;
}

const ITEMS_PER_PAGE = 10;

const UserList: React.FC = () => {
    const [data, setData] = useState<TableRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editModalData, setEditModalData] = useState<Partial<TableRow>>({});
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);

    const fetchMoreData = async () => {
        setIsLoading(true);

        const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        const dummyData: TableRow[] = Array.from(
            { length: ITEMS_PER_PAGE },
            (_, i) => ({
                name: `이름${startIndex + i + 1}`,

                major: `전공${startIndex + i + 1}`,
                semester: startIndex + i + 1,
                part: `파트${startIndex + i + 1}`,
                email: `email${startIndex + i + 1}@example.com`,
                role: `역할${startIndex + i + 1}`,
            }),
        );
        if (pageNumber < 4) {
            setData(dummyData); // 페이지당 10개만 보이도록 수정
            setPageNumber(pageNumber);
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
        const shouldDelete = window.confirm('선택한 행을 삭제하시겠습니까?');

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

    const handleDeleteSelected = () => {
        const shouldDelete = window.confirm('선택한 행을 삭제하시겠습니까?');

        if (shouldDelete) {
            const newData = data.filter(
                (_, index) => !selectedRows.includes(index),
            );
            setData(newData);
            setSelectedRows([]);
        }
    };

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
 */
/* return (
        <div id="infinite-scroll-table">
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
                                {item.semester}기
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
                <Pagination
                    totalPageNum={Math.ceil(data.length / ITEMS_PER_PAGE)}
                    pageNum={pageNumber}
                    setPageNum={setPageNumber}
                />
            </PageWrapper>

            {editIndex !== null && (
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
            )}
        </div>
    );
}; */

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
        width: 83px;
        height: 24px;
    }

    .major {
        width: 135px;
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
