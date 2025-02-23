const cards = document.querySelectorAll('.card');
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("nav ul li a");
let currentIndex = 0;
let isScrolling = false;

// Reduce debounce time to improve responsiveness
window.addEventListener('wheel', (event) => {
    if (isScrolling) return;

    isScrolling = true;
    setTimeout(() => (isScrolling = false), 200);

    navigateCards(event.deltaY > 0 ? 1 : -1);
});


function navigateCards(direction) {
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), cards.length - 1);

    if (nextIndex !== currentIndex) {
        scrollToSection(nextIndex);
        currentIndex = nextIndex;
    }
}

// Initialize card positions
cards.forEach((card, index) => {
    card.style.transform = `translateY(${index * 100}%)`;
});

// Optimize navbar animation
function updateNavbarColor(index) {
    const colors = ["#FF5656", "#494953", "#6A7EFC", "#494953", "#FF5656"];
    navbar.style.backgroundColor = colors[index];
}

// Smooth scrolling when clicking navbar links
navLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        scrollToSection(index);
    });
});

function scrollToSection(index) {
    cards.forEach((card, i ) => {
        card.style.transition = "transform 0.7s ease-in-out";
        card.style.transform = `translateY(${(i - index) * 100}%)`;
    });
    currentIndex = index;
    updateNavbarColor(index);
}

// Ensure navbar stays visible without unnecessary updates
let lastScrollY = 0;
window.addEventListener("scroll", () => {
    if (window.scrollY !== lastScrollY) {
        navbar.style.top = "10px";
        lastScrollY = window.scrollY;
    }
});

// Keep navbar visible on homepage
navbar.style.top = "10px";
navbar.style.transition = "top 0.8s ease, background-color 0.8s ease"; // Increased transition duration

// Scroll indicator animation
const scrollIndicator = document.querySelector(".scroll-down");
scrollIndicator.addEventListener("click", () => {
    scrollToSection(1); // Scrolls to the next section when clicked
});
