import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";
import { Consumable } from "./Consumable";
import { BrunchReservation } from "./BrunchReservation";

@Entity("brunch_orders_consumables")
export class BrunchOrdersConsumable {
  @PrimaryGeneratedColumn("uuid")
  Id_Brunch_Consumable_Order: string;

  @Column({ type: "boolean", default: false })
  served: boolean;

  @ManyToOne(
    () => BrunchReservation,
    (reservation) => reservation.brunchOrdersConsumables
  )
  reservation: BrunchReservation;

  @ManyToOne(() => Consumable)
  consumable: Consumable;
}
