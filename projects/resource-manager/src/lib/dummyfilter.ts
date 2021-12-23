import { Campaign } from './models/campaigns/campaign';
import { Priority } from './models/enums/priority';
import { Status } from './models/enums/status';

export const SampleJson: Object[] = [
  {
    campaignId: 1,
    campaignName: 'ABC',
    campaignOwner: 'XYZ',
    startDate: new Date(),
    endDate: new Date(),
    priority: Priority.HIGH,
    status: Status.DEFINED,
  },
  {
    campaignId: 2,
    campaignName: 'ACD',
    campaignOwner: 'EFG',
    startDate: new Date(),
    endDate: new Date(),
    priority: Priority.LOW,
    status: Status.DEFINED,
  },
  {
    campaignId: 3,
    campaignName: 'ACSCBC',
    campaignOwner: 'ASG',
    startDate: new Date(),
    endDate: new Date(),
    priority: Priority.HIGH,
    status: Status.IN_PROGRESS,
  },
  {
    campaignId: 4,
    campaignName: 'TIPPU',
    campaignOwner: 'AFG',
    startDate: new Date(),
    endDate: new Date(),
    priority: Priority.LOW,
    status: Status.DEFINED,
  },
  {
    campaignId: 5,
    campaignName: 'APPU',
    campaignOwner: 'CVB',
    startDate: new Date(),
    endDate: new Date(),
    priority: Priority.LOW,
    status: Status.IN_PROGRESS,
  },
];
