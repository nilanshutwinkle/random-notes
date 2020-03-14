# conda and Anaconda

* `conda` is package & environment manager (similar to `virtualenv` and `pyenv`); **Anaconda** is distribution that includes conda, Python, and >150 scientific packages
* Unlike pip, conda is *not* Python-specific
* Not all Python packages available in conda; you'll use pip, too

| Command | Description |
| ------- | ----------- |
| `conda install numpy=1.10 scipy panda` | Install package(s) |
| `conda update <package>` | Update specific package. Note `upgrade` is an alias. |
| `conda remove <package>` | Remove package(s) |
| `conda list` | List installed packages |
| `conda update conda && conda update --all` | Update all packages in default environment |
| `conda search *beautifulsoup*` | Search for package |
