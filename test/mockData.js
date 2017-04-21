const emptyLine = '';
const lineWithOnlyWhitespaces = '   ';

const commentLine = '# This is a comment';
const commentLineStartWithSpaces = '    # This is a comment';

const keyLine = '  key: value';
const valueLine = '  - true';

const mockForClosest =`seq:
  # Ordered sequence of nodes
  Block style: !!seq
  - Mercury   # Rotates - no light/dark sides.
  - Venus     # Deadliest. Aptly named.
  - Earth     # Mostly dirt.
  - Mars      # Seems empty.
`;
const selectedForClosest = '  - Mercury   # Rotates - no light/dark sides.';
const expectedLineForClosest = '  Block style: !!seq';

module.exports = {
  mockForClosest,
  selectedForClosest,
  expectedLineForClosest,
  keyLine,
  valueLine,
  emptyLine,
  commentLine,
  lineWithOnlyWhitespaces,
  commentLineStartWithSpaces,
};
