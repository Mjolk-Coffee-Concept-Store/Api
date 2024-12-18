import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BrunchReservation } from "./BrunchReservation";
import { BrunchItem } from "./BrunchItem";

@Entity("brunchs")
export class Brunch {
  @PrimaryGeneratedColumn("uuid")
  Id_Brunch: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @OneToMany(() => BrunchReservation, (reservation) => reservation.brunch)
  brunchReservations: BrunchReservation[];

  @OneToMany(() => BrunchItem, (item) => item.brunch)
  brunchItems: BrunchItem[];
}
