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

  @ManyToOne(() => BrunchItem, (item) => item.brunchItemsOrders)
  @JoinColumn({ name: "Id_Brunch_item" })
  brunchItem: BrunchItem;

  @ManyToOne(() => BrunchOrder, (order) => order.brunchOrdersItems)
  @JoinColumn({ name: "Id_Brunch_Order" })
  brunchOrder: BrunchOrder;
}
