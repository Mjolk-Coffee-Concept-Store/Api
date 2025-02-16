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
import { BrunchOrdersConsumable } from "./BrunchOrdersConsumables";

@Entity("brunch_orders") // Nom de la table
export class BrunchOrder {
  @PrimaryGeneratedColumn("uuid")
  Id_Brunch_Order: string;

  @Column({ type: "timestamp" })
  submission_date: Date;

  @ManyToOne(() => BrunchReservation, (reservation) => reservation.orders)
  reservations: BrunchReservation;

  @OneToMany(() => BrunchOrdersItem, (orderItem) => orderItem.order)
  orderItems: BrunchOrdersItem[];

  @OneToMany(
    () => BrunchOrdersConsumable,
    (orderConsumable) => orderConsumable.order
  )
  consumables: BrunchOrdersConsumable[];
}
