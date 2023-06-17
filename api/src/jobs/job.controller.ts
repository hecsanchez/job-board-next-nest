import { Controller, Get, Query } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async getJobs(
    @Query('page') page: number,
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('sortBy') sortBy: string,
    @Query('query') query?: string,
  ) {
    const { jobs, total } = await this.jobService.getJobs(
      page,
      lat,
      lng,
      sortBy,
      query,
    );

    return { jobs, total };
  }
}
