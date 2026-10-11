document.addEventListener("DOMContentLoaded", () => {
    // ================= 1. CARRUSEL MULTIMEDIA =================
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dots = document.querySelectorAll(".dot");
    const cards = document.querySelectorAll(".carousel-card");

    let currentIndex = 0;

    function updateCarousel() {
        const cardWidth = cards[0].getBoundingClientRect().width + 20; // Ancho + gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Actualizar puntos de navegación
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Regresa al inicio
        }
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - 1; // Va al final
        }
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // ================= 2. VENTANA MODAL =================
    const modal = document.getElementById("mediaModal");
    const modalBody = document.getElementById("modalBody");
    const closeModal = document.getElementById("closeModal");
    const modalButtons = document.querySelectorAll(".btn-modal");

    // Abrir Modal
    modalButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const type = btn.getAttribute("data-type");
            const src = btn.getAttribute("data-src");

            modalBody.innerHTML = ""; // Limpiar contenido previo

            if (type === "video") {
                modalBody.innerHTML = `<video controls autoplay style="width:100%; max-height:70vh; border-radius:10px;"><source src="${src}" type="video/mp4"></video>`;
            } else if (type === "audio") {
                modalBody.innerHTML = `<audio controls autoplay style="width:100%; margin-top:20px;"><source src="${src}" type="audio/mpeg"></audio>`;
            } else if (type === "pdf") {
                modalBody.innerHTML = `<iframe src="${src}" style="width:100%; height:70vh; border:none; border-radius:10px;"></iframe>`;
            }

            modal.style.display = "flex";
            document.body.classList.add("no-scroll"); // Bloquear desplazamiento de fondo
        });
    });

    // Cerrar Modal
    function hideModal() {
        modal.style.display = "none";
        modalBody.innerHTML = ""; // Detener reproducciones
        document.body.classList.remove("no-scroll"); // Liberar desplazamiento
    }

    closeModal.addEventListener("click", hideModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
});