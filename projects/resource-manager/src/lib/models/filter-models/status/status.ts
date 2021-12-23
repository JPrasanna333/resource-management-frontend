export class StatusFilter {
  constructor(
    public defined: boolean,
    public in_progress: boolean,
    public completed: boolean,
    public on_hold: boolean
  ) {}
}
