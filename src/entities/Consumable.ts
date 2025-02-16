import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("consumables")
export class Consumable {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "integer" })
  type: number;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar", length: 50 })
  temperature: string;

  @Column({ type: "decimal", precision: 6, scale: 2 })
  price: number;

  @Column({ type: "boolean" })
  is_vegetarian: boolean;

  @Column({ type: "boolean" })
  is_vegan: boolean;

  @Column({ type: "boolean" })
  availability: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  allergens: string;
}
