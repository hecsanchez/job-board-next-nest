'use client';
import JobListItem from "@/components/organisms/JobListItem";
import { type Job } from '@/types';
import {FC, LegacyRef, MutableRefObject, useEffect, useRef, useState} from "react";
import {getJobs} from "@/services/jobs";
import Spinner from "@/components/atoms/Spinner";
import useGeolocation from "@/hooks/useGeoLocation";
import useDebounce from "@/hooks/useDebounce";

const JobsList: FC = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    const [endOfPage, setEndOfPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('default');
    const [page, setPage] = useState(1);
    const [endOfResults, setEndOfResults] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [keyword, setKeyword] = useState(null)
    const debouncedKeyword = useDebounce(keyword, 500);

    const ref = useRef<Element>()

    const { latitude: lat, longitude: lng, error, loading: loadingLocation } = useGeolocation();

    useEffect(()=>{
        setLoading(true);
        if (!loadingLocation) {
            const sort = lat && lng ? 'distance' : 'default';
            setSortBy(sort);
            const fetchJobs = async () => {
                const { data, total} = await getJobs({ page, lat, lng, sortBy: sort });
                console.log('jobsRes', data)
                setJobs(data);
                setLoading(false)
            }
            fetchJobs();
        }
    }, [loadingLocation])

    useEffect(()=>{
        if (!endOfResults && endOfPage && jobs.length > 0) {
            setLoading(true);
            setEndOfPage(false);
            const fetchMoreJobs = async () => {
                const nextPage = page + 1
                setPage(nextPage);

                const { data, total} = await getJobs({ page: nextPage, lat, lng, sortBy, query: keyword });
                setJobs(prevState => [...prevState, ...data]);
                setLoading(false)
                if (data.length === 0) {
                    setEndOfResults(true);
                }
            }

            fetchMoreJobs();
        }

    }, [endOfPage])

    useEffect(()=>{
        if (debouncedKeyword) {
            setSortBy('default');
            setJobs([])
            setLoading(true);
            const fetchJobs = async () => {
                const { data, total} = await getJobs({ page, sortBy: 'default', query: debouncedKeyword });
                console.log('jobsRes', data)
                setJobs(data);
                setLoading(false)
            }
            fetchJobs();
        }
    }, [debouncedKeyword])

    const intesectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    } as IntersectionObserverInit;

    const observerCallback = (entries: IntersectionObserverEntry[]): void => {
        const [entry] = entries;
        setEndOfPage(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            observerCallback,
            intesectionObserverOptions,
        );

        if (ref.current) {
            observer.observe(ref.current as Element);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current as Element);
        };
    }, [ref]);

    const handleOnClickFavorite = (jobId: string) => {
        if (favorites.includes(jobId)) {
            setFavorites(prevState => prevState.filter(id => id !== jobId));
        } else {
            setFavorites(prevState => ([...prevState, jobId]));
        }
    }

    const handleSearchByKeyword = (e) => {
        setKeyword(e.target.value)
    }

    const isFavorite = (jobId: string) => favorites.includes(jobId);

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <p className="flex gap-2 text-lg">
                    <span className="font-bold">Showing {jobs.length} results.</span>
                    <span className="border-b border-dashed border-[#707070]">How did we choose these open jobs?</span>
                </p>
                <div>
                    <input onChange={handleSearchByKeyword} type="text" className="border border-gray-500 py-3 px-4 rounded-md" placeholder="Keyword"/>
                </div>
            </div>

            {jobs?.map((job: Job)=>(
                <JobListItem key={job.id} data={job} onClickFavorite={handleOnClickFavorite} isFavorite={isFavorite(job._id)}/>
            ))}
            {loading ? <div className="flex justify-center"><Spinner/></div> : null}
            <div ref={ref as LegacyRef<HTMLDivElement>} className="h-10"/>
        </div>
    )
}

export default JobsList;
