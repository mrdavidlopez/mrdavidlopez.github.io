document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fade-in animation for elements as they come into view
    const faders = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .education-item');
    
    // First make all elements visible immediately for browsers without IntersectionObserver
    faders.forEach(fader => {
        fader.classList.add('fade-in');
        fader.classList.add('appear');
    });
    
    // Then use IntersectionObserver for animated reveal if supported
    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -100px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('appear');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);
        
        faders.forEach(fader => {
            // Remove the appear class we added earlier
            fader.classList.remove('appear');
            appearOnScroll.observe(fader);
        });
    }
    
    // Typing effect for the tagline
    const tagline = document.querySelector('.tagline');
    const taglineText = tagline.textContent;
    tagline.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < taglineText.length) {
            tagline.textContent += taglineText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect when the page loads
    setTimeout(typeWriter, 1000);
    
    // Add toggle animation for burger menu
    const burgerLines = document.querySelectorAll('.burger div');
    burger.addEventListener('click', () => {
        burgerLines[0].classList.toggle('line1-active');
        burgerLines[1].classList.toggle('line2-active');
        burgerLines[2].classList.toggle('line3-active');
    });
    
    // Add CSS for burger animation
    const style = document.createElement('style');
    style.textContent = `
        .line1-active {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .line2-active {
            opacity: 0;
        }
        .line3-active {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    // Add hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Add skill progress animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        const skills = category.querySelectorAll('.skill-list li');
        skills.forEach((skill, index) => {
            skill.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // Add scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    // Add CSS for scroll to top button
    const scrollBtnStyle = document.createElement('style');
    scrollBtnStyle.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-top-btn:hover {
            background-color: var(--secondary-color);
            transform: translateY(-5px);
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
        }
    `;
    document.head.appendChild(scrollBtnStyle);
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add theme toggle functionality
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    document.body.appendChild(themeToggle);
    
    // Add CSS for theme toggle
    const themeToggleStyle = document.createElement('style');
    themeToggleStyle.textContent = `
        .theme-toggle {
            position: fixed;
            top: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            z-index: 999;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            background-color: var(--secondary-color);
            transform: translateY(-5px);
        }
        
        .dark-theme {
            --primary-color: #3a5a78;
            --secondary-color: #1e3a52;
            --accent-color: #64d6ff;
            --background-color: #121212;
            --text-color: #e0e0e0;
            --light-text: #f8f9fa;
            --dark-text: #e0e0e0;
            --border-color: #333;
            --card-bg: #1e1e1e;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }
        
        .dark-theme #navbar {
            background-color: rgba(18, 18, 18, 0.95);
        }
        
        .dark-theme .nav-links {
            background-color: rgba(18, 18, 18, 0.95);
        }
        
        .dark-theme .scrolled {
            background-color: rgba(18, 18, 18, 0.98) !important;
        }
        
        /* Profile picture styles */
        .profile-pic {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid var(--accent-color);
            margin-bottom: 20px;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }
        
        .profile-pic:hover {
            transform: scale(1.05);
            border-color: var(--primary-color);
        }
        
        @media screen and (max-width: 768px) {
            .theme-toggle {
                top: auto;
                bottom: 100px;
                right: 30px;
            }
        }
    `;
    document.head.appendChild(themeToggleStyle);
    
    // Toggle dark/light theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});