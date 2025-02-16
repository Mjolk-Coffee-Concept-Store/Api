import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BrunchItem } from "./BrunchItem";
import { BrunchReservation } from "./BrunchReservation";

@Entity("brunch_orders_items")
export class BrunchOrdersItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "boolean", default: false })
  served: boolean;

  @Column({ type: "text", nullable: true })
  comments: string;

  @ManyToOne(
    () => BrunchReservation,
    (reservation) => reservation.brunchOrdersItems
  )
  reservation: BrunchReservation;

  @ManyToOne(() => BrunchItem)
  item: BrunchItem;
}
