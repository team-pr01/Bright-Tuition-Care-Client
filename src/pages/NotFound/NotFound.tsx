const NotFound = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-20">404 - Page Not Found</h1>
            <p className="text-center mt-4">Sorry, the page you are looking for does not exist.</p>
            <div className="flex justify-center mt-8">
                <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;