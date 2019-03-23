#
# Usage: python migrate-to-v2.py <path-to-input> > <path-to-output>
#
#   Migrate README.md v1 to v2. Use Python 3.
#
import os.path
import re
import sys

# Logs an msg to stderr. (stdout reserved for outputting file.)
def log(msg: str):
    print(msg, file=sys.stderr)

# Exit with error msg and non-zero status code.
def error(msg: str, exit_code: int):
    log(msg)
    sys.exit(exit_code)

# Check arguments
if len(sys.argv) != 2:
    error("Expecting one argument: <path-to-input>", 1)

input = sys.argv[1]

if not os.path.isfile(input):
    error("File not found: {}".format(input), 2)

# Read in file, and identify new grammars and supporting examples.
#   Store map of grammars to lines.
curr_grammar = None
grammars = {}
with open(input) as i:
    for line in i:
        line = line.strip()
        # Discard categories and blank line
        if line.startswith("#") or line == "":
            #log("Skipping line: {}".format(line))
            pass
        # New grammar
        elif line.startswith(">"):
            curr_grammar = line[1:].lstrip()
            if curr_grammar in grammars:
                error("Grammar already exists, please dedupe source file: {}".format(curr_grammar), 3)
            grammars[curr_grammar] = []
        else:
            if not curr_grammar:
                error("No grammar found, not sure what to do with this line: {}".format(line), 4)
            grammars[curr_grammar].append(line)

# Print out TOC
print("# Korean grammar")
print()
print("## Contents")

ordered_grammars = list(grammars.keys())
ENG_REGEX = '(.*) \((.*?)\)'
grammar_english_part = re.compile(ENG_REGEX)

for grammar in ordered_grammars:
    z = re.match(ENG_REGEX, grammar)
    if (z):
        clean_grammar = z.groups()[0]
        defition = z.groups()[1]
        print("* **[{}](#{})**: {}".format(clean_grammar, hash(grammar), defition))
    else:
        print("* **[{}](#{})**".format(grammar, hash(grammar)))

# Print out contents
for grammar in ordered_grammars:
    print()
    print('<a name="{}"></a>'.format(hash(grammar)))
    print('## {}'.format(grammar))
    for line in grammars[grammar]:
        if line.startswith("**"):
            print()
        print(line)
