import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SidebarClusterView from '../src/components/views/SidebarClusterView';

test('<SidebarClusterView/>', async () => {
  //rerender original component with props to be called when needed
  const { rerender } = render(<SidebarClusterView deploymentStatus={mockProps} />);

  render(<SidebarClusterView />)
  //should have a button called "refresh" due to FetchLiveData component
  expect(screen.getAllByText('refresh')).toBeTruthy();
  //it should not display any events if props are empty
  expect(screen.getByText('Kubernetes engine not running, no nodes detected.'));
  //should display events if props have something
  rerender;
  expect(screen.getByText('Kind:'));
});

const mockProps = [
  {
  deploymentStatus: [
    {
      Kind: "NetworkPolicy",
      Name: "app-v1",
      Event: "Mocked",
      Time: "now"
    }
  ]
  }
];