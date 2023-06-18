import {Job} from "@/types";

interface Params extends Record<string, string|number|null> {
    page: number;
    lat: number | null;
    lng: number | null;
    sortBy: string;
}

const BASE_URL = 'http://localhost:8000'
export const getJobs = async (params: Params) => {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    const queryParams = searchParams.toString()
    try {
        const response = await fetch(`${BASE_URL}/jobs?${queryParams}`)
        return response.json();
    } catch(err) {
        console.log('err', err)
    }
}
