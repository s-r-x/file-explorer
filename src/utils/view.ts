export const getGridItemSize = (
  zoom: number,
): {width: number; height: number} => {
  switch (zoom) {
    case 1:
      return {
        width: 125,
        height: 100,
      };
    case 2:
      return {
        width: 150,
        height: 125,
      };
    case 3:
      return {
        width: 175,
        height: 150,
      };
  }
};
export const getFilesViewSize = () => {
  const $container = document.getElementById('files');
  return $container.offsetWidth;
}
