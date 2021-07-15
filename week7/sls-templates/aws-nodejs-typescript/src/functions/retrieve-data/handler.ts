import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getAll } from '../../repositories/lib';

const hello: ValidatedEventAPIGatewayProxyEvent<never> = async (event) => {
  const data = await getAll('User');

  return formatJSONResponse({
    message: `Hello, we connected to our DynamoDB table!`,
    event,
    data,
  });
}

export const main = middyfy(hello);
