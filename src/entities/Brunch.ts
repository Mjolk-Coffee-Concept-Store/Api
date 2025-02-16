import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BrunchReservation } from "./BrunchReservation";
import { BrunchItem } from "./BrunchItem";

@Entity("brunchs")
export class Brunch {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @OneToMany(() => BrunchItem, (item) => item.brunch)
  items: BrunchItem[];

  @OneToMany(() => BrunchReservation, (reservation) => reservation.brunch)
  reservations: BrunchReservation[];
}
