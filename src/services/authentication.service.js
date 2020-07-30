export class AuthenticationService {
    static authWithEmailAndPassword(email, password) {
        const API_KEY = 'AIzaSyAm8r4Q_PN-uA7LarJfSJm9y7rBkQoB_IA';
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, returnSecureToken: true})
        })
        .then(response => response.json())
        .then(data => data.idToken);
    }
}