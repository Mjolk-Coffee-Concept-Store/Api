import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./PostCategory";
import { Image } from "./PostImage";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  Id_Post: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 10, unique: true })
  slug: string;

  @Column("text")
  content: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at: Date;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable({
    name: "posts_categories",
    joinColumn: { name: "Id_Post", referencedColumnName: "Id_Post" },
    inverseJoinColumn: {
      name: "Id_Categorie",
      referencedColumnName: "Id_Categorie",
    },
  })
  categories: Category[];

  @ManyToMany(() => Image, (image) => image.posts)
  @JoinTable({
    name: "posts_images",
    joinColumn: { name: "Id_Post", referencedColumnName: "Id_Post" },
    inverseJoinColumn: { name: "Id_Image", referencedColumnName: "Id_Image" },
  })
  images: Image[];
}
