# SEVJ · Relevé chantier

Application mobile (page web) pour **relever les informations sur site** et générer une
**Fiche informative** destinée à la personne qui établit l'offre.

Tout tient dans un seul fichier `index.html` — aucune installation, aucun serveur requis.

---

## 1. Utilisation

1. Ouvrir le site sur le téléphone.
2. **Se connecter** en haut (section **Collaborateur**) : choisir son nom + mot de passe.
   - La **référence** en haut à droite se construit automatiquement :
     `INITIALES_DATE_NomDuChantier` (ex : `NW_20260708_BorneHalleCSud`). Elle reste modifiable.
   - Le nom du collaborateur signe la fiche (« Fiche établie par : … »).
3. Remplir : **Chantier** (infos + case amiante) → **Pièces** → **Temps** → **Remarques** → **Photos**.
4. **Générer la fiche** → aperçu → choisir **Détaillé** ou **Global** → **Télécharger** (vrai PDF paginé),
   ou **📤 PDF** — envoie le PDF en pièce jointe via le menu du téléphone (mail, WhatsApp…).

### Pièces 🏠
Le relevé s'organise **par pièce / zone** (ex : Cuisine, Salle de bain…). Avec **🏠 Ajouter une pièce**,
tu crées une pièce (nommable) et tu ajoutes **dedans** ses **cheminements**, **câbles/fils**,
**prises/interrupteurs**, **boîtes** et **disjoncteurs**. La liaison câble↔cheminement (longueur
automatique) se fait **au sein de la même pièce**.

Les blocs **Chantier**, **Collaborateur**, **Temps & main d'œuvre**, **Remarques**, **Photos** et la
case **« TAB en amiante »** sont **globaux** (une seule fois pour tout le chantier).

Chaque article ajouté porte un **badge numéroté** (`CÂBLE / FIL #2`, …), un **liseré bleu** à gauche,
et un champ **Nom** optionnel (ex : « Alim four ») affiché dans l'export détaillé.
La case *Travail en hauteur (> 3.50 m)* affiche automatiquement la **majoration 1.5×** du câble.

### Deux modes d'export
Dans l'aperçu, un sélecteur **Détaillé / Global** :
- **Détaillé** — un descriptif **par pièce**, les articles identiques d'une même pièce étant
  **additionnés** (leurs noms sont listés à côté).
- **Global** — pas de pièces : **tous les articles identiques du chantier sont additionnés**
  (ex : deux câbles `5x6 mm²` de deux pièces → une seule ligne, longueurs cumulées).

Le nom du fichier PDF reçoit le suffixe `_detail` ou `_global` selon le mode choisi.

**Longueur de câble automatique** 🧮 — chaque câble propose une liste **« Cheminements empruntés »**
(les cheminements sont numérotés `#1`, `#2`, …). Dès que tu **coches** les cheminements qu'un câble
emprunte, sa **longueur se remplit toute seule** : `Σ des cheminements cochés + 3 m de réserve`.
Le champ *Longueur* passe alors en **lecture seule** (grisé) — il se met à jour en direct si tu
modifies une longueur de cheminement ou les cases cochées. Un câble **sans liaison** reste
saisissable à la main. Cela donne une longueur **par section** (un câble par section).

> Les liaisons sont référencées par **position** du cheminement : si tu **supprimes** un cheminement
> au milieu de la liste, re-vérifie les cases des câbles concernés (les longueurs se recalculent seules).
> Le **Tube Bergmann**, bien qu'existant et absent du descriptif, est **compté** dans la longueur des
> câbles qui l'empruntent.

**Mono / Tri** — les **câbles** et les **disjoncteurs** ont un sélecteur *Phase*. Pour un câble,
l'export préfixe la section : **Mono = `3×section`**, **Tri = `5×section`** (ex. `5x6 mm²`).

**Cheminements existants** — un cheminement marqué *Déjà existant* **n'apparaît pas dans le
rapport** (qui ne concerne que les travaux à prévoir), mais sa longueur est bien comptée dans
le calcul du câble ci-dessus.

**Signalements en rouge** 🔴 — certains éléments ressortent **en rouge** dans la fiche (HTML et PDF)
pour attirer l'œil de la personne qui chiffre :
- une prise/interrupteur en gamme **EDIZIO.due** (le `.liv` reste en noir) ;
- le **Tube Bergmann** : il est **forcément existant** (il ne figure donc pas dans le descriptif,
  mais sa longueur compte pour le câble) et génère une **remarque rouge « tirage compliqué à prévoir »** ;
- la case **« Tableau (TAB) en amiante »** (section *Disjoncteurs*), qui ajoute une **remarque rouge**
  d'avertissement amiante ;
- le **1UM** d'un disjoncteur (voir ci-dessous) apparaît dans le libellé du disjoncteur.

**Option 1UM** — sur un disjoncteur en **Mono + Avec DDR**, une case **« Ajouter un 1UM »**
apparaît ; cochée, elle ajoute `+ 1UM` au libellé du disjoncteur dans l'export. La case se masque
(et se décoche) automatiquement si le disjoncteur n'est plus en mono avec DDR.

**Sauvegarde automatique** 💾 — le relevé en cours (champs, lignes et photos) est enregistré
en continu sur le téléphone et **restauré automatiquement** à la réouverture. « Réinitialiser »
efface ce brouillon.

**Photos** 📷 — ajoute des photos du chantier ; elles sont incluses en fin de PDF (2 par ligne).
Elles sont compressées automatiquement (max 1400 px) pour rester légères.

**Partage** 📤 — sur mobile, « Partager » ouvre le menu du téléphone avec **le PDF en pièce jointe**
(mail, WhatsApp…). Le bouton n'apparaît que si l'appareil le permet.

