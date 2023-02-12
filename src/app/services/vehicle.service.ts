import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehicle } from 'src/app/models/veiculosModel';
import { VehicleFilterDto } from 'src/app/dtos/veiculosFilterDto';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url = 'http://localhost:8080/vehicles';

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Promise<any> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response);
  }

  findBrands(): Promise<any> {
    return this.http.get(`${this.url}/brands`)
      .toPromise()
      .then(response => response);
  }

  findTotalVehiclePerBrands(): Promise<any> {
    return this.http.get(`${this.url}/totalVehiclePerBrands`)
      .toPromise()
      .then(response => response);
  }

  findTotalVehiclePerDecade(): Promise<any> {
    return this.http.get(`${this.url}/totalVehiclePerDecade`)
      .toPromise()
      .then(response => response);
  }

  save(veiculo: Vehicle): Promise<any> {
    return this.http.post(this.url, veiculo)
      .toPromise()
      .then(response => response);
  }

  update(veiculo: Vehicle): Promise<any> {
    return this.http.put(`${this.url}/${veiculo.id}`, veiculo)
      .toPromise()
      .then(response => response);
  }

  patch(veiculo: Vehicle): Promise<any> {
    return this.http.put(`${this.url}/${veiculo.id}`, veiculo)
      .toPromise()
      .then(response => response);
  }

  delete(veiculoCodigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${veiculoCodigo}`)
      .toPromise()
      .then(response => response);
  }

  findByFilter(veiculoFilter: VehicleFilterDto): Promise<any> {

    let queryParams = new HttpParams();

    queryParams = queryParams.append(
      "decade", 
      veiculoFilter.decade != undefined ? veiculoFilter.decade.toString() : "0"
    )
    
    queryParams = queryParams.append(
      "brand",
      veiculoFilter.brand != "" || veiculoFilter.brand == undefined ? veiculoFilter.brand.toString() : ""
    )

    queryParams = queryParams.append(
      "sold", 
      veiculoFilter.sold.toString()
    )

    queryParams = queryParams.append(
      "registeredLasWeek", 
      veiculoFilter.registeredLasWeek.toString()
    )

    return this.http.get(this.url + "/filter", { params: queryParams })
      .toPromise()
      .then(response => response);
  }
}
