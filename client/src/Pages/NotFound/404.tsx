const NotFound = () => {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="relative flex items-center justify-center min-h-full isolate z-8">
        <img
          src="https://images.unsplash.com/photo-1515665177639-0e288e708768?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt=""
          className="absolute inset-0 object-cover object-top w-full h-full -z-10"
        />
        <div className="relative z-10 w-full px-6 py-32 mx-auto ml-2 mr-2 text-center bg-opacity-60 md:ml-0 md:mr-2 md:w-1/2 max-w-7xl sm:py-40 lg:px-8 rounded-xl bg-slate-600">
          <p className="text-base font-semibold leading-8 text-white z-15">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base text-white sm:mt-6">
            Sorry, we couldn’t find the page you’re looking for.
          </p>{" "}
          {/* Changed text-white/70 to text-white */}
          <div className="flex justify-center mt-10">
            <a href="#" className="text-sm font-semibold leading-7 text-white">
              <span aria-hidden="true">&larr;</span> Back to home
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
