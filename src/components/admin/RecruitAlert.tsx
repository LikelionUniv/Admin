import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import UserList, { TableRow } from './user/AlertList';
import axios from 'axios';

const contentSubtitles: Record<string, string> = {
    회원정보: '멋대 중앙의 공지사항을 확인할 수 있을지도?.',
    모집알림: '미정.',
    전체게시글: '미정.',
    공지사항: '미정.',
    질문건의: '미정.',
    정보공유: '미정.',
    플젝모집: '미정.',
    플젝자랑: '미정.',
    프론트: '미정.',
    백: '미정.',
    기획: '미정.',
    디자인: '미정.',
    기타: '미정.',
};

const RecruitAlert = () => {
    const [selectedItems, setSelectedItems] = useState<TableRow[]>([]);

    const handleSendNotification = async () => {
        // 선택된 아이템들의 이메일 주소를 추출
        const emailAddresses = selectedItems.map(item => item.email);

        try {
            // POST 요청 보내기
            const response = await axios.post(
                'https://stag.likelionuniv.com/api/admin/v1/alarm/recruit',
                {
                    receivers: emailAddresses,
                    subject: 'string',
                    contentsType: 'string',
                    contents: 'string',
                },
            );

            console.log('성공:', response.data);
        } catch (error) {
            console.error('오류:', error);
        }
    };

    return (
        <Wrapper>
            <div className="TitleAlertCheck">
                <Title>모집 알림</Title>
                <Button
                    disabled={selectedItems.length === 0}
                    onClick={handleSendNotification}
                >
                    선택 알림 보내기
                </Button>
            </div>

            <div style={{ display: 'flex' }}>
                <UserList setSelectedItems={setSelectedItems} />
            </div>
        </Wrapper>
    );
};
export default RecruitAlert;

const Wrapper = styled.div`
    width: 74.5%;

    .TitleAlertCheck {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }
`;

const Title = styled.div`
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 13px;
    color: var(--Grey-900, #212224);
`;

const SubTitle = styled.div`
    color: var(--Grey-700, #868c94);
    font-size: 18px;
    font-weight: 500;
`;

const Divider = styled.div`
    height: 3px;
    background-color: var(--Grey-900, #212224);
    width: 100%;
    margin-top: 26px;
    margin-bottom: 4px;
`;

const Button = styled.button<{ disabled?: boolean }>(
    ({ disabled }) => `
      padding: 8px 20px 8px 14px;
      border-radius: 6px;
      background-color: ${disabled ? '#ADB3BA' : '#ff7710'};
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 12px;
  
      font-size: 16px;
      color: #fff;
      font-weight: 700;
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      border: none;
      outline: none;
  
      &:hover {
          background-color: ${disabled ? '#ADB3BA' : '#ff7710'};
      }
    `,
);
