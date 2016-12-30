// @flow
import invariant from 'invariant';

export default function match<Domain, Codomain>(
  matcher: Pattern<Domain, Codomain>,
  obj: Domain & { type: string },
): Codomain {
  const match = matcher[obj.type];

  invariant(match != undefined, 'failed pattern match', obj);

  return match(obj);
}

export type Just<A> = {|
  type: 'just';
  value: A;
|};

export type Nothing<A> = {| type: 'nothing' |};

export type Maybe<A> = Just<A> | Nothing<A>;

const j1: Maybe<number> = { type: 'just', value: 1 };
const n: Maybe<number> = { type: 'nothing' };

type Pattern<Domain, Codomain> = *

const pattern: Pattern<Maybe<number>, number> = {
  just: ({ value }) => { console.log('matched just', value); return value; },
  nothing: () => { console.log('matched nothing'); return 0; },
};

const x: number = match(pattern, j1);
const y: number = match(pattern, n);

console.log(`returned ${x}, ${y}`);
