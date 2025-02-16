import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Brunch } from "./Brunch";

@Entity("brunch_items")
export class BrunchItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @ManyToOne(() => Brunch, (brunch) => brunch.items)
  brunch: Brunch;
}
