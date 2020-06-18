import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-service-call',
  templateUrl: './service-call.component.html',
  styleUrls: ['./service-call.component.scss']
})
export class ServiceCallComponent implements OnInit {
  serviceCallForm:FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any
    ) { }

  ngOnInit(): void {
    this.serviceForm();
  }

  serviceForm(){
    this.serviceCallForm = new FormGroup({
      'serialNumber': new FormControl(this.data.sN),
      'email': new FormControl(null),
      'number': new FormControl(null),
      'address': new FormControl(null)
    });
  }
  onSubmit(){
    console.log(this.serviceCallForm.value);
    this.serviceCallForm.reset();
  }
}
