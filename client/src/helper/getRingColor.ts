const getRingColor = (statusCode: number) => {
  switch (statusCode) {
    case 200:
      return "ring-red-500";
      break;
    case 204:
      return "ring-green-500";
      break;
    default:
      return "focus:ring-gray-300";
      break;
  }
};

export {
    getRingColor
}
