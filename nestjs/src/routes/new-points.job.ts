import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { RoutesDriverService } from './routes-driver/routes-driver.service';

@Processor('new-points')
export class NewPointsJob {
  constructor(private routeDriverService: RoutesDriverService) {}

  @Process()
  async handle(job: Job<{ route_id: string; lat: number; lng: number }>) {
    await this.routeDriverService.createOrUpdate(job.data);
    return {};
  }
}
