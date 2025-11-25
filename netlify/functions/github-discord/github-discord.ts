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

const onStar = (payload: any): string => {
    const { action, sender, repository } = payload;

    return `User ${ sender.login } ${action} star on ${ repository.full_name }`;    
  }

const onIssue = (payload: any): string => {
  const { action, issue } = payload;

  if (action === 'opened') {
    return `An issue was opened with title: ${issue.title} by user: ${issue.user.login}`;
  }

  if (action === 'closed') {
    return `An issue was closed with title: ${issue.title} by user: ${issue.user.login}`;
  }

  if (action === 'reopened') {
      return `An issue was reopened with title: ${issue.title} by user: ${issue.user.login}`;
  }

  return `Anhundled action for the issue event: ${ action }` ;
}

const handler: Handler = async(event: HandlerEvent, context: HandlerContext) => {

  const githubEvent = event.headers['x-github-event'] ?? 'unknown'
  const payload = JSON.parse(event.body ?? '');
  let message: string;

  console.log(payload);

  switch(githubEvent){
      case 'star':
        message = onStar(payload);
      break;

      case 'issues':
        message = onIssue(payload);
      break;

      default:
        message = `unknown event: ${githubEvent}`
    }

  await notify(message);

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

export{ handler }