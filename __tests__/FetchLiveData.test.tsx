import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import FetchLiveData from '../src/components/views/FetchLiveData';
import {rest} from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('http://localhost:3000/update', (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('<FetchLiveData/>', async () => {
  render(<FetchLiveData />)
  expect(screen.getByRole('button')).toBeTruthy();
});