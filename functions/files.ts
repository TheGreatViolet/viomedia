import fs from 'fs';
import path from 'path';
import hidefile from 'hidefile';
import os from 'os';

export function checkOptions(): void {
  const homedir = os.homedir();

  try {
    const test = fs.statSync(path.join(homedir, '.viomedia'));
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      fs.mkdirSync(path.join(homedir, 'viomedia'));
      hidefile.hideSync(path.join(homedir, 'viomedia'));
    } else throw error;
  }

  const datadir = path.join(homedir, '.viomedia');

  try {
    const test = fs.statSync(`${datadir}/options.json`);
  } catch (error: any) {
    const optionsDef = {
      "media-path": null
    };
    fs.writeFileSync(`${datadir}/options.json`, JSON.stringify(optionsDef));
  }

  try {
    const test = fs.statSync(`${datadir}/medialist.dat`);
  } catch (error: any) {
    fs.writeFileSync(`${datadir}/medialist.dat`, '');
  }
}

export function checkPath(pathfh:string): string {
  try {
    fs.accessSync(path.join(os.homedir(), pathfh));
  } catch (error: any) {
    if (error.code === 'ENOENT') return 'nodir';
    else throw error;
  }

  return 'goodtogo';
}

export function loadSettings(): Object {
  const datadir = path.join(os.homedir(), '.viomedia');
  const rawdat = fs.readFileSync(`${datadir}/options.json`, 'utf-8');
  return JSON.parse(rawdat);
}

export function editSettings(setting:string, data:string) {
  const datadir = path.join(os.homedir(), '.viomedia');
  if (setting === 'change-path') {
    if (checkPath(data) === 'nodir') return 'nodir';

    let mediaOptions: any = loadSettings();
    mediaOptions['media-path'] = path.join(os.homedir(), data);
    fs.writeFileSync(`${datadir}/options.json`, JSON.stringify(mediaOptions));
    return 'success';
  }
}

export async function refreshFileList() {
  const mediaOptions: any = loadSettings();
  const datadir = path.join(os.homedir(), '.viomedia');
  if (mediaOptions['media-path'] === null) return;

  const medialist: Array<string> = []

  fs.readdirSync(mediaOptions['media-path']).forEach(file => {medialist.push(file)});

  const writestream = fs.createWriteStream(`${datadir}/medialist.dat`);
  medialist.forEach(value => {
    writestream.write(`${value}, `);
  });

  writestream.on('error', (err) => {throw err});
}

export function loadFileList(): Array<string> {
  refreshFileList();
  const datadir = path.join(os.homedir(), '.viomedia');

  let rawdat: string = fs.readFileSync(`${datadir}/medialist.dat`, 'utf-8');
  rawdat = rawdat.replace(/,\s/g, ',');

  let medialist = rawdat.split(',');
  medialist.pop();
  return medialist;
}