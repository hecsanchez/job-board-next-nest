import clsx from 'clsx';
import {FC} from 'react';
import Image from 'next/image';
import locationDotSolid from '@/assets/svg/location-dot-solid.svg';
import heartSolid from '@/assets/svg/heart-solid.svg';
import heartSolidFilled from '@/assets/svg/heart-solid-filled.svg';
import dollarSign from '@/assets/svg/dollar-sign-regular.svg';
import doorOpen from '@/assets/svg/door-open-regular.svg';

import { type Job } from '@/types';
import formatCurrency from "@/utils/formatCurrency";

interface JobListItemProps {
    data: Job;
    onClickFavorite?: () => void;
    isFavorite: boolean;
}

const JobListItem: FC<JobListItemProps> = ({ data, onClickFavorite, isFavorite }) => {
    const handleAddToFavorites = (e) => {
        e.stopPropagation();
        onClickFavorite?.(data._id);
    }

    return (
        <>
            <div className={clsx('bg-white border-gray-300 border rounded-lg mb-3 group hover:shadow-[0px_5px_24px_rgba(88,46,255,0.1)] transition hover:border-primary')}>
                <div className="pt-9 pl-8 pr-7 pb-7 text-left cursor-pointer sm:flex justify-between items-center">
                    <div className="flex gap-3 justify-between items-start w-full">
                        <div className="flex flex-col gap-1">
                            <h3 className='font-bold font-poppins text-sm sm:text-2xl text-primary mb-2'>{data.title_name}</h3>
                            <p className='mb-0 flex gap-2 text-primary'>at { data.company_name } <span className="flex gap-1"><Image src={locationDotSolid}/> {data.city_name}</span></p>
                            <div className="flex flex-wrap gap-2 mt-7 mb-4">
                                {data.riasec?.map((riasec: string) => (
                                    <div className="bg-gray-200 py-3 px-2 rounded-lg">
                                        {/*<RiasecIcon riasec={riasec} />*/}
                                        <span className="text-dark font-bold">{riasec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-5">
                            <button onClick={(e)=>handleAddToFavorites(e)}>
                                {isFavorite ? <Image src={heartSolidFilled} /> : <Image src={heartSolid} />}
                            </button>
                            { data.is_earn_and_learn ? (
                                <div className="bg-secondary py-2 px-4 rounded-lg flex text-lg gap-2 items-center">
                                    <Image src={dollarSign}/>
                                    <span className="border-b border-dotted border-b-dark text-dark leading-tight">Earn & Learn</span>
                                </div>
                            ) : null}
                            { data.is_gateway_job ? (
                                <div className="bg-secondary py-2 px-4 rounded-lg flex text-lg gap-2 items-center">
                                    <Image src={doorOpen}/>
                                    <span className="border-b border-dotted border-b-dark text-dark leading-tight">Gateway Job</span>
                                </div>
                            ) : null}
                            <p className="text-3xl text-secondary font-black">{formatCurrency(data.salary)}</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300 mt-4 pt-4 pl-8 pr-7 pb-7">
                    <h3 className="font-extrabold uppercase text-sm mb-2">Skills</h3>
                    {data.skills_name?.map(({value})=>value).join(', ')}
                </div>
            </div>
        </>

    )
}

export default JobListItem;
