import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from './database/sequelize'; // 引入 Sequelize 实例
@Injectable()
export class AppService {
  /**
   * 查询是否有该用户
   * @param username 用户名
   */
  async findOne(username: string): Promise<any | undefined> {
    const sql = 'select * from person'; // 一段平淡无奇的 SQL 查询语句
    try {
      const user = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
        })
      )[0];
      // 若查不到用户，则 user === undefined
      return user;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
