import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  datos: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (data) => {
        this.datos = data;
      },
      (error) => {
        console.log('Error al obtener los datos: ', error);
      }
    );
  }
}
