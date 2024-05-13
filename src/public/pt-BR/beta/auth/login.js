export function login () {
    try {
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get('redirect');
        if (redirect === '/account/pt-BR/beta/history/' || redirect === '/account/pt-BR/beta/') {
            let loginBtn = document.getElementById('loginBtn');
            let username = document.getElementById('usernameBox');
            let password = document.getElementById('passwordBox');
            loginBtn.onclick = function(event) {
                loginBtn.style.backgroundColor = '#a5a3a3';
                loginBtn.textContent = 'Conectando...';
                loginBtn.disabled = true;
                loginBtn.style.cursor = 'default';
                event.preventDefault();
                let user = username.value;
                let pass = password.value;
                if (user === '' || pass === '') {
                    loginBtn.style.backgroundColor = '#ff0000';
                    loginBtn.textContent = 'Insira um usuário e senha';
                    loginBtn.disabled = false;
                    setTimeout(() => {
                        loginBtn.style.backgroundColor = '';
                        loginBtn.textContent = 'Continuar com Riot Games';
                        let img = document.createElement('img');
                        img.src = 'https://cdn.valorao.cloud/images%2Friotlogo.png';
                        img.style.cursor = 'pointer';
                        loginBtn.appendChild(img);
                    }, 3000);
                    return;
                }
        
                var rememberCheckbox = document.getElementById('remember-me');
                var data = {
                    'username': user,
                    'password': pass
                };
                
                if (rememberCheckbox && rememberCheckbox.checked) {
                    data.remember = 'true';
                }
                if (!rememberCheckbox || !rememberCheckbox.checked) {
                    data.remember = 'false';
                }
        
                fetch('https://apis.valorao.cloud/rso/auth', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(response => {
                    if (response.status === 403) {
                        loginBtn.style.backgroundColor = '#FFA500';
                        loginBtn.textContent = 'Desative a A2F para continuar.';
                        setTimeout(() => {
                            loginBtn.style.backgroundColor = '';
                            loginBtn.textContent = 'Continuar com Riot Games';
                            loginBtn.disabled = false;
                            loginBtn.style.cursor = 'pointer';
                        }, 3000);
                    }
                    if (response.status === 400 || response.status === 401) {
                        loginBtn.style.backgroundColor = '#ff0000';
                        loginBtn.textContent = 'Insira um usuário e senha.';
                        setTimeout(() => {
                            loginBtn.style.backgroundColor = '';
                            loginBtn.textContent = 'Continuar com Riot Games';
                            loginBtn.disabled = false;
                            loginBtn.style.cursor = 'pointer';
                        }, 3000);
                    }
                    if (response.status === 200) {
                        loginBtn.style.backgroundColor = '#00ff00';
                        loginBtn.textContent = 'Conectado';
        
                        window.location.href = `${redirect}?redirect=${window.location.pathname}`;
                    }
                    return response.json();
                })
                .catch(error => console.error('Error:', error));
            }

        }


        if(redirect !== '/account/pt-BR/beta/history/') {
            let loginBtn = document.getElementById('loginBtn');
            let username = document.getElementById('usernameBox');
            let password = document.getElementById('passwordBox');
            loginBtn.onclick = function(event) {
                loginBtn.style.backgroundColor = '#a5a3a3';
                loginBtn.textContent = 'Conectando...';
                loginBtn.disabled = true;
                loginBtn.style.cursor = 'default';
                event.preventDefault();
                let user = username.value;
                let pass = password.value;
                if (user === '' || pass === '') {
                    loginBtn.style.backgroundColor = '#ff0000';
                    loginBtn.textContent = 'Insira um usuário e senha';
                    loginBtn.disabled = false;
                    setTimeout(() => {
                        loginBtn.style.backgroundColor = '';
                        loginBtn.textContent = 'Continuar com Riot Games';
                        let img = document.createElement('img');
                        img.src = 'https://cdn.valorao.cloud/images%2Friotlogo.png';
                        img.style.cursor = 'pointer';
                        loginBtn.appendChild(img);
                    }, 3000);
                    return;
                }
        
                var rememberCheckbox = document.getElementById('remember-me');
                var data = {
                    'username': user,
                    'password': pass
                };
                
                if (rememberCheckbox && rememberCheckbox.checked) {
                    data.remember = 'true';
                }
                if (!rememberCheckbox || !rememberCheckbox.checked) {
                    data.remember = 'false';
                }
        
                fetch('https://apis.valorao.cloud/rso/auth', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(response => {
                    if (response.status === 403) {
                        loginBtn.style.backgroundColor = '#FFA500';
                        loginBtn.textContent = 'Desative a A2F para continuar.';
                        setTimeout(() => {
                            loginBtn.style.backgroundColor = '';
                            loginBtn.textContent = 'Continuar com Riot Games';
                            loginBtn.disabled = false;
                            loginBtn.style.cursor = 'pointer';
                        }, 3000);
                    }
                    if (response.status === 400 || response.status === 401) {
                        loginBtn.style.backgroundColor = '#ff0000';
                        loginBtn.textContent = 'Insira um usuário e senha.';
                        setTimeout(() => {
                            loginBtn.style.backgroundColor = '';
                            loginBtn.textContent = 'Continuar com Riot Games';
                            loginBtn.disabled = false;
                            loginBtn.style.cursor = 'pointer';
                        }, 3000);
                    }
                    if (response.status === 200) {
                        loginBtn.style.backgroundColor = '#00ff00';
                        loginBtn.textContent = 'Conectado';
        
                        window.location.href = `${redirect}?redirect=${window.location.pathname}`;
                    }
                    return response.json();
                })
                .catch(error => console.error('Error:', error));
            }
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}
