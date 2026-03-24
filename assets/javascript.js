
window.onload = function () {
  const loading = document.getElementById("cifras-loading");
  const content = document.getElementById("cifras-content");

  setTimeout(() => {
    if (loading && content) {
      loading.classList.add("d-none");
      content.classList.remove("d-none");
    }
  }, 3500);

  // Inicializar Tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  // Inicializar Popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  })

  
};