export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const removeObject = (objectArray, key) => {
  delete objectArray[key];
  return objectArray;
};
