window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        // If the page is loaded from cache (back/forward navigation)
        location.reload(); // Reload the page
    }
});
