import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ShoppingPage } from '../pages/ShoppingPage';
import { PricesPage } from '../pages/PricesPage';
import { VersionsPage } from '../pages/VersionsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout><ShoppingPage /></AppLayout>,
  },
  {
    path: '/prices',
    element: <AppLayout><PricesPage /></AppLayout>,
  },
  {
    path: '/versions',
    element: <VersionsPage />,
  },
]);