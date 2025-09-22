import HeaderPage from "./composent/Header_page";
import Footer from "./composent/Footer";

export default function Page404() {
  const handleBackToHome = () => {
    window.location.href = "/home";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec bannière promotionnelle */}
      <HeaderPage></HeaderPage>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <a href="/home" className="hover:text-black transition-colors">
            Home
          </a>
          <span>/</span>
          <span>404 Error</span>
        </div>
      </div>

      {/* Contenu principal 404 */}
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-bold text-black mb-6">
            404 Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Your visited page not found. You may go home page.
          </p>
          <button
            onClick={handleBackToHome}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded transition-colors font-medium"
          >
            Back to home page
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}