**Hors-ligne** 📶 — l'app est mise en cache (service worker `sw.js`) et **fonctionne sans réseau**
une fois ouverte une première fois. ⚠️ Après chaque mise à jour, **incrémenter la version `CACHE`
dans `sw.js`** (ex. `sevj-v1` → `sevj-v2`) pour forcer le rafraîchissement sur les téléphones.

---

## Envoi de la fiche

Dans l'aperçu, **📤 Partager (PDF)** ouvre le menu de partage du téléphone avec le **PDF en pièce
jointe** — on choisit alors le mail, WhatsApp, etc., et le destinataire.

> ℹ️ Il n'y a **pas** de bouton « Envoyer par mail » : un lien `mailto:` **ne peut pas joindre de fichier**.
> Le seul moyen fiable d'envoyer le PDF depuis un site est le **partage natif**. Si l'appareil ne le
> supporte pas (ex. certains navigateurs de bureau), « Partager » **télécharge** le PDF pour le joindre à la main.

---

## 2. Mots de passe des collaborateurs

Les mots de passe ne sont **pas stockés en clair** : seul leur hash SHA-256 figure dans le code.

**Mots de passe par défaut** (format `Prénom.<Initiale>2026`) :

| Collaborateur | Mot de passe |
|---|---|
| Stefano C. | `Stefano.C2026` |
| Lucas D. | `Lucas.D2026` |
| Arnau E. | `Arnau.E2026` |
| Jonathan L. | `Jonathan.L2026` |
| Fabien P. | `Fabien.P2026` |
| Jean-Pierre S. | `JeanPierre.S2026` |
| Jocelyn T. | `Jocelyn.T2026` |
| Hugo V. | `Hugo.V2026` |
| Nicolas W. | `Nicolas.W2026` |
| Nathan Y. | `Nathan.Y2026` |
| Bastien Z. | `Bastien.Z2026` |

### Changer un mot de passe
1. Ouvrir le site, puis la **console** du navigateur (F12 → onglet *Console*).
2. Taper : `hashPw("nouveau_mot_de_passe")` puis Entrée → copier le hash affiché.
3. Dans `index.html`, section `CONFIG — Collaborateurs`, remplacer le champ `hash:"…"`
   du collaborateur concerné par le nouveau hash.
4. Enregistrer et republier (voir §3).

> ⚠️ Ce mot de passe sert uniquement à **attribuer** le relevé au bon collaborateur, pas à
> protéger des données sensibles (le site est statique et public une fois sur GitHub Pages).

Pour ajouter/retirer un collaborateur, modifier la liste `COLLABORATORS` (nom, initiales `ini`,
apprenti `appr`, `hash`).

---

## 3. Mettre en ligne sur GitHub Pages

1. Créer un dépôt GitHub (ex : `sevj-releve`).
2. Y déposer `index.html` et `logo.png`.
3. Dépôt → **Settings → Pages** → *Source* : branche `main`, dossier `/root` → **Save**.
4. L'URL publique apparaît après ~1 min : `https://<utilisateur>.github.io/sevj-releve/`.

Depuis ce dossier, en ligne de commande :

```bash
git init
git add .
git commit -m "Application relevé chantier SEVJ"
git branch -M main
git remote add origin https://github.com/<utilisateur>/sevj-releve.git
git push -u origin main
```

Déposer **tous** les fichiers du dossier (`index.html`, `sw.js`, `manifest.webmanifest`,
`logo.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png`,
**et le dossier `vendor/`** — indispensable pour la génération PDF).

### Astuce téléphone — icône d'application
Ouvrir l'URL sur mobile → menu du navigateur → **« Ajouter à l'écran d'accueil »**.
Le **logo sevj** s'affiche comme icône et l'app s'ouvre en plein écran (sans barre du navigateur).

---

## 4. Contenu de référence intégré

- **Sections câble mm²** : 1.5 · 2.5 · 4 · 6 · 10 · 16 · 25 · *autre…*
- **Types de câble** : TT-Flex · B2ca · Cca · FE0 · **Fil** (nombre 1x→10x, *plus…* à préciser) — **Phase Mono / Tri** (export `3×` / `5×` section) · liaison aux cheminements pour la **longueur par section**
- **Cheminements** : Tube TIT · Tube ALU · Canal (dimension) · Tube THFWG (UV) · **Tube Bergmann** (forcément existant + remarque rouge « tirage compliqué ») · Chemin de câble
- **Prises** : T13 · T15 · T23 · T25 · CEE16A · CEE32A · CEE63A
- **Interrupteurs** : sch3 · sch6 · sch3+prise · sch3+3 · *spécifique…* — montage AP / ENC
- **Gamme prises/interrupteurs** : **EDIZIO.liv** · **EDIZIO.due** (le `.due` ressort **en rouge** dans l'export)
- **Boîtes** : AP9 · AP10 · *à préciser…*
- **Disjoncteurs** : courbes B/C/D · intensités 6→63 A (*autre…*) · DDR · **Phase Mono / Tri** · option **1UM** (en mono + DDR) · marques Schneider / ABB / ABB smissline / Hager / *à préciser…*
- **Tableau amiante** : case **« Tableau (TAB) en amiante »** (section Disjoncteurs) → **remarque rouge** dans l'export
- **Temps** : 1 jour = 8 h 30 (vendredi 7 h 45), calcul automatique du total heures. Pour un
  **petit travail**, laisser *Jours* vide et saisir directement le **total heures**.

Le **PDF** est généré directement dans le navigateur (librairie jsPDF, dossier `vendor/`) —
un vrai fichier paginé, sans passer par la boîte d'impression.
