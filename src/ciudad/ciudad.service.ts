import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CiudadService {
  private ciudades: Ciudad[] = [];

  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
  ) {}

 async findAllRaw() : Promise<Ciudad[]> {
  this.ciudades = [];
    let data = await this.ciudadRepository.query('select * from ciudad');

    data.forEach((element) => {
      let ciudad: Ciudad = new Ciudad(element.nombre);
      this.ciudades.push(ciudad);
    });
    return this.ciudades;
  }
  async findAllOrm():Promise<Ciudad[]>{
    return await this.ciudadRepository.find(); 
  }
}
