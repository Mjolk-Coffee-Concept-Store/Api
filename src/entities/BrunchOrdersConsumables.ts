import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";
import { Consumable } from "./Consumable";
import { BrunchReservation } from "./BrunchReservation";

@Entity("brunch_orders_consumables")
export class BrunchOrdersConsumable {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "boolean", default: false })
  served: boolean;

  @Column({ type: "text", nullable: true })
  comments: string;

  @ManyToOne(
    () => BrunchReservation,
    (reservation) => reservation.brunchOrdersConsumables
  )
  reservation: BrunchReservation;

  @ManyToOne(() => Consumable)
  consumable: Consumable;
}
