import { Migration } from '@mikro-orm/migrations';

export class Migration20231026112913 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "cart_id" varchar(255) null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_cart_id_unique" unique ("cart_id");');

    this.addSql('create table "order" ("id" varchar(255) not null, "user_id" varchar(255) not null, "cart_id" varchar(255) not null, "items" jsonb not null, "payment" jsonb not null, "delivery" jsonb not null, "comments" varchar(255) null, "status" varchar(255) not null, "total" int not null, constraint "order_pkey" primary key ("id"));');

    this.addSql('create table "cart" ("id" varchar(255) not null, "is_deleted" boolean not null default false, "items" jsonb not null, "user_id" varchar(255) not null, constraint "cart_pkey" primary key ("id"));');

    this.addSql('alter table "user" add constraint "user_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade on delete set null;');

    this.addSql('alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order" drop constraint "order_user_id_foreign";');

    this.addSql('alter table "cart" drop constraint "cart_user_id_foreign";');

    this.addSql('alter table "user" drop constraint "user_cart_id_foreign";');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "order" cascade;');

    this.addSql('drop table if exists "cart" cascade;');
  }

}
