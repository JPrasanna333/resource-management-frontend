import { AvailableStatus } from '../enums/available-status';

export class Availability {
  public constructor(
    public availableId: number,
    public availableType: string,
    public availableHours: number,
    public startDate: Date,
    public endDate: Date,
    public availableStatus: AvailableStatus
  ) {}
}
