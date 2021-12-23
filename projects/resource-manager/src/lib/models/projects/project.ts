import { Campaign } from '../campaigns/campaign';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';
import { Task } from '../tasks/task';

export class Project {
  public constructor(
    public projectId: number,
    public projectName: string,
    public projectOwner: string,
    public startDate: Date,
    public endDate: Date,
    public priority: Priority,
    public status: Status,
    public tasks: Task[],
    public campaign: Campaign
  ) {}
}
