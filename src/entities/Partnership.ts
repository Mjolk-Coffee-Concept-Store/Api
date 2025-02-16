import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("partnership")
export class Partnership {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 50 })
  last_name: string;

  @Column({ type: "varchar", length: 50 })
  first_name: string;

  @Column({ type: "varchar", length: 50 })
  phone: string;

  @Column({ type: "varchar", length: 50 })
  business_sector: string;

  @Column({ type: "text" })
  message: string;

  @Column({ type: "varchar", length: 50 })
  submission_date: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  attachment_1_path: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  attachment_2_path: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  attachment_3_path: string;
}
