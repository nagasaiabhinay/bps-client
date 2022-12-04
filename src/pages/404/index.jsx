import RootLayout from "@components/layouts/rootLayout";
import { ProtectedRoute } from "@hooks/routesValidator";
import { useGlobalStore } from "@store/index";
import NotFoundPage from "@components/404";

const NotFoundScreen = () => {
  const user = useGlobalStore((s) => s.user);

  if (user) {
    return (
      <ProtectedRoute>
        <RootLayout>
          <NotFoundPage />
        </RootLayout>
      </ProtectedRoute>
    );
  }
  return <NotFoundPage />;
};

export default NotFoundScreen;
