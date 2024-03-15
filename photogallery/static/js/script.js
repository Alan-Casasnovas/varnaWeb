// script.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('Le contenu de la page est charg�.');

    // Gestion de l'ajout de commentaires
    document.querySelectorAll('.comment-form').forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const photoId = form.dataset.photoid;
            const commentText = form.querySelector('input[name="comment"]').value;

            fetch('/add_comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    photo_id: photoId,
                    comment_text: commentText
                })
            })
                .then(response => response.json())
                .then(data => {
                    // Actualiser la liste des commentaires apr�s l'ajout
                    // Vous pouvez impl�menter la mise � jour du DOM ici
                    console.log('Commentaire ajout� avec succ�s:', data);
                })
                .catch(error => console.error('Erreur lors de l\'ajout du commentaire:', error));
        });
    });

    // Fonction pour r�cup�rer le token CSRF
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
