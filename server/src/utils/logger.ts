import pino from 'pino';
import dayjs from 'dayjs';
import fs from 'fs';
import pinoms from 'pino-multi-stream';

const streams = [
  { stream: process.stdout },
  {
    stream: fs.createWriteStream(
      `${process.cwd()}/logs/${dayjs().format('DD-MM-YYYY')}.log`,
      { flags: 'a' }
    ),
  },
  //{ stream: fs.createWriteStream(`${process.cwd()}/logs/${dayjs().format("DD-MM-YYYY h-mm-ss")}.log`, { flags: 'a' }) },
];

const log = pino(
  {
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: 'dd.mm.yyyy h:MM:ss',
    },
  },
  pinoms.multistream(streams)
);

export default log;
