import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [NgIf, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  datos: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.llenarDatos();
  }

  llenarDatos() {
    this.dataService.getData().subscribe((data) => {
      this.datos = data.results;
      console.log(this.datos);
    });
  }
}
