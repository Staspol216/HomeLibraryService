import { datasourceOptions } from '../datasources/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  ...datasourceOptions,
  factories: ['dist/src/config/seed/factories/**/*.js'],
  seeds: ['dist/src/config/seed/main.seeder.js'],
};

const datasource = new DataSource(options);

datasource.initialize().then(async () => {
  await runSeeders(datasource);
});

export default datasource;
