const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);

function copyIcons() {
  const version = 'v' + require('./package.json').version.split('.')[0];
  const nodeSource = path.resolve('nodes', 'Mailtrap', '**', '*.{png,svg}');
  const nodeDestination = path.resolve('dist');

  src(nodeSource).pipe(dest(nodeDestination));

  const credSource = path.resolve('nodes', 'Mailtrap', version, 'credentials', '**', '*.{png,svg}');
  const credDestination = path.resolve('dist', 'credentials');

  return src(credSource).pipe(dest(credDestination));
}
