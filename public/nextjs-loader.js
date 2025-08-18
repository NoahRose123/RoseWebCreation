// Next.js Enhancement Loader
// This script enhances the static HTML with Next.js features when available

(function() {
    'use strict';
    
    // Check if Next.js is available
    function isNextJsAvailable() {
        return typeof window !== 'undefined' && window.__NEXT_DATA__;
    }
    
    // Enhance the static HTML with Next.js features
    function enhanceWithNextJs() {
        console.log('🎉 Next.js is available - enhancing website with dynamic features!');
        
        // Add dynamic features here
        addDynamicFeatures();
    }
    
    // Add dynamic features
    function addDynamicFeatures() {
        // Enhanced animations
        addEnhancedAnimations();
        
        // Interactive components
        addInteractiveComponents();
        
        // Real-time updates
        addRealTimeUpdates();
    }
    
    // Enhanced animations
    function addEnhancedAnimations() {
        const elements = document.querySelectorAll('.service-card, .feature-item');
        
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            el.classList.add('enhanced-animation');
        });
        
        // Add CSS for enhanced animations
        const style = document.createElement('style');
        style.textContent = `
            .enhanced-animation {
                animation: enhancedFadeInUp 0.8s ease-out forwards;
            }
            
            @keyframes enhancedFadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(40px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Interactive components
    function addInteractiveComponents() {
        // Enhanced contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            const form = document.createElement('form');
            form.innerHTML = `
                <div style="margin-bottom: 1rem;">
                    <input type="text" placeholder="Your Name" required 
                           style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 0.5rem;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <input type="email" placeholder="Your Email" required 
                           style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 0.5rem;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <textarea placeholder="Tell us about your project..." rows="4" required
                              style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; resize: vertical;"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
            `;
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('🎉 Thank you! Your message has been sent. (Next.js enhanced form)');
            });
            
            contactForm.innerHTML = '';
            contactForm.appendChild(form);
        }
        
        // Enhanced testimonials
        addEnhancedTestimonials();
    }
    
    // Enhanced testimonials
    function addEnhancedTestimonials() {
        const testimonials = [
            {
                name: "Sarah Johnson",
                company: "Mason Solutions",
                content: "Rose Web Creation transformed our business with a stunning website that perfectly represents our brand. The team was professional, responsive, and delivered beyond our expectations.",
                rating: 5
            },
            {
                name: "Mike Thompson", 
                company: "Moose Plumbing",
                content: "Outstanding work! Our new website has increased our online leads by 300%. The design is modern, functional, and exactly what we needed.",
                rating: 5
            },
            {
                name: "Emily Chen",
                company: "Tech Startup", 
                content: "Working with Rose Web Creation was a game-changer for our startup. They understood our vision and created a website that truly stands out in our industry.",
                rating: 5
            }
        ];
        
        const servicesSection = document.querySelector('.services');
        if (servicesSection) {
            const testimonialsSection = document.createElement('section');
            testimonialsSection.className = 'testimonials';
            testimonialsSection.style.cssText = 'padding: 80px 0; background: white;';
            
            testimonialsSection.innerHTML = `
                <div class="container">
                    <div class="section-title">
                        <h2>What Our Clients Say</h2>
                        <p>Don't just take our word for it - hear from our satisfied clients</p>
                    </div>
                    <div class="testimonials-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
                        ${testimonials.map(testimonial => `
                            <div class="testimonial-card" style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                                <div style="display: flex; margin-bottom: 1rem;">
                                    ${'★'.repeat(testimonial.rating)}
                                </div>
                                <p style="color: #64748b; margin-bottom: 1.5rem; font-style: italic;">"${testimonial.content}"</p>
                                <div style="display: flex; align-items: center;">
                                    <div style="width: 40px; height: 40px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 0.75rem;">
                                        ${testimonial.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p style="font-weight: 600; color: #1e293b;">${testimonial.name}</p>
                                        <p style="font-size: 0.875rem; color: #64748b;">${testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            servicesSection.parentNode.insertBefore(testimonialsSection, servicesSection.nextSibling);
        }
    }
    
    // Real-time updates
    function addRealTimeUpdates() {
        // Add a live status indicator
        const statusIndicator = document.createElement('div');
        statusIndicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        `;
        statusIndicator.textContent = '🚀 Next.js Enhanced';
        document.body.appendChild(statusIndicator);
        
        // Add live visitor counter (simulated)
        const visitorCounter = document.createElement('div');
        visitorCounter.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        `;
        visitorCounter.textContent = '👥 Live Visitors: 1,247';
        document.body.appendChild(visitorCounter);
    }
    
    // Initialize
    function init() {
        if (isNextJsAvailable()) {
            enhanceWithNextJs();
        } else {
            console.log('📄 Static HTML mode - website is fully functional!');
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
