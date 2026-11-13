import { handleEnquiry, json, type Env } from './enquiry';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/send-enquiry') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
      return handleEnquiry(request, env);
    }

    return json({ error: 'Not found.' }, 404);
  },
};
