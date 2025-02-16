import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BrunchItem } from "./BrunchItem";
import { BrunchReservation } from "./BrunchReservation";

@Entity("brunch_orders_items")
export class BrunchOrdersItem {
  @PrimaryGeneratedColumn("uuid")
  Id_Brunch_Item_Order: string;

  @Column({ type: "boolean", default: false })
  served: boolean;

  @ManyToOne(
    () => BrunchReservation,
    (reservation) => reservation.brunchOrdersItems
  )
  reservation: BrunchReservation;

  @ManyToOne(() => BrunchItem)
  item: BrunchItem;
}
