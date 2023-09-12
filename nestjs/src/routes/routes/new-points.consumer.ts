import { Job } from 'bull';
import { RoutesDriverService } from '../routes-driver/routes-driver.service';
import { Process, Processor } from '@nestjs/bull';

@Processor('new-points')
export class NewPointsConsumer {
  constructor(private routeDriverService: RoutesDriverService) {}

  @Process()
  async handle(job: Job<{ route_id: string; lat: number; lng: number }>) {
    await this.routeDriverService.createOrUpdate(job.data);
    return {};
  }
}
