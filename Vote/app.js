document.addEventListener('DOMContentLoaded', () => {
    const voteButton = document.querySelector('.cta-button');
    const voteForm = document.querySelector('#vote-now form');
    const contactForm = document.querySelector('section.contact form');
    
    const navbarUser = document.querySelector('.navbar-user'); // Add this element to show the username

    // Handle voting button click
    voteButton.addEventListener('click', () => {
        const voteNowSection = document.querySelector('#vote-now');
        voteNowSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Handle vote form submission
    if (voteForm) {
        voteForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const selectedCandidate = document.querySelector('#candidate').value;
            alert(`You have voted for: ${selectedCandidate}`);
            // Here you can add code to send the vote to the server
            voteForm.reset(); // Reset the form after submission
        });
    }

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const message = document.querySelector('textarea').value;
            alert(`Thank you, ${name}! Your message has been sent.`);
            // Here you can add code to send the message to the server
            contactForm.reset(); // Reset the form after submission
        });
    }

    // Modal handling
    const signupButton = document.getElementById('signup-button');
    const signupForm = document.getElementById('signup-form');
    const closeSignupButton = document.getElementById('close-signup');

    const loginButton = document.getElementById('login-button');
    const loginForm = document.getElementById('login-form');
    const closeLoginButton = document.getElementById('close-login');

    // Show signup modal
    signupButton.onclick = () => {
        signupForm.style.display = 'block';
    };

    // Close signup modal
    closeSignupButton.onclick = () => {
        signupForm.style.display = 'none';
    };

    // Show login modal
    loginButton.onclick = () => {
        loginForm.style.display = 'block';
    };

    // Close login modal
    closeLoginButton.onclick = () => {
        loginForm.style.display = 'none';
    };

    // Close modals on outside click
    window.onclick = (event) => {
        if (event.target === signupForm) {
            signupForm.style.display = 'none';
        }
        if (event.target === loginForm) {
            loginForm.style.display = 'none';
        }
    };

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.querySelector('#login-username').value;
            alert(`Welcome back, ${username}!`);
            // Update navbar to show the username
            navbarUser.textContent = username; // Assuming you have an element in the navbar to display the username
            navbarUser.style.display = 'block'; // Ensure the username is visible
            loginForm.reset(); // Reset the form after submission
            loginForm.style.display = 'none'; // Close the modal after login
        });
    }
});
