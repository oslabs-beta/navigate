import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SidebarClusterView from '../src/components/views/SidebarClusterView';

test('<SidebarClusterView/>', async () => {
  render(<SidebarClusterView />)
  //should have a button due to FetchLiveData component
  expect(screen.getByRole('button')).toBeTruthy();
});