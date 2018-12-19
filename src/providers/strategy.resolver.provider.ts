import {Provider, ValueOrPromise} from '@loopback/core';
import {inject} from '@loopback/context';
import {
  StrategyAdapter,
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
const jwt = require('jsonwebtoken');
import {promisify} from 'util';
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);
// Consider turn it to a binding
const SECRET = 'secretforjwt';

export class StrategyResolverProvider
  implements Provider<JWTStrategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) {}
  value(): ValueOrPromise<JWTStrategy | undefined> {
    if (!this.metadata) {
      return Promise.resolve(undefined);
    }

    const name = this.metadata.strategy;
    if (name === 'jwt') {
      return new JWTStrategy();
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }
}

export class JWTStrategy {
  // tslint:disable-next-line:no-any
  async authenticate(req: Request): Promise<any> {
    // A mock for sign in
    const payload = {admin: true};
    await signAsync(payload, SECRET, {expiresIn: 5});
    // const token =
    //   request.body.token ||
    //   request.query.token ||
    //   request.headers['x-access-token'];
    const token = 'not the right token';

    if (token) {
      try {
        await verifyAsync(token, SECRET);
      } catch (err) {
        if (err) return Promise.reject('Authentication failed!');
      }
    }
    // should we return some meaningful message?
    return;
  }
}
