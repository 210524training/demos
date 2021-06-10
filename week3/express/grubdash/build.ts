/* eslint-disable import/no-extraneous-dependencies */
/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra';
import childProcess from 'child_process';
import logger from './src/log';

function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => fs.remove(loc, (err) => (err ? rej(err) : res())));
}

function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => fs.copy(src, dest, (err) => (err ? rej(err) : res())));
}

function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
    if(stdout) {
      logger.info(stdout);
    }
    if(stderr) {
      logger.warn(stderr);
    }
    return (err ? rej(err) : res());
  }));
}

(async () => {
  try {
    // Remove current build
    await remove('./build/');
    // Copy front-end files
    await copy('./src/public/views', './build/public/views');
    await copy('./src/public/css', './build/public/css');
    // Copy back-end files
    await exec('tsc', './');
  } catch(err) {
    logger.error(err);
  }
})();
