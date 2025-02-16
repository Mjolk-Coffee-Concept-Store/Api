import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { BrunchItem } from "./BrunchItem";
import { Consumable } from "./Consumable";
import { BrunchOrder } from "./BrunchOrder";

@Entity("brunch_orders_consumables")
export class BrunchOrdersConsumable {
  @PrimaryColumn("uuid")
  Id_Consumable: string;

  @PrimaryColumn("uuid")
  Id_Brunch_Order: string;

  @Column({ type: "int" })
  quantity: number;

  @ManyToOne(() => BrunchOrder, (order) => order.consumables)
  order: BrunchOrder;

  @ManyToOne(() => Consumable)
  consumable: Consumable;
}
