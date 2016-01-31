#!/bin/sh

git filter-branch --env-filter '

an="$GIT_AUTHOR_NAME"
am="$GIT_AUTHOR_EMAIL"
cn="$GIT_COMMITTER_NAME"
cm="$GIT_COMMITTER_EMAIL"

if [ "$GIT_COMMITTER_EMAIL" = "vpappu@covermymeds.com" ]
then
    cn="cartoloupe"
    cm="vasanth.pappu@gmail.com"
fi
if [ "$GIT_AUTHOR_EMAIL" = "vpappu@covermymeds.com" ]
then
    an="cartoloupe"
    am="vasanth.pappu@gmail.com"
fi

export GIT_AUTHOR_NAME="$an"
export GIT_AUTHOR_EMAIL="$am"
export GIT_COMMITTER_NAME="$cn"
export GIT_COMMITTER_EMAIL="$cm"
'
