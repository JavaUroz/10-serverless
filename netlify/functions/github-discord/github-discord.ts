import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const notify = async(message: string) => {
  
    const body = { content: message }
    const resp = await fetch(process.env.DISCORD_WEBHOOK_URL ?? '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!resp.ok){
      console.log('Error sending message to discord')
      return false
    }
    return true;
}

const handler: Handler = async(event: HandlerEvent, context: HandlerContext) => {

  await notify('Hola mundo desde Netlify Dev');

  return {
    statusCode: 200,
    body: JSON.stringify({
        message: 'done'
    }),
    headers: {
        'content-Type':'application/json'
    }
  };
}

export{ notify }