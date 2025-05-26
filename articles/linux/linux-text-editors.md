# Linux Text Editors

[Articles](https://nirmalakumarsahu.in/articles.html) | [My Profile](https://nirmalakumarsahu.in)

[![Linux](https://img.shields.io/badge/Linux-TextEditors-blue?logo=linux)](https://www.linux.org/) [![Text Editors](https://img.shields.io/badge/TextEditors-CLI%20Tools-blue?logo=vim)](https://www.vim.org/) [![CLI](https://img.shields.io/badge/CLI-CommandLine-blue?logo=gnubash)](https://www.gnu.org/software/bash/)

---

## Index

- [vi / vim](#-vi--vim)
- [Using touch and vi in Linux](#-using-touch-and-vi-in-linux)
- [cat Command](#-cat-command)

---

## 📘 `vi` / `vim`

### 🔹 What is `vi`?

`vi` is a built-in text editor in most Linux systems. `vim` (Vi IMproved) is an enhanced version with more features.

### 📁 Opening Files

```bash
vi filename        # Opens file or creates it if it doesn't exist
```

### 🎛️ Modes in `vi`

| Mode         | Description                                             |
| ------------ | ------------------------------------------------------- |
| Normal Mode  | For navigation and commands (default mode)              |
| Insert Mode  | For typing and editing text                             |
| Visual Mode  | For selecting blocks of text                            |
| Command Mode | For saving, quitting, searching, etc. (starts with `:`) |

### ✏️ Entering Insert Mode

| Command | Description                 |
| ------- | --------------------------- |
| `i`     | Insert before cursor        |
| `I`     | Insert at beginning of line |
| `a`     | Append after cursor         |
| `A`     | Append at end of line       |
| `o`     | Open new line below         |
| `O`     | Open new line above         |

### 💾 Saving & Exiting

| Command | Action                          |
| ------- | ------------------------------- |
| `:w`    | Save (write)                    |
| `:wq`   | Save and quit                   |
| `:x`    | Save and quit (same as `:wq`)   |
| `:q`    | Quit (only if no changes)       |
| `:q!`   | Force quit (discard changes)    |
| `ZZ`    | Save and exit (no colon needed) |

### 🧭 Navigation (in Normal Mode)

| Key  | Moves Cursor...               |
| ---- | ----------------------------- |
| `h`  | Left                          |
| `l`  | Right                         |
| `j`  | Down                          |
| `k`  | Up                            |
| `w`  | To beginning of next word     |
| `b`  | To beginning of previous word |
| `0`  | Start of line                 |
| `^`  | First non-blank of line       |
| `$`  | End of line                   |
| `gg` | Start of file                 |
| `G`  | End of file                   |
| `:n` | Go to line `n` (e.g., `:25`)  |

### 🧹 Deleting Text

| Command | Action                        |
| ------- | ----------------------------- |
| `x`     | Delete character under cursor |
| `dd`    | Delete current line           |
| `dw`    | Delete word                   |
| `d$`    | Delete to end of line         |
| `d0`    | Delete to start of line       |
| `dG`    | Delete to end of file         |

### 📄 Copy, Paste, Undo

| Command    | Action              |
| ---------- | ------------------- |
| `yy`       | Copy (yank) line    |
| `yw`       | Copy word           |
| `y$`       | Copy to end of line |
| `p`        | Paste after cursor  |
| `P`        | Paste before cursor |
| `u`        | Undo                |
| `Ctrl + r` | Redo                |

### 🔍 Searching & Replacing

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `/pattern`      | Search forward for "pattern"         |
| `?pattern`      | Search backward                      |
| `n`             | Repeat search in same direction      |
| `N`             | Repeat search in opposite direction  |
| `:%s/foo/bar/g` | Replace all "foo" with "bar" in file |
| `:s/foo/bar/g`  | Replace all in current line          |

### 📐 Visual Mode

| Command    | Action                           |
| ---------- | -------------------------------- |
| `v`        | Start visual character selection |
| `V`        | Start visual line selection      |
| `Ctrl + v` | Start visual block selection     |
| `y`        | Yank selected                    |
| `d`        | Delete selected                  |
| `>`        | Indent selected                  |
| `<`        | Un-indent selected               |

### 🔁 Split Windows & Tabs (Advanced)

| Command        | Action                |
| -------------- | --------------------- |
| `:split file`  | Horizontal split      |
| `:vsplit file` | Vertical split        |
| `Ctrl + w, w`  | Switch between splits |
| `:tabnew`      | Open new tab          |
| `gt` / `gT`    | Next / previous tab   |

### ⚙ Useful Tips

- Show line numbers:
  ```vim
  :set number
  ```
- Syntax highlighting:
  ```vim
  :syntax on
  ```

### [🔝 Back to Top](#index)

---

## 📄 Using `touch` and `vi` in Linux

### ✅ What `touch` Does:

`touch filename` creates an **empty file** if it doesn't exist, or updates the timestamp if it does.

### 📌 Example:

```bash
touch Dockerfile
```

This creates an empty file named `Dockerfile`.

### ✍️ Then Open It in `vi`:

```bash
vi Dockerfile
```

This opens the file for editing. You can now press `i` to insert text, then use `:wq` to save and exit.

### 🔄 Summary Workflow:

```bash
touch myfile.txt      # Create empty file
vi myfile.txt         # Edit file with vi
```

### [🔝 Back to Top](#index)

---

## 🐱 `cat` Command

### ✅ 1. Display File Content

```bash
cat filename
```

**Example:**

```bash
cat Dockerfile
```

🔹 This will print the contents of `Dockerfile` to the terminal.

### ✍️ 2. Create a New File with `cat`

```bash
cat > newfile.txt
```

Type your content, then press:

```
Ctrl + D
```

to save and exit.

> ⚠️ This **overwrites** the file if it already exists.

### ➕ 3. Append to a File

```bash
cat >> existingfile.txt
```

Type content, then press:

```
Ctrl + D
```

### 📚 4. View Multiple Files Together

```bash
cat file1.txt file2.txt
```

Displays both files' content one after another.

### 🔢 5. Show Line Numbers

```bash
cat -n filename
```

**Example:**

```bash
cat -n Dockerfile
```

### 📂 Bonus: Save Output to Another File

```bash
cat file1.txt > copy.txt
```

This **copies** contents from `file1.txt` into `copy.txt`.

### 🚀 Example Workflow

```bash
touch hello.sh
vi hello.sh   # Add: echo "Hello World"
cat hello.sh  # Displays: echo "Hello World"
```

### [🔝 Back to Top](#index)

### [Read More ➡️](https://nirmalakumarsahu.in/articles.html)

---
