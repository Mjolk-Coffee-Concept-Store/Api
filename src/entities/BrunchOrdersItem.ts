import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BrunchItem } from "./BrunchItem";
import { BrunchOrder } from "./BrunchOrder";

@Entity("brunch_orders_items")
export class BrunchOrdersItem {
  @PrimaryColumn("uuid")
  Id_Brunch_item: string;

  @PrimaryColumn("uuid")
  Id_Brunch_Order: string;

  @Column({ type: "int" })
  quantity: number;

  @ManyToOne(() => BrunchOrder, (order) => order.orderItems)
  order: BrunchOrder;

  @ManyToOne(() => BrunchItem)
  item: BrunchItem;
}
