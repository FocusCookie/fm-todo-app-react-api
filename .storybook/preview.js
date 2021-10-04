// .storybook/preview.js

const customViewports = {
  kindleFire2: {
    name: "iPhone 6/7/8",
    styles: {
      width: "375px",
      height: "667px",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
};
