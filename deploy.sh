#!/usr/bin/env bash
# deploy.sh — SEVJ Relevé : bump de version + commit + push GitHub Pages.
#
#   ./deploy.sh "message de commit"
#   ./deploy.sh -d "Texte affiche sous Releve par" "message de commit"
#   ./deploy.sh -v v130-oibt "message de commit"
#   ./deploy.sh -n "message de commit"     # -n = pas de bump (correction seule)
#
# Bumpe TOUJOURS const CACHE (sw.js) ET const APP_VERSION (index.html) ensemble,
# sinon le service worker sert l'ancienne version.

set -euo pipefail
cd "$(dirname "$0")"

MSG=""; DESC=""; FORCED=""; BUMP=1
while [ $# -gt 0 ]; do
  case "$1" in
    -d|--desc)    DESC="$2";   shift 2 ;;
    -v|--version) FORCED="$2"; shift 2 ;;
    -n|--no-bump) BUMP=0;      shift ;;
    -h|--help)    sed -n '2,12p' "$0"; exit 0 ;;
    *)            MSG="$1";    shift ;;
  esac
done

# --- version actuelle (source de verite : sw.js) -----------------------------
CUR=$(sed -n "s/^const CACHE *= *'sevj-\([^']*\)'.*/\1/p" sw.js | head -1)
[ -n "$CUR" ] || { echo "ERREUR: 'const CACHE' introuvable dans sw.js" >&2; exit 1; }
NUM=$(printf '%s' "$CUR" | sed -n 's/^v\([0-9][0-9]*\).*/\1/p')
[ -n "$NUM" ] || { echo "ERREUR: version illisible dans sw.js ($CUR)" >&2; exit 1; }
SUF=${CUR#v$NUM}

if   [ -n "$FORCED" ]; then NEW="$FORCED"
elif [ "$BUMP" -eq 1 ]; then NEW="v$((NUM+1))$SUF"
else NEW="$CUR"; fi

# --- reecriture --------------------------------------------------------------
if [ "$NEW" != "$CUR" ]; then
  sed -i "s|^const CACHE *= *'sevj-[^']*'|const CACHE = 'sevj-$NEW'|" sw.js
fi

if [ -n "$DESC" ]; then
  _q="'"; _bs='\'
  DESC_ESC=${DESC//$_q/$_bs$_q}
  LINE="const APP_VERSION='$NEW — $DESC_ESC';" \
    awk '!d && /^const APP_VERSION=/ {print ENVIRON["LINE"]; d=1; next} {print}' \
    index.html > index.html.tmp && mv index.html.tmp index.html
elif [ "$NEW" != "$CUR" ]; then
  sed -i "s|^const APP_VERSION='v[0-9][0-9]*[A-Za-z0-9._-]*|const APP_VERSION='$NEW|" index.html
fi

# --- garde-fou : les deux versions doivent coincider -------------------------
V_SW=$(sed -n "s/^const CACHE *= *'sevj-\([^']*\)'.*/\1/p" sw.js | head -1)
V_HTML=$(sed -n "s/^const APP_VERSION='\([A-Za-z0-9._-]*\).*/\1/p" index.html | head -1)
if [ "$V_SW" != "$V_HTML" ]; then
  echo "ERREUR: desynchronise — sw.js=$V_SW, index.html=$V_HTML. Rien n'est pousse." >&2
  exit 1
fi
echo "Version : $CUR  ->  $V_SW"

# --- commit + push -----------------------------------------------------------
[ -n "$MSG" ] || MSG="$V_SW"
git add -A
if git diff --cached --quiet; then echo "Rien a commiter."; exit 0; fi
git commit -q -m "$V_SW — $MSG"
git push -q origin main
echo "Pousse. GitHub Pages rebuild en ~1 min."
echo "Sur le telephone : bouton Reinitialiser pour forcer $V_SW."
