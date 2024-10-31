// Function to validate email format
function isValidEmail(email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
      }
      
      // Function to validate password strength
      function isStrongPassword(password) {
          // At least 8 characters long, contains at least one uppercase letter, one lowercase letter, one number, and one special character
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(password);
      }
      
      // Function to display error messages
      function showError(inputElement, message) {
          const errorElement = inputElement.nextElementSibling;
          if (errorElement && errorElement.classList.contains('error-message')) {
              errorElement.textContent = message;
          } else {
              const newErrorElement = document.createElement('div');
              newErrorElement.className = 'error-message';
              newErrorElement.textContent = message;
              inputElement.parentNode.insertBefore(newErrorElement, inputElement.nextSibling);
          }
          inputElement.classList.add('error');
      }
      
      // Function to clear error messages
      function clearError(inputElement) {
          const errorElement = inputElement.nextElementSibling;
          if (errorElement && errorElement.classList.contains('error-message')) {
              errorElement.textContent = '';
          }
          inputElement.classList.remove('error');
      }
      
      // Login form validation
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
          loginForm.addEventListener('submit', function (e) {
              e.preventDefault();
              const username = document.getElementById('username');
              const password = document.getElementById('password');
              let isValid = true;
      
              if (username.value.trim() === '') {
                  showError(username, 'Please enter a username');
                  isValid = false;
              } else {
                  clearError(username);
              }
      
              if (password.value.trim() === '') {
                  showError(password, 'Please enter a password');
                  isValid = false;
              } else {
                  clearError(password);
              }
      
              if (isValid) {
                  // If validation passes, you can submit the form or make an API call here
                  console.log('Login form submitted');
                  // Simulate successful login and redirect to dashboard
                  window.location.href = 'dashboard.html';
              }
          });
      }
      
      // Register form validation
      const registerForm = document.getElementById('registerForm');
      if (registerForm) {
          registerForm.addEventListener('submit', function (e) {
              e.preventDefault();
              const fullname = document.getElementById('fullname');
              const email = document.getElementById('email');
              const username = document.getElementById('username');
              const password = document.getElementById('password');
              const confirmPassword = document.getElementById('confirmPassword');
              let isValid = true;
      
              if (fullname.value.trim() === '') {
                  showError(fullname, 'Please enter your full name');
                  isValid = false;
              } else {
                  clearError(fullname);
              }
      
              if (!isValidEmail(email.value)) {
                  showError(email, 'Please enter a valid email address');
                  isValid = false;
              } else {
                  clearError(email);
              }
      
              if (username.value.trim() === '') {
                  showError(username, 'Please enter a username');
                  isValid = false;
              } else {
                  clearError(username);
              }
      
              if (!isStrongPassword(password.value)) {
                  showError(password, 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                  isValid = false;
              } else {
                  clearError(password);
              }
      
              if (password.value !== confirmPassword.value) {
                  showError(confirmPassword, 'Passwords do not match');
                  isValid = false;
              } else {
                  clearError(confirmPassword);
              }
      
              if (isValid) {
                  // If validation passes, you can submit the form or make an API call here
                  console.log('Register form submitted');
                  // Simulate successful registration and redirect to login page
                  alert('Registration successful! Please log in.');
                  window.location.href = 'login.html';
              }
          });
      }
      
      // Dashboard functionality (including logout)
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
          logoutBtn.addEventListener('click', function (e) {
              e.preventDefault();
              // Here you would typically send a request to your server to invalidate the session
              // For this example, we'll just redirect to the login page
              const confirmLogout = confirm('Are you sure you want to log out?');
              if (confirmLogout) {
                  console.log('User logged out');
                  window.location.href = 'login.html';
              }
          });
      }
      
      // Add event listeners for real-time validation
      const inputFields = document.querySelectorAll('input');
      inputFields.forEach(input => {
          input.addEventListener('blur', function () {
              if (this.id === 'email' && this.value !== '') {
                  if (!isValidEmail(this.value)) {
                      showError(this, 'Please enter a valid email address');
                  } else {
                      clearError(this);
                  }
              } else if (this.id === 'password' && this.value !== '') {
                  if (!isStrongPassword(this.value)) {
                      showError(this, 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                  } else {
                      clearError(this);
                  }
              } else if (this.value.trim() === '') {
                  showError(this, 'This field is required');
              } else {
                  clearError(this);
              }
          });
      });
      
      // sidebar menu toggle
      const menuToggle = document.getElementById('menu-toggle');
      const body = document.body;
      
      menuToggle.addEventListener('click', function () {
          body.classList.toggle('sidebar-visible');
      });
      
      // Sample data for total orders and dates
      const ordersData = [12, 19, 3, 5, 2, 3, 10]; // Total orders
      const ordersDates = ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07']; // Dates
      
      // Function to create the sales chart
      function createSalesChart() {
          const ctx = document.getElementById('salesChart').getContext('2d');
          const salesChart = new Chart(ctx, {
              type: 'line', // Chart type: line
              data: {
                  labels: ordersDates, // X-axis labels (dates)
                  datasets: [{
                      label: 'Total Orders', // Label for the dataset
                      data: ordersData, // Y-axis data (total orders)
                      backgroundColor: 'rgba(72, 52, 212, 0.2)', // Fill color under the line
                      borderColor: 'rgba(72, 52, 212, 1)', // Line color
                      borderWidth: 2,
                      fill: true, // Fill the area under the line
                      tension: 0.4 // Curve the line
                  }]
              },
              options: {
                  responsive: true,
                  scales: {
                      x: {
                          title: {
                              display: true,
                              text: 'Date' // X-axis label
                          }
                      },
                      y: {
                          beginAtZero: true,
                          title: {
                              display: true,
                              text: 'Total Orders' // Y-axis label
                          }
                      }
                  }
              }
          });
      }
      
      // Call the function to create the chart after the page loads
      window.onload = function () {
          createSalesChart();
      };
      
