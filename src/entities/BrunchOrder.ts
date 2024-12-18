import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BrunchReservation } from "./BrunchReservation";
import { BrunchOrdersItem } from "./BrunchOrdersItem";

@Entity("brunch_orders") // Nom de la table
export class BrunchOrder {
  @PrimaryGeneratedColumn("uuid")
  Id_Brunch_Order: string;

  @Column({ type: "timestamp" })
  submission_date: Date;

  @ManyToOne(() => BrunchReservation, (reservation) => reservation.brunchOrders)
  @JoinColumn({ name: "Id_Brunch_reservation" })
  brunchReservation: BrunchReservation;

  @OneToMany(() => BrunchOrdersItem, (orderItem) => orderItem.brunchOrder)
  brunchOrdersItems: BrunchOrdersItem[];
}
