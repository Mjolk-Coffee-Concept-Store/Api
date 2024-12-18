import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Post } from "./Post";

@Entity("post_images")
export class Image {
  @PrimaryGeneratedColumn("uuid")
  Id_Image: string;

  @Column({ length: 50 })
  img_path: string;

  @Column({ length: 155, nullable: true })
  alt_text: string;

  @ManyToMany(() => Post, (post) => post.images)
  posts: Post[];
}
