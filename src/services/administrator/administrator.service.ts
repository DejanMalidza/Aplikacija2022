import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'entities/administrator.entity';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { editAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator) 
        private readonly adiministrator: Repository<Administrator>,
    ) { }
    
    getAll(): Promise<Administrator[]> {
        return this.adiministrator.find();
    }

    getById(id: number): Promise<Administrator> {
        return this.adiministrator.findOne(id);
    }

    add(data: AddAdministratorDto){
        const crypto = require('crypto');

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        
        let newAdmin: Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        return this.adiministrator.save(newAdmin);
    }

    async editById(id: number, data: editAdministratorDto): Promise<Administrator> {
        let admin: Administrator = await this.adiministrator.findOne(id);

        const crypto = require('crypto');
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        
        admin.passwordHash = passwordHashString;

        return this.adiministrator.save(admin);
    }
}


