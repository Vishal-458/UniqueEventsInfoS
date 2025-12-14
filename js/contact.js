// ===== EMAILJS CONTACT FORM =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with YOUR Public Key
    emailjs.init('io4Wt4oZuhwtDgfl_');
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get submit button
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnHTML = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Prepare form data
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            event_type: document.getElementById('event-type').value,
            message: document.getElementById('message').value,
            date: new Date().toLocaleString()
        };
        
        // Send email using EmailJS
        // REPLACE THESE WITH YOUR ACTUAL IDs:
        emailjs.send('Events001', 'template_949hr4j', templateParams)
            .then(function() {
                // Success message
                formMessage.innerHTML = `
                    <div style="background:#d4ffd4; color:#006400; padding:20px; border-radius:10px; margin-top:20px;">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you! We will contact you within 24 hours.</p>
                        <p class="hindi-font">धन्यवाद! हम 24 घंटे में संपर्क करेंगे।</p>
                    </div>
                `;
                
                // Reset form
                contactForm.reset();
            })
            .catch(function() {
                // Error message
                formMessage.innerHTML = `
                    <div style="background:#ffd4d4; color:#8b0000; padding:20px; border-radius:10px; margin-top:20px;">
                        <i class="fas fa-exclamation-circle"></i>
                        <h3>Message Failed to Send</h3>
                        <p>Please email us directly at: info@uniqueeventsindia.com</p>
                    </div>
                `;
            })
            .finally(function() {
                // Reset button
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
    });
});