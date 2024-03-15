// script.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('Le contenu de la page est chargé.');

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
                    // Actualiser la liste des commentaires après l'ajout
                    // Vous pouvez implémenter la mise à jour du DOM ici
                    console.log('Commentaire ajouté avec succès:', data);
                })
                .catch(error => console.error('Erreur lors de l\'ajout du commentaire:', error));
        });
    });

    // Fonction pour récupérer le token CSRF
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
