import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-pcare-header',
  templateUrl: './pcare-header.component.html',
  styleUrls: ['./pcare-header.component.scss']
})
export class PcareHeaderComponent implements OnInit {

  env: any = environment;
  constructor() { }

  ngOnInit() {
  }

}
