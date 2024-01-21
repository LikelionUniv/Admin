import { useSuspenseQuery } from '@tanstack/react-query';
import request from '../../utils/request';

interface RecruitResponse {
    universityName: string;
    recruits: Recruit[];
}

interface Recruit {
    name: string;
    email: string;
}

interface UseGetRecruitsProps {
    generation: number;
}

function useGetRecruitList({ generation }: UseGetRecruitsProps) {
    const fetchRecruits = async (): Promise<RecruitResponse> => {
        const response = await request<null, RecruitResponse, null>({
            uri: `/api/admin/v1/alarm/recruit?generation=${generation}`,
            method: 'get',
        });

        return response.data;
    };

    const {
        data: recruitsData,
        isFetching,
        isError,
        error,
    } = useSuspenseQuery({
        queryKey: ['get-recruits', generation],
        queryFn: fetchRecruits,
    });

    return {
        recruitsData,
        isFetching,
        isError,
        error,
    };
}

export default useGetRecruitList;
