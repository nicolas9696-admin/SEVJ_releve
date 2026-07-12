# SEVJ · Relevé chantier

Application mobile (page web) à **deux onglets** :
- **📋 Relevé chantier** — relever les informations sur site et générer une **Fiche informative**
  pour la personne qui établit l'offre.
- **🧾 Bon de régie** — établir un bon signé pour les **travaux hors offre à facturer**.

Tout tient dans `index.html` (+ les images `regie-*.png` du letterhead) — aucune installation, aucun serveur.

---

## 0. Bon de régie 🧾

Le 2ᵉ onglet permet d'établir un **bon de régie** : tout ce qui **n'est pas prévu dans l'offre de base**
et prend du temps (raccordements, contrôles, adaptations, travaux supplémentaires…) — **à facturer au client**.

- **Données client** (nom/société, adresse, contact, téléphone) → affichées sur l'export.
  🔒 **Sécurité : aucune donnée client n'est enregistrée** — tout est effacé au rechargement.
- **Lignes de travaux** : catégorie, description, quantité, unité (h / pce / forfait / m) → **total heures** auto.
- **Signatures** du **monteur** (connecté) *et* du **client**, capturées au doigt/à la souris.
- **Export PDF au format du letterhead SEVJ officiel** : logo sevj officiel en haut, bandeau
  d'adresse en bas, **date du jour non modifiable**, données client, tableau des travaux, et les deux signatures.
- Le PDF de régie est léger (~60 Ko) et **ne contient pas** de marqueur de ré-import (données client non ré-exploitées).

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
Le relevé s'organise **par pièce / zone**. Avec **🏠 Ajouter une pièce**, tu crées une pièce et tu
ajoutes **dedans** ses **cheminements**, **câbles/fils**, **prises/interrupteurs**, **boîtes** et
**disjoncteurs**. La liaison câble↔cheminement (longueur automatique) se fait **au sein de la même pièce**.

- **Nom de pièce** : menu déroulant des pièces courantes (Chambre 1-5, Cuisine, Salle à manger,
  Salle de bain, WC, Chaufferie, Garage, Couloir, Extérieur…) + **Autre…** pour un nom libre.
  Si **deux pièces portent le même nom**, elles sont automatiquement suffixées **#1**, **#2**…
- **Couleur** : chaque pièce reçoit une **couleur distincte** (en-tête + liseré). En export **Détaillé**,
  cette couleur **réapparaît** sur le titre de la pièce (HTML **et** PDF) pour bien les distinguer.

Les blocs **Chantier**, **Collaborateur**, **Temps & main d'œuvre**, **Remarques**, **Photos** et la
case **« TAB en amiante »** sont **globaux** (une seule fois pour tout le chantier).

Chaque pièce peut être **repliée** (bouton chevron ou icône 🏠 de son en-tête) pour gagner de la place :
les données restent **conservées** à l'intérieur, et un résumé du nombre d'articles s'affiche. L'état
replié/déployé est **mémorisé** avec le brouillon.

Chaque article ajouté porte un **badge numéroté** (`CÂBLE / FIL #2`, …), un **liseré bleu** à gauche,
et un champ **Nom** optionnel (ex : « Alim four ») affiché dans l'export détaillé.
La case *Travail en hauteur (> 3.50 m)* affiche automatiquement la **majoration 1.5×** du câble.

### Catalogue matériel 📇 (N° ELDAS)
Les sections **Prises/Interrupteurs**, **Boîtes** et **Cheminements** proposent un **menu déroulant
recherchable** du matériel de base SEVJ (issu de `Reference_materiel_SEVJ.xlsx`) :
- **Fenêtre de choix** : le bouton **« ＋ Choisir un article »** ouvre une fenêtre plein écran avec
  une **barre de recherche** en haut et la **liste groupée par famille** (repliable), triée du plus
  petit au plus grand (M16→M63, 15×15→110×60…). On tape sur l'article. **EDIZIO.due 🟢 / EDIZIO.liv 🔴**
  bien séparés et repérés. La recherche accepte `x` ou `×` (ex. `3xT13`). Puis **Couleur** (cases à cocher).
- **Couleur** : le nom garde la taille mais le mot couleur est remplacé par celui coché. Comme les
  **N° ELDAS ne sont donnés que pour la couleur par défaut**, choisir une autre couleur **retire l'ELDAS**
  et affiche la **couleur en gras** dans l'export. (Couleurs dispo : KRFWG bleu/noir/gris/brun/jaune/rouge/vert/violet ; EDIZIO blanc/noir/anthracite/crème/beige/brun/gris.)
- **Recherche** : un champ 🔎 au-dessus du menu permet de filtrer les articles au besoin — dans la
  famille choisie, ou **sans famille** (recherche dans tout le catalogue de la section ; la famille est
  alors déduite automatiquement pour les couleurs).
- Les **boîtes** n'ont qu'**une seule catégorie** (toutes les boîtes dans la même liste).
- **Saisie libre** : famille **« Autre »** → champ texte (sans ELDAS).
- Le **N° ELDAS** de l'article choisi s'affiche et est repris dans l'export.
- **Cheminements** : plus de sélecteur « Type » séparé. Choisir un article **« Bergmann »** force l'état
  *Déjà existant* + la remarque rouge « tirage compliqué ».
- En choisissant un article, son **N° ELDAS** est capturé et **affiché dans l'export** (utile pour les offres).
- **Saisie libre** toujours possible : tape un nom qui n'est pas au catalogue → il est utilisé tel quel (sans ELDAS).
- Bouton **🎨 Couleurs** : affiche la charte de couleurs de la gamme (EDIZIO.due/.liv ENC/AP, THFWG).
- Les **câbles/fils** et **disjoncteurs** ne sont pas concernés (inchangés).
- On ne stocke que **nom + N° ELDAS** (pas de prix ni remarque). *NUP/NEVO = étanche (IP55).*

Le catalogue est dans **`materiel.js`** — pour le mettre à jour, régénère ce fichier depuis l'Excel.

### Deux modes d'export
Dans l'aperçu, un sélecteur **Détaillé / Global** :
- **Détaillé** — un descriptif **par pièce**, les articles identiques d'une même pièce étant
  **additionnés** (leurs noms sont listés à côté).
- **Global** — pas de pièces : **tous les articles identiques du chantier sont additionnés**
  (ex : deux câbles `5x6 mm²` de deux pièces → une seule ligne, longueurs cumulées).

Le nom du fichier PDF reçoit le suffixe `_detail` ou `_global` selon le mode choisi.

### Reprendre un relevé (import PDF) 📥
Chaque PDF **généré et téléchargé** par l'app contient, de façon invisible, **les données du relevé**
(les pièces, articles, liaisons, etc. sont encodées après la fin du PDF — les lecteurs les ignorent).
Le bouton **📥 Importer un relevé (PDF de l'app)** (section *Chantier*) permet de **recharger** un tel
PDF : le formulaire se re-remplit et tu peux **compléter puis re-télécharger**.

> ⚠️ Fonctionne uniquement avec un PDF **produit par cette application** (pas un PDF quelconque).
> Les **photos ne sont pas ré-importées** (elles restent visibles dans le PDF d'origine) — rajoute-les
> si tu regénères le document.

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
`regie-logo.png`, `regie-band.png`, `regie-deco.png` (letterhead du bon de régie),
`materiel.js` (catalogue), `couleur-*.png` (chartes de couleurs),
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
