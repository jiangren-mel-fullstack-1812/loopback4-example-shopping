import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class AccessToken extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
    default: 1440,
  })
  ttl: number;

  @property({
    type: 'date',
    required: true,
    default: Date.now(),
  })
  created: string;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<AccessToken>) {
    super(data);
  }
}
