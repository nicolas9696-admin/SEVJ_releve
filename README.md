# SEVJ · Relevé chantier

Application mobile (page web, PWA) qui s'ouvre sur une **page d'accueil** proposant **trois fonctions** :

- **📋 Relevé chantier** — relever l'installation sur site et générer une **Fiche informative**
  pour la personne qui établit l'offre.
- **🧾 Bon de régie** — établir un bon signé pour les **travaux hors offre à facturer**.
- **📟 Protocole d'essai et de mesure** — le **procès-verbal de 1ʳᵉ vérification (OIBT)**,
  exporté en **PDF paysage** reproduisant le formulaire officiel.

Un bouton **🏠 Accueil** en haut de chaque fonction ramène au choix.
Tout tient dans `index.html` (+ `materiel.js` et les images) — aucune installation, aucun serveur.

---

## 1. Connexion

Section **Collaborateur** (visible une fois une fonction ouverte) : choisir son nom + mot de passe.
Le collaborateur connecté **signe** le document (« Fiche établie par : … »).

- **Mémoriser le mot de passe** : le champ est un vrai formulaire de connexion, donc le
  **gestionnaire de mots de passe du téléphone** (Google / Apple / Firefox) propose de l'enregistrer
  à la 1ʳᵉ connexion, puis le remplit tout seul. Le mot de passe reste dans le trousseau du
  téléphone — **l'app ne le stocke jamais**.
- **Rester connecté sur ce téléphone** (case à cocher) : le monteur est reconnu automatiquement à
  chaque ouverture, jusqu'à ce qu'il clique sur *Se déconnecter*. Seules ses **initiales** sont
  mémorisées — jamais le mot de passe ni son hash.
  ⚠️ À n'activer que sur **son** téléphone : tant qu'il ne se déconnecte pas, quiconque utilise
  l'appareil peut signer à son nom.
- Le bouton **Réinitialiser** vide le formulaire **sans** déconnecter.

---

## 2. Relevé chantier 📋

### Chantier
Nom du chantier, objet, lieu, date, **Référence** et case **« Tableau (TAB) en amiante »**.

La **référence** se construit automatiquement : `INITIALES_DATE_NomDuChantier`
(ex. `NW_20260708_BorneHalleCSud`). Elle reste modifiable.

### Tableau — protections ⚡
On y déclare **toutes les protections** (disjoncteurs, fusibles). Chaque protection indique
**quelle pièce elle alimente** : un **départ** apparaît alors dans cette pièce.

- **Selon DispoSuite** : coche cette case et joins **l'image du schéma**. La protection n'est alors
  **pas comptée** dans le descriptif, et l'image apparaît **en pleine largeur** dans l'export, sous
  une section *« Tableau — schéma DispoSuite »* précisant que la fourniture n'est pas chiffrée.
- Une protection marquée *existante* (et tout **fusible**, forcément existant) ne crée pas de départ
  facturable.

### Pièces / zones 🏠 — l'arbre de départs
Le relevé s'organise **par pièce**, et dans chaque pièce **par départ**. Dans un départ, on construit
un **arbre** de ce qui est alimenté :

```
Départ (protection du Tableau)
└── Boîte
    ├── Appareil
    └── Appareil
```

- **＋ brancher** ajoute un **Appareil** ou une **Boîte** sous le nœud courant.
- **＋ Boîte / appareil (à lier DispoSuite)** crée un groupe d'éléments dont la protection est
  définie dans le schéma DispoSuite (donc sans départ dans le Tableau).
- Chaque nœud se **replie** d'un tap sur son en-tête et affiche alors un résumé.
- Couleurs de l'escalier : **orange** = depuis le départ (protection), **turquoise** = depuis une boîte.

**Liaison ① → ②** — chaque Appareil / Boîte porte sa propre liaison :
1. **Cheminement(s) empruntés** — un ou plusieurs, avec leur longueur ;
2. **Câble / fil** — sa **longueur se calcule toute seule** : `Σ des cheminements + 3 m de réserve`.

Un tap sur la **bande bleue** d'un cheminement ou du câble le replie / déploie.

**Dupliquer** ⧉ :
- sur un **nœud** : duplique l'élément **complet** (article + liaison + tout ce qui en dépend), vers
  **l'emplacement courant** ou **n'importe quel départ de n'importe quelle pièce** ;
