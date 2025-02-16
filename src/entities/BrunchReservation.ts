import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Brunch } from "./Brunch";
import { BrunchOrder } from "./BrunchOrder";

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

  @ManyToOne(() => Brunch, (brunch) => brunch.reservations)
  brunch: Brunch;

  @OneToMany(() => BrunchOrder, (order) => order.reservations)
  orders: BrunchOrder[];
}
