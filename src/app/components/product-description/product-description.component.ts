import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DataWithToken } from 'src/app/models/data-with-token';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServiceCallComponent } from 'src/app/components/call/service-call/service-call.component'
@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  i:string = '';
  config:string = '';
  spinner:boolean = false;
  dataWithToken:DataWithToken;
  setSerialNumber:string;
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.i = this.activatedRoute.snapshot.paramMap.get('i');
    this.getDataByUrlId();
  }

  async getDataByUrlId(){
    this.config = localStorage.getItem('customToken');
    this.spinner = true;
    this.dataService.recivedataWithToken(this.config).subscribe(
      (data: any) => {
        this.dataWithToken = data[this.i];
        this.spinner = false;
        console.log(this.dataWithToken);
      }
    );
  }

  backToHome(){
    this.router.navigate(['/']);
  }

  serviceCallDialog(serialNumber:string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      sN: serialNumber,
    };

    this.dialog.open(ServiceCallComponent, dialogConfig);
    console.log(dialogConfig.data.sN)
  }

}
