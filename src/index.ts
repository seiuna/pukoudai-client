import Fs from "fs";
import {baseDir} from "./client";
export * from './common'
export {Client, createClient, createClientByCache} from './client';
export * from './entity/entities';
export {Qrcode} from './utils';

Fs.mkdirSync(baseDir + "/userdata", {recursive: true})
Fs.mkdirSync(baseDir + "/cache", {recursive: true})