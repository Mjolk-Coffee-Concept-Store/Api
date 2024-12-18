import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Brunch } from "./Brunch";
import { BrunchOrdersItem } from "./BrunchOrdersItem";
import { BrunchItemsConsumable } from "./BrunchItemsConsumable";

@Entity("brunch_items") // Nom de la table
export class BrunchItem {
  @PrimaryGeneratedColumn("uuid")
  Id_Brunch_item: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  course: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "boolean" })
  availability: boolean;

  @Column({ type: "boolean" })
  is_vegetarian: boolean;

  @Column({ type: "boolean" })
  is_vegan: boolean;

  @Column({ type: "text", nullable: true })
  allergens: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  hidden_price: number;

  @ManyToOne(() => Brunch, (brunch) => brunch.brunchItems)
  @JoinColumn({ name: "Id_Brunch" })
  brunch: Brunch;

  @OneToMany(() => BrunchOrdersItem, (orderItem) => orderItem.brunchItem)
  brunchItemsOrders: BrunchOrdersItem[];

  @OneToMany(
    () => BrunchItemsConsumable,
    (brunchItemsConsumable) => brunchItemsConsumable.brunchItem
  )
  brunchItemsConsumables: BrunchItemsConsumable[];
}
