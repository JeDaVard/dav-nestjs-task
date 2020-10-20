import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
    async hashPassword(password: string): Promise<void> {
        this.salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(password, this.salt)
    }
}