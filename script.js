document.addEventListener('DOMContentLoaded', function() {
    const goalAmount = 150000;
    const currentAmount = 48750;
    const donationButtons = document.querySelectorAll('.donation-amount-btn');
    const customAmountInput = document.getElementById('custom-amount-input');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonialIndex = 0;

    // Gallery functionality
    let galleryImages = [];
    let currentGalleryIndex = 0;

    function formatCurrency(value) {
        return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    }

    function clearActiveButtonState() {
         donationButtons.forEach(btn => {
            btn.classList.remove('bg-amber-600', 'text-white', 'border-amber-600');
            btn.classList.add('bg-white', 'text-stone-700', 'border-stone-300');
        });
    }

    donationButtons.forEach(button => {
        button.addEventListener('click', () => {
            clearActiveButtonState();
            button.classList.add('bg-amber-600', 'text-white', 'border-amber-600');
            button.classList.remove('bg-white', 'text-stone-700', 'border-stone-300');
            customAmountInput.value = ''; 
        });
    });

    customAmountInput.addEventListener('input', () => {
        clearActiveButtonState();
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
             if (mobileMenu.classList.contains('hidden') === false) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            if (i === index) {
                item.classList.remove('opacity-0');
                item.classList.add('opacity-100');
                item.style.zIndex = '10';
            } else {
                item.classList.add('opacity-0');
                item.classList.remove('opacity-100');
                item.style.zIndex = '1';
            }
        });
        
        testimonialDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('bg-amber-600');
                dot.classList.remove('bg-stone-300');
            } else {
                dot.classList.remove('bg-amber-600');
                dot.classList.add('bg-stone-300');
            }
        });
        currentTestimonialIndex = index;
    }

    function nextTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        showTestimonial(currentTestimonialIndex);
    }

    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });

    // Initialize testimonial slider
    if (testimonialItems.length > 0) {
        showTestimonial(0);
        setInterval(nextTestimonial, 7000);
    }

    // Gallery Modal Functions
    function openGalleryModal(index) {
        // Collect all gallery images from visible and hidden sections
        const visibleImages = document.querySelectorAll('.grid.grid-cols-2 img');
        const hiddenImages = document.querySelectorAll('#hidden-gallery-images .gallery-image');
        galleryImages = [...visibleImages, ...hiddenImages];
        
        currentGalleryIndex = index;
        const modal = document.getElementById('gallery-modal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        showGalleryImage(index);
    }
    
    // Make openGallery available globally for onclick
    window.openGallery = function() {
        openGalleryModal(0);
    };

    function closeGalleryModal() {
        const modal = document.getElementById('gallery-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    function showGalleryImage(index) {
        const modalImg = document.getElementById('modal-gallery-image');
        const modalCaption = document.getElementById('modal-gallery-caption');
        const img = galleryImages[index];
        
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.textContent = img.alt;
        
        document.getElementById('gallery-counter').textContent = `${index + 1} / ${galleryImages.length}`;
    }

    function nextGalleryImage() {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        showGalleryImage(currentGalleryIndex);
    }

    function prevGalleryImage() {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        showGalleryImage(currentGalleryIndex);
    }

    // Initialize gallery - removed individual image click handlers since we use onclick in HTML

    // Modal control handlers
    const closeModalBtn = document.getElementById('close-gallery-modal');
    const prevBtn = document.getElementById('prev-gallery-btn');
    const nextBtn = document.getElementById('next-gallery-btn');
    const modalOverlay = document.getElementById('gallery-modal');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeGalleryModal);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevGalleryImage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextGalleryImage);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeGalleryModal();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('gallery-modal');
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeGalleryModal();
            } else if (e.key === 'ArrowRight') {
                nextGalleryImage();
            } else if (e.key === 'ArrowLeft') {
                prevGalleryImage();
            }
        }
    });

});