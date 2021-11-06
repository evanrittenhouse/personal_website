import React, { useState, useEffect } from 'react';
import { SpotifyAuthorizationRequest } from './types';
import { credentials } from '../server/config';

function LoginButton() {
  const [requestState, setRequestState] = useState('');
  const [requestBody, setRequestBody] = useState('');

  // get random string for use in the request
  function getRequestState(): string {
    let stringState: string = '';
    let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let charactersLength: number = characters.length;
    for (let i = 0; i <= 16; i++) {
      stringState += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return stringState;
  }

  // send authorization request to spotify API
  async function sendAuthRequest(): Promise<JSON> {
    let requestBody: SpotifyAuthorizationRequest = {
      client_id: credentials.id,
      client_secret: credentials.secret,
      response_type: 'code',
      state: getRequestState(),
    };

    const request = await fetch(`https://api.spotify.com/authorize?client_id=${credentials.id}&client_secret=${credentials.secret}&response_type=code`);
    const body = await request.json();
    console.log(body);

    return body;
  }

  return (
    <div>
      <button onClick={sendAuthRequest}>click me</button>
    </div>
  );
}

export default LoginButton;
