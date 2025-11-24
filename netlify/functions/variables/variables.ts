import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  const myImportantVariables = process.env.MY_IMPORTANT_VARIABLE

  if (!myImportantVariables) {
    throw 'Missing MY_IMPORTANT_VARIABLE'
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
        myImportantVariables,
    }),
    headers: {
        'content-Type':'application/json'
    }
  }
};

export{ handler }