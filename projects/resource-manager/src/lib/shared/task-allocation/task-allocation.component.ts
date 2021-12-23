import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'lib-task-allocation',
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.scss'],
})
export class TaskAllocationComponent implements OnInit {
  taskFormAllocation: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.taskFormAllocation = this.formBuilder.group({
      startDate: '',
      endDate: '',
      actualStartDate: '',
      actualEndDate: '',
      status: '',
      priority: '',
      task: '',
      allocation: '',
      role: ['', Validators.required],
      description: '',
    });
  }

  ngOnInit(): void {}
}
