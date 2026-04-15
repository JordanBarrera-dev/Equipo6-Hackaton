  const modal = document.getElementById("cartModal");
  const openBtn = document.getElementById("openCart");
  const closeBtn = document.getElementById("closeCart");

  // Abrir modal
openBtn.onclick = () => {
    cargarCarrito(); // 🔥 ahora sí
    modal.style.display = "block";
};

  // Cerrar con X
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  // Cerrar haciendo click fuera
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
