import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigServiceService } from '../config-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html', 
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  userForm: FormGroup;
  file:any;
  constructor(private formBuilder: FormBuilder,private service:ConfigServiceService) {
    this.userForm = this.formBuilder.group({
      file1:[null,Validators.required],
      file2:[null,Validators.required],
      name:['',Validators.required],
    fileSource1:['', Validators.required],
    fileSource2:['', Validators.required]
    })
   
  }
ngOnInit(){

} 
do(){
  const formData: FormData = new FormData();
  // formData.append('fileKey',, "file");
}
onFileChange(event,id) {
  
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    if(id==1){
      this.userForm.patchValue({
        fileSource1: file
      });
    }
    if(id==2){
      this.userForm.patchValue({
        fileSource2: file
      });
    }
  }
}
submit(){
  const headers = new Headers();
  headers.append('Content-Type', 'multipart/form-data');
  const formData = new FormData();
 var d = this.userForm.get('fileSource1').value;
 var d2 = this.userForm.get('fileSource2').value;
  formData.append('files.file1', d);
  formData.append('files.file2', d2);
  formData.append("data",JSON.stringify(this.userForm.value))
  this.service.posth('/emails', formData,headers)
    .subscribe(res => {
      alert('Uploaded Successfully.');
    })
}
}
 