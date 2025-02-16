import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("logs")
export class Log {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  level: string;

  @Column({ length: 50 })
  category: string;

  @Column({ length: 255 })
  short_msg: string;

  @Column("text", { nullable: true })
  long_msg: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ length: 50, nullable: true })
  user_id: string;
}
