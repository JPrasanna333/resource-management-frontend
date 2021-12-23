import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-display-fields',
  templateUrl: './display-fields.component.html',
  styleUrls: ['./display-fields.component.scss'],
})
export class DisplayFieldsComponent implements OnInit {
  selectedValue: string = 'task';
  displayTaskFields: FormGroup;
  displayProjectFields: FormGroup;
  displayCampaignFields: FormGroup;
  constructor(fb: FormBuilder) {
    this.displayTaskFields = fb.group({
      name: true,
      startDate: true,
      owner: false,
      duration: true,
      endDate: false,
      priority: true,
    });

    this.displayProjectFields = fb.group({
      name: true,
      startDate: false,
      owner: true,
      duration: false,
      endDate: true,
      priority: true,
    });

    this.displayCampaignFields = fb.group({
      name: true,
      startDate: true,
      owner: true,
      duration: false,
      endDate: true,
      priority: false,
    });
  }

  ngOnInit(): void {
    console.log(this.selectedValue);
  }
}
