const jwt = require('jsonwebtoken');
import {promisify} from 'util';
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);
// Consider turn it to a binding
const SECRET = 'secretforjwt';

export class JWTStrategy {
  // tslint:disable-next-line:no-any
  async authenticate(request: Request): Promise<any> {
    // A mock for sign in
    const payload = {admin: true};
    await signAsync(payload, SECRET, {expiresIn: 300});
    // const token =
    //   request.body!.token ||
    //   request.query.token ||
    //   request.headers['x-access-token'];
    const token = 'not the right token';

    if (token) {
      try {
        return await verifyAsync(token, SECRET);
      } catch (err) {
        if (err) return Promise.reject('Authentication failed!');
      }
    }
    // should we return some meaningful message?
    return;
  }
}
