import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AlarmList from './recruit/AlarmList';

function RecruitAlarm() {
    const [users, setUsers] = useState<string | undefined>();

    return (
        <Wrapper>
            <div className="TitleUniversity">
                <Title>모집 알림</Title>
                <AlarmRequest>알림 신청</AlarmRequest>
            </div>
            {
                <Suspense fallback={<div>loading...</div>}>
                    <AlarmList />
                </Suspense>
            }
        </Wrapper>
    );
}

export default RecruitAlarm;

const Wrapper = styled.div`
    width: 74.5%;

    .TitleUniversity {
        display: flex;
        align-items: baseline;
    }
`;

const Title = styled.div`
    font-size: 40px;
    font-weight: 700;
    color: var(--Grey-900, #212224);
    line-height: 150%;
`;

const AlarmRequest = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: var(--orange-600, #ff7710);

    border-radius: 42px;
    padding: 6px 12px 6px 12px;
    margin: 12px;
    background: #fff2e8;
`;
