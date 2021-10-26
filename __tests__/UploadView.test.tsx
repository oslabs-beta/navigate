import React from 'react';
import fetch from 'node-fetch';
import {rest, setupWorker} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadView from '../src/components/views/UploadView';

const mockURL = '/mockUpload'
const server = setupServer(
  rest.post(mockURL, (req, res, ctx) => {
    return res(ctx.json(mockJSON));
  })
);


beforeAll(() => server.listen);
afterEach(() => server.resetHandlers);
afterAll(() => server.close);

test('loads and renders the next page', async () => {
  render(<UploadView />)
  fireEvent.click(screen.getByText('Click here to upload your YAML config files and begin using Navigate...'));
  fetch(mockURL, {
    method: "POST",
    body: mockYAML
  });
  await waitFor(() => {
    screen.getByText('Cluster View');
  })
})

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