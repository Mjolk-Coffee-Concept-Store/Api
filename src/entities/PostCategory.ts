import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Post } from "./Post";

@Entity("post_categories")
export class Category {
  @PrimaryGeneratedColumn("increment")
  Id_Categorie: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ length: 160 })
  description: string;

  @Column({ length: 10, unique: true })
  slug: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}
