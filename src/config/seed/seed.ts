import { datasourceOptions } from '../datasources/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  ...datasourceOptions,
  factories: ['dist/**/seed/factories/**/*.js'],
  seeds: ['dist/**/seed/main.seeder.js'],
};

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
  await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
});
