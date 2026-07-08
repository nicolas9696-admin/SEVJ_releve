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
3. Remplir les sections : Chantier → Cheminement → Câbles/Fils → Prises/Interrupteurs →
   Boîtes → Disjoncteurs → Temps → Remarques.
4. **Générer la fiche** → aperçu → **Télécharger PDF** (vrai fichier PDF, paginé),
   ou **choisir la personne qui fait l'offre** et **Envoyer par mail**.

Chaque section « + Ajouter » permet d'ajouter autant de lignes que nécessaire.
La case *Travail en hauteur (> 3.50 m)* affiche automatiquement la **majoration 1.5×** du câble.
Les cheminements **identiques** sont automatiquement **additionnés** dans le rapport.

**Longueur de câble automatique** — dans la section *Cheminement*, le bouton
**🧮 Calculer la longueur de câble** additionne tous les cheminements (existants ou non)
et ajoute **1.5 m de marge**, puis reporte le total dans la longueur du 1ᵉʳ câble.

**Cheminements existants** — un cheminement marqué *Déjà existant* **n'apparaît pas dans le
rapport** (qui ne concerne que les travaux à prévoir), mais sa longueur est bien comptée dans
le calcul du câble ci-dessus.

---

## Envoi par mail

Dans l'aperçu de la fiche, un menu déroulant permet de choisir **la personne chargée de l'offre**,
puis **✉ Envoyer par mail** ouvre l'application de messagerie de l'appareil avec :

- le **destinataire** pré-rempli,
- l'**objet** = la référence de la fiche,
- le **corps** = la fiche au format texte.

> ℹ️ Un lien `mailto:` **ne peut pas joindre le PDF automatiquement**. Le contenu de la fiche est
> donc inclus en texte dans le mail ; si le PDF est souhaité, le télécharger d'abord et le joindre à la main.

### Configurer les 3 destinataires
Dans `index.html`, section `CONFIG — Personnes qui établissent les offres`, remplacer les noms et
adresses e-mail :

```js
const OFFRE_CONTACTS = [
  {name:"Nom 1", email:"nom1@sevj.ch"},
  {name:"Nom 2", email:"nom2@sevj.ch"},
  {name:"Nom 3", email:"nom3@sevj.ch"},
];
```

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

Déposer **tous** les fichiers du dossier (`index.html`, `manifest.webmanifest`,
`logo.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png`,
**et le dossier `vendor/`** — indispensable pour la génération PDF).

### Astuce téléphone — icône d'application
Ouvrir l'URL sur mobile → menu du navigateur → **« Ajouter à l'écran d'accueil »**.
Le **logo sevj** s'affiche comme icône et l'app s'ouvre en plein écran (sans barre du navigateur).

---

## 4. Contenu de référence intégré

- **Sections câble mm²** : 1.5 · 2.5 · 4 · 6 · 10 · 16 · 25 · *autre…*
- **Types de câble** : TT-Flex · B2ca · Cca · FE0 · **Fil** (nombre 1x→10x, *plus…* à préciser)
- **Cheminements** : Tube TIT · Tube ALU · Canal (dimension) · Tube THFWG (UV) · Chemin de câble
- **Prises** : T13 · T15 · T23 · T25 · CEE16A · CEE32A · CEE63A
- **Interrupteurs** : sch3 · sch6 · sch3+prise · sch3+3 · *spécifique…* — montage AP / ENC
- **Boîtes** : AP9 · AP10 · *à préciser…*
- **Disjoncteurs** : courbes B/C/D · intensités 6→63 A (*autre…*) · DDR · marques Schneider / ABB / ABB smissline / Hager / *à préciser…*
- **Temps** : 1 jour = 8 h 30 (vendredi 7 h 45), calcul automatique du total heures.

Le **PDF** est généré directement dans le navigateur (librairie jsPDF, dossier `vendor/`) —
un vrai fichier paginé, sans passer par la boîte d'impression.
