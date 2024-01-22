import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TableAlarmList from './TableAlarmList';
import TableHead from './TableHead';
// import TableBottom from './TableBottom';
import { SelectedUsersProvider } from './SelectedUserContext';
import useServerSidePagination from '../../../query/get/useServerSidePagination';

interface AlarmListProps {
    order?: string;
    searchQuery?: string;
}

interface Recruit {
    name: string;
    email: string;
    phone: string;
    generation: number;
}

export interface Alarm {
    universityName: string;
    recruits: Recruit[];
}

function AlarmList({ order, searchQuery }: AlarmListProps) {
    const { curPageItem: alarms, renderPaginationBtn } =
        useServerSidePagination<Alarm>({
            uri: '/api/admin/v1/alarm/recruit',
            size: 10,
            sort: order,
            search: searchQuery,
        });

    return (
        <>
            <SelectedUsersProvider>
                <Wrapper>
                    <TableHead />
                    <TableAlarmList alarms={alarms} />
                    {renderPaginationBtn()}
                    {/* <TableBottom /> */}
                </Wrapper>
            </SelectedUsersProvider>
        </>
    );
}

export default AlarmList;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Nav = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0 10px 0;
`;
