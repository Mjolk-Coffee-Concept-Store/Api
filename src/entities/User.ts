import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  username: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "int" })
  permissions: number;

  @Column({ type: "varchar", length: 255 })
  full_name: string;

  @Column({ type: "boolean" })
  is_active: boolean;
}