- sur un **cheminement** : le duplique dans la même liaison (la longueur du câble se recalcule).

**Pièces** : nom au choix (Chambre 1-5, Cuisine, WC, Extérieur… + **Autre…** libre) ; deux pièces de
même nom sont suffixées **#1**, **#2**. Chaque pièce reçoit une **couleur distincte**, reprise sur le
titre de la pièce dans l'export détaillé. Boutons ▲▼ pour réordonner, **⇕** pour tout replier.

**Photos** 📷 — par pièce, compressées automatiquement (max 1400 px). Dans l'export, elles sont
affichées **en pleine largeur** (centrées, pagination automatique) pour rester **lisibles** — utile
pour une capture de nomenclature ou de schéma.

### Catalogue matériel 📇 (N° ELDAS)
Cheminements, appareils et boîtes se choisissent via **« ＋ Choisir un article »** : fenêtre plein
écran avec **recherche** et **liste groupée par famille** (repliable), triée du plus petit au plus
grand. La recherche accepte `x` ou `×` (ex. `3xT13`).

- **Couleur** : le mot couleur du nom est remplacé par celui coché. Les **N° ELDAS n'étant donnés que
  pour la couleur par défaut**, choisir une autre couleur **retire l'ELDAS** et affiche la couleur
  **en gras** dans l'export.
- **Saisie libre** : famille **« Autre »** → champ texte (sans ELDAS).
- Le catalogue est dans **`materiel.js`** (régénéré depuis `Reference_materiel_SEVJ.xlsx`) ;
  quelques articles complémentaires sont définis dans `MAT_EXTRA` (`index.html`).
  Les doublons (même section + même nom) sont **éliminés automatiquement**.

### Famille « Existant » ♻️
Chaque section a un groupe **Existant** à part, qui **force l'état existant** et **verrouille** le champ :

| Section | Articles | Effet |
|---|---|---|
| Cheminement | **Cheminement existant**, **Tube Bergmann (existant)** | État → *Déjà existant* |
| Boîte | **Boîte existante** | Case *Déjà existante* cochée |
| Appareil | **Prise existante**, **Interrupteur existant**, **Point lumineux existant** | Statut → *Déjà sur place (démonté / remonté)* |

- Les **cheminements** et **boîtes** existants **n'apparaissent pas** dans le descriptif (rien à
  fournir), mais la longueur d'un cheminement existant **compte** dans le calcul du câble.
- Les **appareils** existants restent listés (*« — dépose + repose (existant) »*) **sans N° ELDAS**
  (on ne commande rien), et alimentent une ligne **« Forfait démontage / remontage d'appareils
  existants »** avec le total de la pièce.
- Le **Tube Bergmann** garde en plus sa **remarque rouge « tirage compliqué à prévoir »**.

### Deux modes d'export
Dans l'aperçu, un sélecteur **Détaillé / Global** :

- **Détaillé** — un descriptif **par pièce**. Le câblage est **détaillé ligne par ligne** (nom du
  câble en gras + spec + sa longueur), les câbles de **même spec** étant regroupés et suivis d'un
  **sous-total** : `Total câblage · 3x1.5 mm² · FE0 — 16 m`. Deux specs différentes dans une pièce
  donnent **deux totaux distincts**.
- **Global** — pas de pièces : tous les articles identiques du chantier sont **additionnés**.

Le nom du fichier PDF reçoit le suffixe `_detail` ou `_global`.

### Signalements en rouge 🔴
- une prise/interrupteur en gamme **EDIZIO.due** (le `.liv` reste en noir) — sauf si l'appareil est
  **existant** (rien à commander) ;
- le **Tube Bergmann** → remarque « tirage compliqué à prévoir » ;
- la case **« Tableau (TAB) en amiante »** → remarque d'avertissement amiante.

### Autres règles
- **Mono / Tri** : l'export préfixe la section — **Mono = `3×section`**, **Tri = `5×section`**.
- **Travail en hauteur (> 3.50 m)** : affiche la **majoration 1.5×** du câble.
- **Option 1UM** : sur un disjoncteur **Mono + Avec DDR** uniquement.
- **Temps** : 1 jour = 8 h 30 (vendredi 7 h 45). Pour un petit travail, laisser *Jours* vide et
  saisir directement le **total heures**.

