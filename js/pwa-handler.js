const serviceWorker = navigator.serviceWorker;

if (serviceWorker) {
    serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("ServiceWorker Registered to the Application!"))
        .catch(() => console.log("Failed to Register the ServiceWorker."));
}