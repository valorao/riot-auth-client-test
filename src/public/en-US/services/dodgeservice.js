export function dodge () {
    try {
    dodgeBtn.onclick = function(event) {
        event.preventDefault();

        fetch('https://apis.valorao.cloud/rso/player/pregame/leave', {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (response.status === 400) {
                try {
                    fetch('https://apis.valorao.cloud/rso/auth/reauth', {
                        method: 'GET',
                        credentials: 'include'
                    }).then(response => {
                        if(response.status === 303)
                        {
                            fetch('https://apis.valorao.cloud/rso/player/pregame/leave', {
                                method: 'GET'
                            })
                            if (response.status === 204) {
                                dodgeBtn.style.backgroundColor = '#005400';
                                dodgeBtn.textContent = 'Queue Dodged.';
                                dodgeBtn.style.backgroundColor = '#ffa500';
                                dodgeBtn.style.cursor = 'default';
                                dodgeBtn.disabled = true;
                        
                                const endTime = Date.now() + 60 * 1000;
                                localStorage.setItem('cooldownEnd', endTime);
                        
                                const intervalId = setInterval(() => {
                                    const remainingTime = Math.round((endTime - Date.now()) / 1000);
                                    if (remainingTime <= 0) {
                                        clearInterval(intervalId);
                                        dodgeBtn.disabled = false;
                                        dodgeBtn.style.backgroundColor = '';
                                        dodgeBtn.textContent = 'Dodge Queue';
                                        dodgeBtn.style.cursor = '';
                                        localStorage.removeItem('cooldownEnd');
                                    } else {
                                        dodgeBtn.textContent = 'On Cooldown: ' + remainingTime + 's';
                                    }
                                }, 1000);
                            }
                            if(response.status === 404) {
                                dodgeBtn.style.backgroundColor = '#D63021';
                                dodgeBtn.textContent = 'You are not in a pre-game.';
                                dodgeBtn.style.cursor = 'default';
                                dodgeBtn.disabled = true;
                                setTimeout(() => {
                                    dodgeBtn.style.backgroundColor = '';
                                    dodgeBtn.textContent = 'Dodge Queue';
                                    dodgeBtn.style.cursor = '';
                                    dodgeBtn.disabled = false;
                                }, 3000);
                            }
                            if(response.status === 400) {
                                dodgeBtn.style.backgroundColor = '#ff0000';
                                dodgeBtn.textContent = "Session Expired - Please login again. You'll be disconnected";
                                setTimeout(() => {
                                    fetch('https://apis.valorao.cloud/rso/fromstatic/logout', {
                                        method: 'GET'
                                    }).then(response => {
                                        if (response.status === 204) {
                                            window.location.reload();
                                        }
                                        if (response.status === 404) {
                                            window.location.reload();
                                        }
                                    })
                                }, 3000);
                            }
                        }
                    })
                }
                catch (error) {
                    console.error('Error:', error);
                }
            }
            if (response.status === 204) {
                dodgeBtn.style.backgroundColor = '#005400';
                dodgeBtn.textContent = 'Queue Dodged.';
                dodgeBtn.style.backgroundColor = '#ffa500';
                dodgeBtn.style.cursor = 'default';
                dodgeBtn.disabled = true;
        
                const endTime = Date.now() + 60 * 1000;
                localStorage.setItem('cooldownEnd', endTime);
        
                const intervalId = setInterval(() => {
                    const remainingTime = Math.round((endTime - Date.now()) / 1000);
                    if (remainingTime <= 0) {
                        clearInterval(intervalId);
                        dodgeBtn.disabled = false;
                        dodgeBtn.style.backgroundColor = '';
                        dodgeBtn.textContent = 'Dodge Queue';
                        dodgeBtn.style.cursor = '';
                        localStorage.removeItem('cooldownEnd');
                    } else {
                        dodgeBtn.textContent = 'On Cooldown: ' + remainingTime + 's';
                    }
                }, 1000);
            }
            if (response.status === 404) {
                dodgeBtn.style.backgroundColor = '#D63021';
                dodgeBtn.textContent = 'You are not in a pre-game.';
                dodgeBtn.style.cursor = 'default';
                dodgeBtn.disabled = true;
                setTimeout(() => {
                    dodgeBtn.style.backgroundColor = '';
                    dodgeBtn.textContent = 'Dodge Queue';
                    dodgeBtn.style.cursor = '';
                    dodgeBtn.disabled = false;
                }, 3000);
            }
        })
        .catch(error => console.error('Error:', error));
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}