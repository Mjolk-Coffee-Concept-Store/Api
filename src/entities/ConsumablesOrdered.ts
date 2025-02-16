import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Consumable } from "./Consumable";
import { ConsumablesOrder } from "./ConsumablesOrder";

@Entity("consumables_ordered")
export class ConsumablesOrdered {
  @PrimaryColumn("uuid")
  Id_Consumable: string;

  @PrimaryColumn("uuid")
  Id_Consumables_Order: string;

  @Column({ type: "boolean", default: false })
  served: boolean;

  @ManyToOne(() => Consumable, (consumable) => consumable.Id_Consumable)
  @JoinColumn({ name: "Id_Consumable" })
  consumable: Consumable;

  @ManyToOne(() => ConsumablesOrder, (order) => order.Id_Consumables_Order)
  @JoinColumn({ name: "Id_Consumables_Order" })
  consumablesOrder: ConsumablesOrder;
}
