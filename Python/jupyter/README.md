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
| `conda install nb_conda` | Install Notebook Conda |

### Notebook Conda

* Adds "Conda" tab for managing Conda environments and libraries
* Enables create notebooks using any of Conda environments

## Running

| Command | Description |
| ------- | ----------- |
| `jupyter notebook` | Run Jupyter. Available at http://localhost:8888 |

## Common Tricks

```python
%matplotlib inline # show images in notebook instead of separate window
```

# Resources
* [nbviewer](https://nbviewer.jupyter.org/): for rendering web-accessible notebooks
* [Working with Jupyter Notebook files on GitHub](https://help.github.com/en/github/managing-files-in-a-repository/working-with-jupyter-notebook-files-on-github)
