import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("recommendations")
export class Recommendation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 25 })
  name: string;

  @Column({ type: "varchar", length: 250 })
  content: string;

  @Column({ type: "date" })
  visit_date: Date;

  @Column({ type: "date" })
  submission_date: Date;

  @Column({ type: "decimal", precision: 2, scale: 1, nullable: true })
  rating: number;
}
