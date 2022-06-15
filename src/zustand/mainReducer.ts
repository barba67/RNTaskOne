let initialGeneralState = {
  selectedImageData: null,
};

const mainReducer = (set: any, get: any) => {
  let SET = (setData: any) => {
    set((state: any) => ({ ...state, main: { ...get().main, ...setData } }));
  };
  return {
    main: { ...initialGeneralState },

    setSelectedImageData: (data: any) => {
        SET({ selectedImageData: data });
    },
  };
};
export default mainReducer;
