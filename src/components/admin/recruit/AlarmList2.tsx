import React, { Suspense, useState } from 'react';
import useGetRecruitList from '../../../query/get/useGetRecruitList';
import styled from 'styled-components';

function RecruitList() {
    const [generation, setGeneration] = useState(0); // 기본 세대, 필요에 따라 변경 가능
    const { data: recruitList } = useGetRecruitList({ generation });

    if (!recruitList) return <div>Loading...</div>;

    return (
        <Wrapper>
            {recruitList.map(univ => (
                <div key={univ.universityName}>
                    <h2>{univ.universityName}</h2>
                    {univ.recruits.map(recruit => (
                        <div key={recruit.email}>
                            <p>
                                {recruit.name} - {recruit.email}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </Wrapper>
    );
}

export default RecruitList;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
