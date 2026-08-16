import { useQuery } from '@tanstack/react-query';
import { versionsApi } from '../api/versions';

export function VersionsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['versions'],
    queryFn: versionsApi.getVersions,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Зареждане на версии...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400">Грешка при зареждане на версии</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Версии на приложението
        </h1>
        <div className="bg-white border border-gray-200 rounded-lg p-6 dark:bg-gray-900 dark:border-gray-700">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Frontend
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Версия: <span className="font-mono font-bold">{data?.frontendVersion}</span>
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Backend
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                URL: <span className="font-mono">{data?.backendUrl}</span>
              </p>
              {data?.backendVersion && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Версия: <span className="font-mono font-bold">{data.backendVersion}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}