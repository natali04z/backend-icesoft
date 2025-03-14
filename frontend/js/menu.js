// Abrir y cerrar menú lateral
document.addEventListener('DOMContentLoaded', () => {
    const btnMenuList = document.querySelectorAll('.btn-menu');
    const navLateral = document.querySelector('.navLateral');
  
    btnMenuList.forEach(btn => {
      btn.addEventListener('click', () => {
        navLateral.classList.toggle('navLateral-show');
      });
    });
  
    // Submenús
    const subMenuButtons = document.querySelectorAll('.btn-subMenu');
    subMenuButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const subMenu = button.nextElementSibling;
        const arrow = button.querySelector('.arrow');
  
        subMenu.classList.toggle('show-submenu');
        arrow.classList.toggle('rotate-arrow');
      });
    });
  });
  
  // Cerrar sesión
  function logout() {
    localStorage.clear();
    window.location.href = "index.html";
  }
  