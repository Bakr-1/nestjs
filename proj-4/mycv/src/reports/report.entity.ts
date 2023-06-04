import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    // @Column()
    // title: string;

    // @Column()
    // content: string;

    // @Column({ default: false })
    // isPublished: boolean;

    // @Column({ default: false })
    // isDeleted: boolean;

    // @Column({ default: false })
    // isArchived: boolean;
}