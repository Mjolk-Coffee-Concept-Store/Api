import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { BrunchItem } from "./BrunchItem";
import { Consumable } from "./Consumable";

@Entity("brunch_items_consumables")
export class BrunchItemsConsumable {
  @PrimaryColumn("uuid")
  Id_Brunch_item: string;

  @PrimaryColumn("uuid")
  Id_Consumable: string;

  @ManyToOne(
    () => BrunchItem,
    (brunchItem) => brunchItem.brunchItemsConsumables
  )
  @JoinColumn({ name: "Id_Brunch_item" })
  brunchItem: BrunchItem;

  @ManyToOne(() => Consumable, (consumable) => consumable.Id_Consumable)
  @JoinColumn({ name: "Id_Consumable" })
  consumable: Consumable;
}
