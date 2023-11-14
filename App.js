import Router from './router/router';
import { AuthProvider } from './Auth/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

