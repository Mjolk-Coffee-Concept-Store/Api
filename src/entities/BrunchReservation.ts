import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Brunch } from "./Brunch";
import { BrunchOrdersItem } from "./BrunchOrdersItem";
import { BrunchOrdersConsumable } from "./BrunchOrdersConsumables";

@Entity("brunch_reservations") // Nom de la table
export class BrunchReservation {
  @PrimaryGeneratedColumn("uuid")
  Id_Brunch_reservation: string;

  @Column({ type: "varchar", length: 50 })
  customer_name: string;

  @Column({ type: "varchar", length: 50 })
  customer_email: string;

  @Column({ type: "varchar", length: 10 })
  customer_phone: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  company_name: string;

  @Column({ type: "timestamp" })
  reservation_date: Date;

  @Column({ type: "smallint" })
  number_of_people: number;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "int", nullable: true })
  table_number: number;

  @Column({ type: "timestamp", nullable: true })
  order_submission_date: Date;

  @Column({ type: "boolean", default: false })
  ended: boolean;

  @OneToMany(() => Brunch, (brunch) => brunch.reservations)
  brunch: Brunch;

  @OneToMany(() => BrunchOrdersItem, (orderItem) => orderItem.reservation)
  brunchOrdersItems: BrunchOrdersItem[];

  @OneToMany(
    () => BrunchOrdersConsumable,
    (orderConsumable) => orderConsumable.reservation
  )
  brunchOrdersConsumables: BrunchOrdersConsumable[];
}
