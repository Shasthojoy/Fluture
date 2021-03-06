import {error, invalidArgument} from './src/internal/throw';

if(typeof Object.create !== 'function') error('Please polyfill Object.create to use Fluture');
if(typeof Object.assign !== 'function') error('Please polyfill Object.assign to use Fluture');
if(typeof Array.isArray !== 'function') error('Please polyfill Array.isArray to use Fluture');

import concurrify from 'concurrify';
import type from 'sanctuary-type-identifiers';
import {Future, of, reject, never} from './src/core';
import {FL} from './src/internal/const';
import {chainRec} from './src/chain-rec';
import {ap, map, bimap, chain, race, alt} from './src/dispatchers';
import {parallelAp} from './src/parallel-ap';

Future.of = Future[FL.of] = of;
Future.chainRec = Future[FL.chainRec] = chainRec;
Future.reject = reject;
Future.ap = ap;
Future.map = map;
Future.bimap = bimap;
Future.chain = chain;

var Par = concurrify(Future, never, race, parallelAp);
Par.of = Par[FL.of];
Par.zero = Par[FL.zero];
Par.map = map;
Par.ap = ap;
Par.alt = alt;

function isParallel(x){
  return x instanceof Par || type(x) === Par['@@type'];
}

function seq(par){
  if(!isParallel(par)) invalidArgument('Future.seq', 0, 'to be a Par', par);
  return par.sequential;
}

export {Future, Future as default, Par, isParallel, seq};
export {isFuture, reject, of, never, isNever} from './src/core';
export * from './src/dispatchers';
export {after, rejectAfter} from './src/after';
export {attempt, attempt as try} from './src/attempt';
export {cache} from './src/cache';
export {encase} from './src/encase';
export {encase2} from './src/encase2';
export {encase3} from './src/encase3';
export {encaseN} from './src/encase-n';
export {encaseN2} from './src/encase-n2';
export {encaseN3} from './src/encase-n3';
export {encaseP} from './src/encase-p';
export {encaseP2} from './src/encase-p2';
export {encaseP3} from './src/encase-p3';
export {go, go as do} from './src/go';
export {hook} from './src/hook';
export {node} from './src/node';
export {parallel} from './src/parallel';
export {tryP} from './src/try-p';
