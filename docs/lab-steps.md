# Lab Steps — Commands Actually Used

This repository was built by running the commands below in order. Use this file as the
step-by-step record for the lab submission, and as the script to repeat the exercise with
three people on a real GitHub/GitLab remote.

## Part 0 — One-time Git configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git config --global --list
```

## Part 1 — Repository (Student 1, Team Lead)

Create an empty repository named `student-info-app` on GitHub/GitLab (initialise with a
README), then:

```bash
git clone <repository-url>
cd student-info-app
```

## Part 2 — Base application (Student 1)

Create `index.html`, `style.css`, `script.js`, then:

```bash
git add .
git commit -m "Initial student information app"
git push origin main
```

## Part 3 — Feature branches

Student 2 — styling:

```bash
git pull origin main
git switch -c feature/ui
# edit style.css
git add .
git commit -m "Improve student information UI"
git push -u origin feature/ui
```

Student 3 — behaviour:

```bash
git pull origin main
git switch -c feature/javascript
# edit script.js and index.html
git add .
git commit -m "Add student details functionality"
git push -u origin feature/javascript
```

## Part 4 — Pull requests #1 and #2

On GitHub/GitLab: open `feature/ui -> main` and `feature/javascript -> main`.
Student 1 reviews (does it work / is it readable / is it relevant / is the message
meaningful) and merges both.

## Part 5 — Branch from the updated main (PR #3)

```bash
git checkout main
git pull origin main
git switch -c feature/contact
# add the contact information section
git add .
git commit -m "Add contact information"
git push -u origin feature/contact
```

Open `feature/contact -> main` and merge it.

## Part 6 — Create the conflict deliberately

Student 2:

```bash
git checkout main
git pull origin main
git switch -c feature/student-name
# index.html: <h1>Student Information System</h1>  ->  <h1>Student Management System</h1>
git add .
git commit -m "Update application heading"
git push -u origin feature/student-name
```

Student 3, from the **same** starting commit:

```bash
git checkout main
git pull origin main
git switch -c feature/app-title
# index.html: <h1>Student Information System</h1>  ->  <h1>MCA Student Information Portal</h1>
git add .
git commit -m "Update application title"
git push -u origin feature/app-title
```

## Part 7 — Merge the first branch (PR #4)

`feature/student-name -> main` is reviewed and merged. `main` now says
`Student Management System`.

## Part 8 — The second PR reports a conflict

`feature/app-title -> main` cannot be merged automatically: both branches changed the same
line. **Take a screenshot of this page for the submission.**

## Part 9–10 — Resolve locally (Student 3)

```bash
git checkout main
git pull origin main
git checkout feature/app-title
git merge main
```

Git reports:

```
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

Open `index.html`, choose the final heading, delete every `<<<<<<<`, `=======` and
`>>>>>>>` marker, then:

```bash
git add index.html
git commit -m "Resolve merge conflict in application title"
git push origin feature/app-title
```

The pull request becomes mergeable — Student 1 merges it (PR #5).

## Part 11 — Inspect the history

```bash
git log --oneline --graph --all
```

## Pushing this local repository to a new remote

This repository already contains all six branches and the full history. To publish it:

```bash
git remote add origin <repository-url>
git push -u origin main
git push origin feature/ui feature/javascript feature/contact feature/student-name feature/app-title
```
