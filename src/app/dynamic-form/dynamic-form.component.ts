import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})

export class DynamicFormComponent implements OnInit {


  formValue !: FormGroup;
  filterFields: any= [];
  
  constructor( private httpClient: HttpClient, private formBuilder : FormBuilder,) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      id:[''],
      firstname:['', [
        Validators.required,
        Validators.minLength(3)]],
      lastname:[''],
      email:[''],
      mobile:[''],
      par_address:[''],
      pre_address:[''],
      gender:[''],
      salary:[''],
    });

    this.httpClient.get("/assets/customer_info.json").subscribe(data => {
      this.filterFields = data;
      console.log("data"+data)
    });

  }

  get f() {
    return this.formValue.controls;
  }

  onSubmit(): void {
    if (this.formValue.valid) {
      let value = this.formValue.value;
      this.formValue.reset();
    }
  }

}
