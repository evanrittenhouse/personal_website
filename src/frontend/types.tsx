export interface SpotifyAuthorizationRequest {
  client_id: string;
  client_secret: string;
  response_type: string;
  state?: string;
}

export async function http(request: RequestInfo): Promise<any> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}
