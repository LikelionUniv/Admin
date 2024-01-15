import React from 'react';
import styled from 'styled-components';

function TableBottom() {
    return (
        <>
            <Wrapper>
                <SelectedActions>
                    <div>선택한 회원</div>
                    <Button>삭제하기</Button>
                    <Button style={{ color: '#4D5359' }}>이메일 보내기</Button>
                </SelectedActions>
            </Wrapper>
        </>
    );
}

export default TableBottom;

const Wrapper = styled.div`
    width: 100%;
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
