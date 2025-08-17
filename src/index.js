// ===== SCRIPT DE NAVEGACIÓN SIMPLE =====


// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGACIÓN =====
    const buttons = document.querySelectorAll('[data-nav-link]');
    const pages = document.querySelectorAll('[data-page]');
    
    
    // Mostrar todos los elementos encontrados
    buttons.forEach((btn, i) => {
        const navLink = btn.getAttribute('data-nav-link');
    });
    
    pages.forEach((page, i) => {
        const pageId = page.getAttribute('data-page');
    });
    
    // Función para cambiar página
    function showPage(pageId) {
        
        // Ocultar todas las páginas
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Desactivar todos los botones
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Activar página específica
        const targetPage = document.querySelector(`[data-page="${pageId}"]`);
        if (targetPage) {
            targetPage.classList.add('active');
        } else {
            console.error(`❌ No se encontró la página: "${pageId}"`);
        }
        
        // Activar botón específico
        const targetBtn = document.querySelector(`[data-nav-link="${pageId}"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
        } else {
            console.error(`❌ No se encontró el botón: "${pageId}"`);
        }
        
        // Scroll arriba
        window.scrollTo(0, 0);
    }
    
    // Agregar clicks a los botones
    buttons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const pageId = this.getAttribute('data-nav-link');
            
            showPage(pageId);
        });
        
    });
    
    // Página inicial
    showPage('about');
    
});

// ===== SIDEBAR =====
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");

    if (sidebarBtn && sidebar) {
        sidebarBtn.addEventListener("click", function() {
            sidebar.classList.toggle("active");
        });
    }
});

// ===== TEST MANUAL =====
// Función para probar manualmente en la consola
window.testNavigation = function(pageId) {
    
    const pages = document.querySelectorAll('[data-page]');
    const buttons = document.querySelectorAll('[data-nav-link]');
    
    pages.forEach(p => p.classList.remove('active'));
    buttons.forEach(b => b.classList.remove('active'));
    
    const targetPage = document.querySelector(`[data-page="${pageId}"]`);
    const targetBtn = document.querySelector(`[data-nav-link="${pageId}"]`);
    
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
};

document.addEventListener("DOMContentLoaded", () => {
  const form   = document.querySelector('.contact .form');
  const btn    = form.querySelector('[data-form-btn]');
  const status = document.getElementById('form-status');

  // Habilitar el botón cuando hay datos válidos
  const toggleBtn = () => {
    const ok = form.fullname.value.trim() && form.email.validity.valid && form.message.value.trim();
    btn.disabled = !ok;
  };
  form.addEventListener('input', toggleBtn);
  toggleBtn(); // estado inicial

  // Enviar con fetch (progresive enhancement)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;

    status.style.display = 'none';
    status.textContent = '';

    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (resp.ok) {
        form.reset();
        toggleBtn();
        status.textContent = '¡Mensaje enviado! Te responderé a la brevedad.';
        status.style.display = 'block';
      } else {
        status.textContent = 'No pude enviar el mensaje. Probá nuevamente.';
        status.style.display = 'block';
      }
    } catch (err) {
      status.textContent = 'Ocurrió un error de red. Intentá de nuevo.';
      status.style.display = 'block';
      console.error(err);
    } finally {
      btn.disabled = false;
    }
  });
});

