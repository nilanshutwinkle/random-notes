# Overview
* Form of **literate programming**, proposed by Donald Knuth in 1984:
    > Instead of imagining that our main task is to instruct a computer what to do, let us concentrate rather on explaining to human beings what we want a computer to do.
* Grew out of IPython project, which is an interactive shell with features like code completion and syntax highlighting
* Automatically rendered in GitHub; however, interactive features won't work, in which case you can use nbviewer
* JSON file with a .ipynb file extension
* **Jupyter** comes from the combination of **Ju**lia, **Py**thon, and **R**; Jupyter is language agnostic

# Architecture

![Jupyter architecture diagram](architecture.png)

Source: [Jupyter documentation](https://jupyter.readthedocs.io/en/latest/architecture/how_jupyter_ipython_work.html)

# Commands

## Installation

| Command | Description |
| ------- | ----------- |
| `conda install jupyter notebook` | Install with conda |
| `pip install jupyter notebook` | Install with pip |

## Running

| Command | Description |
| ------- | ----------- |
| `jupyter notebook` | Run Jupyter. Available at http://localhost:8888 |

# Keyboard Shortcuts

## Switching between modes

| OS X Shortcut | Description |
| ------------- | ----------- |
| `SHIFT-ENTER` | Run current cell and move to next cell in command mode |
| `CONTROL-ENTER` | Run current cell and stay on current cell im command mode |
| `ENTER` | Enter edit mode |
| `ESC` | Enter command mode |

## Command Mode

| OS X Shortcut | Description |
| ------------- | ----------- |
| `UP`, `DOWN` | Navigate cells |
| `SHIFT+UP`, `SHIFT+DOWN` | Select cell(s) |
| `H` | List of keyboard shortcuts |
| `COMMAND-SHIFT-F` | Open command pallet |
| `A` | Create cell above selected cell |
| `B` | Create cell below selected cell |
| `Y` | Change selected cell to code cell |
| `M` | Change selected cell to Markdown cell |
| `L` | Turn on line numbers in selected code cell |
| `D` (twice) | Delete selected cell |

## Edit Mode

| OS X Shortcut | Description |
| ------------- | ----------- |
| `TAB` | Code completion |
| `SHIFT+TAB` | Show documentation |
| `SHIFT+TAB` (twice) | Show more documentation |

# Cells

## Math in Markdown cells

* Notebooks use Mathjax to render LaTeX symbols as math
* Inline:
    ```
    $y = mx + b$
    ```
* Block:
    ```
    $$
    y = \frac{a}{b+c}
    $$
    ```

## Magic Keywords in Code Cells

* **Magic keywords**: special commands you can run in cells that let you control the notebook or perform system calls (e.g., changing directories)
* Specifically for Python kernel
* `%` are for **line magics**, and `%%` are for **cell magics**

### Debugging

| Command | Description |
| ------- | ----------- |
| `%pdb` | Turn on interactive debugger |

### matplotlib

| Command | Description |
| ------- | ----------- |
| `%matplotlib inline` | Show images in notebook instead of separate window |
| `%config InlineBackend.figure_format = 'retina'` | Render matplotlib with higher resolution |

### Timing

| Command | Description |
| ------- | ----------- |
| `%timeit fib(100)` | Time the line |
| `%%timeit` | Time the cell |

### Resources

* [List of built-in magic keywords](https://ipython.readthedocs.io/en/stable/interactive/magics.html)

# Examples

* [python-3.6-example.ipynb](python-3.6-example.ipynb)

# Misc

## Checkpoints
* Created when manually saved
* May choose to add to `.gitignore`:
    ```
    .ipynb_checkpoints
    ```

## Notebook Conda
* Install:
    ```sh
    conda install nb_conda
    ```
* Features:
    - Adds "Conda" tab for managing Conda environments and libraries
    - Enables create notebooks using any of Conda environments

# Resources
* [nbviewer](https://nbviewer.jupyter.org/): for rendering web-accessible notebooks
* [Working with Jupyter Notebook files on GitHub](https://help.github.com/en/github/managing-files-in-a-repository/working-with-jupyter-notebook-files-on-github)
