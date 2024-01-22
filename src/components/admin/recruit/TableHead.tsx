import React from 'react';
import styled from 'styled-components';
import { useSelectedUsers } from './SelectedUserContext';

function TableHead() {
    const { selectAll, setSelectAll } = useSelectedUsers();

    const handleSelectAllChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSelectAll(event.target.checked);
    };

    return (
        <>
            <Wrapper>
                <HeadTable>
                    <Table className="check">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                        />
                    </Table>
                    <Table className="email">이메일</Table>
                    <Table className="date">알림 신청 날짜</Table>
                </HeadTable>
                <Divider />
            </Wrapper>
        </>
    );
}

export default TableHead;

const Wrapper = styled.div`
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    max-height: 1660px;

    .email {
        width: 311px;
        height: 24px;
    }

    .date {
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