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
            item.style.display = 'block';
            AOS.refresh();
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. VALIDACIÓN DEL FORMULARIO DE INSCRIPCIÓN
  const formulario = document.getElementById('form-inscripcion');

  if (formulario) {
    formulario.addEventListener('submit', function (event) {
      event.preventDefault(); // Frenamos el envío para validar
      event.stopPropagation();

      let esValido = true;

      // Obtener los campos del main que te pasé
      const nombre = formulario.querySelector('input[type="text"]');
      const email = formulario.querySelector('input[type="email"]');
      const experiencia = formulario.querySelector('select');

      // Limpiamos validaciones previas si las hubiera
      formulario.classList.remove('was-validated');

      // Validación de Nombre
      if (nombre.value.trim().length < 3) {
        alert("¡Eh, forastero! Necesitamos un nombre real para preparar tu petate.");
        esValido = false;
      } 
      // Validación de Email
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        alert("Ese correo parece un sendero cortado. ¡Revísalo!");
        esValido = false;
      }
      // Validación de Selección
      else if (experiencia.value === "" || experiencia.value === null) {
        alert("¿A qué aventura te apuntas? Elige una experiencia.");
        esValido = false;
      }

      if (esValido) {
        formulario.classList.add('was-validated');
        mostrarExitoInscripcion();
      }
    });
  }

  // Función para mostrar el mensaje de éxito original
  function mostrarExitoInscripcion() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
        <div class="container text-center py-5" data-aos="zoom-in">
            <div class="py-5">
                <i class="bi bi-mailbox-flag display-1 text-verde-rv mb-4"></i>
                <h2 class="display-4 fw-bold text-verde-rv">¡Inscripción enviada!</h2>
                <p class="lead text-muted">Hemos recibido tu mensaje. En menos de lo que tarda en cantar un gallo, recibirás un correo con los detalles de tu expedición.</p>
                <div class="mt-4">
                    <a href="index.html" class="btn btn-naranja-rv rounded-pill px-5 py-3 fw-bold">Volver al inicio</a>
                </div>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
    // Refrescamos AOS para la nueva vista de éxito
    if (typeof AOS !== 'undefined') AOS.refresh();
  }
};