import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  console.log('Hola mundo desde Hello Handler')
  return {
    statusCode: 200,
    body: JSON.stringify({
        message: 'Hola mundo'
    }),
    headers: {
        'content-Type':'application/json'
    }
  }
};

export{ handler }