import { Sequelize } from 'sequelize-typescript';
import db from '../../config/db';
import { User } from './initDb';

const sequelize = new Sequelize(
  db.mysql.database,
  db.mysql.user,
  db.mysql.password || null,
  {
    // 自定义主机; 默认值: localhost
    host: db.mysql.host, // 数据库地址
    // 自定义端口; 默认值: 3306
    port: db.mysql.port as unknown as number,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    //benchmark: true,
    pool: {
      max: db.mysql.connectionLimit, // 连接池中最大连接数量
      min: 0, // 连接池中最小连接数量
      acquire: 30000,
      idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
    timezone: '+08:00', // 东八时区
  },
);

// 测试数据库链接
sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
    // User(sequelize);
  })
  .catch((err: any) => {
    // 数据库连接失败时打印输出
    console.error(err);
    throw err;
  });
export default sequelize;
