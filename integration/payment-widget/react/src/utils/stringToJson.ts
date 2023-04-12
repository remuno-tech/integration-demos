const stringToJson = (str: string): Record<string, unknown> => {
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
};

export default stringToJson;
