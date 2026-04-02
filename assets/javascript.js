window.onload = function () {
  // 1. INICIALIZAR AOS (Animaciones al hacer scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }

  // 2. CARGA DE CIFRAS (Spinner del Index)
  const loading = document.getElementById("cifras-loading");
  const content = document.getElementById("cifras-content");

  setTimeout(() => {
    if (loading && content) {
      loading.classList.add("d-none");
      content.classList.remove("d-none");
      AOS.refresh();
    }
  }, 3500);

  // 3. INICIALIZAR COMPONENTES BOOTSTRAP (Tooltips y Popovers)
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });

  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  });

  // 4. LÓGICA DE FILTRADO (Para la página de Experiencias)
const filterButtons = document.querySelectorAll('.btn-filter');
const filterItems = document.querySelectorAll('.filter-item');

if (filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = '';  // ← resetea al valor por defecto del CSS
        } else {
          item.style.display = 'none';
        }
      });

      AOS.refresh();  // ← fuera del bucle, solo una vez
    });
  });
}

  // 5. VALIDACIÓN DEL FORMULARIO DE INSCRIPCIÓN
  const formulario = document.getElementById('form-inscripcion');
  const contenedorForm = document.getElementById('contenedor-formulario');
  const mensajeExito = document.getElementById('mensaje-exito');

  if (formulario) {
      formulario.addEventListener('submit', function (event) {
          event.preventDefault();

          const nombre = formulario.querySelector('input[type="text"]');
          const email = formulario.querySelector('input[type="email"]');
          const experiencia = formulario.querySelector('select');

          if (nombre.value.trim().length < 3) {
              alert("¡Eh, forastero! Necesitamos un nombre para preparar este festival.");
          } 
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
              alert("Ese correo parece un sendero cortado. ¡Revísalo!");
          }
          else if (experiencia.value === "" || experiencia.value === null) {
              alert("¿A qué aventura te apuntas? Elige una experiencia.");
          }
          else {
              ejecutarCambio();
          }
      });
  }

  function ejecutarCambio() {
      contenedorForm.classList.add('is-hidden');

      setTimeout(() => {
          contenedorForm.classList.add('d-none');
          mensajeExito.classList.remove('d-none');

          setTimeout(() => {
              mensajeExito.classList.remove('is-hidden');
          }, 50);

          if (typeof AOS !== 'undefined') AOS.refresh();
      }, 400);
  }
};