document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("sliderTrack");
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const dots = document.querySelectorAll(".dot");
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayTimer;

    // دالة الانتقال لشريحة معينة بناءً على الاندكس (Index)
    function updateSlider(index) {
        // حماية الأندرويد لكي لا يخرج عن نطاق المصفوفة
        if (index >= totalSlides) currentIndex = 0;
        else if (index < 0) currentIndex = totalSlides - 1;
        else currentIndex = index;

        // تحريك المسار أفقيًا بناءً على مكان الصورة الحالية
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // تحديث حالة النقاط النشطة في الأسفل
        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add("active");
        }
    }

    // تشغيل زر التالي عند الضغط
    nextBtn.addEventListener("click", function () {
        updateSlider(currentIndex + 1);
        resetAutoPlay(); // تصفير وقت التحريك التلقائي عند الضغط اليدوي
    });

    // تشغيل زر السابق عند الضغط
    prevBtn.addEventListener("click", function () {
        updateSlider(currentIndex - 1);
        resetAutoPlay();
    });

    // ربط الضغط على النقاط السفلية بالصور مباشرة
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            updateSlider(index);
            resetAutoPlay();
        });
    });

    // دالة التحريك التلقائي (كل 4 ثوانٍ تنتقل الصورة)
    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            updateSlider(currentIndex + 1);
        }, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // إطلاق الحركة التلقائية فور تحميل الصفحة
    startAutoPlay();
});


