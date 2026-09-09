# Merge Conflict Evidence

## 1. Conflict detected (git merge main on branch feature/app-title)

```
$ git merge main
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.

$ git status --short
UU index.html
```

## 2. Conflict markers inside index.html

```html
  <main class="app">
<<<<<<< HEAD
    <h1>MCA Student Information Portal</h1>
=======
    <h1>Student Management System</h1>
>>>>>>> main
    <p class="subtitle">Department of Computer Science</p>

```

## 3. Conflict resolved

Both versions were combined into a single heading:

```html
    <h1>Student Management System – MCA</h1>
```

```
$ git add index.html
$ git commit -m "Resolve merge conflict in application title"
$ git push origin feature/app-title
```

The pull request `feature/app-title -> main` then became mergeable and was merged by the team lead.
