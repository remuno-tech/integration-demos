type TemplatePart = {
  type: string;
  name: string;
};

function useTemplate() {
  const formatElement = (type: string, name: string): TemplatePart => {
    switch (type) {
      case 'i':
        return { type: 'image', name };
      case 'd':
        return { type: 'decimal', name };
      default:
        return { type: 'variable', name };
    }
  };

  const parseTemplate = (template: string | undefined): TemplatePart[] | undefined => {
    if (template) {
      const elements = template.match(/{[a-z]*:[^\s}]+}|{[^\s}]+}/g);
      return elements?.map((el) => {
        const result = /{([^}]*)}/.exec(el);
        const [type, name] = (result as RegExpExecArray)[1].split(':');
        return formatElement(type, name || type);
      });
    }
    return [];
  };

  return { parseTemplate };
}

export default useTemplate;
