import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BrandDto } from 'src/app/dtos/brandDto';
import { VehicleFilterDto } from 'src/app/dtos/veiculosFilterDto';
import { Vehicle } from 'src/app/models/veiculosModel';
import { VehicleService } from '../../services/vehicle.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  providers: [MessageService]
})
export class VehicleComponent implements OnInit {

  title = 'Tinnova Veiculos';
  vehicles: Array<Vehicle> = new Array<Vehicle>;
  brands: Array<BrandDto> = new Array<BrandDto>;
  vehiclesPerDecadeDtos = [];
  quantityPerBrandsDtos = [];
  isEditing: boolean = false;
  display: boolean = false;
  vehicle: Vehicle = new Vehicle();
  vehicleFilterDto: VehicleFilterDto = new VehicleFilterDto();
  isSold = this.defaultBooleanOptions()
  isSoldSearch = this.defaultBooleanOptions()
  isRegisteredLasWeek = this.defaultBooleanOptions();
  titleModal = "Cadastrar novo veiculo";

  constructor(
    private vehicleService: VehicleService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.loadBrandsDropdown();
    this.findVehicles();
    this.defaultValuesFilter();
    this.findTotalVehiclePerDecade();
    this.findTotalVehiclePerBrands();
  }

  showModalRegisterVehicle() {
    if (this.isEditing) {
      this.titleModal = "Editar veiculo";
    }

    this.display = true;
  }

  message(mensagem: string, tipoMensagem: string) {
    this.messageService.add({ severity: tipoMensagem, summary: 'Service Message', detail: mensagem });
  }

  save() {

    if (this.isAllFieldFilled()) {

      if (this.isEditing) {
        this.vehicleService.update(this.vehicle).then(() => {
          this.message('Veiculo editado com sucesso!', 'success');
        })
      } else {
        this.vehicleService.save(this.vehicle).then(() => {
          this.message('Veiculo salvo com sucesso!', 'success');
        })
      }

      this.findVehicles();
      this.clearRegister();
      this.findTotalVehiclePerDecade();
      this.findTotalVehiclePerBrands();

    } else {
      this.message('Preencha todos os campos!', 'warn');
    }
  }

  clearRegister() {
    this.vehicle = new Vehicle();
    this.vehicle.brand = this.brands[0].code;
    this.isEditing = false;
    this.findVehicles();
  }

  findVehicles() {
    this.vehicleService.findAll().then(vehicles => {
      this.vehicles = vehicles;
    });
  }

  findTotalVehiclePerBrands() {
    this.vehicleService.findTotalVehiclePerBrands().then(quantityPerBrandsDtos => {
      this.quantityPerBrandsDtos = quantityPerBrandsDtos;
    });
  }

  findTotalVehiclePerDecade() {
    this.vehicleService.findTotalVehiclePerDecade().then(vehiclesPerDecadeDtos => {
      this.vehiclesPerDecadeDtos = vehiclesPerDecadeDtos;
    });
  }

  selectVehicle(veiculo: Vehicle) {
    this.vehicle = veiculo;
    this.isEditing = true;
    this.showModalRegisterVehicle();
  }

  deleteVehicle(id: number) {
    this.vehicleService.delete(id).then(() => {
      this.findVehicles();
      this.message('Veiculo deletado!', 'success');
    });
  }

  isAllFieldFilled() {
    if (!this.vehicle.description || !this.vehicle.yearManufacture) {
      return false;
    } else {
      return true;
    }
  }

  loadBrandsDropdown() {
    this.vehicleService.findBrands().then(brands => {

      brands.forEach((brand: any) => {
        this.brands.push({ name: brand, code: brand });
      });

      this.vehicle.brand = this.brands[0].code;
      this.vehicleFilterDto.brand = this.brands[0].code;
    });
  }

  findByFilter() {
    this.vehicleService.findByFilter(this.vehicleFilterDto).then(vehicles => {
      if (vehicles.length == 0) {
        this.message('Nenhum resultado encontrado!', 'warn');
      }

      this.vehicles = vehicles;
    });
  }

  clearFilter() {
    this.vehicleFilterDto = new VehicleFilterDto();
    this.findVehicles();
  }

  defaultBooleanOptions() {
    return [
      { name: 'Não', code: false },
      { name: 'Sim', code: true },
    ]
  }

  defaultValuesFilter() {
    this.vehicleFilterDto.sold = false;
    this.vehicleFilterDto.registeredLasWeek = false;
  }

  getTotalVehiclesPerBrand() {
    this.vehicleService.findBrands().then(brands => {

      brands.forEach((brand: any) => {
        this.brands.push({ name: brand, code: brand });
      });
    });
  }
}