import { useSuspenseQuery } from '@tanstack/react-query';
import request from '../../utils/request';

interface UseGetAlarmsProps {
    generation: number;
}

interface Recruit {
    name: string;
    email: string;
    phone: string;
    generation: number;
}

export interface Alarm {
    universityName: string;
    recruits: [];
}

interface AlarmResponse {
    data: Alarm[];
}

function useGetAlarmList({ generation }: UseGetAlarmsProps) {
    const fetchAlarmsList = async () => {
        const response = await request<null, AlarmResponse, null>({
            uri: `/api/admin/v1/alarm/recruit?generation=${generation}`,
            method: 'get',
        });

        return response.data;
    };

    const { data } = useSuspenseQuery({
        queryKey: ['get-recruits', generation],
        queryFn: fetchAlarmsList,
    });

    return {
        data,
    };
}

export default useGetAlarmList;
