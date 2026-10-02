// =====================================================================
//  Insertion du contenu partagé (ex. : partage/codes-promo.html)
//  Toute balise <div data-include="chemin/fichier.html"></div>
//  est remplie automatiquement avec le contenu de ce fichier.
// =====================================================================
(function () {
    document.querySelectorAll('[data-include]').forEach(function (zone) {
        fetch(zone.getAttribute('data-include'), { cache: 'no-cache' })
            .then(function (reponse) {
                if (!reponse.ok) throw new Error(reponse.status);
                return reponse.text();
            })
            .then(function (html) { zone.innerHTML = html; })
            .catch(function (erreur) {
                console.error('Contenu partagé introuvable :', erreur);
                zone.innerHTML = '<p style="color:#5A6A7A;">Contenu temporairement indisponible. Veuillez rafraîchir la page.</p>';
            });
    });

    // Bouton « Copier » des codes promo (défini ici s'il n'existe pas déjà dans la page)
    if (typeof window.copyCode !== 'function') {
        window.copyCode = function (codeText, bouton) {
            navigator.clipboard.writeText(codeText).then(function () {
                var texte = bouton.querySelector('span');
                var original = texte.innerText;
                bouton.classList.add('copied');
                texte.innerText = 'Copié !';
                setTimeout(function () {
                    bouton.classList.remove('copied');
                    texte.innerText = original;
                }, 2000);
            }).catch(function (err) { console.error('Erreur lors de la copie :', err); });
        };
    }
})();
