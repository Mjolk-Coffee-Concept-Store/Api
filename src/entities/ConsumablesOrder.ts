import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { ConsumablesOrdered } from "./ConsumablesOrdered";

@Entity("consumables_orders")
export class ConsumablesOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "int" })
  table_number: number;

  @Column({ type: "timestamp" })
  submission_date: Date;

  @Column({ type: "boolean" })
  completed: boolean;

  @OneToMany(
    () => ConsumablesOrdered,
    (consumable) => consumable.consumablesOrder
  )
  consumablesOrdered: ConsumablesOrdered[];
}
