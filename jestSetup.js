const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({adapter: new Adapter()});

jest.mock('@/utils/fs');
jest.mock("electron", () => ({
  remote: {
    app: {
      getPath() {
        return '/';
      },
      getAppPath() {
        return '/';
      }
    }
  }
}));