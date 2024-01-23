import React, { useState } from 'react';
import { useSelectedUsers } from './SelectedUserContext';
import useDeleteUserList from '../../../query/delete/useDeleteUserList';
import styled from 'styled-components';
import EmailModal from './EmailModal';

const TableBottom: React.FC = () => {
    const { selectedUserIds, setSelectedUserIds, selectedUserEmails } =
        useSelectedUsers(); // 이메일 정보를 가져옵니다
    const { mutate } = useDeleteUserList(); // 수정된 훅 사용
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const openEmailModal = () => setIsEmailModalOpen(true);
    const closeEmailModal = () => setIsEmailModalOpen(false);

    const handleDelete = () => {
        if (
            selectedUserIds.length > 0 &&
            window.confirm('선택한 사용자를 삭제하시겠습니까?')
        ) {
            // 각 사용자 ID에 대해 삭제 요청을 수행
            selectedUserIds.forEach(userId => {
                mutate(userId, {
                    onSuccess: () => {
                        // 삭제 성공 시, 선택된 사용자 목록에서 해당 사용자 ID 제거
                        setSelectedUserIds(prevIds =>
                            prevIds.filter(id => id !== userId),
                        );
                    },
                    onError: error => {
                        // 에러 처리
                        console.error('삭제 중 오류 발생:', error);
                    },
                });
            });
        }
    };

    const handleSendEmail = () => {
        console.log('Sending emails to:', selectedUserEmails); // 이메일 보내기 로직을 추가할 수 있습니다.
        openEmailModal();
    };

    return (
        <Wrapper>
            <SelectedActions>
                <div>선택한 회원</div>
                <Button onClick={handleDelete}>삭제하기</Button>
                <Button style={{ color: '#4D5359' }} onClick={handleSendEmail}>
                    이메일 보내기
                </Button>
            </SelectedActions>
            {isEmailModalOpen && (
                <EmailModal
                    selectedEmails={selectedUserEmails}
                    onCancel={closeEmailModal}
                />
            )}
        </Wrapper>
    );
};

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

const PageWrapper = styled.div`
    margin: 64px 0 100px 0;
    display: flex;
    justify-content: center;
`;
