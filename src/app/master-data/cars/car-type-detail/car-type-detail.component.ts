import { Component, OnInit } from '@angular/core';
import { CarTypeViewModel } from '../car-type.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CarTypeService } from '../car-type.service';

@Component({
  selector: 'app-car-type-detail',
  templateUrl: './car-type-detail.component.html',
  styleUrls: ['./car-type-detail.component.css']
})
export class CarTypeDetailComponent implements OnInit {

  data: CarTypeViewModel;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carTypeService: CarTypeService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.carTypeService.getCarTypeById(this.id).subscribe(data => {
      this.data = data;
      console.log(this.data);

    });
  }

  onAddCarType() {
    this.router.navigate(['/car-type-create']);
  }

  onEditCarType() {
    this.router.navigate(['/car-type-create', { id: this.id }]);
  }

  discard() {
    this.router.navigate(['/car-type-list']);
  }

}
