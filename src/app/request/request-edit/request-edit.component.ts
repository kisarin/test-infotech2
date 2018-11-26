import {Component, OnInit} from "@angular/core";
import {PeopleRequest} from "../../model/people-request";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {RequestService} from "../request.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
})

export class RequestEditComponent implements OnInit{
  request: PeopleRequest;
  editMode = false;
  reqId: number;
  reqTypesDict = [
    {id: 0, value: 'Обращение по телефону'},
    {id: 1, value: 'Обращение по ЕПГУ'},
    {id: 2, value: 'МФЦ'}
  ];
  reqForm: FormGroup;

  constructor ( private route: ActivatedRoute, private router: Router, private reqServ: RequestService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.reqId = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  initForm() {
    //console.log('Init form')
    let reqDate = '';
    let reqType = 0;
    let reqDescr = '';
    if (this.editMode) {
      //console.log('Edit mode is ' + this.editMode);
      this.request = this.reqServ.getRequest(this.reqId);
      if (this.request) {
        reqDate = this.request.date;
        reqType = this.request.type;
        reqDescr = this.request.description;
      }
    }

    this.reqForm = new FormGroup({
      'reqdate': new FormControl(reqDate, Validators.required),
      'reqtype': new FormControl(reqType),
      'reqdescr': new FormControl(reqDescr)});
    //console.log(this.reqForm.value);

  }


  onSubmit() {
    const req = new PeopleRequest(0, '', 0, '', 0);
    req.id = this.reqId;
    req.date = this.reqForm.get('reqdate').value;
    req.description = this.reqForm.get('reqdescr').value;
    req.type = +this.reqForm.get('reqtype').value;
    req.userId = 1;

    if (this.editMode) {
      //console.log(this.reqForm.value);
      this.reqServ.updateRequest(this.reqId, req);
    }
    else {
      this.reqServ.addRequest(req);
    }
    this.onCancel();
  }

  onCancel() {
    //console.log(this.reqForm.value);
    if (this.editMode){
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
    else this.router.navigate(['../'], {relativeTo: this.route});
  }

}