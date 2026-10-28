const form = document.getElementById('lf');
const err = document.getElementById('e');
const btn = document.getElementById('go');
const pw = document.getElementById('p');

// Check whether the user is already signed in.
fetch('./api/me.php', {
    credentials: 'same-origin'
})
    .then(async response => {
        const text = await response.text();

        console.log('me.php status:', response.status);
        console.log('me.php response:', text);

        if (!response.ok) return null;

        try {
            return JSON.parse(text);
        } catch {
            console.error('me.php did not return valid JSON.');
            return null;
        }
    })
    .then(data => {
        if (data?.success) {
            window.location.href = data.data.redirect;
        }
    })
    .catch(error => {
        console.error('Session check failed:', error);
    });

// Toggle password visibility.
document.getElementById('show').addEventListener('click', event => {
    const hidden = pw.type === 'password';

    pw.type = hidden ? 'text' : 'password';
    event.target.textContent = hidden ? 'Hide' : 'Show';
});

// Handle login.
form.addEventListener('submit', async event => {
    event.preventDefault();

    err.textContent = '';
    btn.disabled = true;
    btn.textContent = 'Signing in...';

    try {
        const response = await fetch('./api/login.php', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById('u').value.trim(),
                password: pw.value
            })
        });

        const text = await response.text();

        console.log('login.php status:', response.status);
        console.log('login.php response:', text);

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            throw new Error(
                `PHP returned invalid JSON (HTTP ${response.status}). Check the Console for the response.`
            );
        }

        if (!response.ok || !data.success) {
            err.textContent = data.message || 'Login failed.';
            return;
        }

        if (!data.data?.redirect) {
            throw new Error('Login succeeded, but no redirect URL was returned.');
        }

        window.location.href = data.data.redirect;

    } catch (error) {
        console.error('Login error:', error);

        err.textContent = error.message ||
            'Unable to communicate with the server.';

    } finally {
        btn.disabled = false;
        btn.textContent = 'Sign in';
    }
});
