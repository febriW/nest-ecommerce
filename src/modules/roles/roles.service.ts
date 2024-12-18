import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { RolesDto } from "./dto/roles.dto";
import { Roles } from "./roles.entity";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private readonly RolesRepository: Repository<Roles>,
        private readonly entityManager: EntityManager,
    ) {}

    private async findRolesByName(rolesName: string): Promise<Roles | null>{
        return this.entityManager.findOne(Roles, {
            where: { name: rolesName}
        })
    }

    findAll(){
        return this.RolesRepository.find()
    }

    async create(RolesDTO: RolesDto) {
        const checkExisting = await this.findRolesByName(RolesDTO.name)
        if(checkExisting)
            throw new ConflictException(`Roles ${RolesDTO.name} already created before.`)
        const data = this.entityManager.create(Roles, RolesDTO);
        await this.entityManager.save(data)
    }

    async update(name: string, RolesDTO: RolesDto) {
        const checkExisting = await this.findRolesByName(name)
        if(!checkExisting)
            throw new NotFoundException(`Roles ${name} not found.`)
        await this.entityManager.update(Roles, checkExisting.id, {name: RolesDTO.name})
    }

    async deleteRole(name: string) {
        const checkExisting = await this.findRolesByName(name)
        if(!checkExisting)
            throw new NotFoundException(`Roles ${name} not found.`)
        await this.entityManager.delete(Roles, checkExisting.id)
    }
}