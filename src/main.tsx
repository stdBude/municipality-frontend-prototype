
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from './Dashboard.tsx';
import DashboardItem from './DashboardItem.tsx';
import UserDashboard from './UserDashboard.tsx';
import UserData from './UserData.tsx';
import store from './elements/redux/configure.tsx';
import { Provider } from 'react-redux';
import NavigateLink from './NavigateLink.tsx';

const router = createBrowserRouter([
  { path: "/Login", element: <App />, },
  { path: "/Dashboard", element: <Dashboard />,},
  { path: "/Dashboard-item/:id", element: <DashboardItem /> },
  { path: "/user-dashboard/:id", element: <UserDashboard /> },
  { path: "/user-data/:id", element: <UserData /> },
  { path: "/Navigation/:id", element: <NavigateLink />}
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
