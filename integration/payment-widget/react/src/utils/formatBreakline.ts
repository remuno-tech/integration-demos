const formatBreakline = (string: string): string => {
  return string.replace(/\\(.)/g, (match, special) => {
    switch (special) {
      case 'n':
        return '\n';
      case 'r':
        return '\r';
      case 't':
        return '\t';
      default:
        return `\\${special}`;
    }
  });
};

export default formatBreakline;
