import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadView from '../src/components/views/UploadView';
import axios from 'axios';

const mockURL = 'http://localhost:3000/upload'
const server = setupServer(
  rest.post(mockURL, (req: any, res: any, ctx: any) => {
    return res(ctx.json(mockJSON));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers);
afterAll(() => server.close);

test('loads and renders the next page', async () => {
  render(<UploadView />)
  fireEvent.click(screen.getByText('Click here to upload your YAML config files and begin using Navigate...'));
  const response = await axios.post(mockURL, {test: mockYAML});
  expect(response.data).toStrictEqual(mockJSON);
});

//example of a json that the uploadView expects back from post req
const mockJSON = {
  kind: 'NetworkPolicy',
  apiVersion: 'networking.k8s.io/v1',
  metadata:
  {
    name: 'api-allow'
  },
  spec: {
    podSelector: {
      matchLabels: {
        app: 'bookstore',
        role: 'api'
      }
    },
    ingress: {
      from: {
        podSelector: {
          matchLabels:{
            app: 'bookstore'
          }
        }
      }
    }
  }
}

const mockYAML = 'kind: \'NetworkPolicy\'';