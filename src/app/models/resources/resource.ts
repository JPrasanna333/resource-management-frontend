import { Availability } from '../availability/availability';
import { Leave } from '../leave/leave';
import { Task } from '../tasks/task';

export class Resource {
  public constructor(
    public resourceId: number,
    public resourceName: string,
    public resourceType: string,
    public resourceImage: string,
    public availability: Availability,
    public region: string,
    public leave: Leave,
    public taskList?: Task[]
  ) {}
}
