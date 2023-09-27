import knex from "../../../helpers/db";

export default class Mall {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static async findOne(mallId: string) {
    let trx = await knex.transaction();
    try {
      let res = await trx("malls").where("id", mallId).first();

      await trx.commit();

      console.log(res);

      return res;
    } catch (error) {
      console.log(error);

      await trx.rollback();

      return error;
    }
    // return {};
  }
}