---

## 3. Bon de régie 🧾

Pour tout ce qui **n'est pas prévu dans l'offre de base** (raccordements, contrôles, adaptations,
travaux supplémentaires…) — **à facturer au client**.

- **Données client** (nom/société, adresse, contact, téléphone) → sur l'export.
  🔒 **Aucune donnée client n'est enregistrée** — tout est effacé au rechargement.
- **Lignes de travaux** : catégorie, description, quantité, unité (h / pce / forfait / m) → **total heures** auto.
- **Signatures** du **monteur** (connecté) *et* du **client**, capturées au doigt.
- **N° de bon** automatique (`INITIALES_DATE_Chantier`) et **date du jour** non modifiable.
- **Export PDF au letterhead SEVJ officiel** (logo, bandeau d'adresse), léger (~60 Ko).

---

## 4. Protocole d'essai et de mesure 📟

Procès-verbal de la **première vérification (OIBT)**.

### En-tête
Vérification initiale / Essais après réparation · **Objet / Période** · **Adresse** ·
**Instruments de mesure** (liste + *Autre…* libre) · **Entreprise** · **N° d'installation**.

Le **N° d'installation** se pré-remplit au format **`INST-26-`** (26 = année en cours) ; il ne reste
qu'à saisir les **4 chiffres de l'affaire interne**. La **numérotation des pages est automatique**.

### Groupes (installations & mesures)
Une ligne par **groupe**, chacun avec une **couleur distincte** et **repliable** (n'affiche alors que
le repère + la désignation).

- **Type / Caract.** : courbes actuelles **B, C, D** · courbes anciennes **L, S, V** ·
  **Fusible** / **HPC** · **Autre…** (saisie libre).
  Choisir *Fusible* ou *HPC* fait apparaître le **modèle** : **DI, DII, DIII** ou *Autre…* libre.
- **Facteur 0,66** : une case *« Appliquer le facteur 0,66 aux courants de court-circuit »*. Cochée,
  l'export affiche la **valeur mesurée** puis une **2ᵉ valeur × 0,66** (ex. `365` → `240,9 (× 0,66)`),
  avec une note explicative sous le tableau. Le réglage est **par groupe**.
- Mesures : Conducteur PE · Résistances d'isolement · Courant de court-circuit · Protection de
  courant résiduel DDR/RCD · Champ tournant · Tension.

### Autorisation & signatures
- **Exécuteur des travaux (OIBT Art. 24 — Première vérification)** : nom, date, **signature** capturée.
- **Personne titulaire d'une autorisation d'installer limitée** : nom + date ; la ligne de signature
  reste **vierge**, à signer à la main une fois le document imprimé ou transféré.
- **Type d'autorisation d'installer limitée** (Art. 13 / 14 / 15 / 14.4-15.4) : **pas de saisie dans
  l'app** — les 4 cases apparaissent **vides dans l'export**, à cocher au stylo après impression.

L'export est un **PDF paysage** reproduisant le formulaire officiel (logo SEVJ en haut à droite).
Le texte est sauvegardé automatiquement (la signature, non).

---

## 5. Sauvegarde, hors-ligne, partage

**Sauvegarde automatique** 💾 — le relevé en cours est enregistré en continu sur le téléphone et
**restauré à la réouverture**. Les **images** (photos de pièce, schémas DispoSuite) sont stockées
**à part** du texte : si la mémoire du navigateur est pleine, le texte du relevé passe quand même, et
un **avertissement explicite** invite à faire une sauvegarde `.json`.

**Sauvegarde / restauration `.json`** 📂 (section *Chantier*) — sauvegarde **complète**
(données **+ photos**) dans un fichier, pour changer de téléphone ou en cas de perte.
C'est le moyen recommandé de **reprendre un relevé**.

**Partage** 📤 — « Partager (PDF) » ouvre le menu du téléphone avec le **PDF en pièce jointe**.
Si le navigateur ne le supporte pas (**Firefox** notamment), le PDF s'ouvre dans un **nouvel onglet** :
on l'enregistre depuis le menu du navigateur, et **le relevé reste intact dans son onglet**.

> ℹ️ Il n'y a **pas** de bouton « Envoyer par mail » : un lien `mailto:` ne peut pas joindre de fichier.

**Hors-ligne** 📶 — l'app est mise en cache (service worker `sw.js`) et **fonctionne sans réseau**
une fois ouverte une première fois.

---

## 6. Mots de passe des collaborateurs

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
3. Dans `index.html`, section `CONFIG — Collaborateurs`, remplacer le `hash:"…"` du collaborateur.
4. Enregistrer et republier (voir §7).

> ⚠️ Ce mot de passe sert à **attribuer** le relevé au bon collaborateur, pas à protéger des données
> sensibles (le site est statique et public une fois sur GitHub Pages).

Pour ajouter/retirer un collaborateur : liste `COLLABORATORS` (nom, initiales `ini`, apprenti `appr`, `hash`).

---

## 7. Mettre en ligne sur GitHub Pages

### ⚠️ Règle à suivre à CHAQUE mise à jour
Incrémenter **les deux** versions, sinon les téléphones gardent l'ancienne app :

| Fichier | Constante | Exemple |
|---|---|---|
| `sw.js` | `CACHE` | `sevj-v43-arbre` → `sevj-v44-arbre` |
| `index.html` | `APP_VERSION` | affichée en petit sous « Relevé par » — sert à vérifier la version qui tourne |

Sur le téléphone, le bouton **Réinitialiser** vide le cache, désenregistre le service worker et
recharge : c'est le moyen sûr de forcer la dernière version.

### Publication
1. Créer un dépôt GitHub (ex. `sevj-releve`).
2. Dépôt → **Settings → Pages** → *Source* : branche `main`, dossier `/root` → **Save**.
3. L'URL publique apparaît après ~1 min : `https://<utilisateur>.github.io/sevj-releve/`.

Déposer **tous** les fichiers du dossier :
`index.html`, `sw.js`, `manifest.webmanifest`, `materiel.js` (catalogue),
`logo.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png`,
`regie-logo.png`, `regie-band.png`, `regie-deco.png` (letterhead du bon de régie),
`couleur-*.png`, **et le dossier `vendor/`** (indispensable à la génération PDF).

> ⚠️ Le service worker met en cache **toute** la liste `ASSETS` de `sw.js` : si un seul fichier
> manque en ligne, la mise en cache échoue entièrement. Déposer tous les fichiers listés.

### Astuce téléphone — icône d'application
Ouvrir l'URL sur mobile → menu du navigateur → **« Ajouter à l'écran d'accueil »**.
Le logo SEVJ s'affiche comme icône et l'app s'ouvre en plein écran.

---

## 8. Contenu de référence intégré

- **Sections câble mm²** : 1.5 · 2.5 · 4 · 6 · 10 · 16 · 25 · *autre…*
- **Types de câble** : TT-Flex · B2ca · Cca · FE0 · **Fil** (1x→10x, *plus…*) — **Phase Mono / Tri**
- **Cheminements** : Tube ALU · Tube TIT · Tube KRFWG · Canal LF · Chemin de câble · **Existant**
- **Appareils** : EDIZIO.due 🟢 · EDIZIO.liv 🔴 · Point lumineux · Prise CEE / industrielle ·
  NUP/NEVO (étanche, IP55) · **Existant**
- **Boîtes** : catalogue AP/HSB · **Existant**
- **Statut d'un appareil** : Neuf · **Déjà sur place (démonté / remonté)** · Neuf fourni par le client ·
  Démontage (le client remettra plus tard)
- **Disjoncteurs** : courbes B/C/D · intensités 6→63 A (*autre…*) · DDR · Mono / Tri · option **1UM** ·
  marques Schneider / ABB / ABB smissline / Hager / *à préciser…*
- **Protocole** : courbes B/C/D + **L/S/V** · Fusible / HPC + modèle **DI/DII/DIII** · *Autre…* partout
- **Temps** : 1 jour = 8 h 30 (vendredi 7 h 45)

Le **PDF** est généré directement dans le navigateur (jsPDF, dossier `vendor/`) — un vrai fichier
paginé, sans passer par la boîte d'impression.
