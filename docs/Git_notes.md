## Git tips

## git work tree

git work tree allow us to checkout to multiple commits/branch at the same time. to create a git work tree just clone your repository

```
git clone https://github.com/princetanwar/advance-nodejs.git
```

above will create a repository. now we can checkout to multiple commits/branch. to checkout to a new branch go to project root and then run "git worktree add branch_name" and this will create a new folder/work tree then cd to that folder and you can start working. all the git feature will work under that work tree. below are some help full command for git worktree

- git worktree add
  - git worktree add `branch_name/commit_hash` `folder_path_where_to_store_the_tree`
  - git worktree add `local_branch_name/commit_hash` `folder_path_where_to_store_the_tree` `origin/branch_name`
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

## Git Add Patch

some times a single file have changes related to two things and we want to commit those changes separately without re-writing the code again. to make this work we can use git's patch add feature. run below command then git show to changes chunks/hunk and it will ask you that if we have to include it or not.

```
git add -p file_path
```


## Git Bisect


`git bisect` is a Git command that helps you find the specific commit that introduced a bug by performing a binary search through your project's history. It efficiently narrows down the range of commits to pinpoint the first bad commit.

`git bisect start`
`git bisect bad`
`git bisect good <commit-hash>`

