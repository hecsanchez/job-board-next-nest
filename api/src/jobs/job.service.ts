import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async getJobs(
    page: number,
    lat: number,
    lng: number,
    sortBy?: string,
    query?: string,
  ): Promise<{ jobs: Job[]; total: number }> {
    const skip = (page - 1) * 10;
    let jobs: Job[];
    let total: number;

    const searchByQuery = query
      ? {
          $text: {
            $search: query,
          },
        }
      : {};

    if (sortBy === 'distance' && lat && lng) {
      const searchByDistanceQuery = {
        'location.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
          },
        },
        expiredAt: null,
      };

      jobs = await this.jobModel
        .find({ ...searchByDistanceQuery, ...searchByQuery })
        .skip(skip)
        .limit(10)
        .exec();
      total = await this.jobModel.count({
        ...searchByDistanceQuery,
        ...searchByQuery,
      });
    } else {
      jobs = await this.jobModel
        .find({ expiredAt: null, ...searchByQuery })
        .sort({ posted: -1 })
        .skip(skip)
        .limit(10)
        .exec();
      total = await this.jobModel
        .countDocuments({ expiredAt: null, ...searchByQuery })
        .exec();
    }

    return { jobs, total };
  }
}
