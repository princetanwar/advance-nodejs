## Git tips

## git work tree

git work tree allow us to checkout to multiple commits/branch at the same time. to create a git work tree just clone your repository with a --bare flag

```
git clone --bare https://github.com/princetanwar/advance-nodejs.git
```

above will create a bare repository. now we can checkout to multiple commits/branch. to checkout to a new branch go to project root and then run "git worktree add branch_name" and this will create a new folder/work tree then cd to that folder and you can start working. all the git feature will work under that work tree. below are some help full command for git worktree

- git worktree add branch_name/commit_hash
- git worktree remove to delete the local branch
- git worktree list

## git rebase

git rebase allow us to merge other branch code in our branch and then it will add our branch commit on top of the other branch commits.

master branch

```
          A---B---C feature_1
         /
    D---E---F---G master
```

feature_1 branch

run rebase with "git rebase master"

```
                  A'--B'--C' feature_1
                 /
    D---E---F---G master
```

now we will not get any merge conflict when merging to master because if conflicts are there they will appear when we do rebase.
