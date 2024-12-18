import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("consumables_orders")
export class ConsumablesOrder {
  @PrimaryGeneratedColumn("uuid")
  Id_Consumables_Order: string;

  @Column({ type: "int" })
  table_number: number;

  @Column({ type: "timestamp" })
  submission_date: Date;
}
