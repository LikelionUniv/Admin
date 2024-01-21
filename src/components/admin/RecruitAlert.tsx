import React, { useState, useEffect } from 'react';

interface Recruit {
    name: string;
    email: string;
}

interface RecruitResponse {
    recruits: Recruit[];
}

const RecruitList = () => {
    const [recruitsData, setRecruitsData] = useState<RecruitResponse | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecruits = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    'https://stag.likelionuniv.com/api/admin/v1/recruit',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: localStorage.getItem('access token'), // Replace with your actual token
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: RecruitResponse = await response.json();
                setRecruitsData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecruits();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Recruits List</h2>
            <ul>
                {recruitsData?.recruits.map(
                    (recruit: Recruit, index: number) => (
                        <li key={index}>
                            <strong>Name:</strong> {recruit.name} -{' '}
                            <strong>Email:</strong> {recruit.email}
                        </li>
                    ),
                )}
            </ul>
        </div>
    );
};

export default RecruitList;
